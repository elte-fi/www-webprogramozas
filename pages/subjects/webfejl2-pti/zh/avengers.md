<style type="text/css">
main img {
    max-width: 100%;
}
main ul p, main ol p {
  display: block;
}
</style>

# Webfejlesztés 2. zh -- Bosszúállók

_2019. május 29._

## Tudnivalók:

- A feladatokat a `webprogramozas.inf.elte.hu` szerveren kell elkészíteni. A `www` mappádon belül hozzál létre egy `avengers` mappát, és abban készítsd el a megoldásodat. 
- A megoldás kinézete nem számít, csak az oldalak funkcionalitása.
- A feladatokat nem szükségszerű a leírás sorrendjében elvégezni, a feladatok többsége nem épül a másikra, viszont ha kell, akkor a szükséges előfeltételeket, akár statikusan is, de biztosítani kell.
- **Fontos** A műveletek helyességét csak a felületen keresztül tudjuk ellenőrizni az adatok megjelenítésével.
- A zh-n bármilyen segédanyag használható, de humán segítség a jelenlévő gyakorlatvezetőkön kívül nem vehető igénybe.
- A zh után a megoldásokon plágiumellenőrzést végzünk, az esetlegesen hasonló megoldások készítőit védésre behívhatjuk.
- Ponthatárok:
    + 0-19 pont: 1
    + 20-29 pont: 2
    + 30-39 pont: 2,5
    + 40-49 pont: 3
    + 50-59 pont: 3,5
    + 60-66 pont: 4
    + 67-74 pont: 4,5
    + 75-80 pont: 5

## Feladatleírás

A Bosszúállók és Thanos végső összecsapásukra készülnek. Segíts a csapat és a küldetések szervezésében az egyik oldalon, a kövek gyűjtésében és a csettintésben a másik oldalon!

