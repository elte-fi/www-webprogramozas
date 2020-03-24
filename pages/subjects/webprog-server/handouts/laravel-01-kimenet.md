# Laravel -- A kimenet generálása

A szerveroldali MVC keretrendszerekkel, és ezen belül a válaszott keretrendszerünkkel, a Laravellel való ismerkedést egy konkrét alkalmazás fejlesztésén keresztül tesszük meg. Az alkalmazásban a belépett felhasználó a zenei projektjeit tarthatja nyilván, minden projekthez zenei trackek tartoznak, és minden track esetében az előre megadott szűrők közül alkalmazhatjuk a kívántakat. Előzetesen az alkalmazás a következő funkciókból áll:

- főoldal: pár fontos információ a tárgyról
- legyen egy segédlet oldal, ahol transzponálni tudunk egy hangot
- projekteket listázó oldal
- új projekt hozzáadása
- projekt szerkesztése és törlése funkció
- projekt részletei: itt jelennek meg a projekthez tartozó track-ek és minden tracknél az alkalmazott szűrők listája
- új track hozzáadása a projekthez
- track szerkesztés és törlése
- felhasználó regisztrálása, beléptetése, kiléptetése funkciók
- megfelelő jogosultságkezelés: minden felhasználó csak az általa felvett adatokhoz fér hozzá.

Az alkalmazást lépésről lépésre fejlesztjük:

1. A kimenet előállítása
2. Bemeneti adatok, űrlapfeldolgozás
3. Adatok tárolása: adatbázis, külön modellek
4. Adatok tárolása: modellek közötti kapcsolatok
5. Azonosítás és jogosultságkezelés
6. További funkciók: fájlfeltöltés és AJAX

Ez a leírás az 1. fejezettel, a kimenet generálásával foglalkozik.

## Feladatok

1. Készítsd el az alkalmazás főbb képernyőinek statikus prototípusát! Hivatalosan ez két részből áll:
    - megrajzolni, megtervezni a felületeket,
    - majd azokból HTML, CSS segítségével elkészíteni a statikus prototípust.

    De egyszerűbb esetekben lehet csak az utóbbit használni.
2. Telepítsd fel a Laravel keretrendszert!
3. Jelenítsd meg az 1. pontban előkészített oldalakat a megfelelő végpontok alatt:
    - `/`: főoldal
    - `/projects`: projektek listája
    - `/projects/create`: új projekt felvétele
    - `/projects/1`: projekthez tartozó track-ek listája
    - `/projects/1/tracks/create`: új track felvétele
    - `transposer`: a transzponáló oldal
4. Jeleníts meg pár beégetett adatot a felületeken! Pl:
    - A rendszerben tárolt projektek számát a főoldalon
    - A projektlistát
    - A trackek listáját
    - Projekt szerkesztését
    - Track szerkesztését
5. Az oldalak közös részét emeld ki egy layout fájlba!

## Statikus prototípus

A kiindulási pontként tekintett statikus prototípus letölthető és megtekinthető. Pár HTML állományból áll, a kinézetet Twitter Bootstrap CSS keretrendszer segítségével oldottuk meg. A prototípus kiindulási pont, később még változhat fejlesztés közben.

## Laravel telepítése

