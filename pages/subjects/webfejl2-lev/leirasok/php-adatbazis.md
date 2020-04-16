# Adatbázis használata PHP-ban

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