0. **Előkészületek**

    **Adatok előkészítése** Az adatok tárolását fájlban vagy adatbázisban is elvégezheted, bár az adatbázis használata az ajánlott. Az alkalmazás kétféle adattal dolgozik: a Bosszúállók adataival és az egyes küldetések nyilvántartásával. 
    
    Minden bosszúállóról nyilvántartjuk a nevét, a valódi nevét, az erejét, sebességét és kitartását, valamint, hogy földi származású-e (`terrial`). Ezeket az adatokat ne módosítsd, ne adj hozzá újat, ne töröld!
    
    ```txt
    id  name            real_name          strength  speed  durability  terrial
    1   Iron Man        Tony Stark         85        58     85          1
    2   Captain America Steven Rogers      19        35     56          1
    3   Thor            Thor               100       92     100         0
    4   Hulk            Bruce Banner       100       47     100         1
    5   Black Widow     Natasha Romanova   13        27     32          1
    6   Hawkeye         Clint Barton       12        23     14          1
    7   Scarlet Witch   Wanda Maximoff     10        23     42          1
    8   Vision                             72        54     95          1
    9   Doctor Strange  Stephen Strange    10        12     84          1
    10  Black Panther   T'Challa           16        30     60          1
    11  Ant-Man         Scott Lang         10        23     28          1
    12  Star Lord       Peter Quill        20        20     30          0
    13  Groot                              85        33     70          0
    14  Rocket Raccoon                     5         23     28          0
    15  Spider-Man      Peter Parker       55        60     74          1
    16  War Machine     James Rhodes       80        63     100         1
    17  Falcon          Sam Wilson         13        50     28          1
    18  Winter Soldier  Bucky Barnes       32        35     65          1
    19  Fury            Nick Fury          11        23     42          1
    20  Loki            Loki               57        47     85          0
    ```

    A küldetéseknél nyilvántartjuk a küldetés nevét, azt, hogy milyen erő, sebesség és kitartás szükségeltetik hozzá, illetve azt, hogy a küldetésre melyik két bosszúállót küldjük. Az alábbi rekordokat ne módosítsd, de később újabb adatokat kell ezekhez hozzáadni.

    ```txt
    id   name                terrial  strength  speed  durability  avenger1  avenger2
    1    Sokovia             1        50        30     60          iron-man  captain-america
    2    Escape from prison  0        20        70     40          star-lord rocket-raccoon
    ```
    
    Ha adatbázist használsz, akkor az alábbi SQL utasítás bemásolásával létre tudod hozni (phpmyadminban kiválasztva az adatbázisod, SQL fül):

    ```sql
    CREATE TABLE `avengers` (
      `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
      `name` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
      `real_name` varchar(50) COLLATE utf8_hungarian_ci DEFAULT NULL,
      `strength` int(10) UNSIGNED NOT NULL,
      `speed` int(10) UNSIGNED NOT NULL,
      `durability` int(10) UNSIGNED NOT NULL,
      `terrial` tinyint(1) NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

    INSERT INTO `avengers` (`id`, `name`, `real_name`, `strength`, `speed`, `durability`, `terrial`) VALUES
    (1, 'Iron Man', 'Tony Stark', 85, 58, 85, 1),
    (2, 'Captain America', 'Steven Rogers', 19, 35, 56, 1),
    (3, 'Thor', 'Thor', 100, 92, 100, 0),
    (4, 'Hulk', 'Bruce Banner', 100, 47, 100, 1),
    (5, 'Black Widow', 'Natasha Romanova', 13, 27, 32, 1),
    (6, 'Hawkeye', 'Clint Barton', 12, 23, 14, 1),
    (7, 'Scarlet Witch', 'Wanda Maximoff', 10, 23, 42, 1),
    (8, 'Vision', '', 72, 54, 95, 1),
    (9, 'Doctor Strange', 'Stephen Strange', 10, 12, 84, 1),
    (10, 'Black Panther', 'T''Challa', 16, 30, 60, 1),
    (11, 'Ant-Man', 'Scott Lang', 10, 23, 28, 1),
    (12, 'Star Lord', 'Peter Quill', 20, 20, 30, 0),
    (13, 'Groot', '', 85, 33, 70, 0),
    (14, 'Rocket Raccoon', '', 5, 23, 28, 0),
    (15, 'Spider-Man', 'Peter Parker', 55, 60, 74, 1),
    (16, 'War Machine', 'James Rhodes', 80, 63, 100, 1),
    (17, 'Falcon', 'Sam Wilson', 13, 50, 28, 1),
    (18, 'Winter Soldier', 'Bucky Barnes', 32, 35, 65, 1),
    (19, 'Fury', 'Nick Fury', 11, 23, 42, 1),
    (20, 'Loki', 'Loki', 57, 47, 85, 0);

    CREATE TABLE `missions` (
      `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
      `name` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
      `terrial` tinyint(1) NOT NULL,
      `strength` int(11) NOT NULL,
      `speed` int(11) NOT NULL,
      `durability` int(11) NOT NULL,
      `avenger1` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
      `avenger2` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

    INSERT INTO `missions` (`id`, `name`, `terrial`, `strength`, `speed`, `durability`, `avenger1`, `avenger2`) VALUES
    (1, 'Sokovia', 1, 50, 30, 60, 'iron-man', 'captain-america'),
    (2, 'Escape from prison', 0, 20, 70, 40, 'star-lord', 'rocket-raccoon');
    ```

    **A főoldal ajánlott szerkezete**

    A főoldal (`index.php`) szerkezete legyen ilyen:

    ```html
    <!DOCTYPE html>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="http://webprogramozas.inf.elte.hu/webfejl2/zh/avengers/index.css">

    <div class="container-fluid">
      <div class="row">
        <div class="col-md">
          <h2>Avengers</h2>
          <div class="card">
            <div class="card-body">
              <p class="card-text d-flex justify-content-end">
                <span class="mx-1 badge badge-primary">Strength</span>
                <span class="mx-1 badge badge-success">Speed</span>
                <span class="mx-1 badge badge-danger">Durablity</span>
              </p>
            </div>
            <ul class="list-group list-group-flush avengers-list">
              <li class="list-group-item" data-id="1">
                <div class="d-flex align-items-center p-1">
                  <span class="avenger iron-man"></span>
                  <h5 class="m-2 flex-fill">
                    <a href="#">
                      Iron Man
                    </a>
                    <small class="text-muted">
                      Tony Stark
                      <i class="fas fa-globe-africa"></i>
                    </small>
                  </h5>
                  <div class="d-flex flex-nowrap">
                    <span class="mx-1 badge badge-primary">50</span>
                    <span class="mx-1 badge badge-success">80</span>
                    <span class="mx-1 badge badge-danger">60</span>
                  </div>
                </div>
                <img src="http://webprogramozas.inf.elte.hu/webfejl2/zh/avengers/noise.png">
              </li>
            </ul>
          </div>
        </div>

        <div class="col-md">
        <h2>Missions</h2>
          <div class="card mission-form">
            <h4>New mission</h4>
            <div class="alert alert-success">
              Sikeres mentés
            </div>
            
            <div class="alert alert-danger">
              Hibaüzenetek
            </div>

            <form action="#" class="card-body">
              <div class="form-group row">
                <label for="name" class="col-sm-5 col-form-label">Name</label>
                <input type="text" name="name" class="form-control col-sm-7" id="name">
              </div>
              <div class="form-group">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="terrial" id="terrial1" value="1">
                  <label class="form-check-label" for="terrial1">Terrial</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="terrial" id="terrial2" value="0">
                  <label class="form-check-label" for="terrial2">Space</label>
                </div>
              </div>
              <div class="form-group row">
                <label for="range1" class="col-sm-5 col-form-label">Strength</label>
                <input type="range" name="strength" class="form-control col-sm-5" id="range1" min="1" max="100">
                <span class="col-sm-2"></span>
              </div>
              <div class="form-group row">
                <label for="range2" class="col-sm-5 col-form-label">Speed</label>
                <input type="range" name="speed" class="form-control col-sm-5" id="range2" min="1" max="100">
                <span class="col-sm-2"></span>
              </div>
              <div class="form-group row">
                <label for="range3" class="col-sm-5 col-form-label">Durability</label>
                <input type="range" name="durability" class="form-control col-sm-5" id="range3" min="1" max="100">
                <span class="col-sm-2"></span>
              </div>
              <div class="form-group row">
                <label for="avenger1" class="col-sm-5 col-form-label">Avenger1</label>
                <input type="text" name="avenger1" class="form-control col-sm-6" id="avenger1">
                <span class="avenger"></span>
              </div>
              <div class="form-group row">
                <label for="avenger2" class="col-sm-5 col-form-label">Avenger2</label>
                <input type="text" name="avenger2" class="form-control col-sm-6" id="avenger2">
                <span class="avenger"></span>
              </div>
              <div class="form-group row">
                <button type="submit" class="btn btn-primary">New mission</button>
              </div>
            </form>
          </div>

          <div class="card">
            <h4>Mission list</h4>
            <ul class="list-group list-group-flush mission-list">
              <li class="list-group-item" data-id="1">
                <div class="d-flex align-items-center p-1">
                  <h5 class="m-2 flex-fill">
                    Find Thanos
                    <small class="text-muted">
                      <i class="fas fa-rocket"></i>
                    </small>
                  </h5>
                  <div>
                    <span class="mx-1 badge badge-primary">30</span>
                    <span class="mx-1 badge badge-success">70</span>
                    <span class="mx-1 badge badge-danger">20</span>
                  </div>
                  <span class="mx-1 avenger rocket-raccoon"></span>
                  <span class="mx-1 avenger star-lord"></span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-md">
          <h2>Thanos</h2>
          <div class="card thanos">
            <img src="http://webprogramozas.inf.elte.hu/webfejl2/zh/avengers/gauntlet.jpg" class="card-img thanos">
            <div class="stone-place stone1">
              <div class="stone"></div>
            </div>
            <div class="stone-place stone2">
              <div class="stone"></div>
            </div>
            <div class="stone-place stone3">
              <div class="stone"></div>
            </div>
            <div class="stone-place stone4">
              <div class="stone"></div>
            </div>
            <div class="stone-place stone5">
              <div class="stone"></div>
            </div>
            <div class="stone-place stone6">
              <div class="stone"></div>
            </div>
            <div class="gauntlet"></div>
          </div>
        </div>
      </div>
    </div>
    ```

    **A főoldal ajánlott szerkezete**

    A részlet oldal (`card.php`) szerkezete legyen ilyen:

    ```html
    <!DOCTYPE html>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="http://webprogramozas.inf.elte.hu/webfejl2/zh/avengers/index.css">

    <div class="container">
      <div class="row">
        <div class="col-lg">
          <h2>Avengers</h2>
          <div class="card">
            <div class="row no-gutters">
              <div class="col-md-3">
                <span class="card-img avenger captain-america" style="width: 180px; height: 240px;">
              </div>
              <div class="col-md-9">
                <div class="card-body">
                  <h3 class="card-title">Captain America</h3>
                  <dl class="row">
                    <dt class="col-sm-3">Real name</dt>
                    <dd class="col-sm-9">
                      Steven Rogers
                    </dd>
                    <dt class="col-sm-3">Terrial</dt>
                    <dd class="col-sm-9">
                      Yes
                    </dd>
                    <dt class="col-sm-3">Strength</dt>
                    <dd class="col-sm-9">
                      <span class="badge badge-primary">70</span>
                    </dd>
                    <dt class="col-sm-3">Speed</dt>
                    <dd class="col-sm-9">
                      <span class="badge badge-success">50</span>
                    </dd>
                    <dt class="col-sm-3">Durability</dt>
                    <dd class="col-sm-9">
                      <span class="badge badge-danger">60</span>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>    
    ```

    **Csatlakozás az adatbázishoz**

    Lényeg a `charset=utf8` a kapcsolódási szövegben:

    ```php
    $kapcsolat = kapcsolodas(
      'mysql:host=localhost;dbname=wf2_neptun;charset=utf8',
      'neptun', 'neptun');
    ```

1. **Listázás (10 pt)** Listázd ki a bosszúállókat és küldetéseiket a főoldalon! Fájlnév: `index.php`.

    - a. A bosszúállókat az `avengers-list` stílusosztályú felsorolásban sorold fel. Egy bosszúállónak egy `list-group-item` stílusosztályú listaelem felel meg. Jelenítsd meg benne a bosszúálló nevét, valódi nevét (ha van), erejét, sebességét és kitartását. A listaelem `data-id` attribútumába a bosszúálló `id`-ja kerüljön.

    - b. Ha a bosszúálló földi (`terrial` igaz), akkor az `i` elemen belül `fa-globe-africa` ikon jelenjen meg. Ha nem földi, akkor `fa-rocket`.

    - c. A bosszúálló képének megjelenítéséhez az `avenger` stílusosztályú `span` elemen belül a bosszúálló nevéből képzett stílusosztályt kell írni. A képzés szabálya:
        - csupa kisbetű
        - szóköz helyett kötőjel
        - pl. Iron Man --> `iron-man`
    
    - d. A bosszúálló neve egy hivatkozás. Ez mutasson a `card.php`-ra, átadva az `id` értékét `id` név alatt GET paraméterként.
    
    - e. A küldetéseket a `mission-list` stílusosztályú lista elemeiként kell felsorolni. Mindegyik küldetésnél jelenítsd meg a küldetés nevét, a küldetéshez szükséges erő, sebesség és kitartás adatokat! A listaelem `data-id` attribútumába a küldetés `id`-ja kerüljön.

    - f. Ha a küldetés földi (`terrial` igaz), akkor az `i` elemen belül `fa-globe-africa` ikon jelenjen meg. Ha nem földi, akkor `fa-rocket`.

    - g. Jelenítsd meg a küldetésben részt vevő bosszúálló páros arcképét! Ehhez az `avenger` stílusosztályú `span` elemeken belül a bosszúállók nevéből képzett kisbetűs, kötőjeles stílusnevet kell használni (ld. a c. pontot).

    ![](http://webprogramozas.inf.elte.hu/webfejl2/zh/avengers/1.png)

2. **Egy bosszúálló adatainak megjelenítése (8 pt)** A `card.php` oldalon jelenítsd meg az URL-ben paraméterként kapott `id`-jú bosszúálló adatait: név, valódi név (ha van), erő, sebesség, kitartás; földi-e vagy űrbéli (`terrial` alapján `Yes` vagy `No`).

    Az oldalon legyen hivatkozás is, amely visszavezet a főoldalra!

    ![](http://webprogramozas.inf.elte.hu/webfejl2/zh/avengers/2.png)

3. **Új küldetés felvitele (17 pt)** A főoldalon a középső oszlop tetején található egy űrlap új küldetések felvitelére.

    - a. Az űrlap az alábbi mezőket tartalmazza:

      - küldetés neve (neve: `name`, kötelező, hibaüzenetek: `Name is required`)
      - föld vagy űrbéli küldetés (neve: `terrial`, radio gombok, kötelező, értéke: `1` (földi), `0` (űrbéli), hibaüzenetek: `Terrial is required`)
      - erő (neve: `strength`, range slider, kötelező, szám, értéke 1 és 100 között változhat, hibaüzenetek: `Strength is required`, `Strength is not an integer`, `Strength should be between 1 and 100`)
      - sebesség (neve: `speed`, range slider, kötelező, szám, értéke 1 és 100 között változhat, hibaüzenetek: `Speed is required`, `Speed is not an integer`, `Speed should be between 1 and 100`)
      - kitartás (neve: `durability`, range slider, kötelező, szám, értéke 1 és 100 között változhat, hibaüzenetek: `Durability is required`, `Durability is not an integer`, `Durability should be between 1 and 100`)
      - 1\. bosszúálló kötőjeles, kisbetűs neve (neve: `avenger1`, szöveges beviteli mező, kötelező, hibaüzenetek: `Avenger1 is required`, `Avenger1's name should be dashed`)
      - 2\. bosszúálló kötőjeles, kisbetűs neve (neve: `avenger2`, szöveges beviteli mező, kötelező, hibaüzenetek: `Avenger2 is required`, `Avenger2's name should be dashed`)

    - b. Helytelenül kitöltve a fenti hibaüzenetek közül a megfelelőek jelenjenek meg egy `alert-danger` stílusosztályú elemben (nem feltétlenül strukturáltan).

    - c. Ebben az esetben gondoskodj at űrlap állapottartásáról, azaz írd vissza a beviteli mezőkbe a felküldött adatokat!

    - d. Helyesen kitöltve vedd fel az adatokat a háttérrendszerben, majd jelenjen meg a főoldal, a küldetések listájában már az új elemmel.

    - e. Sikeres adatfelvitel esetén jelenjen meg egy `alert-success` stílusosztályú elem, benne a sikerességet jelző felirattal.

    ![](http://webprogramozas.inf.elte.hu/webfejl2/zh/avengers/3.png)

4. **Range slider értékének kiírása (10 pt)** A küldetések felvitelénél a range slider húzogatásakor nem látjuk annak értékét. Jelenítsük ezeket meg mind a három slider esetében!

    - a. Az oldal betöltése után a slider aktuális értékét jelenítsük meg a slider-ek után közvetlenül elhelyezkedő `span` elemeken belül!

    - b. Húzogatva a slidert, a kiírt érték aktualizálódik. Technikai segítség: használd az `input` eseményt!

    ![](http://webprogramozas.inf.elte.hu/webfejl2/zh/avengers/4.png)

5. **A végtelen kövek megszerzése (10 pt)** Thanos eltökélt szándéka a végtelen kövek begyűjtése. A kövek kis színes, pulzáló pontokként jelennek meg a képernyőn. Szerkezetileg a kövek `stone` stílusosztályú `div`-ek, amelyek a helyükön belül (`stone-place` stílusosztály) helyezkednek el.

    - a. Egy kőre kattintva, adj a kőnek `collected` stílusosztályt! Ez a követ a helyére helyezi.

    - b. Finomítsd ezt úgy, hogy először a kő mozogjon a helyére, majd akkor alkalmazd rá a `collected` stílusosztályt. A mozgáshoz elég a kő stílusai közül a `top` és `left` tulajdonságot beállítani a követ tartalmazó, `stone-place` stílusosztályú `div` pozíciójára. Ezt a pozíciót a `getBoundingClientRect()` metódussal tudod lekérdezni. Ha a kő a helyére került (a mozgás végén), akkor alkalmazd rá a `collected` stílusosztályt!

    - c. Ha az összes kő begyűjtésre került, azaz mindegyiknek van `collected` stílusosztálya, akkor a `gauntlet` stílusosztályú `div`-nek add az `activated` stílusosztályt, ezzel a kesztyűt aktiválod.

    ![](http://webprogramozas.inf.elte.hu/webfejl2/zh/avengers/5.png)

6. **Thanos csettintése (10 pt)** Ha a kesztyű aktív, akkor Thanos csettintésével megfelezi a bosszúállók számát.
    
    - a. Ha a kesztyű aktív (a `gauntlet` stílusosztályú `div`-nek van `activated` stílusosztálya is), akkor rákattintva válasszunk ki a 20 bosszúálló közül 10-et véletlenszerűen, és azokra a listaelemekre alkalmazzuk a `dust` stílusosztályt. Ennek hatására a megfelelő bosszúállók porrá válnak.

    - b. Még egyszer kattintva az aktív kesztyűre, a bosszúállók visszatérnek, azaz levesszük róluk a `dust` stílusosztályt.

    ![](http://webprogramozas.inf.elte.hu/webfejl2/zh/avengers/6.png)

7. **Legalkalmasabb két bosszúálló kiválasztása új küldetéshez (15 pt)** Új küldetés megadásakor a range sliderekkel tudjuk megadni az adott küldetés egyes paramétereinek a nehézségét. Készítsünk egy AJAX-os ajánlót hozzá, amely a sliderek aktuális értékének megfelelően kiválasztja, melyik két bosszúálló a legalkalmasabb a küldetésre. Az alkalmasságot úgy határozzuk meg, hogy minden bosszúálló párosra megnézzük, hogy az egyes paramétereiknek (erő, sebesség, kitartás) az átlaga mennyire tér el a küldetés adott paraméterének értékétől. Ezeket az eltéréseket mindhárom paraméterre (erő, sebesség, kitartás) meghatározzuk és összegezzük, és az a legalkalmasabb páros, akinél ez az érték a legkisebb. A sliderek `change` eseményére küldj el egy AJAX kérést egy általad írt PHP szkriptnek, GET paraméterként megadva az erő (`strength`), sebesség (`speed`) és kitartás (`durability`) értékét. A szervertől kapott válasz alapján pedig jelenítsd meg a kiválasztott két bosszúálló képét az `avenger1` és `avenger2` nevű input mező utáni `avenger` stílusosztályú `span` elemekben úgy, hogy ennek a `span` elemnek a bosszúálló nevéből képzett kisbetűs, kötőjeles nevét kell stílusosztályként megadni.

    ![](http://webprogramozas.inf.elte.hu/webfejl2/zh/avengers/7.png)


