# Laravel -- Relációk a modellek között

## Általános feladatok

1. Az alkalmazás kiegészítése olyan adatokkal, amelyek 1-N kapcsolatban vannak.
    - új tábla létrehozása migrációval, idegen kulcs beállítása
    - új modell létrehozása és az 1-N kapcsolat jelzése a reláció mindkét oldalán
    - factory létrehozása az új modellhez
    - az adatbázis seedelése
    - az 1-N kapcsolat CRUD műveletei: routing, vezérlők, nézetek (az egyik fele elvileg már megvan)
    - egymásba ágyazott resource vezérlők definiálása
2. Az alkalmazás kiegészítése olyan adatokkal, amelyek N-N kapcsolatban vannak.
    - új tábla létrehozása migrációval, idegen kulcs beállítása
    - új modell létrehozása és az N-N kapcsolat jelzése a reláció mindkét oldalán
    - factory létrehozása az új modellhez
    - az adatbázis seedelése
    - az N-N kapcsolat CRUD műveletei: routing, vezérlők, nézetek (az egyik fele elvileg már megvan)

## Alkalmazással kapcsolatos feladatok

1. A projektek teljes körű kezelése után végezzük el a projektekhez tartozó trackek kezelését! Minden projekthez több track tartozhat, de egy track csak 1 projekthez tartozhat. Ez egy 1-N kapcsolat a projektek és a trackek között!
    - Hozd létre a `Track` modellt a hozzá tartozó összes generálható kiegészítővel (`-a` kapcsoló)!
    - A migráció segítségével hozd létre a `tracks` táblát, aminek `project_id` mezője mutasson idegen kulcs megszorítással a `projects` tábla `id` mezőjére!
    - REPL-ben (tinker) próbálj meg néhány track-et kézzel létrehozni!
    - Állítsd be a relációkat a `Project` és a `Track` modellben is (`hasMany`, `belongsTo`)!
    - REPL-ben próbáld ki a modellek közötti kapcsolatokat!
      - projekt oldalról lekérni a hozzá tartozó trackeket,
      - projekt oldalról felvenni egy új tracket,
      - track oldalról lekérni a hozzá tartozó projektet,
      - track oldalról megszüntetni/felvenni egy projektet!
    - Készítsd el a factory-t a Track modellhez! (opcionális)
    - Készítsd el az adatbázis seedelését úgy, hogy minden újonnan felvett projekthez automatikusan generálj több tracket is! (opcionális)
    - A projekt részletei oldalon listázd ki a projekthez tartozó trackeket is!
    - Legyen lehetőség új tracket felvenni a projekthez!
      - `name`
      - `filename`: NULL is lehet
      - `color`: alapértelmezett értéke `#ffffff`
    - Legyen lehetőség egy tracket módosítani!
    - Legyen lehetőség egy tracket törölni!
2. Adott szűrők egy listája. Minden trackhez több szűrőt is felvehetünk. Azaz 1 trackhez több szűrő is tartozhat és 1 szűrőhöz több track is tartozhat. Ez egy N-N kapcsolat a trackek és szűrők között.
    - Hozd létre a `Filter` modellt mingrációval, factoryval és seederrel! Vezérlőre most nem lesz szükség külön.
    - A migráció segítségével hozd létre a `filters` táblát és a `filter_track` kapcsolótáblát. Ez utóbbinak a `track_id` és `filter_id` mezője együttesen legyen egyedi, és mutassanak a megfelelő tábla (`tracks`, `filter`) `id` mezőjére!
    - REPL-ben (tinker) próbálj meg néhány szűrőt kézzel létrehozni!
    - Állítsd be a relációkat a `Track` és a `Filter` modellben is (`belongsToMany`, `belongsToMany`)!
    - REPL-ben próbáld ki a modellek közötti kapcsolatokat!
      - track oldalról vegyél fel új szűrőket, törölj szűrőket, cserélj le szűrőket,
      - ugyanezt tedd meg szűrő oldalról is!
    - Készítsd el a factory-t a Filter modellhez! (opcionális)
    - Készítsd el az adatbázis seedelését úgy, hogy szűrőkből egy fix számú adatot veszünk fel, és minden új trackhez ezekből vegyünk fel pár szűrőt véletlenszerűen! (opcionális)
    - Trackek listázásánál jelenítsd meg a trackekhez tartozó szűrőket!
    - Track felvételekor vagy szerkesztésekor jelenjen meg a szűrőlista a már aktivált szűrőkkel, és legyen lehetőség ezeket is megadni, változtatni, törölni. A szűrők egy jelölőmezőlistában jelenjenek meg!
    
## Modellek közötti kapcsolatok, relációk

