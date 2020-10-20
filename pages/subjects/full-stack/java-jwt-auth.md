# Full-stack webprogramozás -- Automate tests and deployment with a CI pipeline

## Resources

- https://www.jtechlog.hu/2019/03/18/jwt-es-spring-security.html
- https://auth0.com/blog/implementing-jwt-authentication-on-spring-boot/
- https://www.freecodecamp.org/news/how-to-setup-jwt-authorization-and-authentication-in-spring/
- https://jwt.io/

## Technology and concepts

We will use *Spring Security* for securing our REST API. It provides different types of authentication and authorization, for example the session-based form login authentication method, which would show up a login form every time it is necessary to authenticate the user. After authentication the login information would be saved into the session. 

*Session* is a mechanism to store information per client on the server side. It is heavily uses cookies to store the so-called session id. On the first request the server initializes a new session described by a session id string. This string then is sent back to client, instructing the client to store the session id in a client-side cookie. This cookie is sent automatically every time the client sends a request. The server reads out the session id from the request headers, and makes available all the information belonging to that session to the server-side code.

*Session-based authentication* is nothing else just storing a special value in the session after a successful validation. This information indicates that the user has already validated himself/herself. Logging out needs to remove this information from the session.

However, for REST API-s the session-based approach is not the best solution. We would like to keep our API stateless, but session introduces state in our server. For REST API-s, the *token-based authentication* is widely used. In this case, after a successful authentication, the server generates a token, but does not store it, just sends it to the client. The client may store this token as a cookie or in localstorage, but on each request it has to send this token towards the server. The server can check the validation of the token, and if everything is OK, it lets the process continue. Otherwise, it responses an unauthorized message.

*Authorization* is a process when it is decided whether an actual user can access a resource.

## Configuration

Add the following dependency to the `pom.xml`:

```java
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

You will also need a `WebSecurityConfig.java` configuration class, where we can affect the security processes with overriding some important methods. Create it, for example, in a `security` package. The basic structure is:

```java
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
    
    }    

    @Autowired
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {

    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
```

If we try our application, we can see it always return Forbidden response.

## Adding a default in-memory user

```java
@Autowired
protected void configure(AuthenticationManagerBuilder auth) throws Exception {
  auth
    .inMemoryAuthentication()
      .withUser("user")
      .password("{noop}user")
      .authorities("ROLE_USER");
}
```

## Fine-tuning the security process

The [`HttpSecurity`](https://docs.spring.io/spring-security/site/docs/current/apidocs/org/springframework/security/config/annotation/web/builders/HttpSecurity.html#formLogin--) class is responsible for specifying the security flow. The followings are the default settings:

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
    http
        .authorizeRequests()
            .anyRequest().authenticated()
            .and()
        .formLogin()
            .and()
        .httpBasic();
}
```

It means that requests need to be authorized ([authorizeRequests](https://docs.spring.io/spring-security/site/docs/current/apidocs/org/springframework/security/config/annotation/web/builders/HttpSecurity.html#authorizeRequests--)), every request should be authenticated, and for that use the form login method, and if it is unavailable, use the in-built HTTP Basic authentication.

We can specify different rules for different endpoints using the `antMatchers()` method, as you can see in the following example:

```java
http
    .authorizeRequests()
        .antMatchers("/admin/**").hasRole("ADMIN")
        .antMatchers("/**").hasRole("USER")
        .antMatchers("/").permitAll()
        .anyRequest().authenticated();
```

In our case we would like the followings:
- disable the CSRF form protection
- enable the CORS functionality
- disable the session management, and make the whole authentication process stateless

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
  String secret = environment.getProperty(SECRET_PROPERTY_NAME);
  http    
    .authorizeRequests()
      .anyRequest().authenticated()
      .and()
    .csrf().disable()
    .cors().and()
    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
}
```

## Authentication: log in and generating a token

In Spring Security we can fine tune the whole authentication process through filters. We will use the first filter to ensure the correct authentication. We have to extend the `UsernamePasswordAuthenticationFilter`, and create our custom authentication logic. In the `security` package create a new class `JWTAuthenticationFilter`, in which two methods need to be overriden:
- `attemptAuthentication`: here we need to read the credentials from the HTTP request body, and use the injected authentication manager to validate those informations.
- `successfulAuthentication` will be called after a successful authentication. This is the place where we need to generate the JWT token and send it to the client. The client may store it as a cookie or in the localstorage.

```java
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

  private AuthenticationManager authenticationManager;
  private static final String COOKIE_NAME = "token";
  private static final int EXPIRATION =  30 * 60 * 1000;
  private String secret;

  public JWTAuthenticationFilter(AuthenticationManager authenticationManager, String secret) {
    this.authenticationManager = authenticationManager;
    this.secret = secret;
    // This endpoint will be used for authentication
    // It is not necessary to include it among antMatchers
    setFilterProcessesUrl("/api/auth"); 
  }

  @Override
  public Authentication attemptAuthentication(HttpServletRequest req,
                                              HttpServletResponse res) throws AuthenticationException {
    try {
      // reads the username and password from HTTP request body
      User creds = new ObjectMapper()
        .readValue(req.getInputStream(), User.class);

      // authenticate with the injected authenticationManager
      return authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
          creds.getUsername(),
          creds.getPassword(),
          new ArrayList<>())
      );
    } catch (IOException e) {
        throw new RuntimeException(e);
    }
  }

  @Override
  protected void successfulAuthentication(HttpServletRequest req,
                                          HttpServletResponse res,
                                          FilterChain chain,
                                          Authentication auth) throws IOException {
      // Token generation                                      
      long now = System.currentTimeMillis();
      String token = JWT.create()
        .withSubject(auth.getName())
        .withIssuedAt(new Date(now))
        .withExpiresAt(new Date(now + EXPIRATION))
        .withClaim("roles", auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
        .sign(Algorithm.HMAC512(secret.getBytes()));

      // Adding it to a cookie
      Cookie cookie = new Cookie(COOKIE_NAME, token);
      cookie.setMaxAge(EXPIRATION);
      cookie.setPath("/api");
      cookie.setHttpOnly(true);
      res.addCookie(cookie);

      // Sending it as a JSON response
      Map<String, String> responseObject  = new HashMap<String, String>() {{
          put("token", token);
      }};
      res.getWriter().write(new ObjectMapper().writeValueAsString(responseObject));
      res.getWriter().flush();
  }
}
```

For JWT token generation we will use Auth0's `java-jwt` library. Add the following to the `pom.xml` file:

```xml
<dependency>
  <groupId>com.auth0</groupId>
  <artifactId>java-jwt</artifactId>
  <version>3.11.0</version>
