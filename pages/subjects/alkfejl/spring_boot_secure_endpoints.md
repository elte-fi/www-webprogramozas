# Alkalmazások fejlesztése -- REST API: securing endpoints (authentication and authorization)

## Table of contents

1. Preparing the lesson
2. Concepts
3. Configuration
4. Authentication flow
6. Database authentication

## Goals

- In the current state the endpoints of the REST API is public, so anyone can use it, not only for reading, but modifying as well.
- We need to protect our REST API by allowing reading and writing only for those who identify themselves and have the appropriate rights to access the specific endpoint.

## Securing a REST API in Spring Boot

### Concepts

We will use *Spring Security* for securing our application. It provides different types of authentication and authorization, but in this case we will use the so-called HTTP Basic authentication method. This is part of the HTTP standard, all the necessary information is transferred in HTTP headers. In this case we need to send an `Authorization` header with username and password encoded in base64 in `username:password` format:

```txt
Authorization: Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0...
```

Spring Security intercepts the server process and should check two things:

1. The username and password pair is a valid credential. (authentication)
2. The authenticated user has rights to access the required resource. (authorization)

In a REST API the authentication process should be stateless, so neither sessions, nor cookies are stored during the process. On the other side, on every request the credentials should be validated, which gives pressure on the authentication service (e.g. on the database).

A much better solution would be using Json Web Tokens (JWT). In this case, after the authentication, a token is generated and sent to the client. From here, the client sends this token in every request, and the server needs to check only the validity of the token and its content, which may contain several useful informations, like roles, etc. However, while HTTP Basic is well supported by Spring Security, there is no easy solution to integrate JWT authentication into the security workflow. 

### Configuration

Add the following dependency to the `pom.xml`:

```java
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

If you try out the REST API, you can see that it creates a popup window asking for username and password. The [default settings](https://docs.spring.io/spring-security/site/docs/4.2.3.RELEASE/reference/htmlsingle/#hello-web-security-java-configuration) will give a lot of security implications.

You will also need a `WebSecurityConfig.java` configuration class, where we can affect the security processes with overriding some important methods. Just put it beside the main application class or create a separate `security` package for the files responsible for the security features. The basic structure is:

```java
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
    
    }    

    @Autowired
    protected void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

### Adding a default in-memory user

In this configuration class add the following to the `configureGlobal` method (user/password credentials):

```java
@Autowired
protected void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    auth
        .inMemoryAuthentication()
        .withUser("user").password("$2a$04$YDiv9c./ytEGZQopFfExoOgGlJL6/o0er0K.hiGb5TGKHUL8Ebn..").roles("USER");
}
```

### Fine-tuning the security process

