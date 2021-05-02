# Angular: HTTP communication

## Tasks

1. Before using the REST API from the client, [read about the different solutions on handling asynchrony in JavaScript](#!/subjects/webeng/practices/async).
2. Manage issues from the REST API in the issue service!
   - a. Add `HttpClientModule` to the client-side application, and use for sending HTTP request towards the server!
   - b. Get issues from the REST API, and so on!
   - c. Get one issue from the REST API!
   - d. Create a new issue on the server from the service.
   - e. Modify an issue!
   - f. Delete an issue!

## HTTP communication with a REST API

For HTTP communication we will use `HttpClient` from the `HttpClientModule`. First we need to import `HttpClientModule` into our application module (`app.module.ts`):

```js
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  /* ... */
  imports: [HttpClientModule],
})
export class AppModule {}
```

Then we can use `HttpClient` in our service:

```js
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  })
};

@Injectable()
export class FooService {

  private fooUrl = '/api/foos';

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
getFoo(id: number): Promise<Foo> {
  return this.http.get<Foo>(`${this.fooUrl}/${id}`).toPromise();
}
```

In the caller environment we can use async-await functions to handle the responses:

```js
export class FooListComponent implements OnInit {

    foos: Foo[];

    constructor(
        private fooService: FooService
    ) { }

    async ngOnInit() {
        this.foos = await this.fooService.getFoos();
    }
}
```

### Setting up a proxy to prevent CORS issues

CORS:

![](https://juristr.com/blog/assets/imgs/ngdevserver-noproxy.png)

Using proxy:

![](https://juristr.com/blog/assets/imgs/ngdevserver-proxy.png)

1. Create a file `proxy.conf.json` in the `src/` folder.

2. Add the following content to the new proxy file:

   ```json
   {
     "/api": {
       "target": "http://localhost:8080",
       "secure": false
     }
   }
   ```

3. In the CLI configuration file, `angular.json`, add the `proxyConfig` option to the serve target:

   ```json
   ...
   "architect": {
     "serve": {
       "builder": "@angular-devkit/build-angular:dev-server",
       "options": {
         "browserTarget": "your-application-name:build",
         "proxyConfig": "src/proxy.conf.json"    // important!
       },
   ...
   ```

References:

- [Official guide](https://angular.io/guide/build#proxying-to-a-backend-server)
- [Another tutorial](https://juristr.com/blog/2016/11/configure-proxy-api-angular-cli/)

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
import "rxjs/add/operator/map";

interface FeathersResponse<T> {
  total: number;
  limit: number;
  skip: number;
  data: T[];
}

@Injectable()
export class IssueService {
  getIssues(): Promise<Issue[]> {
    return (
      this.http.get <
      FeathersResponse <
      Issue >> this.issueUrl.map((response) => response.data).toPromise()
    );
  }
}
```
