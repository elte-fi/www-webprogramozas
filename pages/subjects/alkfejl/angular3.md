# Angular: HTTP communication

## Server-side improvements

We need to enable Cross-Origin Resource Sharing (CORS) in the REST API. In the simplest cases this can be done in two steps:

1. Annotate the controller classes with the `@CrossOrigin` annotation.

    ```java
    @CrossOrigin
    @RestController
    @RequestMapping("/issues")
    public class IssueController {
        // ...
    }
    ```

2. Indicate CORS handling towards Spring Security in the `WebSecurityConfig` class:

    ```java
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors()
                .and()
            // ...
    }
    ```

## HTTP communication with a REST API

For HTTP communication we will use `HttpClient` from the `HttpClientModule`. First we need to import `HttpClientModule` into our application module (`app.module.ts`):

```js
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  /* ... */
  imports: [
    HttpClientModule,
  ],
})
export class AppModule { }
```

Then we can use `HttpClient` in our service:

```js
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Basic YWRtaW46cGFzc3dvcmQ=', // admin/password
  })
};

@Injectable()
export class IssueService {

  private issueUrl = 'http://localhost:8080/issues';

  constructor(
    private http: HttpClient
  ) { }
}
```

The `http` object has high-level method for sending HTTP request, and can cast the response object into a specific type:

- `get<T>(url, headers)`
- `post<T>(url, body, headers)`
- `put<T>(url, body, headers)`
- `delete<T>(url, headers)`

The return value will be an observable, which can be transformed into a promise:

```ts
getIssue(id: number): Promise<Issue> {
  return this.http.get<Issue>(`${this.issueUrl}/${id}`).toPromise();
}
```

In the caller environment we can use async-await functions to handle the responses:

```js
export class IssueListComponent implements OnInit {

    issues: Issue[];

    constructor(
        private issueService: IssueService
    ) { }

    async ngOnInit() {
        this.issues = await this.issueService.getIssues();
    }
}
```


### Transforming the response

In some cases the response body needs to be transformed to the required format.
If the response is wrapped into an object, then we have to define an interface for the response, and use the `map` method to get the inner data. For example, using Feathers for the REST API, the response of a collection will be put into an object like this:

```js
{
  total: 0,
  limit: 0,
  skip: 0,
  data: []
}
```

The `data` property is what we would like to return, so we have to dig for that:

```js
import 'rxjs/add/operator/map';

interface FeathersResponse<T> {
  total: number,
  limit: number,
  skip: number,
  data: T[]
};

@Injectable()
export class IssueService {
  getIssues(): Promise<Issue[]> {
    return this.http.get<FeathersResponse<Issue>>(this.issueUrl)
      .map(response => response.data)
      .toPromise();
  }
}
```

