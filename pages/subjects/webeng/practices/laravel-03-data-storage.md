# Laravel -- Data storage, simple models

## General tasks

1. Set up the database
2. Create a model
3. Create a table with migration
4. Create a record with random data, Factory
5. Fill a table with random records, Seeder
6. Implementing CRUD operations on a model
7. Refactoring
   - Resource routes and controllers, route model binding
   - Using Form Request class

## Application tasks

1. Create a SQLite database. To do this, use a SQLite client, e.g. [DB Browser for SQLite](https://sqlitebrowser.org/). All you have to do is create an empty database in the `database` folder.
2. Configure Laravel to use the database. In the `.env` file, set to use SQLite and enter the database name.
3. Create a model for managing and storing music projects. In addition to the model, create the migration, factory and seeder belonging to the model!
4. Look at the model! You don't have to do anything with it yet!
5. Use migration to create the project table.
6. Create and list projects in a command line REPL (tinker)!
7. With a Factory, create random records in the table! (optional)
8. Use the Seeder to load the table! (optional)
9. Implement the CRUD operations of projects in the UI!
   - list all projects
   - create a new project
   - edit a project
   - delete a project
   - show details of a project
10. Change the routing and controller class to be resourceful! Use route model binding! Use the FormRequest class to avoid duplicate validation!

## Database setup

Laravel can work with multiple relational databases. The first step is to create our database! The further steps will be done with Laravel. The second step is to set up the database. The configuration is primarily in `config/database.php`, but it reads most of the data from the `.env` file. For example, to use SQLite write the following in the `.env` file:

```
DB_CONNECTION=sqlite
DB_DATABASE=mydb.sqlite
```

One more thing needs to be fixed in the `config/database.php` file, so that the console and the web server look for the database in the same place:

```
'connections' => [
  'sqlite' => [
    'database' => database_path(env('DB_DATABASE', 'database.sqlite')),
  ],
]
```

## Model

We have reached the point when it is necessary for the model layer to appear in the application. This layer is responsible for storing the data and connecting to the database .In Laravel, this is basically done using Eloquent ORM, which is an implementation of the Active Record pattern. Here's how to create a model:

```
php artisan make:model Foo
```

However, in addition to the model, we may also need a number of files to use the model: factory, seeder, migration file, controller. These can be created through the additional CLI parameters of the above command. Of course, these can also be created separately, as there is a separate command for them as well. E.g.:

```
php artisan make:model Foo -mfs
php artisan make:model Foo -a
php artisan make:factory FooFactory
```

The model is a simple class that extends the Laravel `Model` class, inheriting a lot of logic from it. The model works with naming conventions, which can be fine-tuned as required:

- the corresponding database table name is the plural form of the model name
- `id` field is the primary key
- the table contains `created_at`,` updated_at` timestamp fields

```php
class Foo extends Model
{

}
```

Usage (assuming there is a `foos` table in the database with fields` a` and `b`):

```php
// creating a new record
$foo = new Foo();
$foo->a = 1;
$foo->b = 2;
$foo->save();

// creating a new record
$foo = Foo::create([
  'a' => 1,
  'b' => 2,
]);
// but for this you have to make those fields fillable in the model:
class Foo extends Model
{
  protected $fillable = ['a', 'b'];
}

// querying multiple items
$foos = Foo::all();
$foos = Foo::find([1, 2, 3]);
$foos = Foo::where('a', '>=', 10)->get();

foreach($foos as $foo) { /* ... */ }

// querying one item
$foo = Foo::find(1);
$foo = Foo::findOrFail(1);
$foo = Foo::first();
$foo = Foo::firstOrFail();

// editing an item
$foo = Foo::first();
$foo->a = 100;
$foo->save();

// editing multiple items
Foo::where('a', '>=', 10)->update(['b' => 100]);

// delete an item
$foo = Foo::first();
$foo->delete();

// delete an item
Foo::destroy(1);

// delete multiple items
Foo::destroy([1, 2, 3]);
Foo::where('id', '<=', 3)->delete();
```

## Migrations

With the help of migrations, we can perform creation and modification operations on tables with programming code. This is primarily good so that we can version control our database changes in the same programming language of our choice (PHP). All migrations must implement the do (`up`) and the undo operation (`down`). You can create a migration from the command line, but it's easier to produce this right away when you create a model:

```
php artisan make:migration filename
php artisan make:model Foo -m
```

The methods, which can be used in the migration file, you can find in the documentation. In simpler cases, a migration file might look like this:

```php
public function up()
{
  Schema::create('foos', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('something')->nullable();
    $table->integer('a');
    $table->unsignedBigInteger('b')->unique();
    $table->timestamps();
  });
}
```

To run migrations:

```bash
# Status
php artisan migrate:status
# Running new migrations
php artisan migrate
# Undo a migration
php artisan migrate:rollback
php artisan migrate:reset
# Run all migrations from scratch
php artisan migrate:fresh
```

## Factory

Records may need to be generated quickly for testing or development. This is what model factories are for. Although you can generate values manually, you can use the [`Faker` library] (https://github.com/fzaninotto/Faker), which was developed specifically to generate different types of random values. It is also worth creating the factory together with the model, but it can also be created separately:

```
php artisan make:model Foo -f
php artisan make:factory FooFactory -m Foo
```

```php
class FooFactory extends Factory
{
    protected $model = Foo::class;

    public function definition()
    {
        return [
            'a'     => $this->faker->randomDigit,
            'b'     => $this->faker->optional()->randomNumber(3),
            'name'  => $this->faker->lastName,
        ];
    }
}
```

Usage:

```php
// creating a new instance
$foo = Foo::factory()->make();
// creating a new record in the database
$foo = Foo::factory()->create();
// creating multiple records in database
Foo::factory(5)->create();
// overriding fields
Foo::factory(5)->create(['b' => 42]);
```

## Seeder

For testing and development, it is good if our database is filled with some example data. For this we use Seeders. Create it separately or together with a model:

```
php artisan make:seeder FooTableSeeder
php artisan make:model Foo -s
```

A `run` method must be implemented. A new item can be created using Database builder instructions, using a model, or using factories. E.g.:

```php
class FooTableSeeder extends Seeder
{
  public function run()
  {
    DB::table('foos')->delete();
    factory(Foo::class, 10)->create();
  }
}
```

Seeders are usually called in a central `Databaseseeder` class:

```php
class DatabaseSeeder extends Seeder
{
  public function run()
  {
    $this->call(FooTableSeeder::class);
  }
}
```

Usage:

```
php artisan db:seed
php artisan db:seed --class=FooTableSeeder
```

## Resource routing and controllers

The implementation of CRUD operations always has roughly the same set of elements:

- list items
- display an item
- create a new item
  - display a form
  - save a new item
- edit item
  - display a form
  - change item
- delete item

This set of elements is also reflected in the names of the routes, as well as in the names and signatures of the controller methods. Laravel will help you deal with this repetitive activity. In the case of routes, it is possible to define a so-called resource route:

```php
Route::resource('foos', 'FooController');
```

Use the following command to view the registered paths:

```
> php artisan route:list

+-----------+-----------------+--------------+--------------------------------------------+------------+
| Method    | URI             | Name         | Action                                     | Middleware |
+-----------+-----------------+--------------+--------------------------------------------+------------+
| GET|HEAD  | foos            | foos.index   | App\Http\Controllers\FooController@index   | web,auth   |
| POST      | foos            | foos.store   | App\Http\Controllers\FooController@store   | web,auth   |
| GET|HEAD  | foos/create     | foos.create  | App\Http\Controllers\FooController@create  | web,auth   |
| GET|HEAD  | foos/{foo}      | foos.show    | App\Http\Controllers\FooController@show    | web,auth   |
| PUT|PATCH | foos/{foo}      | foos.update  | App\Http\Controllers\FooController@update  | web,auth   |
| DELETE    | foos/{foo}      | foos.destroy | App\Http\Controllers\FooController@destroy | web,auth   |
| GET|HEAD  | foos/{foo}/edit | foos.edit    | App\Http\Controllers\FooController@edit    | web,auth   |
+-----------+-----------------+--------------+--------------------------------------------+------------+
```

In addition, it is possible to create resource controllers:

```
php artisan make:controller FooController -r
```

With this command, the method names and signatures of the controller correspond to the resource route:

```php
class FooController extends Controller
{
  public function index()                             { /* ... */ }
  public function show(Foo $foo)                      { /* ... */ }
  public function create()                            { /* ... */ }
  public function store(Request $request)             { /* ... */ }
  public function edit(Foo $foo)                      { /* ... */ }
  public function update(Request $request, Foo $foo)  { /* ... */ }
  public function destroy(Foo $foo)                   { /* ... */ }
}
```

## Route model binding

The route usually displays the ID of that resource, so the route and controller often look like this:

```php
Route::get('/foos/{id}', function ($id) {
  $foo = Foo::find($id);
  // $foo
});
```

We don't have to get the model manually in the controller method, if we indicate the type of the model in the signature of the controller method. In addition, it is still very important that the name of the route parameter and the name of the parameter in the signaling should match. And then the framework automatically instantiate the appropriate model object based on the ID from the route.

```php
Route::get('/foos/{foo}', function (Foo $foo) {
  // $foo
});
```

## Form request

Repeated validations of requests can be organized into a separate class, the so-called Form Requests. This is also good for better separation of responsibilities so that the controller can really contain the logic of reading, processing, and writing.

```php
php artisan make:request FooFormRequest
```

```php
class FooFormRequest extends FormRequest
{
  public function rules()
  {
    return [
      'a' => "required|integer",
      'b' => "nullable|integer",
    ];
  }
}
```

In controllers, the parameter must be annotated with such a class type. The framework then runs validation on the request before calling the method, if it is wrong, it redirects, otherwise it calls the method afterwards. The validated data can be read from the request:

```php
public function store(FooFormRequest $request)
{
  $data = $request->validated();
}
```

## Solution guide

1. Set up the database and configurations as described.
2. Create a model for music projects with migration, factory and seeder:
   ```
   php artisan make:model Project -mfs
   ```
3. Create the database table using a migration:
   - `name`
   - `description`: can be NULL
   - `bg_url`: can be NULL
   ```
   php artisan migrate
   ```
4. Try creating and listing a new project in the command line:
   ```
   php artisan tinker
   >>> $p = new App\Models\Project()
   >>> $p->name = 'New project 1'
   >>> $p->save()
   >>>
   >>> App\Models\Project::all()
   >>> App\Models\Project::find(1)
   ```
5. Apply the solutions, tested in this way, in the controller methods.

   For example, editing a project looks like this in the controller:

   ```php
   public function edit($id)
   {
     $project = Project::find($id);
     // $project = Project::findOrFail($id);
     return view('projects.edit', [
       'project' => $project
     ]);
   }

   public function update(Request $request, $id) {
     $project = Project::findOrFail($id);
     $data = $request->validate([
       'name'        => "required",
       'description' => "nullable",
       'bg_url'      => "nullable|url",
     ]);
     $project->update($data);
     return redirect()->route('projects.index');
   }
   ```

6. Introduce a resource route for the projects. Delete existing routes and register each with a single line! Use route model binding in the control methods:
   ```php
   public function update(Request $request, Project $project)
   {
     $project->update($request->validate([
       'name'        => "required",
       'description' => "nullable",
       'bg_url'      => "nullable|url",
     ]));
     return redirect()->route('projects.index');
   }
   ```
7. Finally, Let's organize the validation of the `store` and` update` methods in a separate form request class.
   ```
   php artisan make:request ProjectFormRequest
   ```
   ```php
   class ProjectFormRequest extends FormRequest
   {
     public function authorize()
     {
       return true;
     }
     public function rules()
     {
       return [
         'name'        => "required",
         'description' => "nullable",
         'bg_url'      => "nullable|url",
       ];
     }
   }
   ```
