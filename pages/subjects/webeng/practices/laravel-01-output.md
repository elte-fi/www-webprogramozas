# Laravel -- Generating output

## Tasks

1. Build a static prototype of the main pages of the application. Normally, it consists of two parts:

   - draw and design the UIs,
   - then create a static prototype from them using HTML and CSS.

   But in simpler cases, only the latter can be used.

2. Install the Laravel framework.
3. Display the pages prepared in step 1 via the appropriate endpoints:
   - `/`: main page
   - `/projects`: list of projects
   - `/projects/create`: add a new project
   - `/projects/1`: list of tracks belonging to the project
   - `/projects/1/tracks/create`: add a new track
   - `/transposer`: the transposing page
4. Display some baked-in data on the pages. E.g:
   - The number of projects stored in the application on the main page
   - The project list
   - List of tracks
   - Project editing
   - Track editing
5. Highlight the common part of the pages in a layout file.

## Static prototype

The static prototype, considered as a starting point, can be downloaded from here. It consists of a couple of HTML files, the style is provided by the Twitter Bootstrap CSS framework. The prototype is a starting point, it may change later during development.

## Installing Laravel

- [Detailed installation guide in the documentation](https://laravel.com/docs/8.x/installation)
- In `php.ini` activate the necessary extensions: `mbstring`, `openssl`, `pdo`
- Go to a parent folder, and create a new laravel project with composer
  ```bat
  composer create-project --prefer-dist laravel/laravel your-project
  ```
- Open a local development server, by going into the project directory, and running

  ```bat
  php artisan serve
  ```

- Open `localhost:8000` in a web browser

Another option for running a Laravel application in development, is to use PHP built-in development server. In this case we have the option set the local IP, and use cache functionalities, so the whole serving process will be faster:

- In the command line type

  ```bat
  php -S 127.0.0.10:80 -t public/
  ```

- Then open the browser at `http://127.0.0.10`
- We can even put this IP into our hosts file (in Windows 10 its location is `C:\Windows\System32\drivers\etc\hosts`), e.g.
  ```
  127.0.0.10 myapp.dev
  ```
  and then open the browser at `http://myapp.dev` site.

## Displaying static HTML

Laravel as a PHP MVC framework offers the Model-View-Control design pattern for structuring the code. In this pattern,

- the **model** is responsible for storing and processing the data independently from the UI and I/O,
- the **view** is responsible for displaying the data, i.e. in our case generating the HTML, and
- the **controller** receives the HTTP request, reads the data, calls the functions of the model layer, and then prints the results by invoking the view.
- **Routing** is also a central part in most MVC frameworks, which assigns a URL, i.e. an endpoint, to the appropriate controller method.

You don't need data to display a simple HTML page, but the pages appear below an endpoint, that is, you need routing, which directs execution to a controller method that simply displays the view that contains our HTML. Which means, to do this simple little thing, we need at least these three components:

- routing
- controller
- view

### View

Laravel stores our views, i.e. our HTML templates, in the `resources/views` folder. Because we rarely display static content, usually it contains HTML templates. Templates must be described in a template language (such as plain PHP, but there is Smarty, Twig, etc.), which is the _Blade_ template library in Laravel. Therefore, the files must have the extension `.blade.php`. Files can be organized into additional subfolders.

So static content also requires the creation of a blade file into which we copy the static HTML content.

### Routing

The next important thing is to register the endpoint in the framework and assign a controller method to it. This can be done in the `routes/web.php` file. We can make those assignments through the static methods of the `Route` class. These must include the appropriate HTTP method, endpoint, and controller method. See below for specific examples.

There are several ways to do the assignment:

- With a closure:
  ```php
  Route::get('/endpoint', function () {
    // controller logic
  });
  ```
- Referring to the appropriate method of a controller class:
  ```php
  Route::get('/endpoint', [FooController::class, 'some_method']);
  ```

It is common to assign a name to an endpoint. So later it is enough to refer to the name and it is no problem if the endpoint changes.

```php
Route::get('/endpoint', 'FooController@some_method')->name('foo');
```

### Controller

We saw earlier that the controller sometimes is only a closure function. But it can also be a separate class method. We can ask Laravel to generate it for us:

```
php artisan make:controller FooController
```

The file is created in the `app/Http/Controllers` folder. Here we create the control method:

```php
class FooController extends Controller
{
  public function some_method()
  {
    // controller logic
  }
}
```

### Displaying the view

To display a view, you must return a text in the controller method that refers to the file name of the view:

- `'foo'` --> `foo.blade.php`
- `'foo.bar'` --> `foo/bar.blade.php`

So, overall, we have the following options for displaying the view:

- Route + closure
  ```php
  Route::get('/some', function () {
    return 'foo';
  });
  ```
- Shorter format of this; especially good for static pages, where there is no additional logic
  ```php
  Route::view('/some', 'foo');
  ```
- One of the methods of a separate controller class
  ```php
  class FooController extends Controller
  {
    public function some_method()
    {
      return 'foo';
    }
  }
  ```

## Displaying data

### Blade

The Blade template library provides plenty of options (see documentation), but it’s enough to know just a few of them to cover most cases.Blade uses a simplified version of the alternative syntax for PHP, you just need to omit the PHP tags and the colon. If we know that, using Blade will be easy. E.g.

```php
<!-- PHP alternative syntax -->
<?php foreach($array as $value) : ?>
  <!-- do something with $value -->
<?php endforeach ?>
```

```php
{{-- Blade --}}
@foreach($array as $value)
  {{-- do something with $value --}}
@endforeach
```

Important rules:

```php
{{-- Comment --}}

{{-- Show variable --}}
{{ $foo }}

{{-- URL --}}
{{ route('route_name') }}

{{-- Iteration --}}
@foreach($array as $value)

@endforeach

{{-- Branching --}}
@if($condition)

@else

@endif
```

### Passing data to the view

```php
// Controller
function index() {
  return view('foo', [
    'bar' => 12,
  ]);

  // or
  return view('foo')->with('bar', 12);

  // or
  $bar = 12
  return view('foo', compact('bar'));
}
```

```html
{{-- View --}}
<p>{{ $bar }}</p>
```

## Layout

The layout file contains the common parts of the general page. The layout file is displays the contents of the so-called sections using the `@yield` directive:

```php
<!doctype html>
<meta charset="utf-8">
<title>@yield('title')</title>

<div class="container">
  @yield('content')
</div>
```

The specific content page defines the `@sections` that will be printed in the referred layout.

```php
@extends('layout')

@section('title', 'My content page')

@section('content')
  <p>The content</p>
@endsection
```

## Solution guide

1. Installation, starting the development server, display default page
2. Copy the static files to the `resources/views` folder. Put the project-related pages in a `projects` folder and the track-related ones in a` tracks` folder!
3. In `routes/web.php`, display the main page with a closure:
   ```php
   Route::get('/', function () {
     return view('main');
   });
   ```
4. Display the rest with `Route::view`, e.g.:
   ```php
   Route::view('/projects', 'projects.list');
   ```
5. Use a separate controller class: `ProjectController`
   - `index()`: project list
   - `create()`: new project
6. Display some data:
   - Number of projects on the main page
     ```php
     Route::get('/', function () {
       return view('main', [
         'number_of_tracks' => 123,
       ]);
     });
     ```
   - project list
     ```php
     public function index()
     {
       $projects = [
         [
           'id'          => 1,
           'name'        => 'Project1',
           'description' => 'Description1',
           'bg_url'      => 'http://web1.sthgrafton-h.schools.nsw.edu.au/wp-content/uploads/2015/08/MusicWorkShop-Image.jpg',
         ],
         [
           'id'          => 2,
           'name'        => 'Project2',
           'description' => 'Description2',
           'bg_url'      => '',
         ],
       ];
       return view('projects.list', [
         'projects' => $projects,
       ]);
     }
     ```
7. Put the common HTML sections into a layout.
