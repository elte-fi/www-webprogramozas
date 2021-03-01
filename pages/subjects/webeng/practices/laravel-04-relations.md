# Laravel -- Relations between models

## General tasks

1. Adding data to the application with 1-N (one-to-many) relationship.
   - create a new table with migration, set a foreign key
   - create a new model and set the 1-N relationship on both sides of the relation
   - create a factory for the new model
   - seed the database
   - CRUD operations for the 1-N relation: routing, controllers, views
   - define nested resource controllers
2. Add data to the application with N-N (many-to-many) relationship.
   - create a new table with migration, set a foreign key
   - create a new model and set the N-N relationship on both sides of the relation
   - create a factory for the new model
   - seed the database
   - CRUD operations for the N-N relation: routing, controllers, views

## Application tasks

1. After the complete management of the projects, let us create the necessary operations for the tracks belonging to the projects! Each project can have multiple tracks, but a track can only belong to 1 project. This is a 1-N (one-to-many) connection between projects and tracks!
   - Create the `Track` model with all its generable files (`-a` switch)!
   - Use the migration to create the `tracks` table, with the `project_id` field referencing the `id` field of the `projects` table with a foreign key constraint!
   - In REPL (tinker) try to create some tracks manually!
   - Set the relations in both the `Project` and` Track` models (`hasMany`, `belongsTo`)!
   - Try the relationships between the models in REPL!
     - get the corresponding tracks from the project side,
     - add a new track from the project side,
     - get the corresponding project from the track side,
     - cancel/add a project from the track side!
   - Create a factory for the Track model! (optional)
   - Seed the database with automatically generating multiple tracks for each newly added project! (optional)
   - Also list the tracks belonging to the project on the project details page!
   - It should be possible to add a new track to the project!
     - `name`
     - `filename`: can be NULL
     - `color`: default is `#ffffff`
   - It should be possible to modify a track!
   - It should be possible to delete a track!
2. Given a list of filters. You can add multiple filters for each track. That is, 1 track can have multiple filters and 1 filter can have multiple tracks. This is an N-N (many-to-many) relationship between tracks and filters.
   - Create the `Filter` model with migration, factory and seeder! You won't need a separate controller now.
   - Use the migration to create the `filters` table and the `filter_track` intermediate (pivot) table. The `track_id` and `filter_id` fields of the latter must be unique together and refer to the `id` field of the corresponding table (`tracks`, `filter`).
   - In REPL (tinker) try to create some filters manually!
   - Set the relations in both the `Track` and `Filter` models (`belongsToMany`, `belongsToMany`)!
   - Try the relationships between the models in REPL!
     - add new filters, delete filters, replace filters from the track side,
     - do the same from the filter side!
   - Create a factory for the Filter model! (optional)
   - Seed the database by taking a fixed number of records from filters and adding a few filters from them randomly for each new track! (optional)
   - When listing tracks, display the filters for the tracks!
   - When adding or editing a track, the filter list with the already applied filters should be displayed, and it should be possible to add, change or delete them. Filters should appear as a list of checkboxes!

## Relationships between models

Az adatbázis tábláink és az üzleti objektumaink sem egymástól elkülönülve működnek, hanem kapcsolatban állnak egymással.
Our database tables and our business objects do not operate in isolation, but are related to each other.

- 1-1 (one-to-one): an entity may be associated with another entity
- 1-N (one-to-many): an entity can be connected to several other entities, but in the other way all other entities can be connected to only one entity
- N-N (many-to-many): an entity can be connected to several other entities, and this is also true in the reverse direction, i.e. several other entities can be connected to this entity

## Database

In the database, relationships are described with primary and foreign keys. The primary key is basically used to identify a record within a table, typically under the name `id`. The foreign key points from another table to this table, and ensures that the integrity of the database is not compromised by leaving orphaned records, e.g. when the parent is deleted. In a database connections are implemented as follows:

- 1-1:
  - A
    - `a.id` primary key
  - B
    - `b.id` primary key
    - `b.a_id` foreign key, null and unique --> `a.id`
- 1-N:
  - A
    - `a.id` primary key
  - B
    - `b.id` primary key
    - `b.a_id` foreign key --> `a.id`
- N-N:
  - A
    - `a.id` primary key
  - B
    - `b.id` primary key
  - A_B
    - (`a_b.a_id`, `a_b.b_id`) primary key or unique
    - `a_b.a_id` foreign key --> `a.id`
    - `a_b.b_id` foreign key --> `b.id`

## Migrations

In migrations, tables must be created as above. For an N-N relation, the intermediate table name must contain the model names in alphabetical order.

```php
// 1-1
Schema::create('foos', function (Blueprint $table) {
  $table->id();
  $table->timestamps();
});
Schema::create('bars', function (Blueprint $table) {
  $table->id();
  $table->unsignedBigInteger('foo_id')->unique()->nullable();
  $table->timestamps();

  $table->foreign('foo_id')->references('id')->on('foos')->onDelete('cascade');
});
```

```php
// 1-N
Schema::create('foos', function (Blueprint $table) {
  $table->id();
  $table->timestamps();
});
Schema::create('bars', function (Blueprint $table) {
  $table->id();
  $table->unsignedBigInteger('foo_id');
  $table->timestamps();

  $table->foreign('foo_id')->references('id')->on('foos')->onDelete('cascade');
});
```

```php
// N-N
Schema::create('foos', function (Blueprint $table) {
  $table->id();
  $table->timestamps();
});
Schema::create('bars', function (Blueprint $table) {
  $table->id();
  $table->timestamps();
});
Schema::create('bar_foo', function (Blueprint $table) {
  $table->id();
  $table->unsignedBigInteger('foo_id');
  $table->unsignedBigInteger('bar_id');
  $table->timestamps();

  $table->unique(['foo_id', 'bar_id']);
  $table->foreign('foo_id')->references('id')->on('foos')->onDelete('cascade');
  $table->foreign('bar_id')->references('id')->on('bars')->onDelete('cascade');
});
// or
Schema::create('bar_foo', function (Blueprint $table) {
  $table->primary(['foo_id', 'bar_id']);

  $table->unsignedBigInteger('foo_id');
  $table->unsignedBigInteger('bar_id');
  $table->timestamps();

  $table->foreign('foo_id')->references('id')->on('foos')->onDelete('cascade');
  $table->foreign('bar_id')->references('id')->on('bars')->onDelete('cascade');
});
```

## Models

In Laravel, similar relationships can be defined between models than those relations between database tables. In the model classes, a public method must be created that returns the appropriate relation, indicating the target model of the relation.

```php
class Foo extends Model
{
    public function bars()
    {
        return $this->hasMany(Bar::class);
    }
}
class Bar extends Model
{
    public function foo()
    {
        return $this->belongsTo(Foo::class);
    }
}
```

The following options are available:

- 1-1
  - A: `hasOne`
  - B: `belongsTo`
- 1-N
  - A: `hasMany`
  - B: `belongsTo`
- N-N
  - A: `belongsToMany`
  - B: `belongsToMany`

## Queries

Relationships can be used from both sides. If we access them as dynamic properties, we get instances or collections.

```php
// 1-1
$foo->bar
$bar->foo

// 1-N
$foo->bars
$bar->foo

// N-N
$foo->bars
$bar->foos
```

If we use them as methods, you can add additional methods to them from the query builder class:

```php
$foo->bars()->where('id', 1)->first();
$foo->bars()->save($bar);
```

## Modifications

It is possible to add new relations or delete them from both sides:

```php
// 1->1 (hasOne)
$foo->bar()->save($bar);
$foo->bar()->create(['name' => 'something']); // fillable!

// 1<-1, 1<-N (belongsTo)
$bar->foo()->associate($foo);
$bar->save();
$bar->foo()->dissociate();
$bar->save();

// 1-N (hasMany)
$foo->bars()->save($bar);
$foo->bars()->create(['name' => 'something']); // fillable!
$foo->bars()->saveMany([
  new Bar(['name' => 'something']),
  new Bar(['name' => 'something']),
]);
$foo->bars()->createMany([
  ['name' => 'something'],
  ['name' => 'something'],
]); // fillable!

// N-N (belongsToMany)
$foo->bars()->attach([1, 2, 3]);
$foo->bars()->detach([1, 2, 3]);
$foo->bars()->sync([1, 2, 3]);
$foo->bars()->toggle([1, 2, 3]);
```

## Factories

```php
// Directly
Bar::factory()->create(['foo_id' => 1]);

// 1-N relationship
$user = User::factory()
            ->has(Post::factory()->count(3))
            ->create();
```

## Resource routing and controllers

In the case of 1-N connection, it is possible to create nested routes.

```php
Route::resource('foos.bars', 'FooBarController');
```

```
+-----------+----------------------------+-------------------+-----------------------------------------------+------------+
| Method    | URI                        | Name              | Action                                        | Middleware |
+-----------+----------------------------+-------------------+-----------------------------------------------+------------+
| GET|HEAD  | foos/{foo}/bars            | foos.bars.index   | App\Http\Controllers\FooBarController@index   | web        |
| GET|HEAD  | foos/{foo}/bars/{bar}      | foos.bars.show    | App\Http\Controllers\FooBarController@show    | web        |
| GET|HEAD  | foos/{foo}/bars/create     | foos.bars.create  | App\Http\Controllers\FooBarController@create  | web        |
| POST      | foos/{foo}/bars            | foos.bars.store   | App\Http\Controllers\FooBarController@store   | web        |
| GET|HEAD  | foos/{foo}/bars/{bar}/edit | foos.bars.edit    | App\Http\Controllers\FooBarController@edit    | web        |
| PUT|PATCH | foos/{foo}/bars/{bar}      | foos.bars.update  | App\Http\Controllers\FooBarController@update  | web        |
| DELETE    | foos/{foo}/bars/{bar}      | foos.bars.destroy | App\Http\Controllers\FooBarController@destroy | web        |
+-----------+----------------------------+-------------------+-----------------------------------------------+------------+
```

If the nested relation has a unique identifier, then the so-called shallow nested resource routes can be created. This gives shorter routes.

```php
Route::resource('foos.bars', 'FooBarController')->shallow();
```

```
+-----------+------------------------+------------------+------------------------------------------------+------------+
| Method    | URI                    | Name             | Action                                         | Middleware |
+-----------+------------------------+------------------+------------------------------------------------+------------+
| GET|HEAD  | foos/{foo}/bars        | foos.bars.index  | App\Http\Controllers\ProjectController@index   | web        |
| GET|HEAD  | bars/{bar}             | bars.show        | App\Http\Controllers\ProjectController@show    | web        |
| GET|HEAD  | foos/{foo}/bars/create | foos.bars.create | App\Http\Controllers\ProjectController@create  | web        |
| POST      | foos/{foo}/bars        | foos.bars.store  | App\Http\Controllers\ProjectController@store   | web        |
| GET|HEAD  | bars/{bar}/edit        | bars.edit        | App\Http\Controllers\ProjectController@edit    | web        |
| PUT|PATCH | bars/{bar}             | bars.update      | App\Http\Controllers\ProjectController@update  | web        |
| DELETE    | bars/{bar}             | bars.destroy     | App\Http\Controllers\ProjectController@destroy | web        |
+-----------+------------------------+------------------+------------------------------------------------+------------+
```

## Eager loading

It is possible not to load the relations into a model one by one, but instead to load them in advance, so the number of executed SQL statements can be greatly reduced.

