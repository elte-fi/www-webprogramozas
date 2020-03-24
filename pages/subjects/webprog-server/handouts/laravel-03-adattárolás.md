# Laravel -- Adattárolás, egyszerű modellek

## Általános feladatok

1. Az adatbázis beállítása
2. Modell létrehozása
3. Tábla létrehozása migrációval
4. Rekord létrehozása véletlen adatokkal, factory
5. Tábla feltöltése véletlen rekordokkal, seeder
6. CRUD műveletek implementálása egy modellen
7. Refaktorálás
    - Resource routes and controllers, route model binding
    - Form request osztály használata

## Alkalmazással kapcsolatos feladatok

1. Hozz létre egy SQLite adatbázist! Ehhez használj egy SQLite klienst, pl. a DB Browser for SQLite programot. Ebben elég egy üres adatbázist létrehozni a `database` mappában.
2. Konfiguráld be a Laravelt az adatbázis használatához! A `.env` fájlban állítsd be, hogy SQLite-ot használunk, és add meg az adatbázis nevét!
3. Hozz létre egy modellt a projektek kezelésére és tárolására! A modell mellett hozz létre a modellhez tartozó migrációt, factory-t és seedert is!
4. Nézd meg a modellt! Egyelőre nem kell vele semmit csinálni!
5. Migráció segítségével hozd létre a projekteket tároló táblát!
6. Parancssori REPL-ben (tinker) hozz létre és listázz projekteket!
7. Factory segítségével hozz létre a táblában véletlen rekordokat! (opcionális)
8. Seeder segítségével töltsd fel a táblát! (opcionális)
9. Valósítsd meg a felületene a CRUD műveleteket a projektekkel kapcsolatban!
    - listázd ki az összes projektet
    - hozz létre egy új projektet
    - szerkessz egy projektet
    - törölj egy projektet
    - mutasd meg egy projekt részleteit
10. Alakítsd át a routingot és a vezérlőosztályt, hogy ún. resourceful legyen. Ennek kapcsán használj route model binding-ot. Az ismétlődő validáció elkerülése érdekében használja FormRequest osztályt!

## Adatbázis beállítása

A Laravel több relációs adatbázissal képes együtt működni. Első lépésként hozzuk létre az adatbázisunkat, hogy az létezzen! A többi lépést Laravelen keresztül végezzük el. Második lépés az adatbázis beállítása. A konfiguráció alapvetően a `config/database.php` állományban van, de ez jórészt a `.env` állományból olvassa fel az adatokat. Pl. SQLite használatához a `.env` fájlban írjuk át a következőket:

```
DB_CONNECTION=sqlite
DB_DATABASE=mydb.sqlite
```

Egy dolgot még javítanunk kell a `config/database.php`-ban, hogy a konzol és a webszerver ugyanott keresse az adatbázist:

```
'connections' => [
  'sqlite' => [
    'database' => database_path(env('DB_DATABASE', 'database.sqlite')),
  ],
]
```

## Modell

Eljutottunk arra a pontra, hogy az alkalmazásban szükséges megjelennie a modell rétegnek is, amely az adatok tárolását, adatbázissal való kapcsolatért felel. Ez Laravelben alapvetően az ún. Eloquent ORM segítségével történik, ami egy aktív rekord minta implementációja. Modellt a következőképpen hozhatunk létre:

```
php artisan make:model Foo
```

A modell mellett azonban számos, a modell használatához szükséges állományra is szükségünk lehet: factory-ra, seederre, migrációs fájlra, vezérlőre. Ezeket a fenti utasítás további kapcsolóin keresztül tudjuk létrehozatni. Természetesen ezek külön is létrehozhatók, hiszen ezekhez is van parancs. Pl.:

```
php artisan make:model Foo -mfs
php artisan make:model Foo -a
php artisan make:factory FooFactory
```

A modell egy egyszerű osztály, amely a Laravel `Model` osztályát terjeszti ki, ebből rengeteg logikát átvéve. A modell névkonvenciók alapján működik, amelyek azonban finomhangolhatóak igény szerint:

- modell nevének angol többesszámú formájában keresi a neki megfelelő adatbázis táblát
- `id` mező az elsődleges kulcs
- `created_at`, `updated_at` timestamp mezőket tartalmaz a tábla

```php
class Foo extends Model
{

}
```

Használata (feltételezve, hogy van egy `foos` tábla az adatbázisban `a` és `b` mezőkkel):

```php
// új rekord létrehozása
$foo = new Foo();
$foo->a = 1;
$foo->b = 2;
$foo->save();

// új rekord létrehozása
$foo = Foo::create([
  'a' => 1,
  'b' => 2,
]);
// de ehhez be kell állítani a modellen, hogy az a és b mező ún. fillable mező:
class Foo extends Model
{
  protected $fillable = ['a', 'b'];
}

// több elem lekérdezése
$foos = Foo::all();
$foos = Foo::find([1, 2, 3]);
$foos = Foo::where('a', '>=', 10)->get();

foreach($foos as $foo) { /* ... */ }

// egy elem lekérdezése
$foo = Foo::find(1);
$foo = Foo::findOrFail(1);
$foo = Foo::first();
$foo = Foo::firstOrFail();

// elem szerkesztése
$foo = Foo::first();
$foo->a = 100;
$foo->save();

// több elem szerkesztése
Foo::where('a', '>=', 10)->update(['b' => 100]);

// elem törlése
$foo = Foo::first();
$foo->delete();

// elem törlése
Foo::destroy(1);

// több elem törlése
Foo::destroy([1, 2, 3]);
Foo::where('id', '<=', 3)->delete();
```

## Migrációs állományok

Migrációk segítségével kóddal tudunk táblákhoz tartozó létrehozó, módosító műveleteket elvégezni. Ez elsősorban arra jó, hogy így verziózni tudjuk az adatbázisbeli módosításainkat, másrészt az adott nyelv kontextusából sem kell kilépnünk. Minden migrációnak implementálnia kell a módosítást (`up`) és a visszavonó műveletet (`down`). Migrációt parancssorban tudunk létrehozatni, de egyszerűbb, ha modell létrehozásakor ezt is rögtön legyártatjuk:

```
php artisan make:migration filename
php artisan make:model Foo -m
```

A migrációs állományban használható utasításokat ld. a dokumentációban. Egy migrációs állomány egyszerűbb esetekben így nézhet ki:

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

Migrációk futtatása:

```bash
# Státusz
php artisan migrate:status
# Új migrációk futtatása
php artisan migrate
# Migráció visszavonása
php artisan migrate:rollback
php artisan migrate:reset
# Minden migráció futtatása elölről
php artisan migrate:fresh
```

## Factory

