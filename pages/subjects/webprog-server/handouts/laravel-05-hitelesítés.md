# Laravel -- Hitelesítés és jogosultságkezelés

## Általános feladatok

1. Védjünk le bizonyos oldalakat, hogy csak bejelentkezett felhasználók érhessék el azokat! Ehhez kell:
   - regisztrációs oldal
   - beléptető oldal
2. Oldjuk meg, hogy a bejelentkezett felhasználó csak bizonyos tartalmakhoz férjen hozzá. Például azokhoz, amiket ő maga hozott létre!

## Alkalmazással kapcsolatos feladatok

1. Eddig bárki bármelyik projekthez hozzáférhetett. Védjük le a projekt- és trackkezelést, hogy csak belépett felhasználók érhessék el ezeket az oldalakat. Vendég felhasználó csak a főoldalhoz férhet hozzá!
   - Készíts egy regisztrációs oldalt, ahol megadhatjuk az új felhasználó adatait!
   - A beléptetéshez készíts egy külön oldalt!
   - Beléptetés után kerüljünk a projektlistázó oldalra!
2. Oldd meg, hogy csak az adott felhasználó által létrehozott projektek legyenek elérhetőek!
3. Ha a felhasználó olyan projektet vagy tracket akar megjeleníteni, amelyhez nem az övé, dobjunk 403-as hibát!

## Hitelesítés és jogosultságkezelés

**Hitelesítés** az a folyamat, amikor megtudjuk, hogy ki áll a kérés mögött. Ha a felhasználót nem ismerjük, akkor névtelen vagy vendégfelhasználóként azonosítjuk.

**Jogosultságkezelés** során arra a kérdésre keressük a választ, hogy az azonosított felhasználónak joga van-e bizonyos erőforrásokhoz (oldalakhoz, oldalrészekhez, adatmodellekhez) hozzáférni.

## Hitelesítés Laravelben

A Laravelnek jól kidolgozott hitelesítési rendszere van. Képes:

- munkamenet alapú és
- token alapú hitelesítésre.

Jelen alkalmazásunkhoz a munkamenetalapú hitelesítés illik, amik a keretrendszer alapbeállításai.

A hitelesítést pár egyszerű utasítással a projektünkhöz adhatjuk:

```bash
composer require laravel/ui
php artisan ui vue --auth
php artisan migrate
# not necessary, only for js, css bundling
npm install
npm run dev
```

Ezekkel hozzáadódnak a megfelelő beléptető, regisztrációs oldalak, route-ok, vezérlők, nézetek az alkalmazáshoz, saját megjelenési sablonjukkal. Ha a saját alkalmazásunkhoz szeretnénk igazítani, akkor első körben elég, ha a nézetekben a saját layout nézetünkre írjuk át a layout-ot, és ezzel gyakorlatilag készen is vagyunk. Természetesen az egyes nézetek elrendezését és elemeit tovább módosíthatjuk, hogy jobban illeszkedjenek az alkalmazásunk kinézetéhez.

### Finomhangolás

A beléptetés finomhangolását a `config/auth.php` fájlban tehetjük meg, de a beállítások általában jók szoktak lenni. További beállítás lehet, hogy bejelentkezés után melyik oldal jelenjen meg. Ehhez a `RouteServiceProvider.php` fájlban kell az alábbi konstanst beállítani:

```php
public const HOME = '/home';
```

### Bejelentkezett felhasználó

A bejelentkezett felhasználó adatainak lekérdezése:

```php
$user = Auth::user();
$id = Auth::id();
$user = auth()->user();
$request->user()
```

Be van-e jelentkezve a felhasználó:

```php
if (Auth::check()) {
    // The user is logged in...
}
```

Kiléptetés:

```php
Auth::logout();
```

## Útvonalak védelme

A route-oknál jelezhető, hogy csak azonosított felhasználó érheti-e el. Ehhez az `auth` middleware-t kell alkalmaznunk:

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

## Jogosultságkezelés

### Gates

A gate-ekkel egyedi jogosultságkezelési logikát valósíthatunk meg. Definiálunk egy gate nevet, majd megadjuk, hogy a hitelesített felhasználó a kért erőforrást elérheti-e. Van, amikor az adott erőforrás nincs megadva, ilyenkor csak a felhasználót kapjuk meg/kérjük el.

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

Használata pl. egy vezérlőben:

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

Lehet definiálni minden más jogosultságvizsgálat előtt, után lefutó jogosultságvizsgálatokat. Ezeket a before, after metódusokkal definiáljuk:

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

A policy egy adott modellhez tartozó jogosultságkezelési logikai egységbe zárása. Az alap hozzárendelés névkonvenció alapján működik, egy `Foo` modell egy `FooPolicy` policyhez tartozik. Ha egyedi hozzárendelésre lenne szükségünk, akkor azt az `AuthServiceProvider`-ben lehet megtenni. Lehetőség van ún. resourceful policyk megadására is, ekkor minden resource metódushoz egy megfelelő policy metódus jön létre.

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

Policy használatához az alábbi metódusokat vehetjük igénybe. Itt is lehetnek olyan metódusok, amihez nem tartozik még modell (pl. új létrehozása), ekkor viszont modellosztály megadása szükséges.

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

## Blade direktívák

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

## Megoldási javaslatok

1. Seeder használata
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

        factory(App\Project::class, 3)->create(['user_id' => $user])->each(function ($project) use ($filters) {
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
2. Jogosultságkezelés. Alább a projekthez vannak sablonok, de ugyanezt kell a Trackre is.
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
