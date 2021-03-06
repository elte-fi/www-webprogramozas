# Angular: installation, generating HTML, using CSS framework, components, routing -- Web engineering

## Tasks

We will create the issue tracker application in a client-side framework. In this lessons we will install the framework, and create a clickable HTML mockup for the basic pages. We will meet components as well.

1. Install and start a new Angular application (see. section 1. and 2.)
2. Install Twitter Bootstrap for CSS styling and components (see section 7.1.)
3. Create a navigation bar at the top of the page (see section 7.2.)
4. Add content to the page and organize them into components (see section 7.3 and 7.4)
5. Introduce routing, and put the components onto different pages under different endpoints (see section 7.5)

## 1. Preparation

[Angular][1] is a component-based framework for creating client-side web applications.

We need at least [Node.js][3] 8.0 and NPM 5.2. The following commands help checking the installed versions:

```sh
> node -v
v10.11.0
> npm -v
6.4.1
```

## 2. Installation

```sh
# create a new application
npx -p @angular/cli ng new my-application-name
# Routing: yes
# Stylesheet format: CSS
## go into the app directory
cd my-application-name
```

This will create the folder structure of the new application, installs the compile-time and runtime dependencies, and create a local git repository for the version control of the code.

You can start the newly generated application with:

```sh
npm start
```

## 3. Usage

After installation the [Angular command line interface][2] (Angular CLI) can be used with the `ng` command. Since it is installed locally to the project, it is configured to be used through npm scripts, so we can call it with `npx ng` as well. In the following we will use this longer but more accessible version.

The available `ng` commands are listed after calling `npx ng help`.