- [Detailed installation guide in the documentation](https://laravel.com/docs/6.x/installation)
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

## Statikus HTML megjelenítése

A Laravel egy PHP MVC keretrendszer, azaz a kód strukurálására a Modell-Nézet-Vezérlő mintát ajánlja. Ebben a **modell** felelős az adatok tárolásáért és felületfüggetlen feldolgozásáért, a **nézet** az adatok megjelenítéséért, azaz a mi esetünkben a HTML előállításáért, és a **vezérlő** az, ami fogadja a HTTP kérést, beolvassa az adatokat, meghívja a Modellréteg feldolgozó függvényeit, majd ezek eredményét a kiírja a nézet meghívásával. A legtöbb MVC-s keretrendszernek központi eleme még a **routing**, amely során egy URL, egy végpontot a megfelelő vezérlőlogikához rendelünk.

Egy egyszerű HTML oldal megjelenítéséhez nem kell adat, viszont végpont alatt jelennek az oldalak, azaz kell bele routing, ami egy vezérlőmetódushoz irányítja a végrehajtást, ami egyszerűen megjeleníti a nézetet, ami a HTML-ünket tartalmazza. Azaz ezt az egyszerű kis dolog elvégézéséhez rögtön három komponens kell:
- routing
- controller
- view

### Nézet (view)

A nézeteinket, azaz a HTML sablonjainkat a Laravel a `resources/views` mappába várja. Mivel ritkán szoktunk statikus tartalmat megjeleníteni, ezért ebben HTML sablonok vannak elhelyezve. A sablonokat egy sablonnyelven kell leírni (ilyen lehet pl. a sima PHP is, de van a Smarty, Twig, stb), amely Laravelben a Blade sablonkönyvtár. Ezért a fájlokat `.blade.php` kiterjesztéssel kell ellátni. A fájlokat további almappákba lehet szervezni.

Statikus tartalomhoz is tehát egy blade fájl létrehozása szükséges, amibe belemásoljuk a statikus HTML tartalmat.

### Routing

A következő fontos dolog a végpont regisztrálása a rendszerben és vezérlő metódus hozzárendelése. Ezt a `routes/web.php` állományban tehetjük meg. A `Route` osztály statikus metódusain keresztül tudjuk a hozzárendeléseket megtenni. Ezekben fel kell tüntetni a megfelelő HTTP metódust, a végpontot, valamint a vezérlőmetódust. Ld. alább a konkrét példákat.

A hozzárendelés többféle módon történhet:
- Closure-rel
  ```php
  Route::get('/endpoint', function () {
    // controller logic
  });
  ```
- Egy vezérlőosztály megfelelő metódusára hivatkozva:
  ```php
  Route::get('/endpoint', 'FooController@some_method');
  ```

Gyakori, hogy egy végponthoz egy nevet is rendelünk. Így későbbiekben elég a névre hivatkozni, és nem okoz gondot, ha a végpont megváltozik.

```php
Route::get('/endpoint', 'FooController@some_method')->name('foo');
```

### Vezérlő

Az előbb láthattuk, hogy a vezérlő lehet csak egy closure függvény. De lehet egy külön osztálymetódus is. Ezt legegyszerűbben a Laravellel legyártathatjuk:

```
php artisan make:controller FooController
```

A fájl az `app/Http/Controllers` mappában jön létre. Ebben hozzuk létre a vezérlőmetódust:

```php
class FooController extends Controller
{
  public function some_method()
  {
    // controller logic
  }
}
```

### Nézet megjelenítése

Nézet megjelenítéséhez a vezérlőmetódusban egy szöveggel kell visszatérni, ami a nézet fájlnevére utal:
- `'foo'` --> `foo.blade.php`
- `'foo.bar'` --> `foo/bar.blade.php`

Így összességében a következő lehetőségeink vannak a nézet megjelenítésére:
- Route + closure
  ```php
  Route::get('/some', function () {
    return 'foo';
  });
  ```
- Előbbi rövidítése, ha nincs további logika, főleg statikus oldalakhoz jó
  ```php
  Route::view('/some', 'foo');
  ```
- Külön vezérlőosztály valamelyik metódusa
  ```php
  class FooController extends Controller
  {
    public function some_method()
    {
      return 'foo';
    }
  }
  ```

## Adatok megjelenítése

### Blade

A Blade sablonkönyvtár rengeteg lehetőséget biztosít (ld. dokumentáció), de ezekből elég csak néhányat tudni, hogy az esetek nagy részét lefedjük. A Blade a PHP alternatív szintaxisának egyszerűsített változatát használja, csak el kell hagyni a PHP tageket és a kettőspontot. Ha azt ismerjük, ez is könnyen megy. Pl.

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

Fontosabb szabályok:

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

### Adatok átadása a nézetnek

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

A layout fájlban vannak a közös részek. A layout fájl ún. section-ök tartalmát írja ki a `@yield` segítségével:

```php
<!doctype html>
<meta charset="utf-8">
<title>@yield('title')</title>

<div class="container">
  @yield('content')
</div>
```

Az adott tartalmat szolgáltató oldal egy adott layoutot felhasználva definiálja azokat a `@section`-öket, amelyek a layoutban kiírásra kerülnek.

```php
@extends('layout')

@section('title', 'My content page')

@section('content')
  <p>The content</p>
@endsection
```

## Megoldási segédlet

1. Telepítés és a fejlesztői szerver elindítása, oldal megjelenítése
2. Másoljuk a statikus állományokat a `resources/views` mappába. Rakjuk a projektekkel kapcsolatosakat egy `projects`, a trackekkel kapcsolatosakat pedig egy `tracks` mappába!
3. A `routes/web.php`-ban jelenítsük meg a főoldalt closure-rel:
    ```php
    Route::get('/', function () {
      return view('main');
    });
    ```
4. A többit jelenítsük meg `Route::view`-val, pl:
    ```php
    Route::view('/projects', 'projects.list');
    ```
5. Használjunk külön vezérlőosztályt: `ProjectController`
    - `index()`: projektlista
    - `create()`: új projekt
6. Jelenítsünk meg adatokat:
    - Projektek száma a főoldaloon
      ```php
      Route::get('/', function () {
        return view('main', [
          'number_of_tracks' => 123,
        ]);
      });
      ```
    - projektlista
      ```php
      public function index()
      {
        $projects = [
          [
            'id'          => 1,
            'name'        => 'Project1',
            'description' => 'Description1',
            'bg_url'      => 'http://www.ilfondamento.be/wp-content/uploads/2019/08/musicworkshop-image.jpg',
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
7. A közös HTML részeket szervezzük ki egy layoutba.
