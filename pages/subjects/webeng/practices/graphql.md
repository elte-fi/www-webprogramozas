# GraphQl

## Tasks

1. Get one issue by id in your Angular application from a GraphQL server.

    - a. Follow [this tutorial](https://www.graphql-java.com/tutorials/getting-started-with-spring-boot/), apply the [necessary changes](#!/subjects/webeng/practices/graphql#server), and create a GraphQL server in your Spring Boot Java application!
    - b. Try out the server with a REST client!
    - c. Follow [this tutorial](https://www.apollographql.com/docs/angular/basics/setup), apply the [necessary changes](#!/subjects/webeng/practices/graphql#angular-client), and select an issue by id from the GraphQL server in your issue service!

2. Select all issues from the GraphQL server!

3. Create an issue through a GraphQL mutation!


## GraphQL

[GraphQL](https://graphql.org/) tries to solve the drawbacks of REST APIs. It has a [great documentation](https://graphql.org/learn/).

> GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.


## Get one issue

### Server

`pom.xml`

```xml
<!-- https://mvnrepository.com/artifact/com.graphql-java/graphql-java -->
<dependency>
    <groupId>com.graphql-java</groupId>
    <artifactId>graphql-java</artifactId>
    <version>2019-05-01T03-50-43-fccc0c7</version>
</dependency>
<!-- https://mvnrepository.com/artifact/com.graphql-java/graphql-java-spring-boot-starter-webmvc -->
<dependency>
    <groupId>com.graphql-java</groupId>
    <artifactId>graphql-java-spring-boot-starter-webmvc</artifactId>
    <version>2019-04-23T07-27-41-612d644</version>
</dependency>
<!-- https://mvnrepository.com/artifact/com.google.guava/guava -->
<dependency>
    <groupId>com.google.guava</groupId>
    <artifactId>guava</artifactId>
    <version>27.1-jre</version>
</dependency>
```

`MultipleEntryPointsSecurityConfig.java`

```java
@Configuration
@Order(1)
public static class GraphQLSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.antMatcher("/graphql")
            .csrf().disable()
            .authorizeRequests().anyRequest().permitAll();
    }

}
```

`schema.graphqls`

```
type Query {
  issueById(id: Int): Issue
}

type Issue {
  id: Int
  title: String
  description: String
  place: String
  status: String
  created_at: String
  user: User
}

type User {
  id: Int
  username: String
  role: String
}
```

`GraphQLProvider.java`

```java
private RuntimeWiring buildWiring() {
    return RuntimeWiring.newRuntimeWiring()
            .type(newTypeWiring("Query")
                    .dataFetcher("issueById", graphQLDataFetchers.getIssueByIdDataFetcher())
            )
            .type(newTypeWiring("Issue")
                    .dataFetcher("user", graphQLDataFetchers.getUserDataFetcher())
            )
            .build();
}
```

`GraphQLDataFetchers.java`

```java
@Component
public class GraphQLDataFetchers {

    @Autowired
    private IssueRepository issueRepository;
    
    public DataFetcher getIssueByIdDataFetcher() {
        return dataFetchingEnvironment -> {
            Integer issueId = dataFetchingEnvironment.getArgument("id");
            Optional<Issue> oIssue = issueRepository.findById(issueId);
            return oIssue.isPresent() ? oIssue.get() : null;
        };
    }

    public DataFetcher getUserDataFetcher() {
        return dataFetchingEnvironment -> {
            Issue issue = dataFetchingEnvironment.getSource();
            return issue.getUser();
        };
    }
}
```

### HTTP requests

With e.g. Advanced REST Client in Chrome.

```
POST http://localhost:8080/graphql
```

```
{
	"query": "{ issueById(id: 1) { id title description place status user { username role } } }"
}
```

```
{
	"query": "query($id: Int){ issueById(id: $id) { id title description place status user { username role } } }",
  "variables": { "id": 3 }
}
```

### Angular client

`issue.service.ts`

```ts
interface IssueResult {
  issueById: Issue
}
@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private issueUrl = '/api/issues';

  constructor(
    private http: HttpClient,
    private apollo: Apollo
  ) { }

  getIssueFromGraphQL(id: number) {
    return this.apollo.query<IssueResult>({
      query: gql`
        query($id: Int) { 
          issueById(id: $id) { 
            id 
            title 
            description 
            place 
            status 
            created_at
            user { 
              username 
              role 
            } 
          } 
        }
      `,
      variables: {
        id 
      }
    }).toPromise();
  }
}
```

`issue-detail.component.ts`

```ts
async ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.id = +id;
    this.issue = (await this.issueService.getIssueFromGraphQL(this.id)).data.issueById;
  }
}
```

`proxy.conf.json`

```json
{
    "/graphql": {
        "target": "http://localhost:8080",
        "secure": false
    }
}
```


## Mutations

`schema.graphqls`

```
type Mutation {
  createIssue(issue: IssueInput): Issue
}

input IssueInput {
  title: String
  description: String
  place: String
  status: String
}
```

`GraphQLProvider.java`

```java
private RuntimeWiring buildWiring() {
    return RuntimeWiring.newRuntimeWiring()
            // ...
            .type(newTypeWiring("Mutation")
                    .dataFetcher("createIssue", graphQLDataFetchers.getIssueCreatorDataFetcher())
            )
            .build();
}
```

`GraphQLDataFetchers.java`

```java
@Component
public class GraphQLDataFetchers {

    // ...
    
    public DataFetcher getIssueCreatorDataFetcher() {
        return dataFetchingEnvironment -> {
            Map<String, Object> issueInputMap = dataFetchingEnvironment.getArgument("issue");
            Issue issue = new Issue();
            issue.setTitle(issueInputMap.get("title").toString());
            issue.setDescription(issueInputMap.get("description").toString());
            issue.setStatus(Issue.Status.valueOf(issueInputMap.get("status").toString()));
            issue.setPlace(issueInputMap.get("place").toString());
            return issueRepository.save(issue);
        };
    }
}
```

HTTP requests

```
{
	"query": "mutation($issue: IssueInput){ createIssue(issue: $issue) { id, title, description, created_at } }",
    "variables": {
      "issue": {
        "title": "new issue",
        "description": "well well well",
        "place": "PC12",
        "status": "NEW"
      }
    }
}
```