Teszteléshez vagy fejlesztéshez szükség lehet gyorsan rekordokat generáltatni. Erre szolgálnak a modellgyárak, azaz a factory-k. Ugyan kézzel is generáltathatunk bele értékeket, de lehet használni a [`Faker` függvénykönyvtárat](https://github.com/fzaninotto/Faker), amelyet pont arra a célra fejlesztettek, hogy különböző típusú véletlen értékeket generáljon. A factory-t is érdemes a modellel együtt létrehozni, de külön is létrehozható:

```
php artisan make:model Foo -f
php artisan make:factory FooFactory -m Foo
```
```php
$factory->define(Foo::class, function (Faker $faker) {
    return [
        'a'     => $faker->randomDigit,
        'b'     => $faker->optional()->randomNumber(3),
        'name'  => $faker->lastName,
    ];
});
```

Használata:

```php
// új példány létrehozása
$foo = factory(Foo::class)->make();
// új rekord létrehozása az adatbázisban
$foo = factory(Foo::class)->create();
// több rekord létrehozása az adatbázisban
factory(Foo::class, 5)->create();
// mezők felüldefiniálása
factory(Foo::class, 5)->create(['b' => 42]);
```

## Seeder

Teszteléshez, fejlesztéshez jó, ha az adatbázisunk fel van töltve példaadatokkal. Erre a seedereket használjuk. Létrehozása külön vagy a modellel együtt történhet:

```
php artisan make:seeder FooTableSeeder
php artisan make:model Foo -s
```

Egy `run` metódust kell implementálni. Új elem létrehozása történhet Database builder utasításokkal, modell használatával vagy factorykkal. Pl.:

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

A seedereket általában egy központi `DatabaseSeeder` osztályban hívjuk meg:

```php
class DatabaseSeeder extends Seeder
{
  public function run()
  {
    $this->call(FooTableSeeder::class);
  }
}
```

Használata:

```
php artisan db:seed
php artisan db:seed --class=FooTableSeeder
```

## Resource routing és vezérlők

CRUD műveletek megvalósításának nagyjából mindig ugyanaz az elemkészlete:
- elemek listázása
- egy elem megjelenítése
- új elem létrehozása
  - űrlap megjelenítése
  - új elem mentése
- elem szerkesztése
  - űrlap megjelenítése
  - elem módosítása
- elem törlése

Ez az elemkészlet a route-ok neveiben is tükröződik, valamint a vezérlőmetódusok elnevezésében és szignatúrájában is. Ennek az ismétlődő tevékenységnek a kezeléséhez a Laravel segítséget ad. Route-ok esetében lehetőség van ún. resource route definiálására:

```php
Route::resource('foos', 'FooController');
```

Az alábbi paranccsal megtekinthetők az így regisztrált útvonalak:

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

E mellett lehetőség van resource vezérlők létrehozására is:

```
php artisan make:controller FooController -r
```

Ezzel az utasítással a resource route-nak megfelelő metódusnévvel és szignatúrával jönnek létre a vezérlők:

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

Az útvonalban általában az adott erőforrás azonosítója jelenik meg, így a route és a vezérlő sokszor így néz ki:

```php
Route::get('/foos/{id}', function ($id) {
  $foo = Foo::find($id);
  // $foo
});
```

A modell lekérdezése spórolható meg akkor, ha jelezzük a vezérlőmetódus szignatúrájában az adott modell típusát. E mellett még nagyon fontos az is, hogy az útvonalparaméter neve és a szignatúrában szereplő paraméter neve megegyezzék. Ekkor a keretrendszer automatikusan példányosítja az útvonalban érkező azonosító alapján a megfelelő modellt.

```php
Route::get('/foos/{foo}', function (Foo $foo) {
  // $foo
});
```

## Form request

A kérések ismétlődő validációit egy külön osztályba, az ún. Form Request-ekbe lehet szervezni. Ez arra is jó, hogy a felelősségi köröket jobban elkülönítsük, így a vezérlő valóban a beolvasás, feldolgozás és kiírás logikáját tartalmazhassa.

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

A vezérlőkben ilyen osztállyal kell annotálni a paramétert. Ekkor a keretrendszer a metódus meghívása előtt lefuttatja a kérésen a validációt, ha hibás, akkor átirányít, egyébként ezt követően hívja meg a metódust. A kérésből pedig kiolvashatók a validált adatok:

```php
public function store(FooFormRequest $request) 
{
  $data = $request->validated();
}
```

## Megoldási segédlet

1. Állítsd be az adatbázist és a konfigurációt a leírás szerint!
2. Hozz létre egy modellt a projekteknek a migrációval, factoryval és seederrel együtt:
    ```
    php artisan make:model Project -mfs
    ```
3. Hozd létre az adatbázis táblát a migráció segítségével:
    - `name`
    - `description`: NULL is lehet
    - `bg_url`: NULL is lehet
    ```
    php artisan migrate
    ```
4. Parancssorban próbálj egy új projektet létrehozni és listázni:
    ```
    php artisan tinker
    >>> $p = new App\Project()
    >>> $p->name = 'New project 1'
    >>> $p->save()
    >>> 
    >>> App\Project::all()
    >>> App\Project::find(1)
    ```
5. Az így kikísérletezett megoldásokat alkalmazd az eddig elkészített projektműveleteken. 
    
    Például egy projekt szerkesztése vezérlőszinten így néz ki:
    
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
6. Vezess be resource route-ot a projektekhez. Az eddigi útvonalakat töröld, és egyetlen sorral regisztráld mindegyiket! A vezérlőmetódusokban használj route model bindingot:
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
7. Végül a `store` és `update` metódusok validációját szervezzük ki egy külön form request osztályba.
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
