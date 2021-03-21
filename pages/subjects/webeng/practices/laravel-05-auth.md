# Laravel -- Authentication and authorization

## General tasks

1. Let's protect some pages that only logged in users can access them! To do this:
   - registration page
   - login page
2. Solve that the logged-in user can only access certain contents. For example, for those that were created by the logged-in user!

## Application-related tasks

1. So far, anyone has access to any music project. Protect the project and track management that only authenticated users can access these pages. Guest user can only access the main page!
   - Create a registration page where we can add a new user!
   - Create a separate page for login.
   - After a successful login, go to the project listing page!
2. Solve that only projects created by the user are available!
3. If the user wants to view a project or track which does not belong to the user, throw a 403 error!

## Authentication and authorization

**Authentication** is the process when we find out who is behind the request. If the user is not known, we identify as anonymous or guest-user.

During **authorization** we try to find the answer for the question of whether the identified user has the right to access certain resources (pages, page portions, data models).

## Authentication in Laravel

Laravel has a well-thought authentication system. It can use:

- session-based and
- token-based authentication.

For our application, the session-based authentication fits which is the default setting of the framework.

Authentication can be added to the application with a few simple instructions:

```bash
composer require laravel/breeze --dev
php artisan breeze:install
npm install
npm run dev
```

Be aware, that this will overwrite the `routes/web.php` file!

Another way of doing this:

```bash
composer require laravel/ui
php artisan ui bootstrap --auth
php artisan migrate
npm install
npm run dev
```

These add the right login, registration pages, routes, controllers, views to the application with their own templates. If we want to fit them to our own application, at first it is enough to point them to our layout view. Of course, we can customize further the layout and the templates to better meet to our expectations.

### Fine tuning

The fine-tuning of the login process can be done in the `config/auth.php` file, but the settings are usually good. Additional setting may be to set which page to display after logging in. To do this, you must set the following constant in the `RouteServiceProvider.php` file:

```php
public const HOME = '/home';
```

### Authenticated user

Getting the authenticated user:

```php
$user = Auth::user();
$id = Auth::id();
$user = auth()->user();
$request->user()
```

Is the user logged in:

```php
if (Auth::check()) {
    // The user is logged in...
}
```

Logging out:

```php
Auth::logout();
```

## Protecting routes

For routes, you can indicate whether only an identified user can access them. We have to use the `auth` middleware:

```php
// route-level
Route::get('profile', function () {
  // Only authenticated users may enter...
})->middleware('auth');
```

```php
// class-level
public function __construct() {
  $this->middleware('auth');
}
```

## Authorization

### Gates

With gates, we can realize individual access control logic. We define a gate name, and then specify whether the authenticated user can access the requested resource. When the resource is not specified, then only the user is given (e.g. `edit-settings`).

```php
// App\Providers\AuthServiceProvider.php
public function boot() {
  $this->registerPolicies();
  Gate::define('edit-settings', function ($user) {
    return $user->isAdmin;
  });
  Gate::define('update-post', function ($user, $post) {
    return $user->id === $post->user_id;
  });
}
```

Usage e.g. in a controller:

```php
// Controller method
if (Gate::allows('edit-settings')) {
  // The current user can edit settings
}
if (Gate::allows('update-post', $post)) {
  // The current user can update the post...
}
if (Gate::denies('update-post', $post)) {
  // The current user can't update the post...
}
```

We can define authorization logic which runs before and/or after all other authorization checks:

```php
Gate::before(function ($user, $ability) {
  if ($user->isSuperAdmin()) {
    return true;
  }
});
Gate::after(function ($user, $ability, $result, $arguments) {
  if ($user->isSuperAdmin()) {
    return true;
  }
});
```

## Policy

A policy is the logical encapsulation of the authorization logic for a particular model. The default assignment works by name convention,a `Foo` model belongs to a` FooPolicy` policy. If we need a custom assignment, it can be done in `AuthServiceProvider`. There is a possibility to create so-called resourceful policies, this time for each rsource methods has its own policy method.

```
php artisan make:policy FooPolicy --model=Foo
```

```php
class FooPolicy {
  public function update(User $user, Foo $foo) {
    return $user->id === $foo->user_id;
  }
  public function create(User $user) {
    // without model
  }
  public function update_guest(?User $user, Foo $foo)
  {
    return optional($user)->id === $foo->user_id;
  }
}
```

To use a policy, we can use the following methods. There may also be methods that do not have a model (e.g. new creation), but then a model class should be given.

```php
// using $user model
if ($user->can('update', $foo))        { /* ... -*/ }
if ($user->can('create', Foo::class))  { /* ... -*/ }
```

```php
// middleware
Route::put('/post/{post}', function (Foo $foo) {
  // The current user may update the post...
})->middleware('can:update,post');
```

```php
// controller helper
public function update(Request $request, Foo $foo) {
    $this->authorize('update', $foo);
    // The current user can update the blog post...
}
```

## Blade directives

```php
@auth
    // The user is authenticated...
@endauth

@guest
    // The user is not authenticated...
@endguest

@can('update', $post)
    <!-- The Current User Can Update The Post -->
@elsecan('create', App\Post::class)
    <!-- The Current User Can Create New Post -->
@endcan

@cannot('update', $post)
    <!-- The Current User Cannot Update The Post -->
@elsecannot('create', App\Post::class)
    <!-- The Current User Cannot Create A New Post -->
@endcannot
```

## Solution guide

1. Using a seeder

   ```php
   class UsersTableSeeder extends Seeder {
     public function run() {
       User::create([
         'name' => 'Joe Smith',
         'email' => 'joe@gmail.com',
         'password' => Hash::make('qqqqqqqq'),
       ]);
     }
   }
   ```

   ```php
   class ProjectSeeder extends Seeder {
     public function run() {
       DB::table('projects')->delete();

       $filters = Filter::all();
       $user = User::firstWhere('email', 'joe@gmail.com');

       // factory(App\Project::class, 3)->create(['user_id' => $user])->each(function ($project) use ($filters) {
       //   $project->tracks()->createMany(
       //     factory(App\Track::class, 5)->make()->toArray()
       //   )->each(function ($track) use ($filters) {
       //     for ($i = 0; $i < random_int(1, 4); $i++) {
       //       $track->filters()->toggle($filters[random_int(0, 9)]);
       //     }
       //   });
       // });
     }
   }
   ```

   ```php
   class DatabaseSeeder extends Seeder {
     public function run() {
       $this->call(UsersTableSeeder::class);
       $this->call(FilterSeeder::class);
       $this->call(ProjectSeeder::class);
     }
   }
   ```

2. Authorization. Below you can see the templates for the project, but the same goes for the Tracks.
   ```php
   class ProjectPolicy {
     public function access(User $user, Project $project) {
       return // ...
     }
   }
   ```
   ```php
   public function show(Project $project) {
     $this->authorize('access', $project);
     // ...
   }
   ```
