# Laravel -- Bemeneti adatok, űrlapfeldolgozás

## Feladatok

1. Készítsd el a transzponáló oldalt!
    - végpont: `GET /transposer`
    - vezérlő: `TransposerController@index`
    - jelenítsd meg az űrlapot!
    - helyes adatokat felküldve végezd el a transzponálást és írd ki az eredményt!
      ```php
      function transpose(string $key, int $distance): string {
        $keys = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','H'];
        $pos = array_search($key, $keys);
        $newPos = ($pos + $distance) % 12;
        return $keys[$newPos];        
      }
      ```
    - ellenőrizd a felküldött adatokat, hiba esetén írd ki a hibát!
2. Mentés nélkül készítsd elő egy új projekt felvételét!
3. Mentés nélkül készítsd elő egy projekt szerkesztését!

## Bemeneti lehetőségek

### Útvonal paraméterek

```php
Route::get('/foo/{id}/edit', function ($id) {

});
```

### GET és POST paraméterek

A Laravel egy `Request` objektumon keresztül ad hozzáférést a kérésben érkező adatokhoz:

```php
public function index(Request $request) {

}
// or
public function index() {
  $request = request()
}
```

A `$request` objektumon keresztül sokféleképpen hozzáférhetünk az érkező adatokhoz (ld. dokumentáció), pl.

```php
$request->input('foo') // GET and POST
$request->query('foo') // GET
$request->post('foo')  // POST
$request->foo          // GET and POST 
request('foo')         // GET and POST
```

## Modell: üzleti logikai osztály

Az adatok tárolásáért és feldolgozásáért a modellek felelnek. A legegyszerűbb esetben nincsen perzisztálásra szükség, így elegendő az üzleti logikát egységbe záró osztályt felvenni az `app` mappába:

```php
class SomeBusinessModel {
  public function do_something(int $a): string {

  }
}
```

Egy ilyen modellt a vezérlőben kétféleképpen is példányosíthatunk. A második esetben a Laravel service containerére bízzuk a példány létrehozását.

```php
public function index(Request $request) 
{
  $model = new \App\SomeBusinessModel();
}
// or
public function index(Request $request, \App\SomeBusinessModel $model) 
{

}
```

## Adatellenőrzés

A felhasználói felületről érkező adatokat mindig ellenőrizni kell. A Laravel egy nagyon kényelmes interfész biztosít az érkező adatok ellenőrzéséhez. A Laravel a PRG mintát támogatja és implementálja.

Az esetek túlnyomó többségében elegendő a `$request` objektumon elérhető `validate` metódus hívása, amelynek paramétereként az ellenőrző szabályokat kell megadni. Ez a függvény ellenőrzi a kérésben található bemenetet, hiba esetén automatikusan átirányítja a böngészőt az előző oldalra, siker esetén az ellenőrzött adatokkal tér vissza. Az ellenőrző szabályok listáját ld. a dokumentációban.

```php
public function method(Request $request) {
  $validatedData = $request->validate([
    'input-name-1' => 'rule1|rule2|rule3',
    'input-name-2' => ['rule1', 'rule2', 'rule3'],
  ]);
}
```

Az esetek kisebb százalékában kézzel szükséges a folyamatot irányítani:
- a validátor létrehozását
- validáció futtatását
- hiba esetén az átirányítást
- hiba esetén a hibák átadását a nézetnek

```php
public function method(Request $request) {
  // creating a Validator
  $validator = Validator::make($request->all(), [
    'input-name-1' => 'rule1|rule2|rule3',
    'input-name-2' => ['rule1', 'rule2', 'rule3'],
  ]);

  // validation, redirects in case of errors
  $validator->validate();
  // or
  // validation, manual redirection if necessary
  if ($validator->fails()) {
    return redirect('somewhere')
      ->withErrors($validator)
      ->withInput();
  }
  // or
  // validation, manual assigning errors
  if ($validator->fails()) {
    $errors = $validator->errors();
    // if needed:
    $viewErrorBag = new ViewErrorBag();
    $viewErrorBag->put('default', $errors);
    $view->with('errors', $viewErrorBag);
  }

  // validated data
  $validatedData = $validator->validated();
}
```

## Hibaüzenetek megjelenítése

Hibaüzenetek kényelmes megjelenítésére a `@error` direktívát érdemes használni.

```php
<input type="text" class="@error('foo') is-invalid @enderror" name="foo">
@error('foo')
  {{ $message }}
@enderror
```

Vagy az összes hiba lekérdezéséhez:

```php
$errors->all()
```

## Űrlap állapottartása

A beviteli mezők tartalmazzák a korábban beírtakat, hogy a felhasználó lássa, milyen hibát vétett, és ne kelljen újra begépelnie. Átirányítás esetén használható az `old()` segédfüggvény.

```php
<input type="text" name="foo" 
  value="{{ request()->input('foo', 'default') }}">
  
<input type="text" name="foo" 
  value="{{ old('foo', 'default') }}">
```

## Megoldási segédlet

1. Transzponáló oldal
    - az oldal statikus prototípusa megtalálható a letölthető fájlok között
    - a megjelenítéshez ld. az előző anyagot, a kimenet generálásáról
    - Az űrlap feldolgozásának nincs szerveroldali mellékhatása, így `GET` metódusként küldjük el
    - Először azt kell megnézni, hogy egyáltalán jött-e feldolgozandó adat
      ```php
      $request->has(['key', 'distance'])
      ```
    - Ha igen, akkor jöhet a beolvasás, feldolgozás és az eredmény kiírása
      ```php
      // beolvasás
      $key = $request('key');
      $distance = (int)$request('distance');
      // feldolgozás
      $transposer = new \App\Transposer();
      $newKey = $transposer->transpose($key, $distance);
      // kiírás
      return view('transposer')->with('newKey', $newKey);
      ```
    - Az ellenőrzésnél nem használhatjuk a `$request`-hez tartozó `validate` metódust, mert az hiba esetén átirányít, míg mi az oldalon szeretnénk maradni. Így a kézi megoldásra kell szorítkoznunk. Hiba esetén pedig kézzel kell hozzáadnunk a validációs hibákat a nézethez. Mivel a nézethez igény szerint adunk hibát vagy megoldást, ezért a `$view` objektumot a folyamat elején hozzuk létre.
      ```php
      $view = view('transposer');
      // set up validator
      $validator = Validator::make($request->only(['key', 'distance']), [
        'key' => [
          'required', 
          Rule::in(['C','C#','D','D#','E','F','F#','G','G#','A','A#','H']),
        ],
        'distance'  => 'required|integer'
      ]);

      if ($validator->fails()) {

        // there are errors
        $errors = $validator->errors();
        $veb = new ViewErrorBag();
        $veb->put('default', $errors);
        $view->with('errors', $veb);

      } else {
        // az eredmény átadása a view-nak
      }
      return $view;
      ```
    - Jelenítsd meg a hibákat az űrlapon!
    - Gondoskodj az űrlap állapottartásáról!