</dependency>
```

Finally we need to add this class to the filters of the authentication process:

```java
protected void configure(HttpSecurity http) throws Exception {
  String secret = environment.getProperty(SECRET_PROPERTY_NAME);
  http    
    // ...
    .addFilter(new JWTAuthenticationFilter(authenticationManager(), secret))
}
```

Try to authenticate a user!

## Authorizing requests

The second step is validating the sent token in each request. This can be done in another filter, which extends the `BasicAuthenticationFilter` class. Create a `JWTAuthorizationFilter` class in the `security` package, and override the `doFilterInternal` method. Here we have to read sent token either from the cookies, or from the `Authorization` header, and validate it. If it is OK, then we return an object which contains the username and the role informations. This object will be used in the further phases of the application, e.g. for role-based authorization.

```java
public class JWTAuthorizationFilter extends BasicAuthenticationFilter {
  private static final String COOKIE_NAME = "token";
  private String secret;
  public JWTAuthorizationFilter(AuthenticationManager authManager, String secret) {
      super(authManager);
      this.secret = secret;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest req,
                                  HttpServletResponse res,
                                  FilterChain chain) throws IOException, ServletException {
    Optional<String> oToken = getTokenFromCookie(req);
    if (!oToken.isPresent()) {
      oToken = getTokenFromHeader(req);
      if (!oToken.isPresent()) {
        chain.doFilter(req, res);
        return;
      }
    }
    
    String token = oToken.get();
    UsernamePasswordAuthenticationToken authentication = getAuthentication(token);

    SecurityContextHolder.getContext().setAuthentication(authentication);
    chain.doFilter(req, res);
  }

