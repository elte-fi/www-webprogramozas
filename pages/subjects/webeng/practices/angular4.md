# Angular: Authentication

## Tasks

1. Secure the REST API!
2. Introduce an auth service with the necessary properties.
3. Use this information to update the navigation bar.
4. Protect endpoints with route guards.
5. Create a login page and a serverless fake login logic.
6. Connect your login logic to the REST API.
7. Introduce role-based authorization.


## 1. Securing the REST API

- WebSecurityConfig httpBasic metódusa
- @Secured használata
- User információk lekérdezése
- login metódus kell még!


## 2. Auth service

https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
https://medium.com/nuculabs/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
https://angular.io/api/common/http/HttpInterceptor#description

Authentication related data and methods will be encapsulated in an authentication service, e.g. `auth.service.js`. Generate it with:

```sh
npm run ng generate service auth
```

Data properties:

- `isLoggedIn`: boolean value for the state of the login
- `user`: the user object (a `User` class is needed)
- `redirectUrl`: storing the URL of the protected page where the application was redirected from to the login page (optional).

Methods:

- `login(username: string, password: password)`
- `logout()`

We can store the **access token** in the `localStorage` store of the browser.

```js
window.localStorage.setItem('token', token);
window.localStorage.getItem('token');
window.localStorage.removeItem('token');
```

The access token should be sent with HTTP request in the `Authorization` header:

```js
private httpOptions() {
  const headers = { 'Content-Type': 'application/json' };
  if (window.localStorage.getItem('token')) {
    headers['Authorization'] = window.localStorage.getItem('token');
  }
  return {
    headers: new HttpHeaders(headers)
  };
}
```

But for simple scenarios we can store it in-memory in a JavaScript object and import it into the necessary modules:

```ts
export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''
  })
};

// Later
httpOptions.headers = httpOptions.headers.set('Authorization', `Basic ${token}`);
```

## 3. Navigation bar

Switch menu items according to the login state in `app.component.html`. The `AuthService` needs to be injected to the class.

```html
<div *ngIf="authService.isLoggedIn">
  <button mat-button routerLink="/issues">My issues</button>
  <button mat-button routerLink="/issues/add">New issues</button>
  <span>Hello, {{ authService.user.username }}!</span>
  <button mat-button (click)="logout()">Logout</button>
</div>
<div *ngIf="!authService.isLoggedIn">
  <button mat-button routerLink="/login">Login</button>
</div>
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

  <div *ngIf="message">
    {{ message }}
  </div>

  <mat-form-field>
    <input matInput placeholder="Username" formControlName="username" required>
    <mat-error *ngIf="username.invalid">Username is required</mat-error>
  </mat-form-field>

  <mat-form-field>
    <input matInput placeholder="Password" formControlName="password" required [type]="hidePassword ? 'password' : 'text'">
    <mat-icon matSuffix (click)="hidePassword = !hidePassword">{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
    <mat-error *ngIf="password.invalid">Password is required</mat-error>
  </mat-form-field>

  <div>
    <button mat-flat-button type="submit" color="primary" [disabled]="form.invalid">Mentés</button>
  </div>
</form>
```

Show a message above the form about the status of the login process. After a successful submission navigate the browser to the `redirectUrl` or to the main page:

```js
message: string;
hidePassword = true;

constructor(
  private authService: AuthService,
  private router: Router
) { }
// ...
async onSubmit() {
  try {
    this.message = null;
    await this.authService.login(this.username.value, this.password.value);
    if (this.authService.redirectUrl) {
      this.router.navigate([this.authService.redirectUrl]);
    } else {
      this.router.navigate(['/']);
    }
  } catch (e) {
    this.message = 'Cannot log in!';
  }
}
```

## 6. Authenticating with the REST API

```ts
async login(username: string, password: string): Promise<User> {
  try {
    const token = btoa(`${username}:${password}`);
    httpOptions.headers = httpOptions.headers.set('Authorization', `Basic ${token}`);
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
  httpOptions.headers = httpOptions.headers.set('Authorization', ``);
  this.isLoggedIn = false;
  this.user = null;
}
```

## 7. Role based authorization

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