The [`HttpSecurity`](https://docs.spring.io/spring-security/site/docs/current/apidocs/org/springframework/security/config/annotation/web/builders/HttpSecurity.html) class is responsible for specifying the security flow. The following are the default settings:

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

In our case:

- we do not need form login
- CSRF token checking is not necessary
- we would like to secure every endpoint
- CORS should be activated
- HTTP Basic authentication is needed
- we do not need sessions

```java
http
    .cors()
        .and()
    .csrf().disable()
    .authorizeRequests()
        .anyRequest().authenticated()
        .and()
    .httpBasic()
        .and()
    .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
```

Now if you try it in your REST client, it will give you a pop-up window, where you can fill out the username and password fields. For valid credentials you will get `200 OK`, for wrong credentials it you will see a `Not authenticated` or `Forbidden` error status for the secured endpoints!

In a real application you have to provide the credentials in HTTP header in [base64 format](http://www.utilities-online.info/base64):

```
Authorization: Basic dXNlcjI6cGFzc3dvcmQ=
```

For further refinements we can specify different rules for different endpoints using the `antMatchers()` method, as you can see in the following example:

```java
http
    .authorizeRequests()
        .antMatchers("/admin/**").hasRole("ADMIN")
        .antMatchers("/**").hasRole("USER");
```

### Configure authentication entry point (optional)

Though it works without it, it is recommended to set up an entry point if authentication fails to avoid redirects to a login form which is not adequate in case of REST APIs.

In `WebSecurityConfig` class modify the `configure` method and add a bean:

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
    http
        .cors()
            .and()
        .csrf().disable()
        .authorizeRequests()
            .antMatchers("/tasks/**").authenticated()//.hasRole("USER")
            .and()
        .httpBasic()
            .authenticationEntryPoint(getBasicAuthEntryPoint())
            .and()
        .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
}

@Bean
public CustomBasicAuthenticationEntryPoint getBasicAuthEntryPoint(){
    return new CustomBasicAuthenticationEntryPoint();
}
```

Create a `CustomBasicAuthenticationEntryPoint.java` file in the `security` package with the following content:

```java
public class CustomBasicAuthenticationEntryPoint extends BasicAuthenticationEntryPoint {
 
    @Override
    public void commence(final HttpServletRequest request, 
            final HttpServletResponse response, 
            final AuthenticationException authException) throws IOException, ServletException {
        //Authentication failed, send error response.
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.addHeader("WWW-Authenticate", "Basic realm=" + getRealmName() + "");
         
        PrintWriter writer = response.getWriter();
        writer.println("HTTP Status 401 : " + authException.getMessage());
    }
     
    @Override
    public void afterPropertiesSet() throws Exception {
        setRealmName("MY REALM");
        super.afterPropertiesSet();
    }
}
```

### Securing endpoints

We will use the built-in method of Spring Security to [secure our controller method endpoints](https://www.baeldung.com/spring-security-method-security). Put the following annotation [`@EnableGlobalMethodSecurity`](https://docs.spring.io/spring-security/site/docs/4.2.6.RELEASE/apidocs/org/springframework/security/config/annotation/method/configuration/EnableGlobalMethodSecurity.html) to the `WebSecurityConfig` class:

```java
@EnableGlobalMethodSecurity(securedEnabled = true)
```

This enables the `@Secured` annotations on class methods. To allow access to and endpoint for a user with a `ROLE_USER` role, put the following annotation above the controller method:

```java
@Secured({ "ROLE_USER" })
// or
@Secured({ "ROLE_USER", "ROLE_ADMIN" })
```

### Using H2 console

```java
http
    .cors()
        .and()
    .csrf().disable()
    .authorizeRequests()
        .antMatchers("/h2/**", "/users/register").permitAll()   // important!
        .anyRequest().authenticated()
        .and()
    .httpBasic()
        .and()
    .headers()      // important!
        .frameOptions().disable()
        .and()
    .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
```

### Authentication from database

There are many authentication techniques in `AuthenticationManagerBuilder`. One can use in-memory, JDBC, LDAP and UserDetailsService authentication.
We will use JPA for getting user information, and use UserDetailsService authentication in our configuration file.

Declare the `User` entity with username, password and role:

```java
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
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
    Optional<User> findByUsername(String username);
}
```

Create a `UserDetailsService` implementation in `security/MyUserDetailsService.java` file:

```java
@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
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

And finally in `WebSecurityConfig.java` change the authentication service to the UserDetailsService:

```java
@Autowired
private UserDetailsService userDetailsService;

@Autowired
protected void configureAuthentication(AuthenticationManagerBuilder auth) throws Exception {
    auth
        .userDetailsService(userDetailsService)
        .passwordEncoder(passwordEncoder());
}
```

### Registering and login a user

Registering is saving a user into the database if the user does not exist. The login endpoint is authenticated by Spring Security with HTTP Basic (user credential in the HTTP header), so if we reach the endpoint, that means, we gave the right credentials in HTTP headers.

In the `UserController` class:

```java
@Autowired
private BCryptPasswordEncoder passwordEncoder;
    
@PostMapping("register")
public ResponseEntity<User> register(@RequestBody User user) {
    Optional<User> oUser = userRepository.findByUsername(user.getUsername());
    if (oUser.isPresent()) {
        return ResponseEntity.badRequest().build();
    }
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setEnabled(true);
    user.setRole(User.Role.ROLE_USER);
    return ResponseEntity.ok(userRepository.save(user));
}

@PostMapping("login")
public ResponseEntity login(@RequestBody User user) {
    return ResponseEntity.ok().build();
} 
```

## Get the authenticated user in the controller

There are [three ways](https://www.baeldung.com/get-user-in-spring-security) to achieve getting the logged in user information.

### Principal as a method argument

Asking for the principal as a method argument:

```java
public String currentUserName(Principal principal) {
    String username = principal.getName();
}
```

### Authentication as a method argument

Authentication token provides more details:

```java
public String currentUserName(Authentication authentication) {
    String username = authentication.getName();
    String role = auth.getAuthorities().iterator().next().getAuthority(); // the first role
}
```

### From HTTP request

```java
public String currentUserNameSimple(HttpServletRequest request) {
    String username = request.getUserPrincipal().getName();
}
```

## Storing the authenticated user during request

To avoid multiple retrieval of the user object by username, we can store the selected user object during authentication into a request-scoped bean, and use it in the controllers. For this, create an `AutenticatedUser` class in the security package:

```java
@RequestScope
@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticatedUser {
    private User user;
}
```

`@Component` will make it a bean, which can be injected to other classes through `@Autowired`, and `@RequestScope` will make it alive during only the lifetime of a request.

Now save the autheinticated user in `MyUserDetailsService` class:

```java
@Autowired 
private AuthenticatedUser authenticatedUser;

public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    // ...
    User user = oUser.get();
    authenticatedUser.setUser(user);
    // ...
}
```

And use it in the controller methods:

```java
@Autowired 
private AuthenticatedUser authenticatedUser;

public ResponseEntity<Iterable<Issue>> getAll() {
    User user = authenticatedUser.getUser();
}
```


## References

- [Spring Security reference](https://docs.spring.io/spring-security/site/docs/4.2.3.RELEASE/reference/htmlsingle/)
- [Spring Security architecture](https://spring.io/guides/topicals/spring-security-architecture/)
- [Spring Boot REST API with HTTP basic authentication](http://websystique.com/spring-security/secure-spring-rest-api-using-basic-authentication/#)
- [JWT authentication in Spring Security](https://auth0.com/blog/implementing-jwt-authentication-on-spring-boot/)


<!-- 
http basic
[](https://www.devglan.com/spring-security/spring-boot-security-rest-basic-authentication)
[](https://octoperf.com/blog/2018/03/08/securing-rest-api-spring-security/)
[](http://ryanjbaxter.com/2015/01/06/securing-rest-apis-with-spring-boot/)

JWT
[](https://auth0.com/blog/implementing-jwt-authentication-on-spring-boot/)
[](https://www.toptal.com/java/rest-security-with-jwt-spring-security-and-java)
[](https://www.callicoder.com/spring-boot-spring-security-jwt-mysql-react-app-part-2/)
[](https://docs.spring.io/spring-security/site/docs/5.0.2.RELEASE/api/org/springframework/security/access/annotation/Secured.html)
[](https://docs.spring.io/spring-security/site/docs/5.0.2.RELEASE/reference/htmlsingle/#jc-authentication-userdetailsservice)
[](https://medium.com/@xoor/jwt-authentication-service-44658409e12c)
[](https://medium.com/omarelgabrys-blog/microservices-with-spring-boot-authentication-with-jwt-part-3-fafc9d7187e8)
[](https://medium.com/@nydiarra/secure-a-spring-boot-rest-api-with-json-web-token-reference-to-angular-integration-e57a25806c50)
[](https://github.com/szerhusenBC/jwt-spring-security-demo)
[](https://docs.spring.io/spring-security/site/docs/3.0.x/reference/security-filter-chain.html)


 -->