  private UsernamePasswordAuthenticationToken getAuthentication(String token) {
    DecodedJWT jwt = JWT.require(Algorithm.HMAC512(secret.getBytes()))
      .build()
      .verify(token);
              
    String user = jwt.getSubject();

    if (user != null) {
      List<String> roles = jwt.getClaim("roles").asList(String.class);
      return new UsernamePasswordAuthenticationToken(user, null, 
        roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));
    }
    return null;
  }
  
  private Optional<String> getTokenFromCookie(HttpServletRequest req) {
    if (req.getCookies() == null) {
      return Optional.empty();
    }
    Optional<Cookie> cookie = Arrays.stream(req.getCookies())
      .filter(c -> c.getName().equals(COOKIE_NAME))
      .findAny();
    if (!cookie.isPresent()) {
      return Optional.empty();
    }
    return Optional.of(cookie.get().getValue());
  }
  
  private Optional<String> getTokenFromHeader(HttpServletRequest req) {
    String header = req.getHeader("Authorization");
    if (header == null || !header.startsWith("Bearer ")) {
      return Optional.empty();
    }
    return Optional.of(header.replace("Bearer ", ""));
  }
}
```

Finally we need to add this class as a filter in the configuration class:

```java
protected void configure(HttpSecurity http) throws Exception {
  String secret = environment.getProperty(SECRET_PROPERTY_NAME);
  http    
    // ...
    .addFilter(new JWTAuthorizationFilter(authenticationManager(), secret))
}
```

Try to use any endpoint!

## User informations

In the **controllers**:

```java
Authentication auth = SecurityContextHolder.getContext().getAuthentication();
String name = auth.getName(); //get logged in username

// or

// User = org.springframework.security.core.userdetails.User
User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
String name = user.getUsername(); //get logged in username
```

or injecting directly into our controller:

```java
public String something(Principal principal ) {
    String name = principal.getName(); //get logged in username
}
```

## Using H2 console

Add the following settings to the configuration class:

```java
http
    .authorizeRequests()
        // ...
        .antMatchers("/h2/**").permitAll()
        .and()
    .headers()
        .frameOptions().disable();  // important!
```

## Authentication from database

There are many authentication techniques in `AuthenticationManagerBuilder`. One can use in-memory, JDBC, LDAP and `UserDetailsService` authentication.
We will use JPA for getting user information, and use `UserDetailsService` authentication in our configuration file.

Declare the `User` entity with `username`, `password` and `role`:

```java
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    
    @Column(nullable = false)
    private String username;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private boolean enabled;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;
    
    public enum Role {
        ROLE_GUEST, ROLE_USER, ROLE_ADMIN
    }
}
```

Seed the database with some user data:

```sql
insert into user (username, password, enabled, role) values ('user1', '$2a$04$YDiv9c./ytEGZQopFfExoOgGlJL6/o0er0K.hiGb5TGKHUL8Ebn..', true, 'ROLE_ADMIN');
insert into user (username, password, enabled, role) values ('user2', '$2a$04$YDiv9c./ytEGZQopFfExoOgGlJL6/o0er0K.hiGb5TGKHUL8Ebn..', true, 'ROLE_USER'); 
```

Create a user repository with a `findByUsername` method:

```java
public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);
}
```

Create a `UserDetailsService` implementation:

```java
@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> oUser = userRepository.findByUsername(username);
        if (!oUser.isPresent()) {
            throw new UsernameNotFoundException(username);
        }
        User user = oUser.get();
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(user.getRole().toString()));

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), grantedAuthorities);
    }
}
```

And finally replace the in-memory authentication with the `UserDetailsService` authentication in `WebSecurityConfig`:

```java
@Autowired
private UserDetailsService userDetailsService;

@Autowired
protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth
        .userDetailsService(userDetailsService)
        .passwordEncoder(passwordEncoder());
}
```

## Registering a user

Registering is saving a user into the database if the user does not exist.

In the `UserController` class:

```java
@RestController
@RequestMapping("/users")
public class UserController {
    
  @Autowired
  private BCryptPasswordEncoder passwordEncoder;
  
  @Autowired
  private UserRepository userRepository;
  
  @PostMapping("")
  public ResponseEntity<User> register(@RequestBody User user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setEnabled(true);
    user.setRole(User.Role.ROLE_USER);
    userRepository.save(user);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }
}
```

Allow this endpoint in the configuration class:

```java
http    
  .authorizeRequests()
    .antMatchers(HttpMethod.POST, "/users").permitAll()
    .anyRequest().authenticated()
```

## Securing endpoints

We can use the built-in method of Spring Security to [secure our controller method endpoints](https://www.baeldung.com/spring-security-method-security). Put the following annotation [`@EnableGlobalMethodSecurity`](https://docs.spring.io/spring-security/site/docs/4.2.6.RELEASE/apidocs/org/springframework/security/config/annotation/method/configuration/EnableGlobalMethodSecurity.html) to the `WebSecurityConfig` class:

```java
@EnableGlobalMethodSecurity(securedEnabled = true)
```

This enables the `@Secured` annotations on class methods. To allow access to and endpoint for a user with a `ROLE_USER` role, put the following annotation above the controller method:

```java
@Secured({ "ROLE_USER" })
// or
@Secured({ "ROLE_USER", "ROLE_ADMIN" })
```