```php
$books = App\Book::with('author')->get();

$books = App\Book::with('author.contacts')->get();

$books = App\Book::all();
$books->load('author');
```

## Solution guide

1. Create the `Track` model with all the generable files. Set the 1-N relationship between projects and tracks at the model level.

   - Create a `tracks` table using migration!
   - Track factory

     ```php
     class TrackFactory extends Factory {
       protected $model = Track::class;
       public function definition() {
         return [
           'name'     => $faker->word,
           'filename' => null,
           'color'    => $faker->hexColor,
        ];
       }
     }
     ```

   - `ProjectSeeder`

     ```php
     class ProjectSeeder extends Seeder
     {
       public function run()
       {
         DB::table('projects')->delete();

         Project::factory(3)
                ->has(Track::factory()->count(5))
                ->create();
       }
     }
     ```

   - `php artisan migrate:fresh --seed`: recreates the tables and runs the seeder.

2. Attach the `TrackController` shallowly to a resource route to the` projects.tracks` path. We don't need to list tracks, so we don't need the `index` method. It was implemented in `projects.show`.
   ```php
   Route::resource('projects.tracks', 'TrackController')->shallow()->except(['index']);
   ```
3. Display the track list on the project detail page!
4. Track CRUD. For example, editing:

   ```php
   public function create(Project $project)
   {
       return view('tracks.create', [
           'id' => $project['id'],
       ]);
   }

   public function store(Project $project, Request $request)
   {
       $data = $request->validate([
           'name'      => 'required',
           'file'      => 'nullable|file',
           'color'     => 'required|regex:/^#[0-9a-z]{6}$/',
       ]);
       $project->tracks()->create($data);
       return redirect()->route('projects.show', ['project' => $project['id']]);
   }
   ```

5. Create the `Filter` model with the necessary files.

   - Connect with N-N connection to tracks.
   - Create the table with migration.
   - `FilterFactory`
     ```php
     class FilterFactory extends Factory {
       protected $model = Filter::class;
       public function definition() {
         return [
           'name' => $faker->numerify('Filter ##'),
        ];
       }
     }
     ```
   - Seeders

     ```php
     class FilterSeeder extends Seeder
     {
       public function run()
       {
         DB::table('filters')->delete();
         Filter::factory(10)->create();
       }
     }

     class ProjectSeeder extends Seeder
     {
       public function run()
       {
         DB::table('projects')->delete();

         $filters = Filter::all();

         // App\Project::factory(3)->create()->each(function ($project) use ($filters) {
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

     class DatabaseSeeder extends Seeder
     {
       public function run()
       {
         // $this->call(UsersTableSeeder::class);
         $this->call(FilterSeeder::class);
         $this->call(ProjectSeeder::class);
       }
     }
     ```

6. Assign filters to tracks.

   - Display
     ```php
     <div class="form-group d-flex flex-wrap">
       @foreach ($filters as $filter)
         <div class="custom-control custom-switch col-sm-2">
           <input type="checkbox" class="custom-control-input" name="filters[]" id="filter-{{ $filter['id'] }}" value="{{ $filter['id'] }}"
             @if ($track->filters->contains($filter)) checked @endif
           >
           <label class="custom-control-label" for="filter-{{ $filter['id'] }}">
             {{ $filter['name'] }}
           </label>
         </div>
       @endforeach
     </div>
     ```
   - Editing

     ```php
     public function edit(Track $track)
     {
       $filters = Filter::all();
       $track->load('filters');
       return view('tracks.edit', compact('track', 'filters'));
     }

     public function update(Request $request, Track $track)
     {
         $data = $request->validate([
             'name'      => 'required',
             'file'      => 'nullable|file',
             'color'     => 'required|regex:/^#[0-9a-z]{6}$/',
             'filters'   => 'nullable|array',
         ]);
         $track->update($data);
         $track->filters()->sync($data['filters'] ?? []);
         return redirect()->route('projects.show', ['project' => $track->project['id']]);
     }
     ```