The installed application is a working starter application, and we can start it with `npx ng serve` or `npm start` (which is an alias for `ng serve`). A development server starts, and we can access our new application on [http://localhost:4200][6] in the browser. From now the development environment watches the file changes, and the appropriate codes will be compiled and refreshed in the browser.

We can use the Angular CLI to generate different types of code for us with the `npx ng generate <type> <name>` command.

### 3.1. Folder structure

The [default folder structure][4] ensures a `src/app` folder, which contains the source code of the application. It is up to us how to structure the source code here, but it is advisable to put the different part of the application into separate folders (e.g. `components`, `modules`, `services`). The Angular CLI will create folders when we use it to generate different types of code.

## 4. Angular philosophy

Angular has a [very good documentation](https://angular.io/guide/quickstart) and a very detailed [tutorial](https://angular.io/tutorial).

In Angular we build up our application from components, which are independent and isolated from each other, and thus they can be reusable for example in other projects.

## 5. Components

```sh
npx ng generate component <name>
```

A component is usually built up from three files, following the naming convention below, where `<name>` is the name of the component:

- `<name>.component.ts`
- `<name>.component.html`
- `<name>.component.css`

The business login sits in the TypeScript file, the template of the component is in the `.html` file, and the well-isolated styles of the component is located in the css file. This isolation makes the component reusable.

### 5.1. Static components

A component is static if its class definition is stateless, its template does not interpolate time-varying data.

#### 5.1.1. Example

my-component.component.ts

```ts
@Component({
  selector: "my-component",
  templateUrl: "my-component.component.html",
  styleSheets: ["my-component.component.css"],
})
class MyComponent {}
```

my-component.component.html

```html
<h1>It works!</h1>
```

### 5.2. Dynamic components

In contrast, the state, and thus the appearance of a dynamic component, may change over time.

#### 5.2.1. Example

my-component.component.ts

```ts
@Component({
  selector: "my-component",
  templateUrl: "my-component.component.html",
  styleSheets: ["my-component.component.css"],
})
class MyComponent {
  private _greetings: string[];
  private greeting: string;
  private _index: number;

  constructor() {
    this._greetings = [
      "Jó reggelt!",
      "Good morning!",
      "Guten tag!",
      "Buenos dias!",
    ];
    this._index = 0;

    this._tick();
  }

  private _tick(): void {
    this.greeting = this._greetings[this._index];

    if (this._index + 1 < this._greetings.length) {
      ++this._index;
    } else {
      this._index = 0;
    }

    setTimeout(this._tick.bind(this), 1000);
  }
}
```

my-component.component.html

```html
<h1>{{ greeting }}</h1>
```

## 6. Development method (in this course)

We will proceed layer by layer from the frontend to the backend. The planned steps are the following:

1. Generating HTML output with components, styling the components, using Bootstrap, basic navigation with routing
2. Introducing and displaying data from the components, handling events, component composition
3. Form processing
4. Service layers
5. Handling asynchrony, REST layers
6. Authentication and authorization

## 7. Steps for building the UI

In this example we will make a main page, a list page for the issues, a page for showing the details and messages of one issue, and a page for adding a new issue. Basically we need to do 3 things:

- Design the pages with HTML and CSS
- Make components for each page
- Introduce routing for navigation (done by the installer)

First we can work in the `app.component.html`. We can design the main page and another page (e.g. the listing one) and put one under the other. For the design we have many options:

- [Twitter Bootstrap][9] for the grid system and common components
- [ng-bootstrap][15] for Bootstrap-compatible smart components (to avoid using jQuery)
- [Material UI][7] for common components
- [`flex-layout`][8] for grid system
- [Bulma][10] for the grid system and common components

The most Angular-ish way would use Material UI and flex-layout. But now we will use Bootstrap for CSS and ng-bootstrap for components.

### 7.1. Styling

A component can be styled in the `*.component.css` file. Those CSS rules are separated from the other components. If you would like to use global styles, then we can introduce them in `app/style.css`.

#### 7.1.1. Bootstrap

**Option 1.** Use the CDN source. In `style.css` put the following import statement:

```css
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
```

**Option 2.** Install Bootstrap, and include it via `.angular-cli.json` file:

```sh
npm install --save bootstrap
```

`.angular-cli.json`

```json
"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.min.css",
  "styles.css"
],
```

**Option 3.** Use the [ngx-bootstrap][11] library.

**Option 4.** Include `bootstrap.js` and `jquery.js` either in `.angular-cli.json` or `index.html`. But this can be risky.

#### 7.1.2. ng-bootstrap

Follow the [guide](https://ng-bootstrap.github.io/#/getting-started).

```sh
npm install --save @ng-bootstrap/ng-bootstrap
```

In `app.module.ts` add the following imports:

```ts
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; // <-- this

@NgModule({
  declarations: [AppComponent, ...],
  imports: [NgbModule, ...],                // <-- this
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

### 7.2. Navigation bar

You can use the following code for creating a basic navigation bar in `app.component.html`:

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Issue tracker</a>
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="#">List issues</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">New issue</a>
      </li>
    </ul>
  </div>
</nav>
```

Optionally, add the following property to `app.component.ts` to make the navigation bar collapse:

```ts
export class AppComponent {
  isCollapsed = true;
}
```

Modify `app.component.html` with these changes:

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Issue tracker</a>
  <button
    class="navbar-toggler"
    type="button"
    (click)="isCollapsed = !isCollapsed"
  >
    <span class="navbar-toggler-icon"></span>
  </button>

  <div
    class="collapse navbar-collapse"
    id="navbarSupportedContent"
    [ngbCollapse]="isCollapsed"
  >
    <!-- ... -->
  </div>
</nav>
```

### 7.3. Add content to the main page

You can find some HTML mockups for the main page, the listing page, and the new issue page below, and put them into `app.component.html` under each other. Now you have three functionalities in one page.

`index.html`

```html
<div class="jumbotron">
  <div class="container">
    <h1 class="display-4">Issue tracker</h1>
    <p class="lead">Submit issues and track them!</p>
    <p><a class="btn btn-primary" href="#" role="button">New issue</a></p>
  </div>
</div>
```

`list.html`

```html
<h2 class="display-2 my-3">My issues</h2>
<p><a class="btn btn-primary" href="#" role="button">New issue</a></p>
<div class="list-group">
  <a
    href="#"
    class="list-group-item list-group-item-action list-group-item-danger"
  >
    <div class="d-flex w-100 justify-content-between align-items-center">
      <h5 class="mb-1">Bad machine</h5>
      <span class="badge badge-danger">NEW</span>
    </div>
    <p class="mb-1">
      Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget
      risus varius blandit.
    </p>
    <small>
      <i class="fas fa-map-marker-alt"></i> PC1
      <i class="fas fa-calendar-alt"></i> 2019.01.01.
      <i class="fas fa-comment"></i>
      <span class="badge badge-light badge-pill">3</span>
    </small>
  </a>

  <a
    href="#"
    class="list-group-item list-group-item-action list-group-item-warning"
  >
    <div class="d-flex w-100 justify-content-between align-items-center">
      <h5 class="mb-1">Bad machine</h5>
      <span class="badge badge-warning">DOING</span>
    </div>
    <p class="mb-1">
      Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget
      risus varius blandit.
    </p>
    <small>
      <i class="fas fa-map-marker-alt"></i> PC1
      <i class="fas fa-calendar-alt"></i> 2019.01.01.
      <i class="fas fa-comment"></i>
      <span class="badge badge-light badge-pill">3</span>
    </small>
  </a>

  <a
    href="#"
    class="list-group-item list-group-item-action list-group-item-success"
  >
    <div class="d-flex w-100 justify-content-between align-items-center">
      <h5 class="mb-1">Bad machine</h5>
      <span class="badge badge-success">DONE</span>
    </div>
    <p class="mb-1">
      Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget
      risus varius blandit.
    </p>
    <small>
      <i class="fas fa-map-marker-alt"></i> PC1
      <i class="fas fa-calendar-alt"></i> 2019.01.01.
      <i class="fas fa-comment"></i>
      <span class="badge badge-light badge-pill">3</span>
    </small>
  </a>
</div>
```

`issue.html`

```html
<h2 class="display-2 my-3">Details</h2>
<dl class="row">
  <dt class="col-sm-3">Status</dt>
  <dd class="col-sm-9"><span class="badge badge-danger">NEW</span></dd>

  <dt class="col-sm-3">Title</dt>
  <dd class="col-sm-9">Bad machine</dd>

  <dt class="col-sm-3">Place</dt>
  <dd class="col-sm-9">PC-9</dd>

  <dt class="col-sm-3">Date</dt>
  <dd class="col-sm-9">2019.01.01.</dd>

  <dt class="col-sm-3">Description</dt>
  <dd class="col-sm-9">Some description</dd>

  <dt class="col-sm-3">User</dt>
  <dd class="col-sm-9">gyozke</dd>
</dl>

<p>
  <a class="btn btn-primary" href="#" role="button">Edit</a>
  <a class="btn btn-outline-danger" href="#" role="button">Delete</a>
</p>
```

`new.html`

```html
<h2 class="display-2 my-3">New issue</h2>

<form action="" novalidate>
  <div class="form-group">
    <label for="title">Title</label>
    <input
      type="text"
      class="form-control is-invalid"
      id="title"
      placeholder="Title"
      required
    />
    <div class="invalid-feedback">Please provide a title!</div>
  </div>
  <div class="form-group">
    <label for="description">Description</label>
    <textarea
      class="form-control"
      id="description"
      rows="5"
      required
    ></textarea>
    <div class="invalid-feedback">Please provide a description!</div>
  </div>
  <div class="form-group">
    <label for="place">Place</label>
    <input
      type="text"
      class="form-control"
      id="place"
      placeholder="Place"
      required
    />
    <div class="invalid-feedback">Please provide a place!</div>
  </div>
  <div class="form-group">
    <label for="status">Status</label>
    <select class="form-control" id="status" required>
      <option value="NEW">New</option>
      <option value="DOING">Doing</option>
      <option value="DONE">Done</option>
    </select>
    <div class="invalid-feedback">Please provide a status!</div>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### 7.4. Creating components

First we box those functionalities into components. Start with the issue-list!

```sh
npx ng generate component issue-list
```

Put the necessary HTML and CSS code (if any) into `issue-list.component.html` and `issue-list.component.css`, and in the `app.component.html` file just refer to that component in this way:

```html
<app-issue-list></app-issue-list>
```

Do the same steps with the other component as well (`app-issue-form`, `app-issue-detail`).

### 7.5. Routing

Routing was added suring the installation process. If it were not added, then follow the steps below to add routing manually to the application.

Create a new module `Routing`:

```sh
npx ng generate module routing
```

Add the following to `routing.module.ts`:

```ts
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { IssueListComponent } from "../issue-list/issue-list.component";
import { IssueFormComponent } from "../issue-form/issue-form.component";
import { IssueDetailComponent } from "../issue-detail/issue-detail.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/issues",
    pathMatch: "full",
  },
  {
    path: "issues",
    component: IssueListComponent,
  },
  {
    path: "issues/new",
    component: IssueFormComponent,
  },
  {
    path: "issues/:id",
    component: IssueDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class RoutingModule {}
```

We have to import the routing module into the app module (`app.module.ts`):

```ts
import { RoutingModule } from "./routing/routing.module";

@NgModule({
  // ...
  imports: [
    // ...
    RoutingModule,
  ],
  // ...
})
export class AppModule {}
```

We have to define a `router-outlet` component in `app.component.html`, and the router will put the navigated page _after_ this placeholder component.

```html
<router-outlet></router-outlet>
```

Now we have to use `routerLink` instead of `href`, when we want in-app navigation, e.g. in the navigation bar:

```html
<button mat-button routerLink="/issues">My issues</button>
```

[1]: https://angular.io/
[2]: https://cli.angular.io/
[3]: https://nodejs.org/
[4]: https://angular.io/guide/quickstart#project-file-review
[5]: https://angular.io/guide/displaying-data#showing-an-array-property-with-ngfor
[6]: http://localhost:4200
[7]: https://material.angular.io/
[8]: https://github.com/angular/flex-layout
[9]: http://getbootstrap.com/docs/4.0/getting-started/introduction/
[10]: https://bulma.io/
[11]: https://loiane.com/2017/08/how-to-add-bootstrap-to-an-angular-cli-project/#4-bootstrap-javascript-components-with-ngx-bootstrap-option-1
[12]: https://material.angular.io/guide/getting-started
[13]: https://material.io/icons/
[14]: https://github.com/angular/flex-layout/wiki/Using-Angular-CLI
[15]: https://ng-bootstrap.github.io
