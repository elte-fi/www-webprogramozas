# Angular: Authentication

## Tasks

1. Try the security features of your REST API with a REST client!
2. Introduce an auth service with the necessary properties.
3. Use this information to update the navigation bar.
4. Protect endpoints with route guards.
5. Create a login page and a serverless fake login logic.
6. Connect your login logic to the REST API.
7. Introduce role-based authorization.

## 1. REST API

Use a REST client. The authentication method may be one of the followings:

- HTTP Basic
- Token-based authentication (Laravel Sanctum, JWT)
- Session-based authentication (Laravel Sanctum + Laravel Fortify)

## 2. Auth service

Authentication related data and methods will be encapsulated in an authentication service, e.g. `auth.service.js`. Generate it with:

```sh
npm run ng generate service auth
```

Data properties:

- `isLoggedIn`: boolean value for the state of the login
- `user`: the user object (a `User` class is needed)
- `token`: the authentication token
- `redirectUrl`: storing the URL of the protected page where the application was redirected from to the login page (optional).

Methods:

- `login(username: string, password: password)`
- `logout()`

We can store the **access token** in the `localStorage` store of the browser.

```js
window.localStorage.setItem("token", token);
window.localStorage.getItem("token");
window.localStorage.removeItem("token");
```

The access token should be sent with HTTP request in the `Authorization` header:

```ts
export const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0...",
    "X-Requested-With": "XMLHttpRequest",
  }),
};
```

## 3. Navigation bar

Switch menu items according to the login state in `app.component.html`. The `AuthService` needs to be injected to the class.

```html
<ul class="navbar-nav mr-auto" *ngIf="authService.isLoggedIn">
  <li class="nav-item">
    <a class="nav-link" routerLink="/issues">List issues</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" routerLink="/issues/new">New issue</a>
  </li>
  <li class="nav-item">
    <button class="btn btn-link nav-link" (click)="logout()">Logout</button>
  </li>
</ul>
<span class="navbar-text" *ngIf="authService.isLoggedIn">
  Hello, {{ authService.user.username }}!
</span>
<ul class="navbar-nav mr-auto" *ngIf="!authService.isLoggedIn">
  <li class="nav-item">
    <a class="nav-link" routerLink="/login">Login</a>
  </li>
</ul>
```

## 4. Protecting endpoints with route guards

To protect endpoints, use route guards during routing.

```sh
npm run ng generate guard auth
```

In the `auth.guard.js` check if the user is logged in and let him/her navigate to the page by returning true, or if it is not the case, then navigate the browser to the login page.

```js
canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

  if (this.authService.isLoggedIn) {
    return true;
  }

  this.authService.redirectUrl = state.url;
  this.router.navigate(['/login']);
  return false;
}
```

In `routing.module.ts` protect the endpoints with the `canActivate` attribute:

```js
{
  path: 'issues',
  component: IssueListComponent,
  canActivate: [AuthGuard]
}
```

## 5. Login form

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <div *ngIf="message">{{ message }}</div>

  <div class="form-group">
    <label for="username">Username</label>
    <input
      type="text"
      class="form-control"
      id="username"
      placeholder="Username"
      required
      formControlName="username"
      [class.is-invalid]="username.invalid && (username.dirty || username.touched)"
    />
    <div class="invalid-feedback">Please provide a username!</div>
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input
      type="password"
      class="form-control"
      id="password"
      placeholder="Password"
      required
      formControlName="password"
      [class.is-invalid]="password.invalid && (password.dirty || password.touched)"
    />
    <div class="invalid-feedback">Please provide a password!</div>
  </div>

  <button type="submit" class="btn btn-primary" [disabled]="form.invalid">
    Submit
  </button>
</form>
```

Show a message above the form about the status of the login process. After a successful submission navigate the browser to the `redirectUrl` or to the main page:

```js
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  message: string;

  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }

  ngOnInit() { }

  async onSubmit() {
    try {
      await this.authService.login(this.username.value, this.password.value);
      if (this.authService.redirectUrl) {
        this.router.navigate([this.authService.redirectUrl]);
      } else {
        this.router.navigate(['/']);
      }
    }
    catch(e) {
      this.message = 'Cannot log in!'
    }
  }

}
```

## 6. Authenticating with the REST API

`auth.service.ts`

```ts
async login(username: string, password: string): Promise<User> {
  try {
    this.token = btoa(`${username}:${password}`);
    const user = await this.http.post<User>(`${this.authUrl}/login`, {}, httpOptions).toPromise();
    this.isLoggedIn = true;
    this.user = user;
    return Promise.resolve(this.user);
  } catch (e) {
    console.log(e);
    return Promise.reject();
  }
}

logout() {
  this.token = '';
  this.isLoggedIn = false;
  this.user = null;
}
```

## 7. HTTP interceptor for sending the token

Angular makes it possible to intercept the HTTP process and change the HTTP headers on demand. In our case we need to include the necessary authentication token. For this create a new class:

```sh
npx ng generate class AuthInterceptor
```

```ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Basic ${authService.token}`,
      },
    });
    return next.handle(request);
  }
}
```

In the `app.module` register the new interceptor:

```ts
@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
})
```

[Medium article](https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8)

## 8. Role based authorization

In `routing.module.ts` add a `data` attribute to the desired route:

```ts
{
  path: 'issues/:id/edit',
  component: IssueEditComponent,
  canActivate: [AuthGuard],
  data: {
    roles: ['ROLE_ADMIN']
  }
}
```

You can get access to this information in the route guard, and can build custom logic on it:

```ts
canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

  if (this.authService.isLoggedIn) {
    if (next.data.roles && next.data.roles.includes(this.authService.user.role)) {
      return true;
    } else {
      console.log('No permission');
      return false;
    }
  }
  this.authService.redirectUrl = state.url;
  this.router.navigate(['/login']);
  return false;
}
```
