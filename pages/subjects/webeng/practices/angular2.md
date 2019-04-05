# Angular: dynamic templates, component interaction, processing, services

## Steps

1. Show dynamic data in the issue-list! (data is coming from the component) (dynamic data, template syntax)
2. Introduce a button toggle group above the list, this will serve as a filter! This button group has a JavaScript dependency in Twitter Bootstrap, so we need to use the [radio button group from the ng-bootstrap library](https://ng-bootstrap.github.io/#/components/buttons/examples#radioreactive).
3. Generate the buttons dynamically! (dynamic data, template syntax)
4. Filter the table according to the selected filter! (event handling)
5. Put the status filter into a separate component! (component interaction)
6. Select an element in the list and show it in a form!
7. Show validation errors!
8. Save the edited element!
9. Introduce an issue service, and use it in issue-list!
10. Put the issue form on a separate page!


## 1. Dynamic components

### 1.1. Displaying component data in the template (generating HTML)

If we have a data property in a component class, then it can be accessed from the template by referring to the data property with its name.

`some.component.ts`
```ts
export class SomeComponent {
  name = 'Győző';
}
```

`some.component.html`
```html
<p>Hello {{ name }}!</p>
```

Sometimes we need to set values of an HTML attribute (more precisely a DOM property), this is called *property binding*:

`some.component.html`
```html
<input type="text" [value]="name">
<input type="text" value="{{ name }}">
```

### 1.2. Handling events from the UI

User interactions generate events, and dynamic web pages react to those events. We can register a component method to an event with the *event binding*:

`some.component.html`
```html
<input type="text" [value]="name">
<input type="button" (click)="changeName()">
```

`some.component.ts`
```ts
export class SomeComponent {
  name = 'Győző';
  changeName() {
    this.name = 'Victorious';
  }
}
```

### 1.3. Conditionals and iteration in templates

You can use `*ngIf` and `*ngFor` for that purpose.

```html
<p *ngIf="logical expression">Hello {{ name }}!</p>

<ul>
  <li *ngFor="let recipe of recipes">{{ recipe.name }}</li>
</ul>
```

## 2. Component interaction

### 2.1. Parent-child interaction

If a component takes place in another component, the parent component can give data to the child component with *data binding* (`[]`), and the child can send data to the parent component with *event binding* (`()`).

```txt
+-------------------------------------+
|          Parent component           |
|                                     |
|   [data    +        ^  (event       |
|   binding] |        |  binding)     |
|            |        |               |
|     +------v--------+--------+      |
|     |    Child component     |      |
|     |                        |      |
|     +------------------------+      |
|                                     |
+-------------------------------------+
```

#### 2.1.1. Data binding

The child component has to define an input data property in the component class with the `@Input()` decorator.

```js
import { Input } from '@angular/core';

export class ExampleChildComponent {
  @Input('value') text: string = "";
}
```

The parent component can send data into the child component with data binding:

```html
<example-child [value]="data"></example-child>
```

Every time data changes in the parent component, it is sent to the child component, and the child component re-renders.

#### 2.1.2. Event binding

A child component can send data to the parent component by emitting events:

```js
import { Output, EventEmitter } from '@angular/core';

export class ExampleChildComponent {

  @Output() dataChange: EventEmitter<string> = new EventEmitter<string>();

  someMethod(value) {
    this.dataChange.emit(value);
  }
}
```

The parent component can register an event handler for that event with event binding. We can refer to the sent data with `$event`.

```html
<example-child (dataChange)="onDataChange($event)"></example-child>
```

The event handler method should be defined in the parent component class:

```js
export class ExampleParentComponent {
  onDataChange(value) {
    console.log(value);
  }
}
```

### 2.2. Through services

Services (see below) can be used for passing data to another component even when they are in no direct parent-child connection (e.g. siblings, different routes). The Angular documentation has a good section about using [observables to communicate through services](https://angular.io/guide/component-interaction#parent-and-children-communicate-via-a-service).

## 3. Classes

We can introduce as many classes as we want in our application. This is necessary when we want to define the shape of our model, for example. In order to create a class, we can use the ng generator for this purpose:

```
npx ng generate class issue
```


## 4. Services

Services can be used to separate business logic, data storing or data procession from managing the view layer. They are also good when we want to share data and business logic across multiple components.

We can generate a service with Angular CLI:

```sh
npm run ng generate service issue
```

It will create an `issue.service.ts` file with an `IssueService` class exported. We can implement arbitrary logic inside this class, exposing data properties and methods.

We have two options to use this service. The more common option is to use a service module-wide as a singleton. In this case you have to provide it root level, and indicate it in the service file. The generator will do this for us.

```js
@Injectable({
    providedIn: 'root',
})
export class IssueService {
  // ...
}
```

Then it can be injected into a component.

```js
@Component()
export class IssueListComponent { 
  constructor(
    private issueService: IssueService
  ) { }
}
```

If the service is only needed for one component, then we have to add it to the `providers` array of the `@Component`, and inject it into the class in the constructor.

```js
@Component({
  providers: [IssueService]
})
export class IssueListComponent { 
  constructor(
    private issueService: IssueService
  ) { }
}
```

## 5. Template-driven forms

In Angular we have two options to manage a form: [template-driven forms](https://angular.io/guide/forms) or [reactive forms](https://angular.io/guide/reactive-forms). The former easier at first but has some limitations later, the latter is more complex but has advantages in the long run. We will use template-driven forms. The following example works with a recipe model.

### 5.1. Form model

Usually it is a good practice to define a data model for storing the values of the input elements.

```js
export class RecipeFormComponent {
  model: Recipe = new Recipe();
}
```

### 5.2. Two-way data binding

Then we can bind with [*two-way data binding*](https://angular.io/guide/template-syntax#two-way-binding---) the input elements to the model properties. It is achieved with the help of [`ngModel` attribute directive](https://angular.io/guide/template-syntax#ngmodel---two-way-binding-to-form-elements-with-ngmodel), for which the `FormsModule` needs to be imported in `app.module.ts`.

```js
import { FormsModule } from '@angular/forms';

@NgModule({
  /* ... */
  imports: [
    FormsModule,
  ],
})
export class AppModule { }
```

Then in the template of the form component class we can use the `ngModel` directive. For this the `name` property of the input element must be set.

```html
<input [(ngModel)]="model.title" type="text" name="title">
```

### 5.3. Input element validation

We will use HTML5 input validation attributes, e.g. `required`, `minlength` or `pattern`:

```html
<input [(ngModel)]="model.title" type="text" name="title"
  required
  minlength="3" 
>
```

You can access the state of the input element through the ngModel object. Make a *template reference* with ngModel as a value:

```html
<input [(ngModel)]="model.title" type="text" name="title"
  required
  minlength="3"
  #title="ngModel"
>
```

Now `title` has properties like:

- `valid`
- `invalid`
- `touched`
- `dirty`
- `pristine`
- `errors`

We can make conditional CSS class settings based on these values:

```html
<input [(ngModel)]="model.title" type="text" name="title" 
  required
  minlength="3"
  #title="ngModel"
  [class.is-invalid]="title.invalid && (title.dirty || title.touched)"
  [class.is-valid]="title.valid"
>
```

Showing errors can be done conditionally as well:

```html
<input [(ngModel)]="model.title" type="text" name="title" 
  required
  minlength="3"
  #title="ngModel"
  [class.is-invalid]="title.invalid && (title.dirty || title.touched)"
  [class.is-valid]="title.valid"
>
<div class="invalid-feedback" *ngIf="title.invalid && title.errors.required">
  Please provide a recipe name!
</div>
<div class="invalid-feedback" *ngIf="title.invalid && title.errors.minlength">
  A recipe name is at least 3 characters long!
</div>
```

### 5.4. Form validation

We can use `ngForm` to get informations of the form state, like

- `valid`
- `invalid`
- `value`
- `controls`

Make a template reference to the ngForm, and give its value as a parameter of the submit event handler:

```html
<form (submit)="submit(recipeForm)" #recipeForm="ngForm">
</form>
```

The in the component class the event handler can make a logic in its properties:

```js
submit(form) {
  if (!form.valid) {
    return;
  }
  // save the form model  
}
```

We can even make the submit button disabled when the form is not valid:

```html
<button type="submit" class="btn btn-primary" [disabled]="!recipeForm.valid">Submit</button>
```

### 5.5. Other references

- [Template driven forms (scotch.io)](https://scotch.io/tutorials/using-angular-2s-template-driven-forms)
- [Template driven forms](https://toddmotto.com/angular-2-forms-template-driven)
- [Validate on submit](https://loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit/#validating-all-fields-on-submit)
- [Validate on submit](https://stackoverflow.com/questions/39893430/angular-2-reactive-forms-trigger-validation-on-submit)


## 6. Reactive forms

Reactive forms have many advantages over template-driven forms. The documentation has a very detailed description about it. In the following we will focus on the practical steps to create a reactive form.

### 6.1. Create a form model and connect to the template

We will use Formbuilder class to create a form modell. First we import the `ReactiveFormsModule` to our `app.module`:

```ts
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    // other imports ...
    FormsModule,    // needs for normal forms
    ReactiveFormsModule
  ],
})
export class AppModule { }
```

Then we ask for a FormBuilder instance from the dependeny injection framework:

```js
constructor(
    private fb: FormBuilder
  ) { }
```

Then we create a form model:

```js
import { FormBuilder } from '@angular/forms';

export class IssueFormComponent implements OnInit {

  issueForm = this.fb.group({
    place: [''],
  });

  get place() { return this.issueForm.get('place'); }

}
```

In the template we introduce the necessary HTML component:

```html
<form [formGroup]="issueForm">
  <div class="form-group">
    <label for="place">Place</label>
    <input type="text" class="form-control" id="place" placeholder="Place" 
      formControlName="place" 
    />
  </div>
</form>
{{issueForm.value | json}}
```

To show a form control value:

```js
{{issueForm.get('place').value}}
{{place.value}}
```

To set a form control value:

```js
issueForm.get('place').setValue('PC10');
place.setValue('PC10');
```

### 6.2. Validation and error messages

Set the necessary constraints in the component class:

```js
import { Validators } from '@angular/forms';

export class IssueFormComponent implements OnInit {

  issueForm = this.fb.group({
    place: ['', [Validators.required, Validators.pattern(/^PC\d+/)]],
  });

}
```

and in the component template:

```html
<input type="text" class="form-control" id="place" placeholder="Place" 
  formControlName="place" 
  required 
  pattern="PC\d+"
/>
```

Validation errors can be handled through the `errors` property of the form control:

```html
{{issueForm.get('place').errors | json}}
```

With Bootstrap we can use `is-valid` and `is-invalid` classes for the input field, and the corresponding error divs:

```html
<div class="form-group">
  <label for="exampleInputEmail1">Email address</label>
  <input type="text" class="form-control" id="place" placeholder="Place" 
    formControlName="place" 
    required 
    pattern="PC\d+"
    [class.is-invalid]="place.invalid && (place.dirty || place.touched)"
    [class.is-valid]="place.valid"
  />
  <div class="invalid-feedback" *ngIf="place.invalid && place.errors.required">
    Please provide an issue place!
  </div>
  <div class="invalid-feedback" *ngIf="place.invalid && place.errors.pattern">
    Place must start with PC...!
  </div>
</div>
```

With Angular Material we can use `<mat-error>` tags:

```html
<mat-form-field>
  <input matInput placeholder="Place" formControlName="place" required pattern="PC\d+">
  <mat-error *ngIf="place.invalid && (place.dirty || place.touched) && place.errors.required">
    Please provide an issue place!
  </mat-error>
  <mat-error *ngIf="place.invalid && (place.dirty || place.touched) && place.errors.pattern">
    Place must start with PC...!
  </mat-error>
</mat-form-field>
```

### 6.3. Saving the form

We put a submit button to the end of the form, and register an event handler for the submit event:

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <!-- ... -->
  <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Submit</button>
</form>
```

In the component class we emit the value to the parent component:

```js
export class IssueFormComponent implements OnInit, OnChanges {

  issue: Issue = {
    id: null,
    title: '',
    description: '',
    place: '',
    status: 'NEW',
    updated_at: ''
  };
  @Output() save = new EventEmitter<Issue>();

  onSubmit() {
    const emittedIssue = Object.assign(this.issue, this.form.value);
    this.save.emit(emittedIssue);
  }

}
```

## 7. Navigation and route handling

### 7.1. Reading route parameter

```js
constructor(
  private route: ActivatedRoute
) { }

ngOnInit() {
  const id = +this.route.snapshot.paramMap.get('id');
}
```

### 7.2. Going back to the previous page

```js
constructor(
  private location: Location
) { }

someMethod() {
  this.location.back();
}
```

## 8. References from the documentation

- [Template syntax](https://angular.io/guide/template-syntax)
- [Lifecycle hooks](https://angular.io/guide/lifecycle-hooks)
- [Component interaction](https://angular.io/guide/component-interaction)
- [Event handling](https://angular.io/guide/user-input)
- [Forms (template-driven forms)](https://angular.io/guide/forms)
- [Form validation](https://angular.io/guide/form-validation)
- [Read param from activated route (simple)](https://angular.io/tutorial/toh-pt5#extract-the-id-route-parameter)
- [Read param from activated route (advanced)](https://angular.io/guide/router#activated-route-in-action)
