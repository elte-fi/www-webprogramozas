# Alkalmazások fejlesztése -- Spring Boot Cheat Sheet

## Getting Started

1. [Spring Initializr](https://start.spring.io/)
    * Generate a **Maven project** with **Java** and Spring Boot **2.0.5**
    * Group: **hu.elte**, Artifact: **FooProject**
    * Dependencies: **JPA, DevTools, H2, Lombok, Web**; Later: **Security**
2. Download project
3. NetBeans &rarr; Open project or Import from zip
4. `pom.xml` &rarr; Run Maven &rarr; Goals &rarr; `spring-boot:run`

## Database

Edit the contents of `src/main/resources/application.properties`.

```
# we set explicitly the database engine
spring.datasource.platform=h2

# make the h2 web console enabled
spring.h2.console.enabled=true

# the path for the h2 web console
spring.h2.console.path=/h2

# we can change the name of the database, in this case it will be called `mydb`
spring.datasource.url=jdbc:h2:mem:mydb

#show sql statement
logging.level.org.hibernate.SQL=debug

#show sql values
logging.level.org.hibernate.type.descriptor.sql=trace
```

Create file `src/main/resources/import.sql` (or `data.sql`). Add your SQL `INSERT`s here.

Further references:

- [Database initialization](https://docs.spring.io/spring-boot/docs/current/reference/html/howto-database-initialization.html)
- [Show Hibernate SQL query](https://www.mkyong.com/spring-boot/spring-boot-show-hibernate-sql-query/)

## Entities

Create new class in `src/main/java/hu/elte/ProjectName/entities`.

```java
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Foo implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;
}
```

### Properties

#### Standard and Date(Time) properties
``` java
@Column(unique = true)
@NotNull
private String propertyX;

@Column
@Temporal(TemporalType.DATE)
private Date date;

@Column
@Temporal(TemporalType.TIME)
private Date time;

@Column
@Temporal(TemporalType.TIMESTAMP)
private Date dateTime;

@Column(updatable = false)
@CreationTimestamp
private LocalDateTime created_at;

@Column
@UpdateTimestamp
private LocalDateTime updated_at;
```

#### One-To-Many relations
```java
// Foo.java
@ManyToOne
@JoinColumn
private Bar bar;

// Bar.java
@JsonIgnore
@OneToMany(mappedBy = "bar")
private List<Foo> foos;
```

One of the two properties must have the `@JsonIgnore` annotation otherwise the JSON response will have circluar references.

#### Many-To-Many relations
```java
// Bar.java
@JsonIgnore
@ManyToMany(mappedBy = "bars")
private List<Foo> foos;

// Foo.java
@ManyToMany
@JoinTable
private List<Bar> bars;
```

One of the two properties must have the `@JsonIgnore` annotation otherwise the JSON response will have circluar references.  
The `@JoinTable` annotation marks the "owner" of the relationship.

## Repositories

Create new interface in `src/main/java/hu/elte/ProjectName/repositories`. 

```java
@Repository
public interface FooRepository extends CrudRepository<Foo, Integer> {
  
}
```

It will give you the necessary CRUD methods for managing the entity towards the database. You can extend the methods by giving appropriate names, or even you can write your own SQL:

```java
@Repository
public interface FooRepository extends CrudRepository<Foo, Integer> {
  // Extra query options
  Foo findByPropertyX(String propertyX);
  Foo findByPropertyXAndPropertyY(String propertyX, String propertyY);
  List<Foo> findAllByPropertyZ(String propertyZ);
  
  @Query("select f.baz from Foo f where f.baz = ?1")
  List<Foo> findBySomething(String baz);
}
```

Other query options available: [https://tinyurl.com/jpaquery](https://tinyurl.com/jpaquery)

## Controllers

Create new class in `src/main/java/hu/elte/ProjectName/controllers`. 

```java
@RestController
@RequestMapping("foos")
public class FooController {
  @Autowired
  private FooRepository fooRepository;
}
```

### Endpoints

```java
@GetMapping("")
public ResponseEntity<Iterable<Foo>> getAll() {}

@GetMapping("/{id}")
public ResponseEntity<Foo> get(@PathVariable Integer id) {}

@PostMapping("")
public RepsonseEntity<Foo> post(@RequestBody Foo foo) {}

@DeleteMapping("/{id}")
public ResponseEntity delete(@PathVariable Integer id) {}

@PutMapping("/{id}")
public ResponseEntity<Foo> put(@PathVariable Integer id, @RequestBody Foo foo) {}
```