Az adatbázis tábláink és az üzleti objektumaink sem egymástól elkülönülve működnek, hanem kapcsolatban állnak egymással. 
- 1-1: egy entitáshoz egy másik entitás kapcsolódhat
- 1-N: egy entitáshoz több másik entitás kapcsolódhat, de visszafele minden másik entitás csak egy entitáshoz kapcsolódhat
- N-N: egy entitáshoz több másik entitás kapcsolódhat, és ez igaz a vissza irányra is, azaz egy másik entitáshoz több egyik entitás kapcsolódhat

## Adatbázis

Az adatbázisban a kapcsolatokat elsődleges és másodlagos kulcsokkal írjuk le. Az elsődleges kulcs alapvetően egy rekord azonosítására szolgál egy táblán belül, tipikusan `id` név alatt. Az idegen kulcs egy másik táblából mutat a táblára, és biztosítja, hogy az adatbázis integritása ne sérüljön az által, hogy árva rekordok maradjanak pl., ha a szülőt törlik. Adatbázisban a kapcsolatok a következőképpen implementálódnak:
- 1-1: 
  - A
    - `a.id` elsődleges kulcs
  - B
    - `b.id` elsődleges kulcs
    - `b.a_id` másodlagos kucs, null és egyedi --> `a.id`
- 1-N: 
  - A
    - `a.id` elsődleges kulcs
  - B
    - `b.id` elsődleges kulcs
    - `b.a_id` másodlagos kucs --> `a.id`
- N-N: 
  - A
    - `a.id` elsődleges kulcs
  - B
    - `b.id` elsődleges kulcs
  - A_B
    - (`a_b.a_id`, `a_b.b_id`) elsődleges kulcs vagy egyedi
    - `a_b.a_id` másodlagos kucs --> `a.id`
    - `a_b.b_id` másodlagos kucs --> `b.id`

## Migrációk

A migrációkban a fenti módon kell a táblákat létrehozni. N-N kapcsolatnál a kapcsolótábla nevének abc sorrendben kell tartalmaznia a modellek neveit.

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

## Modellek

Laravelben a modellek között lehet az adatbázis táblák közötti kapcsolatokhoz hasonló kapcsolokat definiálni. A modellosztályokban kell egy publikus metódust létrehozni, ami a megfelelő relációval tér vissza, megjelölve a reláció célmodelljét.

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

A következő lehetőségek vannak:
- 1-1
  - A: `hasOne`
  - B: `belongsTo`
- 1-N
  - A: `hasMany`
  - B: `belongsTo`
- N-N
  - A: `belongsToMany`
  - B: `belongsToMany`

## Lekérdezések

A relációkat mindkét oldalukról lehet használni. Ha dinamikus tulajdonságként érjük el őket, akkor példányokat vagy gyűjteményeketr kapunk.

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

Ha metódusokként használjuk őket, akkor további metódusok fűzhetők hozzájuk a query builder osztályból:

```php
$foo->bars()->where('id', 1)->first();
$foo->bars()->save($bar);
```

## Módosítások

Új relációkat felvenni, megszüntetni mindkét oldalról lehetséges:

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

## Factory-k

```php
// Direkt megadás
factory(Bar::class)->create(['foo_id' => 1]);

// factory definíció
$factory->define(App\Post::class, function ($faker) {
  return [
    'user_id' => factory(App\User::class),
  ];
});

// 1-N kapcsolat
$users = factory(App\User::class, 3)
            ->create()
            ->each(function ($user) {
                $user->posts()->save(factory(App\Post::class)->make());
            });

// vagy
$user->posts()->createMany(
    factory(App\Post::class, 3)->make()->toArray()
);
```

## Resource routing és vezérlők

1-N kapcsolat esetén egymásba ágyazott route-ok létrehozására van lehetőség.

```php
Route::resource('foos.bars', 'FooBarController');
```
```
+-----------+----------------------------+-------------------+-----------------------------------------------+------------+
| Method    | URI                        | Name              | Action                                        | Middleware |
+-----------+----------------------------+-------------------+-----------------------------------------------+------------+
| POST      | foos/{foo}/bars            | foos.bars.store   | App\Http\Controllers\FooBarController@store   | web        |
| GET|HEAD  | foos/{foo}/bars            | foos.bars.index   | App\Http\Controllers\FooBarController@index   | web        |
| GET|HEAD  | foos/{foo}/bars/create     | foos.bars.create  | App\Http\Controllers\FooBarController@create  | web        |
| PUT|PATCH | foos/{foo}/bars/{bar}      | foos.bars.update  | App\Http\Controllers\FooBarController@update  | web        |
| GET|HEAD  | foos/{foo}/bars/{bar}      | foos.bars.show    | App\Http\Controllers\FooBarController@show    | web        |
| DELETE    | foos/{foo}/bars/{bar}      | foos.bars.destroy | App\Http\Controllers\FooBarController@destroy | web        |
| GET|HEAD  | foos/{foo}/bars/{bar}/edit | foos.bars.edit    | App\Http\Controllers\FooBarController@edit    | web        |
+-----------+----------------------------+-------------------+-----------------------------------------------+------------+
```

