<style type="text/css">
main ul p, main ol p {
  display: block;
}
</style>

# Webfejlesztés 2. (Levelező informatika tanárképzés)

## Előadások

1. 2019.02.28. [Javascript, felületi elemek programozása, eseménykezelés, kódszervezés](http://webprogramozas.inf.elte.hu/webfejl2tl/ea/01/)

## Elektronikus tananyagok

* [A böngésző mint alkalmazásfejlesztési platform (elektronikus tananyag)](http://webprogramozas.inf.elte.hu/tananyag/kliens/)
* [Dinamikus weboldalak előállítása szerveroldali technológiákkal (elektronikus tananyag)](http://webprogramozas.inf.elte.hu/tananyag/szerver/)

## Beadandó feladat

Készíts egy albumokat és képeket kezelő alkalmazást. Képeket az interneten keresünk, és csak URL-jüket tároljuk el (azaz nem kell képeket feltölteni, csak szöveget tárolni). Az egyszerűség kedvéért a képek és albumok tárolását elég egy táblában megoldani. A tábla a következő adatokat tartalmazza:

- id: a kép azonosítója (szám, elsődleges kulcs, automatikusan növekvő)
- url: a kép URL-je (szöveg, kötelező, nem null, legyen elég hosszú)
- felirat: a képhez tartozó felirat (szöveg, opcionális, lehet null)
- album neve: az album neve, amihez a kép tartozik (szöveg, kötelező)
- felhasznalo_id: melyik azonosítójú felhasználóhoz tartozik a kép (szám)

A hitelesítéshez szükséges adatok tárolásához használhatjuk az órán vett táblaszerekezet (ld. `felhasznalok` tábla):

- id: a felhasznaló azonosítója
- felhasználónév
- jelszó

Oldd meg a következő feladatokat:

1. **Albumok** 

    - a. Listázd ki az albumokat, pl. felsorolásként! (kötelező)

        Technikai segítség: válogasd ki a képeket tartalmazó táblából a különböző albumneveket (`select distinct`...).

    - b. Tedd az albumokat hivatkozássá! Az URL, amire mutatnak: `nezoke.php?id={albumnev}`, ahol az `{albumnev}` helyébe a megfelelő album azonosítóját kell behelyettesíteni.

2. **Album megjelenítése**

    A `nezoke.php` oldalon olvasd ki az URL-ben érkező albumnevet, majd kérdezd le az ahhoz az albumhoz tartozó képeket. Jelenítsd meg ezeket egymás alatt egy felsorolás elemeiként! (kötelező)

3. **Diavetítés**

    Fejleszd tovább a `nezoke.php` oldalt úgy, hogy felsorolás helyett csak egy kép jelenjen meg, és a balra-jobbra nyíllal lehessen váltogatni közöttük. Ilyenkor a megjelent kép kiúszik a keretből és beúszik a következő kép. Első kép elé és az utolsó mögé nem lehet menni.

    Technikai segítség: ha adott az alábbi szerkezet:

    ```html
    <div class="kepkeret">
        <ul>
            <li>
            <img src="https://cdn3.tropicalsky.co.uk/images/800x600/huay-mae-kamin-waterfall-thailand.jpg">
            </li>
            <li>
            <img src="https://cdn1.tropicalsky.co.uk/images/800x600/pagodas-doi-intanon-mountains.jpg">
            </li>
            <li>
            <img src="https://cdn1.tropicalsky.co.uk/images/800x600/walking-rainforests-northern-thailand.jpg">
            </li>
        </ul>
    </div>
    ```

    és a hozzá tartozó stílusok:

    ```css
    div.kepkeret * {
        box-sizing: border-box;
    }
    div.kepkeret {
        width: 200px;
        height: 150px;
        overflow: hidden;
        margin: 0;
        padding: 0;
        border: 2px solid orange;
    }
    div.kepkeret ul {
        width: 600px;
        position: relative;
        left: 0px;
        margin: 0;
        padding: 0;
        transition: all 1s;
    }
    div.kepkeret ul li {
        width: 200px;
        height: 100%;
        margin: 0;
        padding: 0;
        list-style: none outside none;
        float: left;
    }
    div.kepkeret ul li img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    ```

    akkor ez azt jelenti, hogy a 200px széles `div.kepkeret` mögött egy 600px széles csíkban helyezkedik el az `ul`. Az animációt ki lehet próbálni, ha a fenti CSS-t kiegészítjük a következővel:

    ```css
    div.kepkeret ul:hover {
        left: -200px;
    }
    ```

    Ekkor a képkeret fölé víve az egeret, az `ul` odébb csúszik. [Működés közben lásd még itt.](https://jsbin.com/viyoyazexa/edit?html,css,js,output)

    A programnak ennek működéséhez két dolgot kell tennie:

    1. Az `ul` szélességét annyiszor 200px-re kell állítani, ahány listaelem van az `ul`-ben.
    2. A jobbra-balra nyíl megnyomására az `ul` stílusai közül a `left` tulajdonságot kell 200px megfelelő számú többszörösére állítani. Az animálást a CSS automatikusan elvégzi.

4. **Új kép felvitele**

    - a. Az albumlistázó oldalon legyen hivatkozás, amelyre kattintva új oldal nyílik meg. Itt egy új képet vihetünk fel. 
    
        Meg kell adni:

        - kép URL-jét (kötelező, http-vel vagy https-sel kezdődik, [ld. a PHP `substr` függvényét](https://www.php.net/manual/en/function.substr.php))
        - a kép nevét (lehet üres is)
        - az album nevét (kötelező)

        Az ellenőrzéseket szükséges elvégezni, a hibákat az oldalon meg kell jeleníteni. 
        
        Ha nincs hiba, akkor az adatokat a képek táblába el kell menteni, és az albumlistázó oldalra kell irányítani a böngészőt.

    - b. A kép URL-jének megadásakor az űrlap alatt jelenjen meg a beszúrandó kép. (kötelező)

5. **Bejelentkezés** Egészítsd ki az alkalmazást regisztráció és bejelentkezés lehetőségével (ahogy gyakorlatokon is tettük). Az előző funkciókat egészítsd ki a következőképpen:

    - az albumlistánál csak az adott felhasználóhoz tartozó képek albumnevei jelenjenek meg.
    - diavetítésnél az adott albumhoz és felhasználóhoz tartozó képek jelenjenek meg.
    - új kép felvitelénél a bejelentkezett felhasználóhoz mentsük el képet.

### Értékelés

2-eshez:

- a táblaszerkezet létrehozása az adatbázisban
- a kötelezőnek jelölt elemek megvalósítása

Az alábbiak közül mindegyik egy-egy plusz jegyet jelent:

- új kép felvitele
- diavetítés
- bejelentkezés és a hozzá tartozó funkciók

### Beadás

A megoldásokat a [beadási felületen](http://webprogramozas.inf.elte.hu/ebr) keresztül kell feltölteni. Ehhez az elkészült alkalmazást be kell csomagolni ZIP formátumba, ugyanis csak így fogadja el a feltöltő felület.

Határidő: 2019. május 28. éjfél





## 1. gyakorlat

1. Decemberben N napon át megmértük a déli hőmérsékletet.

    1. Határozzuk meg az átlaghőmérsékletet!
    2. Döntsük el, hogy emelkedett-e a hőmérséklet 10 fok fölé a mért intervallumban!
    3. Határozzuk meg, melyik nap volt a leghidegebb! Írjuk ki a nap nevét is, ha tudjuk, hogy a méréseket hétfőn kezdtük!
    4. Hány olyan nap volt, amikor fagyott délben.
    5. Keressünk egy olyan napot, amelyen mért hőmérséklet egy előre megadott intervallumba esik!
    6. Állapítsuk meg, hogy szigorúan monoton növekedő-e a sorozat!
    7. Keressünk egy olyan napot, amelyen mért hőmérséklet ugyanakkora, mint valamelyik szomszédja!
    8. Hány olyan volt, hogy adott elem kisebb a két szomszédjánál (lokális minimum).

2. Az ország néhány helységében madármegfigyelést végeztünk. Mindegyikben megadtuk, hogy milyen fajú madárból hányat láttunk.

    Készíts programot, amely megad egy olyan helységet, ahol egyetlen madarat sem láttunk!

3. Írj egy kör kerületét kiszámoló programot!

4. Készíts egy szókitalálós akasztófa játékot!

5. Adott egy könyvtári nyilvántartás. Egy könyvről a következő adatokat tároljuk:

    - szerző
    - cím
    - kiadás éve
    - kiadó
    - ISBN szám

    1. Felületen kérj be egy évszámot, és listázd ki az abban az évben megjelent könyvcímeket!

    2. Készíts egy legördülő mezőt, amelyben az egyes kiadók vannak felsorolva. Egy gombra kattintva táblázatos formában jelenítsd meg a kiválasztott kiadóhoz tartozó könyveket!

    3. Egy beviteli mezőben gépelve folyamatosan frissíts egy listát, melyben azok a szerzők jelennek meg, kiknek neve tartalmazza a beviteli mezőbe beírt szövegrészletet!


## 2. gyakorlat

1. Készíts egy diákokat listázó oldalt. Egy szöveges beviteli mezőbe gépelve lehessen szűrni a diákokat! A diákoknál legyen lehetőség jegybeírásra is, ugyancsak egy szöveges beviteli mezőben!

2. Készíts egy kincskereső alkalmazást! Jelenjen meg egy táblázat, amelynek valamelyik koordinátáján található a kincs. Egyes cellákra kattintva döntsük el, hogy ott van-e a kincs vagy sem. Legyen lehetőség a táblázat méreteit a felületen megadni!


## 3. gyakorlat

Készíts egy Flappy bird jellegű játékot! Legyen egy madár, aminek a közeledő oszlopokon kell áthaladnia az oszlopok érintése nélkül. A madár lefele zuhan, de gombnyomásra felugrik egy kicsit!

A megoldáshoz a [böngészők rasztergrafikus megjelenítőjét, a **canvas**-t (rajzvászon)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) fogjuk használni!

### Előkészületek

HTML-ben csupán egy `<canvas>` elemre és a JavaScriptet behúzó `<script>` elemre lesz szükség:

```html
<!-- index.html -->
<canvas width="600" height="400"></canvas>
<script src="index.js"></script>
```

JavaScript oldalon globális változókba felvesszük a rajzoláshoz szükséges változókat. Rajzolni a `ctx` változón keresztül tudunk majd:

```js
// index.js
const canvas = document.querySelector('#jatek');
const ctx = canvas.getContext('2d');
```

### Alakzatok rajzolása

Egy `draw` függvényben fogunk alap alakzatokat kirajzolni a program indulásakor:

```js
// Start
draw()

function draw() {

}
```

Az egyetlen alapelem, a téglalap, kitöltve (`fillRect`) vagy kitöltetlen (`strokeRect`):

```js
ctx.fillStyle = "red"
ctx.fillRect(10, 10, 20, 50)
```

A többi alakzatot egy vagy több [útvonal](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#Paths) kombinálásával lehet megadni:

```js
ctx.beginPath()
ctx.moveTo(20,30)
ctx.lineTo(50,60)
// ctx.arc
// ctx.rect
// ctx.ellipse
ctx.closePath()
ctx.stroke()
```

Feladatok

1. Fessük a rajzvászon hátterét kékre! (rajzoljunk egy kék téglalapot teljes szélességben (`canvas.width`) és magassá
gban (`canvas.height`))

2. Rajzoljuk ki a madarat egy barna téglalapként, függőlegesen középre, balról 50px-re.

Ez utóbbi feladathoz vegyünk fel egy objektumot, amiben a madár adatait tároljuk:

- hol van (`x`, `y`)
- milyen széles, magas (`szelesseg`, `magassag`)

```js
const madar = {
    x: 50,
    y: canvas.height / 2,
    szelesseg: 30,
    magassag: 50
}
```

### Madár esése

A madár eséséhez mozgatni kell a téglalapot. Ezt úgy szoktuk megoldani, hogy mindig (`jatekciklus`) újra- és újrarajzoljuk (`draw`) a vásznat, közben az állapotteret módosítjuk (`update`).

```js
// Start
gameloop();

// Játékciklus
function jatekciklus() {
    requestAnimationFrame(jatekciklus);

    update(dt);
    draw();
}
function update(dt) {
    // Állapottér módosítása
}
function draw() {
    // Kirajzolás
}
```

Kell számolni a két hívás között eltelt időt:

```js
// Állapottér = adatok
let elozoIdo = 0;

function jatekciklus(most = 0) {
    requestAnimationFrame(jatekciklus);
    const dt = most - elozoIdo
    elozoIdo = most

    update(dt);
    draw();
}
```

A madárnak sebességet (`vy`) és gyorsulást (`ay`) vezetünk be.
Kinematikai számolással módosítjuk a madár helyét:

```js
const madar = {
    x: 50,
    y: canvas.height / 2,
    szelesseg: 30,
    magassag: 50,
    vy: 0,   // px/s
    ay: 250,    // px/s^2
}

function update(dt) {
    // Madár mozog
    madar.vy += madar.ay * dt / 1000;
    madar.y += madar.vy * dt / 1000;
}
```

### Billentyűleütésre ugrás

A `document`-hez érkező `keydown` eseményeket fogjuk figyelni, és adunk a madárnak egy kezdősebességet felfelé:

```js
// Eseménykezelő
document.addEventListener('keydown', onKeyDown);
function onKeyDown(e) {
    if (e.key === ' ') {
        madar.vy = -200;
    }
}
```

### Oszlopok

Oszlopok tárolása egy tömbben lesz, mivel több oszlop lesz. Bevezetünk pár állandót is

```js
const oszlopok = []
const RES = 150;    // px
const OSZLOP_TAVOLSAG = 300;  // px
const OSZLOP_SEBESSEG = -200;  // px
```

Oszloppár hozzáadása:

```js
function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}
function ujOszlop() {
    const h = random(10, canvas.height / 2);
    oszlopok.push(
        {
            x: canvas.width,
            y: 0,
            width: 30,
            height: h,
        },
        {
            x: canvas.width,
            y: h + RES,
            width: 30,
            height: canvas.height - RES - h,
        },
    );
}
// Start
ujOszlop()
```

Oszlopok kirajzolása

```js
function draw() {
    // Oszlopok
    ctx.fillStyle = 'white';
    oszlopok.forEach(oszlop => {
        ctx.fillRect(oszlop.x, oszlop.y, oszlop.szelesseg, oszlop.magassag);
    });
}
```

Új oszloppár megjelenése

```js
function update(dt) {
    // Oszloppár hozzáadása
    // Ha az utolsó oszlop a canvas jobb szélétől OSZLOP_TAVOLSAG-ra eltávolodott,
    // akkor új oszlop hozzáadása
}
```

Oszlopok mozgatása

```js
function update(dt) {
    // Oszlopok mozgatása
    oszlopok.forEach(oszlop => {
        // oszlop mozgatása OSZLOP_SEBESSEG-gel
    });
}
```

Oszlopok törlése

```js
function update(dt) {
    // Oszlopok törlése
    // Ha több mint 20 oszlop van, akkor vedd ki az első kettőt ( tömb.shift() )
}
```

### Ütközésvizsgálat

Segédfüggvény:

```js
function utkozikE(a, b) {
    return !(
        b.y + b.magassag  < a.y ||
        a.x + a.szelesseg < b.x ||
        a.y + a.magassag  < b.y ||
        b.x + b.szelesseg < a.x
    );
}
```

Ütközés vizsgálata az oszlopok mozgatásakor:

```js
function update(dt) {
    // Oszlopok mozgatása
    oszlopok.forEach(oszlop => {
        // oszlop mozgatása OSZLOP_SEBESSEG-gel
        // Ha ütközik az oszlop és a madár, akkor vége
    });
}
```

### Vége jelzése

Állapottér és módosítása ütközésnél:

```js
let vege = false
```

Vége kirajzolása

```js
function draw() {
    // Vége
    if (vege) {
        ctx.fillStyle = 'red';
        ctx.font = '100px serif';
        ctx.fillText('Vége', 10, 50);
    }
}
```

Animáció leállítása

```js
function jatekciklus(now = 0) {
    if (!vege) requestAnimationFrame(jatekciklus);
}
```

### Képek alkalmazása

Képek gyűjteménye és betöltése:

```js
const kepek = {
    madar: new Image(),
    hatter: new Image(),
    oszlop: new Image(),
};

// Start
kepek.madar.src = 'bird.png';
kepek.hatter.src = 'bird.png';
kepek.oszlop.src = 'bird.png';
```

Képek kirajzolása

```js
ctx.fillRect(madar.x, madar.y, madar.szelesseg, madar.magassag);
// HELYETTE
ctx.drawImage(images.madar, madar.x, madar.y, madar.szelesseg, madar.magassag);
```

## 4. gyakorlat

1. PHP segítségével írj ki különböző üdvözlő szövegeket!

    1. Írd ki, hogy "Hello világ!"!
    2. Egy `$nev` változóba vegyél fel egy nevet, majd üdvözöld őt!

2. Írj egy faktoriálist kiszámító függvényt!

3. Írd ki egy szöveget 10-szer egyre növekvő betűmérettel!

4. Adott hibák listája egy tömbben. Jelenítsd meg felsorolásként!

5. Készíts egy olyan oldalt, amelynek be lehet állítani a háttérszínét!

    1. Készítsd el a statikus prototípust!
    2. Készíts belőle dinamikus sablont, a háttérszín értéke változóból jöjjön!
    3. Add meg a háttérszín értékét az URL `query` részében `?szin=123456` formában! Olvasd ezt be az alkalmazáson belül (`$_GET['szin']`)!
    4. Ha nem érkezik URL-ben a háttérszín, akkor legyen valamilyen alapértelmezett értéke a háttérszínnek!
    5. Készíts egy hivatkozást az oldalra, amelyre kattintva az oldal háttérszíne pirosra válik!
    6. Legyen lehetőség megadni a háttérszínt űrlapon keresztül!

        ```html
        <form action="">
            <input type="color" name="szin">
            <button>Beállít</button>
        </form>
        ```

6. Készíts egy elsőfokú egyenletet kiszámító programot!

    1. Először jelenjen meg maga az űrlap!
    2. A helyesen felküldött adatok alapján számoljuk ki az eredményt és jelenítsük meg az űrlap alatt!
    3. Készüljünk fel arra, hogy az adatok hibásan is érkezhetnek! A hibaüzeneteket az űrlap fölött jelenítsük meg felsorolásként!
    4. Minden esetben az űrlap őrizze meg az állapotát, azaz a beviteli mezőkbe írjuk vissza a felküldött adatokat!


## 5. gyakorlat

Készítsünk egy diákok adatait nyilvántartó programot. Legyen lehetőség

- a diákok adatait listázni,
- új diákot felvinni,
- a megjelenő adatokat szűrni,
- az alkalmazásba bejelentkezni és kijelentkezni,
- a bejelentkezett felhasználóhoz tartozó adatokat megjeleníteni.

### Adatbázis használata és a táblaszerkezet létrehozása

A webprogramozas szerveren lévő MySQL adatbázis-kezelő programot fogjuk használni. Ennek kezelését böngészőben fogjuk elvégezni a [phpmyadmin alkalmazás](http://webprogramozas.inf.elte.hu/phpmyadmin) segítségével.

1. Lépjünk be a phpmyadminba:
    - felhasználónév: _neptun kód_
    - jelszó: _neptun kód_
    - adatbázis: _wf2\_neptun_
2. Hozzuk létre a diákok adatait tároló táblát:
    - id (unsigned int, auto increment, primary key)
    - nev (varchar, not null)
    - kod (varchar, not null)
    - szul_ev (date)
3. Töltsük fel a táblát néhány példa adattal!

### Sablonelemek

Kiírás

```php
<?= $valtozo ?>
```

Ciklus

```php
<?php foreach ($tomb as $ertek) : ?>
    HTML
<?php endforeach ?>
```

Elágazás

```php
<?php if (feltetel) : ?>
    HTML
<?php endif ?>
```


### Listázó oldal

```html
<table>
    <tr>
        <th>Név</th>
        <th>Kód</th>
        <th>Születési év</th>
    </tr>
    <tr>
        <td>Név1</td>
        <td>Kód1</td>
        <td>Év1</td>
    </tr>
    <tr>
        <td>Név2</td>
        <td>Kód2</td>
        <td>Év1</td>
    </tr>
</table>
```

Készítsünk ebből dinamikus sablont és próbáljuk ki pár PHP-ban definiált beégetett értékkel:

```php
$diakok = [
    [
        "nev"       => "Cserép Virág",
        "kod"       => "123456",
        "szul_ev"   => 2001,
    ],
    [
        "nev"       => "Hirte Lenke",
        "kod"       => "654321",
        "szul_ev"   => 2002,
    ],
];
```

### Adatbázis segédfüggvények

Az alábbi függvényeket tegyük egy `adatbazis.php` nevű fájlba:

```php
<?php
function kapcsolodas($kapcsolati_szoveg, $felhnev = '', $jelszo = '') {
  $pdo = new PDO($kapcsolati_szoveg, $felhnev, $jelszo);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  return $pdo;
}

function lekerdezes($kapcsolat, $sql, $parameterek = []) {
  $stmt = $kapcsolat->prepare($sql);
  $stmt->execute($parameterek);
  return $stmt->fetchAll();
}

function vegrehajtas($kapcsolat, $sql, $parameterek = []) {
  return $kapcsolat
    ->prepare($sql)
    ->execute($parameterek);
}

// Ugyanitt rögtön kapcsolódjunk is az adatbázisunkhoz:
$ab = kapcsolodas('mysql:host=localhost;dbname=wf2_neptun;charset=utf8', 
  'neptun', 'neptun');
```

### Listázás adatbázisból

Húzzuk be az `adatbazis.php` fájlt a listázó oldalra és használjuk az ott definiált segédfüggvényeket.

```php
include("adatbazis.php");

$diakok = lekerdezes($ab, "SELECT * FROM `diakok`");
```

### Szűrés

```html
<form action="">
    Név: <input type="text" name="szuro">
    <button>Szűr</button>
</form>
```

- szűrő beolvasása
- ha nincs, akkor valamilyen alapértelmezett érték
- adatbázis lekérdezésben `where` feltétel

```php
function osszes_diak($ab, $szuro) {
    // ...
}
```

### Új rekord felvitele

Az űrlap:

```html
<form action="" method="post">
    Név: <input type="text" name="nev"> <br>
    Kód: <input type="text" name="kod"> <br>
    Év: <input type="text" name="ev"> <br>
    <button>Ment</button>
</form>
```

Helyes adatok esetén beolvasás, feldolgozás és átirányítás:

```php
function uj_diak_mentese($ab, $nev, $kod, $ev) {
    // vegrehajtas
}

if (count($_POST) > 0) {
    // beolvasás
    $nev = $_POST['nev'];
    $kod = $_POST['kod'];
    $ev =  $_POST['ev'];

    // feldolgozás
    uj_diak_mentese($ab, $nev, $kod, $ev);
    header("Location: lista.php");
    exit();
}
```

Példák adatok ellenőrzésére:

```php
// kötelezőség
if (!isset($_POST["valami"]) || trim($_POST["valami"]) === "") {
    $hibak[] = "Valami megadása kötelező!";
}
// szöveghossz
if (strlen($_POST["valami"]) !== 6) {
    $hibak[] = "Valami rossz hosszú!";
}
// szám-e
if (!is_numeric($_POST["valami"])) {
    $hibak[] = "Valami nem szám!";
}
// szám-e
if (filter_var($_POST["valami"], FILTER_VALIDATE_INT) === false) {
    $hibak[] = 'Valami nem szám!';
}
// Mintailleszkedés
if (filter_var($_POST["valami"], FILTER_VALIDATE_REGEXP, [
    "options"=>[
        "regexp"=>"/^\d{6}$/",
    ],
]) === false) {
    $hibak[] = 'Valami rossz formátumú!';
}
// Mintailleszkedés
if (!preg_match("/^\d{6}$/", $_POST["valami"])) {
    $hibak[] = 'Valami rossz formátumú!';
}
```

Lehetséges ellenőrzők:

- FILTER_DEFAULT (szöveg)
- FILTER_VALIDATE_BOOLEAN
- FILTER_VALIDATE_EMAIL
- FILTER_VALIDATE_FLOAT
- FILTER_VALIDATE_INT
- FILTER_VALIDATE_IP
- FILTER_VALIDATE_MAC
- FILTER_VALIDATE_REGEXP
- FILTER_VALIDATE_URL

### Hitelesítési segédfüggvények

A `hitelesites.php` fájlban helyezzük el az alábbi kódot:

```php
<?php
// session_start();
function azonositott_e() {
  return isset($_SESSION["felhasznalo"]);
}
function kijelentkeztet() {
  unset($_SESSION["felhasznalo"]);
}
function beleptet($felhasznalo) {
  $_SESSION["felhasznalo"] = $felhasznalo;
}
```

### Felhasználó tábla létrehozása az adatbázisban

Felhasználók tábla:

- id
- felhasznalonev
- jelszo

Diákok táblát egészítsük ki egy idegen kulccsal, ami a felhasználóhoz köti a diákot:

- felhasznalo_id

### Regisztráció

Regisztráció során (`reg.php`) új adatot viszünk fel a felhasználói táblába.

```php
<?php
function letezik($kapcsolat, $felhasznalonev) {
  $felhasznalok = lekerdezes($kapcsolat,
    "SELECT * FROM `felhasznalok` WHERE `felhasznalonev` = :felhasznalonev",
    [ ":felhasznalonev" => $felhasznalonev ]
  );
  return count($felhasznalok) === 1;
}
function regisztral($kapcsolat, $felhasznalonev, $jelszo) {
  $db = vegrehajtas($kapcsolat,
    "INSERT INTO `felhasznalok` (`felhasznalonev`, `jelszo`) 
      values (:felhasznalonev, :jelszo)",
    [
      ":felhasznalonev"   => $felhasznalonev,
      ":jelszo"           => password_hash($jelszo, PASSWORD_DEFAULT),
    ]
  );
  return $db === 1;
}

$hibak = [];
if (count($_POST) > 0) {
  $felhasznalonev = $_POST["felhasznalonev"];
  $jelszo = $_POST["jelszo"];

  $kapcsolat = kapcsolodas("sqlite:./zene.sqlite");

  if (letezik($kapcsolat, $felhasznalonev)) {
    $hibak[] = "Már létező felhasználónév!";
  }

  if (count($hibak) === 0) {
    regisztral($kapcsolat, $felhasznalonev, $jelszo);
    header("Location: bejelentkezik.php");
    exit();
  }
}
?>
<?php var_dump($hibak); ?>
<form action="" method="post">
  Felhasználónév:
  <input type="text" name="felhasznalonev"> <br>
  Jelszó:
  <input type="password" name="jelszo"> <br>
  <button type="submit">Regisztrál</button>
</form>
```

### Beléptetés

`login.php`

```php
<?php
include("hitelesites.php");

function ellenoriz($kapcsolat, $felhasznalonev, $jelszo) {
  $felhasznalok = lekerdezes($kapcsolat,
    "SELECT * FROM `felhasznalok` WHERE `felhasznalonev` = :felhasznalonev",
    [ ":felhasznalonev" => $felhasznalonev ] 
  );
  if (count($felhasznalok) === 1) {
    $felhasznalo = $felhasznalok[0];
    return password_verify($jelszo, $felhasznalo["jelszo"]) 
      ? $felhasznalo 
      : false;
  }
  return false;
}

session_start();

$hibak = [];
if (count($_POST) > 0) {
  $felhasznalonev = $_POST["felhasznalonev"];
  $jelszo = $_POST["jelszo"];

  $kapcsolat = kapcsolodas("sqlite:./zene.sqlite");
  $felhasznalo = ellenoriz($kapcsolat, $felhasznalonev, $jelszo);

  if ($felhasznalo === false) {
    $hibak[] = "Hibás adatok!";
  }

  if (count($hibak) === 0) {
    beleptet($felhasznalo);
    header("Location: fooldal.php");
    exit();
  }
}
?>
<?php var_dump($hibak); ?>
<form action="" method="post">
  Felhasználónév:
  <input type="text" name="felhasznalonev"> <br>
  Jelszó:
  <input type="password" name="jelszo"> <br>
  <button type="submit">Bejelentkezik</button>
</form>
```

### Kijelentkezés

```php
// Munkamenet indítása
// kijelentkeztetés meghívása a hitelesites.php-ból
// Átirányítás a lista oldalra
```

### Védett oldalak

Bejelentkezés nélkül elérhetetlen oldalak elején:

- Munkamenet indítása
- az azonosítottság vizsgálata a `hitelesites.php`-ból
- ha nem azonosított, akkor átirányítás a `login.php`-ra

### A felhasználóhoz tartozó adatok kezelése

- Lista oldalon csak az adott felhasználóhoz tartozó adat megjelenítése
- Új diák oldalon a diák mentése a bejelentkezett felhasználóhoz

### További feladatok

1. Diák módosítása

    1. Diák azonosítójának átadása URL-ben GET paraméterként
    2. Űrlap megjelenítése előre feltöltött adatokkal
    3. Ellenőrzés ugyanaz
    4. Mentéskor `update`

2. Diák törlése

    1. Diák azonosítójának átadása URL-ben GET paraméterként
    2. Törlés az adatbázisban
    3. Átirányítás a lista oldalra


## Oktatók

### Előadó

Horváth Győző

### Gyakorlatvezető

Horváth Győző
