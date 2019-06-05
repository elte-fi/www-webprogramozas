<style type="text/css">
main img {
    max-width: 100%;
}
main ul p, main ol p {
  display: block;
}
</style>

# Webfejlesztés 2. pótzh -- Thor diétája

_2019. június 5._

## Tudnivalók:

- A feladatokat a `webprogramozas.inf.elte.hu` szerveren kell elkészíteni. A `www` mappádon belül hozzál létre egy `thor` mappát, és abban készítsd el a megoldásodat.
- A feladat tesztelését az [ellenőrző felületen](http://webprogramozas.inf.elte.hu:1701/tester) tudod elvégezni.
- A feladatra elkészítésére 3 óra áll rendelkezésre.
- A megoldás kinézete nem számít, csak az oldalak funkcionalitása.
- A feladatokat nem szükségszerű a leírás sorrendjében elvégezni, a feladatok többsége nem épül a másikra, viszont ha kell, akkor a szükséges előfeltételeket, akár statikusan is, de biztosítani kell.
- **Fontos** A műveletek helyességét csak a felületen keresztül tudjuk ellenőrizni az adatok megjelenítésével, a háttérben tárolt adatokat közvetlenül nem vizsgáljuk.
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

Thor Thanos csettintése után mély letargiába került, és alaposan elhízott. Anyukájának tanácsára azonban diétába kezdett. Segíts Thornak a diétás menüjének kezelésében, és egy kis mozgással a lefogyásban!

0. **Előkészületek**

    **Adatok előkészítése** Az adatok tárolását fájlban vagy adatbázisban is elvégezheted, bár az adatbázis használata az ajánlott. Az alkalmazás kétféle adattal dolgozik: a diétás menü étkezéseinek adataival és az egyes ételtípusok nyilvántartásával. 
    
    Minden menüről nyilvántartjuk, hogy melyik nap mikortól meddig lehet mit enni és az hány kCal-nak felel meg, illetve azt, hogy az a menü aktív-e, azaz Thor nem ette-e meg. Az alábbi rekordokat ne módosítsd, de később újabb adatokat kell ezekhez hozzáadni. A tesztelő később az aktív mezőt állíthatja a 7. feladatban, ha az összeset inaktiválta a 6. sortól kezdve, akkor előfordulhat, hogy kézzel kell az aktív mezőt igazra állítani.
    
    ```txt
    id  nap         mettol    meddig    etelek              kcal  aktiv
    1   2019-06-05  08:00:00  09:00:00  joghurt,alma,müzli  100   1
    2   2019-06-05  10:00:00  11:00:00  mogyoró             10    1
    3   2019-06-05  12:00:00  13:00:00  hús,saláta          200   0
    4   2019-06-05  16:00:00  17:00:00  mandula             10    1
    5   2019-06-05  18:00:00  20:00:00  víz                 0     0
    6   2019-06-04  08:00:00  10:00:00  tojás,narancslé     80    1
    7   2019-06-04  10:00:00  11:00:00  törökmogyoró        5     1
    8   2019-06-03  11:00:00  12:00:00  alma,körte          20    1
    ```

    Az ételtípusoknál nyilvántartjuk az étel nevét és kCal értékét. Ezeket az adatokat ne módosítsd, ne adj hozzá újat, ne töröld!

    ```txt
    id  nev                           kcal
    1   Félbarna kenyér (burgonyás)   229
    2   Kifli, óriás                  302
    3   Almás pite                    311
    4   Kakaós csiga                  477
    5   Kalács foszlós                279
    6   Lekváros bukta                313
    7   Meggyes pite                  312
    8   Túrós rétes                   330
    9   Csirkehús (sovány)            110
    10  Marhahús, sovány              116
    11  Mezeinyúlhús                  104
    12  Õzhús                         102
    13  Sertéshús, kövér              392
    14  Szarvashús                    120
    15  Disznósajt                    314
    16  Száraz kolbász                360
    17  Harcsa                        78
    18  Tepertõ                       797
    19  Tehéntej                      34
    20  Tojás                         164
    21  Burgonya                      85
    22  Fejes saláta                  16
    23  Karalábé                      38
    24  Karfiol                       29
    25  Káposzta (fejes)              31
    26  Káposzta (nyári)              65
    27  Káposzta (vörös)              31
    28  Kelkáposzta                   34
    29  Kukorica (tejes)              127
    30  Paradicsom                    22
    31  Paraj                         18
    32  Petrezselyemgyökér            29
    33  Petrezselyem zöldje           60
    34  Retek (hónapos)               15
    35  Sárgarépa                     35
    36  Sóska                         23
    37  Spárga                        16
    38  Uborka                        11
    39  Borsó (száraz)                327
    40  Alma (Jonathán)               30
    41  Ananász                       51
    42  Banán                         103
    43  Birsalma                      41
    44  Citrom                        25
    45  Grapefruit                    35
    46  Kajszibarack                  46
    47  Körte                         50
    48  Málna                         28
    49  Meggy                         51
    50  Narancs                       40
    51  Õszibarack                    40
    52  Marhapörkölt                  217
    53  Pacalpörkölt                  111
    54  Gombaleves                    193
    55  Gulyásleves                   336
    56  Finomfõzelék                  296
    57  Tökfõzelék                    267
    58  Sertéspörkölt (hagyományosan) 335
    59  Sertéstokány                  406
    60  Spagetti                      681
    61  Madártej                      266
    62  Máglyarakás                   833
    63  BOCI tejcsokoládé             554
    ```
    
    Ha adatbázist használsz, akkor az alábbi SQL utasítás bemásolásával létre tudod hozni (phpmyadminban kiválasztva az adatbázisod, SQL fül):

    ```sql
    CREATE TABLE `menu` (
      `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
      `nap` date NOT NULL,
      `mettol` time NOT NULL,
      `meddig` time NOT NULL,
      `etelek` text COLLATE utf8_hungarian_ci NOT NULL,
      `kcal` int(11) NOT NULL,
      `aktiv` tinyint(1) NOT NULL DEFAULT '1',
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

    INSERT INTO `menu` (`id`, `nap`, `mettol`, `meddig`, `etelek`, `kcal`, `aktiv`) VALUES
      (1, '2019-06-05', '08:00:00', '09:00:00', 'joghurt,alma,müzli', 100, 1),
      (2, '2019-06-05', '10:00:00', '11:00:00', 'mogyoró', 10, 1),
      (3, '2019-06-05', '12:00:00', '13:00:00', 'hús,saláta', 200, 0),
      (4, '2019-06-05', '16:00:00', '17:00:00', 'mandula', 10, 1),
      (5, '2019-06-05', '18:00:00', '20:00:00', 'víz', 0, 0),
      (6, '2019-06-04', '08:00:00', '10:00:00', 'tojás,narancslé', 80, 1),
      (7, '2019-06-04', '10:00:00', '11:00:00', 'törökmogyoró', 5, 1),
      (8, '2019-06-03', '11:00:00', '12:00:00', 'alma,körte', 20, 1);

    CREATE TABLE `etelek` (
      `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
      `nev` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
      `kcal` int(11) NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

    INSERT INTO `etelek` (`id`, `nev`, `kcal`) VALUES
      (1, 'Félbarna kenyér (burgonyás)', 229),
      (2, 'Kifli, óriás', 302),
      (3, 'Almás pite', 311),
      (4, 'Kakaós csiga', 477),
      (5, 'Kalács foszlós', 279),
      (6, 'Lekváros bukta', 313),
      (7, 'Meggyes pite', 312),
      (8, 'Túrós rétes', 330),
      (9, 'Csirkehús (sovány)', 110),
      (10, 'Marhahús, sovány', 116),
      (11, 'Mezeinyúlhús', 104),
      (12, 'Õzhús', 102),
      (13, 'Sertéshús, kövér', 392),
      (14, 'Szarvashús', 120),
      (15, 'Disznósajt', 314),
      (16, 'Száraz kolbász', 360),
      (17, 'Harcsa', 78),
      (18, 'Tepertõ', 797),
      (19, 'Tehéntej', 34),
      (20, 'Tojás', 164),
      (21, 'Burgonya', 85),
      (22, 'Fejes saláta', 16),
      (23, 'Karalábé', 38),
      (24, 'Karfiol', 29),
      (25, 'Káposzta (fejes)', 31),
      (26, 'Káposzta (nyári)', 65),
      (27, 'Káposzta (vörös)', 31),
      (28, 'Kelkáposzta', 34),
      (29, 'Kukorica (tejes)', 127),
      (30, 'Paradicsom', 22),
      (31, 'Paraj', 18),
      (32, 'Petrezselyemgyökér', 29),
      (33, 'Petrezselyem zöldje', 60),
      (34, 'Retek (hónapos)', 15),
      (35, 'Sárgarépa', 35),
      (36, 'Sóska', 23),
      (37, 'Spárga', 16),
      (38, 'Uborka', 11),
      (39, 'Borsó (száraz)', 327),
      (40, 'Alma (Jonathán)', 30),
      (41, 'Ananász', 51),
      (42, 'Banán', 103),
      (43, 'Birsalma', 41),
      (44, 'Citrom', 25),
      (45, 'Grapefruit', 35),
      (46, 'Kajszibarack', 46),
      (47, 'Körte', 50),
      (48, 'Málna', 28),
      (49, 'Meggy', 51),
      (50, 'Narancs', 40),
      (51, 'Õszibarack', 40),
      (52, 'Marhapörkölt', 217),
      (53, 'Pacalpörkölt', 111),
      (54, 'Gombaleves', 193),
      (55, 'Gulyásleves', 336),
      (56, 'Finomfõzelék', 296),
      (57, 'Tökfõzelék', 267),
      (58, 'Sertéspörkölt (hagyományosan)', 335),
      (59, 'Sertéstokány', 406),
      (60, 'Spagetti', 681),
      (61, 'Madártej', 266),
      (62, 'Máglyarakás', 833),
      (63, 'BOCI tejcsokoládé', 554);
    ```

    **A főoldal szerkezete**

    A főoldal (`index.php`) szerkezete legyen ilyen:

    ```html
    <!DOCTYPE html>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="http://webprogramozas.inf.elte.hu/webfejl2/zh/thor/index.css">

    <nav class="navbar navbar-dark bg-primary">
      <a class="navbar-brand text-light" href="index.php">Thor diétája</a>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="ujmenu.php">Új menü</a>
        </li>
      </ul>
      <form class="form-inline">
        <span class="navbar-text .text-light">Aktuális idő</span>
        <input class="form-control mr-sm-2" type="time">
      </form>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <div class="col-md">
          <h2>Menü</h2>
          <form action="" method="get">
            <div class="form-row">
              <div class="col-sm-10">
                <input type="date" name="nap" class="form-control" placeholder="YYYY-MM-DD">
              </div>
              <div class="col-sm-2">
                <button type="submit" class="btn btn-secondary w-100">Szűr</button>
              </div>
            </div>
          </form>
          <div class="card">
            <ul class="list-group list-group-flush">
              <li class="list-group-item list-group-item-action active" data-id="1">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">8:00-9:00</h5>
                  <small>100 kCal</small>
                </div>
                <p class="mb-1">hús,saláta,mogyoró</p>
                <div class="d-flex w-100 justify-content-between">
                  <small>2019-06-05</small>
                  <button class="btn btn-secondary btn-sm">Megevés</button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-md">
          <h2>Thor</h2>
          <div class="card thor">
            <img src="http://webprogramozas.inf.elte.hu/webfejl2/zh/thor/thor1.jpg" class="card-img">
          </div>

          <h2>Sport</h2>
          <div class="card sport bg-primary">
            <div class="giant" style="top: 10%; left: 90%"></div>
            <div class="giant" style="top: 34%; left: 30%"></div>
            <div class="giant" style="top: 87%; left: 24%"></div>
            <div class="giant" style="top: 63%; left: 66%"></div>
            <div class="giant" style="top: 54%; left: 37%"></div>
            <div class="giant" style="top: 41%; left: 18%"></div>
            <div class="giant" style="top: 29%; left: 23%"></div>
            <div class="giant" style="top: 65%; left: 42%"></div>
            <div class="giant" style="top: 90%; left: 64%"></div>
            <div class="giant" style="top: 20%; left: 35%"></div>
            <div class="giant" style="top: 19%; left: 71%"></div>
            <div class="giant" style="top: 46%; left: 85%"></div>
            <div class="giant" style="top: 76%; left: 90%"></div>
            <div class="giant" style="top: 44%; left: 27%"></div>
            <div class="thor"></div>
          </div>
        </div>
      </div>
    </div>
    ```

    **Az új menü oldal szerkezete**

    Az új menü oldal (`ujmenu.php`) szerkezete legyen ilyen:

    ```html
    <!DOCTYPE html>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="http://webprogramozas.inf.elte.hu/webfejl2/zh/thor/index.css">

    <nav class="navbar navbar-dark bg-primary">
      <a class="navbar-brand text-light" href="index.php">Thor diétája</a>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#">Új menü</a>
        </li>
      </ul>
    </nav>

    <div class="container">
      <div class="row">
        <div class="col-md">
          <h2>Új menü felvétele</h2>

          <div class="alert alert-danger" role="alert">
              Hibaüzenetek
          </div>

          <form action="" method="post" class="ujmenu">
            <div class="form-group">
              <label for="nap">Nap</label>
              <input type="date" name="nap" class="form-control" id="nap" required>
            </div>
            
            <div class="form-group">
              <label for="mettol">Mettől</label>
              <input type="time" name="mettol" class="form-control" id="mettol" required>
            </div>

            <div class="form-group">
              <label for="meddig">Meddig</label>
              <input type="time" name="meddig" class="form-control" id="meddig" required>
            </div>

            <div class="form-group">
              <label for="etelek">Ételek</label>
              <textarea name="etelek" class="form-control" id="etelek" placeholder="étel1,étel2" required></textarea>
              <small id="emailHelp" class="form-text text-muted">Ételek vesszővel felsorolt neve</small>
            </div>

            <div class="form-group">
              <label for="kcal">kCal</label>
              <input type="number" name="kcal" class="form-control" id="kcal" required>
            </div>
            
            <div class="form-group row">
              <button type="submit" class="btn btn-primary">Új menü mentése</button>
            </div>
          </form>
        </div>

        <div class="col-md">
          <h2>Ételek</h2>
          <form class="etelek">
            <!-- alábbi ismétlendő -->
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="1" value="kenyér" data-kcal="30">
              <label class="form-check-label" for="1">kenyér</label>
            </div>
            <!-- idáig -->
          </form>
        </div>
      </div>
    </div>
    ```

    **Csatlakozás az adatbázishoz**

    - felhasználónév: neptun
    - jelszó: neptun
    - adatbázis: wf2_neptun

    Például az előadáson bevezetett `kapcsolodas` függvénnyel ez a következőképpen néz ki. Lényeges még a `charset=utf8` a kapcsolódási szövegben:

    ```php
    $kapcsolat = kapcsolodas(
      'mysql:host=localhost;dbname=wf2_neptun;charset=utf8',
      'neptun', 'neptun');
    ```

1. **A menü listázása (5 pt)** Listázd ki a menüket a főoldalon! Fájlnév: `index.php`.

    - a. A menüket a `list-group` stílusosztályú felsorolásban sorold fel. Egy menünek egy `list-group-item` stílusosztályú listaelem felel meg. Jelenítsd meg a megfelelő helyen, hogy melyik nap mettől meddig lehet a megadott ételeket enni, és az hány kCal jelent. A listaelem `data-id` attribútumába a menü `id`-ja kerüljön.

    - b. Ügyelj arra, hogy a listában az időformátum `HH:MM` alakú, szemben az adatbázisban tárolt `HH:MM:SS` formátummal! A listában a rövidebb formátumot kell megjeleníteni!

    - c. A listában egy menünél csak akkor jelenjen meg gomb, ha az adott menü még aktív!

    ![](http://webprogramozas.inf.elte.hu/webfejl2/zh/thor/1.png)
    
    
2. **A menü szűrése (10 pt)** Végezd el a menü szűrését a fölötte található szűrőfunkció segítségével!

    - a. A menü fölött található egy szűrőmező, ahol egy nap kiválasztható, majd a szűrőgombra kattintva az oldal újratöltődése után csak az adott napi elemek választhatók ki. A kiválasztott nap `nap` néven jelenjen meg a kérés GET paraméterei között (pl. `nap=2019-04-03`)!

    - b. Az oldal újratöltése után a szűrőmező értéke tartalmazza a kiválasztott napot!
    
    ![](http://webprogramozas.inf.elte.hu/webfejl2/zh/thor/2.png)
    
    
3. **Új menü felvétele (20 pt)** Adjunk lehetőséget új menüt felvenni a navigációs fejléc "Új menü" hivatkozására kattintva. Fájlnév: `ujmenu.php`

    - a. Az űrlap az alábbi mezőket tartalmazza:

      - melyik nap (neve: `nap`, típusa: dátum, kötelező, formátuma: `YYYY-MM-DD`, hibaüzenetek: `Nap megadása kötelező`, `Nap dátumformátuma rossz`)
      - mikortól lehet enni (neve: `mettol`, típusa: idő, kötelező, formátuma: `HH:MM`, hibaüzenetek: `Mettől megadása kötelező`, `Mettől időformátuma rossz`)
      - meddig lehet enni (neve: `meddig`, típusa: idő, kötelező, formátuma: `HH:MM`, hibaüzenetek: `Meddig megadása kötelező`, `Meddig időformátuma rossz`)
      - menü ételei (neve: `etelek`, típusa: többsoros beviteli mező, kötelező, hibaüzenetek: `Ételek megadása kötelező`)
      - kCal érték (neve: `kcal`, típusa: nemnegatív szám, kötelező, hibaüzenetek: `kCal megadása kötelező`, `kCal nem szám`, `kCal negatív`)

      Technikai segítség: a dátum- és időformátum ellenőrzéséhez reguláris kifejezések használatát javasolom. A dátum és idő helyességéhez pedig dátum esetében a PHP-s `checkdate()` függvényt, idő esetében pedig a `strtotime()` függvényt!
      
    - b. Helytelenül kitöltve a fenti hibaüzenetek közül a megfelelőek jelenjenek meg egy `alert-danger` stílusosztályú elemben (nem feltétlenül strukturáltan, azaz lehet a hibaüzeneteket pl. `var_dump`-pal kiíratni). Ez a hibaüzenet elem az űrlap első betöltésekor nem jelenik meg az oldalon.

    - c. Hiba esetén gondoskodj az űrlap állapottartásáról, azaz írd vissza a beviteli mezőkbe a felküldött adatokat!

    - d. Helyesen kitöltve vedd fel az adatokat a háttérrendszerben, majd jelenjen meg a főoldal, a menülistában már az új elemmel.

    ![](http://webprogramozas.inf.elte.hu/webfejl2/zh/thor/3.png)
    
    
4. **Ételek kiválasztása és a kalória számolása új menü felvitelekor (15 pt)** Segíts az ételek generálásában és a kalória számolásában az új menü oldalon!

    - a. Az űrlap mellett listázd ki az elérhető ételeket jelölőmezőkként!

    - b. Egy vagy több jelölőmezőt választva (jelölőmező `click` eseménye) állítsd elő az ételek listáját vesszővel elválasztva, és írd a megfelelő beviteli mezőbe.

    - c. Ugyancsak választáskor számold ki automatikusan a kijelölt elemek összkalóriaértékét. Egy étel kalóriaértéke a jelölőmező `data-kcal` attribútumában van tárolva.
    
    ![](http://webprogramozas.inf.elte.hu/webfejl2/zh/thor/4.png)
    
    
5. **Aktuális időtől függő funkciók (10 pt)** Thornak nem szabad akármikor ennie, csak reggel 8 óra előtt és 18 óra után. Erre figyelmezteti őt a főoldalon lévő óra a jobb fölső sarokban.

    - a. Az oldal betöltése után jelenítsd meg az aktuális időt az óramezőben!

    - b. Ha megváltoztatjuk az időt (átírjuk az értékét, `change` eseményre kell feliratkozni), akkor a "tiltott" tartományba érve:

        - A fejléc legyen piros: a `navbar` stílusosztályú elemhez kell a `bg-danger` stílusosztályt is felvenni.
        - A menülista gombjait ("Megevés") le kell tiltani (`disabled`)
        - Thor képét meg kell változtatni erre: `http://webprogramozas.inf.elte.hu/webfejl2/zh/thor/thor3.jpg`
    
    - c. A normál tartományba érve minden visszaáll az eredeti állapotába.
    
    ![](http://webprogramozas.inf.elte.hu/webfejl2/zh/thor/5.png)
    
    
6. **SporThor: Thor sportol (10 pt)** Thornak mozgásra is szüksége van a diéta mellett. Néha kimegy a mezőre, és a felbukkanó óriásokat jól kupán vágja. Ha megtisztítja a mezőt, akkor megérdemel egy sört Doctor Strange-től.

    - a. A `sport` stílusosztályú elemben (=mező) 14 `giant` stílusosztályú elem és 1 `thor` stílusosztályú elem van előkészítve. Ezeket ne módosítsd!

    - b. A mezőn bárhova kattintva (`click` esemény) Thor odarepül a kalapácsával. Ehhez a `thor` stílusosztályú eleme `top` és `left` stílustulajdonságát kell a mező méretéhez képest százalékosan megadni (pl. `top: 23%`). Technikai segítség: egy elem pozícióját és méreteit a `getBoundingClientRect()` metódussal lehet lekérdezni (pl. `elem.getBoundingClientRect()`). A kattintás adataiból (`clientX`, `clientY`) és a mező adataiból ki lehet számolni, hogy Thornak a mezőn százalékosan hol kellene elhelyezkednie.

    - c. Thor repülésének animációja végén a `smashed` stílusosztályt kell adni azoknak az óriásoknak, akiknek területe átfed Thor területével. Ekkor az óriás eltűnik. 
    
      Technikai segítség:
      
      - Ehhez megint csak a `getBoundingClientRect()` metódust érdemes használni.
      - Két téglalap átfedésének vizsgálatához pedig egy ilyen függvényt, ahol egy téglalap az `x`, `y`, `width` és `height` tulajdonságaival adott.

        ```js
        function utkozes(a_x, a_y, a_width, a_height, b_x, b_y, b_width, b_height) {
          return !(
            b_y + b_height < a_y ||
            a_x + a_width < b_x ||
            a_y + a_height < b_y ||
            b_x + b_width < a_x
          );
        }
        ```

    - d. Ha az összes óriás eltűnt, akkor változtassuk Thor képét erre: `http://webprogramozas.inf.elte.hu/webfejl2/zh/thor/thor2.jpg`

    ![](http://webprogramozas.inf.elte.hu/webfejl2/zh/thor/6.png)
    
    
7. **Menü elfogyasztása (10 pt)** Thor azért csak megéhezik egyszer. Adjunk lehetőséget neki megenni azokat a menüket, amiket még nem evett meg!

    - a. A "Megevés" gombra kattintva küldjünk egy POST AJAX kérést a szervernek, amelyben átadjuk a megevendő menü `id`-ját, majd a háttérrendszerben az adott menü aktív tulajsonságát hamisra állítjuk.

    - b. A felületen választól függetlenül az alábbi változások legyenek:

      - A gomb felirata legyen: "Megéve"
      - A gomb kapjon egy `btn-success` stílusosztályt

    - c. Az oldalt újratöltve a gomb már nem jelenik meg az adott menü mellett.

    Megjegyzés: A tesztelőnek biztosítani kell, hogy a 6-osnál nagyobb `id`-jú elemek között legyen aktív menü. Ha nincs ilyen, akkor a tesztelő hibával leáll.
    
    ![](http://webprogramozas.inf.elte.hu/webfejl2/zh/thor/7.png)