Ha a tartalmazott kapcsolatnak van egyedi azonosítója, akkor lehet ún. sekély egymásba ágyazott resource route-okat létrehozni. Ezzel rövidebb útvonalakat kapunk.

```php
Route::resource('foos.bars', 'FooBarController')->shallow();
```
```
+-----------+------------------------+------------------+------------------------------------------------+------------+
| Method    | URI                    | Name             | Action                                         | Middleware |
+-----------+------------------------+------------------+------------------------------------------------+------------+
| PUT|PATCH | bars/{bar}             | bars.update      | App\Http\Controllers\ProjectController@update  | web        |
| GET|HEAD  | bars/{bar}             | bars.show        | App\Http\Controllers\ProjectController@show    | web        |
| DELETE    | bars/{bar}             | bars.destroy     | App\Http\Controllers\ProjectController@destroy | web        |
| GET|HEAD  | bars/{bar}/edit        | bars.edit        | App\Http\Controllers\ProjectController@edit    | web        |
| GET|HEAD  | foos/{foo}/bars        | foos.bars.index  | App\Http\Controllers\ProjectController@index   | web        |
| POST      | foos/{foo}/bars        | foos.bars.store  | App\Http\Controllers\ProjectController@store   | web        |
| GET|HEAD  | foos/{foo}/bars/create | foos.bars.create | App\Http\Controllers\ProjectController@create  | web        |
+-----------+------------------------+------------------+------------------------------------------------+------------+
```

## Eager loading

Lehetőség van nem egyesével, hanem előre betölteni a relációkat egy modellbe, így a lefuttatott SQL utasítások száma nagy mértékben csökkenthető.

```php
$books = App\Book::with('author')->get();

$books = App\Book::with('author.contacts')->get();

$books = App\Book::all();
$books->load('author');
```

## Megoldási segédlet

1. Hozzuk létre a `Track` modellt az összes segédlettel. Állítsuk be a projektek és trackek közötti 1-N kapcsolatot modell szinten.
    - Hozzuk létre a `tracks` táblát migráció segítségével!
    - Track factory
      ```php
      $factory->define(Track::class, function (Faker $faker) {
        return [
          'name'     => $faker->word,
          'filename' => null,
          'color'    => $faker->hexColor,
        ];
      });
      ```
    - `ProjectSeeder`
      ```php
      class ProjectSeeder extends Seeder
      {
        public function run()
        {
          DB::table('projects')->delete();
          
          factory(App\Project::class, 3)->create()->each(function ($project) {
            $project->tracks()->createMany(
              factory(App\Track::class, 5)->make()->toArray()
            );
          });
        }
      }
      ```
    - `php artisan migrate:fresh --seed`: újra létrehozza a táblákat és lefuttatja a seedert.
2. Csatoljuk a `TrackController`-t sekély módon egy resource route-hoz a `projects.tracks` útvonalra. A trackek listázása nincs szükségünk, ezért az `index` metódus nem kell. Azt a `projects.show`-ban implementáltuk.
    ```php
    Route::resource('projects.tracks', 'TrackController')->shallow()->except(['index']);
    ```
3. A projekteknél jelenítsük meg a tracklistát!
4. Track CRUD. Például a szerkesztés:
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
5. Hozzuk létre a `Filter` modellt a szükséges kiegészítőkkel.
    - Kapcsoljuk össze N-N kapcsolattal a trackekkel.
    - A migrációval hozzuk létre a táblát.
    - `FilterFactory`
      ```php
      $factory->define(Filter::class, function (Faker $faker) {
        return [
          'name' => $faker->numerify('Filter ##'),
        ];
      });
      ```
    - Seederek
      ```php
      class FilterSeeder extends Seeder
      {
        public function run()
        {
          DB::table('filters')->delete();
          factory(Filter::class, 10)->create();
        }
      }

      class ProjectSeeder extends Seeder
      {
        public function run()
        {
          DB::table('projects')->delete();
          
          $filters = Filter::all();

          factory(App\Project::class, 3)->create()->each(function ($project) use ($filters) {
            $project->tracks()->createMany(
              factory(App\Track::class, 5)->make()->toArray()
            )->each(function ($track) use ($filters) {
              for ($i = 0; $i < random_int(1, 4); $i++) {
                $track->filters()->toggle($filters[random_int(0, 9)]);
              }
            });
          });
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
6. Filterek track-ekhez rendelése.
    - Megjelenítés
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
    - Szerkesztés
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
