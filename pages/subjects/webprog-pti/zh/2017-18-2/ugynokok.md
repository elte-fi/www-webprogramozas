# Webfejlesztés 2. pótzh -- Ügynökök

### Tudnivalók:

- A feladatokat a `webprogramozas.inf.elte.hu` szerveren kell elkészíteni. A `www` mappádon belül hozzál létre egy `agents` mappát, és abban készítsd el a megoldásodat. 
- A feladat tesztelését az [ellenőrző felületen](http://webprogramozas.inf.elte.hu:1701/tester) tudod elvégezni.
- A megoldás kinézete nem számít, csak az oldalak funkcionalitása.
- A feladatokat nem szükségszerű a leírás sorrendjében elvégezni, a feladatok többsége nem épül a másikra, viszont ha kell, akkor a szükséges előfeltételeket akár statikusan is, de biztosítani kell.
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

### Feladatleírás

Az angol titkosszolgálat, az MI6 nyilvántartást vezet minden ügynökéről. Segíts a csapat vezetőjének, M-nek a nyilvántartást megjelenítő webes alkalmazás elkészítésében!

0. **Előkészületek**

    **Adatok előkészítése** Az adatok tárolását fájlban vagy adatbázisban is elvégezheted. Az alkalmazás a következő 10 rekorddal dolgozik majd. Újat felvehetsz, de ezeket ne töröld. Ezek közül az első öttel (`1<=id<=5`) a felületen se dolgozz, ne változtasd adataikat, mert ezeket a tesztelő egy az egyben így várja el. A második 5 ügynök adatait (`6<=id<=10`) a tesztelő véletlenszerűen változtatja majd, és ezeket Te is változtathatod (kivéve az `id`-t). 

    ```txt
    id  Név           Szélesség Hosszúság   Aktív   Projekt             Feladat
    1   James Bond    100       100         1       Skyfall             M megmentése
    2   Jason Bourne  50        300         1       ultimátum           csapda
    3   Ethan Hunt    200       180         1       Mission impossible  Szindikátus megtalálása
    4   Mr Irdatlan   120       350         0       szilánk             család
    5   Nyúlányka     120       340         0       szilánk             család
    6   Ügynök1       230       216         1       Skyfall             Q biztosítása
    7   Ügynök2       109       33          0       ultimátum           rejtély
    8   Ügynök3       227       50          0       szilánk             gyerekvigyázás
    9   Ügynök4       148       195         0       Mission impossible  számítógép
    10  Ügynök5       217       412         1       Skyfall             kocsivezetés
    ```

    JSON formátumban:

    ```json
    [
        {"id": "1", "Név": "James Bond", "Szélesség": 100, "Hosszúság": 100, "Aktív": true, "Projekt": "Skyfall", "Feladat": "M megmentése"},
        {"id": "2", "Név": "Jason Bourne", "Szélesség": 50, "Hosszúság": 300, "Aktív": true, "Projekt": "ultimátum", "Feladat": "csapda"},
        {"id": "3", "Név": "Ethan Hunt", "Szélesség": 200, "Hosszúság": 180, "Aktív": true, "Projekt": "Mission impossible", "Feladat": "Szindikátus megtalálása"},
        {"id": "4", "Név": "Mr Irdatlan", "Szélesség": 120, "Hosszúság": 350, "Aktív": false, "Projekt": "szilánk", "Feladat": "család"},
        {"id": "5", "Név": "Nyúlányka", "Szélesség": 120, "Hosszúság": 340, "Aktív": false, "Projekt": "szilánk", "Feladat": "család"},
        {"id": "6", "Név": "Ügynök1", "Szélesség": 230, "Hosszúság": 216, "Aktív": true, "Projekt": "Skyfall", "Feladat": "Q biztosítása"},
        {"id": "7", "Név": "Ügynök2", "Szélesség": 109, "Hosszúság": 33, "Aktív": false, "Projekt": "ultimátum", "Feladat": "rejtély"},
        {"id": "8", "Név": "Ügynök3", "Szélesség": 227, "Hosszúság": 50, "Aktív": false, "Projekt": "szilánk", "Feladat": "gyerekvigyázás"},
        {"id": "9", "Név": "Ügynök4", "Szélesség": 148, "Hosszúság": 195, "Aktív": false, "Projekt": "Mission impossible", "Feladat": "számítógép"},
        {"id": "10", "Név": "Ügynök5", "Szélesség": 217, "Hosszúság": 412, "Aktív": true, "Projekt": "Skyfall", "Feladat": "kocsivezetés"}
    ]
    ```

    Ha adatbázist használsz, akkor az alábbi SQL utasítás bemásolásával létre tudod hozni (phpmyadminban kiválasztva az adatbázisod, SQL fül):

    ```sql
    CREATE TABLE `ugynokok` (
      `id` int(11) NOT NULL,
      `nev` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
      `szelesseg` int(11) NOT NULL,
      `hosszusag` int(11) NOT NULL,
      `aktiv` tinyint(1) NOT NULL,
      `projekt` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
      `feladat` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

    INSERT INTO `ugynokok` (`id`, `nev`, `szelesseg`, `hosszusag`, `aktiv`, `projekt`, `feladat`) VALUES
    (1, 'James Bond', 100, 100, 1, 'Skyfall', 'M megmentése'),
    (2, 'Jason Bourne', 50, 300, 1, 'ultimátum', 'csapda'),
    (3, 'Ethan Hunt', 200, 180, 1, 'Mission impossible', 'Szindikátus megtalálása'),
    (4, 'Mr Irdatlan', 120, 350, 0, 'szilánk', 'család'),
    (5, 'Nyúlányka', 120, 340, 0, 'szilánk', 'család'),
    (6, 'Ügynök1', 230, 216, 1, 'Skyfall', 'Q biztosítása'),
    (7, 'Ügynök2', 109, 33, 0, 'ultimátum', 'rejtély'),
    (8, 'Ügynök3', 227, 50, 0, 'szilánk', 'gyerekvigyázás'),
    (9, 'Ügynök4', 148, 195, 0, 'Mission impossible', 'számítógép'),
    (10, 'Ügynök5', 217, 412, 1, 'Skyfall', 'kocsivezetés');

    ALTER TABLE `ugynokok`
      MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
    ```

    **Stílusok**

    Minden oldalon tedd elérhetővé a következő stílusokat:

    ```html
    <link rel="stylesheet" type="text/css" href="http://webprogramozas.inf.elte.hu/webfejl2/gyak/style.css">
    ```

    **A lista oldal ajánlott szerkezete**

    A lista oldal (`lista.php`) szerkezete legyen ilyen:

    ```html
    <link rel="stylesheet" type="text/css" href="http://webprogramozas.inf.elte.hu/webfejl2/gyak/style.css">

    <div class="container">
        <div class="row">
            <div class="col">
                <h2>Aktív ügynökök</h2>
                <!-- Aktív ügynökök táblázata -->

                <h2>Inaktív ügynökök</h2>
                <!-- Inaktív ügynökök táblázata -->
            </div>
            <div class="col">
                <h2>Térkép</h2>
                <!-- Ügynöktérkép -->

                <h2>Fizikai állapot</h2>
                <ul class="allapot list-group">
                    <li class="pulzus list-group-item d-flex justify-content-between align-items-center">
                        Pulzus
                        <span class="badge badge-primary badge-pill">-</span>
                    </li>
                    <li class="vernyomas list-group-item d-flex justify-content-between align-items-center">
                        Vérnyomás
                        <span class="badge badge-primary badge-pill">-</span>
                    </li>
                    <li class="faradtsag list-group-item d-flex justify-content-between align-items-center">
                        Fáradtság
                        <span class="badge badge-primary badge-pill">-</span>
                    </li>
                </ul>
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

1. **Listázás (10 pt)** Listázd ki az aktív és inaktív ügynököket külön táblázatban, és jelenítsd meg őket a térképen. Fájlnév: `lista.php`.

    a. A táblázat legyen ilyen szerkezetű:
    
        ```html
        <table class="table table-sm">
            <thead class="thead-dark">
                <tr>
                    <th>Név</th>
                    <th>Koordináták</th>
                    <th>Projekt</th>
                    <th>Feladat</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr data-id="1">
                    <td>James Bond</td>
                    <td>100,100</td>
                    <td>Skyfall</td>
                    <td>M megmentése</td>
                    <td>Off</td>
                </tr>
            </tbody>
        </table>
        ```

        A koordináták `szélesség,hosszúság` formátumban vannak megadva szóköz nélkül.

    b. Az aktív ügynökök esetén a `table` elem kapjon `aktiv` stílusosztályt, az inaktív ügynökök táblázata pedig `inaktiv` stílusosztályt!

    c. A táblázat adatait tartalmazó soroknak legyen az `id`-t tartalmazó `data-id` attribútuma (pl. `<tr data-id="1">`).

    d. Az aktív ügynökök táblázatában az utolsó oszlopban legyen egy "Off" feliratú hivatkozás. Az inaktív ügynökök táblázatában az utolsó oszlopban legyen egy "On" feliratú hivatkozás.

    e. A név mindkét táblázat minden sorában legyen hivatkozás, amelyre kattintva a `modosit.php` oldal jön be, átadva az `id` értékét `id` név alatt GET paraméterként.

    f. A térképen az összes ügynököt fel kell tüntetni a következő struktúrában. A `div`-en belüli `span` elemnek adjunk egy `data-id` attribútumot az ügynök `id`-jával. Az eltolás (`translate`) sorrendje: hosszúság, szélesség.

        ```html
        <div class="terkep">
            <span data-id="1" style="transform: translate(100px,100px)"></span>
        </div>
        ```

    ![](pages/subjects/webprog-pti/zh/2017-18-2/ugynokok/2_lista.png)

2. **Aktivizál, inaktivizál (10 pt)** Legyen lehetőség ügynököket aktivizálni vagy inaktivizálni. Az aktív ügynökök táblázatában az ügynök melletti "Off" hivatkozásra kattintva legyen az ügynök inaktív, és az oldal újratöltése után jelenjen meg az inaktív ügynökök táblázatában. Az inaktív ügynökök táblázatában az ügynök melletti "On" hivatkozásra kattintva legyen az ügynök aktív, és az oldal újratöltése után jelenjen meg az aktív ügynökök táblázatában.

    Technikai segítség: a link mutasson egy PHP oldalra, amely elvégzi az aktivizálást/inaktivizálást, majd átirányítja az oldalt a `lista.php`-ra.

3. **Módosítás űrlap (20 pt)** A listaoldalon a táblázatbeli névre kattintva jöjjön be a módosító oldal (`modosit.php`).

    a. Jelenítsd meg a kiválasztott ügynök adatait. Az ügynök neve legyen egy 1-es címsorban, a többi adata egy űrlap megfelelő beviteli mezőibe betöltve:

        - id (neve: `id`, rejtett mező, kötelező, szám, feltételezzük, hogy mindig küldjük)
        - szélesség (neve: `szelesseg`, szöveges beviteli mező, kötelező, szám, hibaüzenetek: `A szélesség kötelező`, `A szélesség nem szám`)
        - hosszúság (neve: `hosszusag`, szöveges beviteli mező, kötelező, szám, hibaüzenetek: `A hosszúság kötelező`, `A hosszúság nem szám`)
        - aktív (neve: `aktiv`, checkbox)
        - projekt (neve: `projekt`, szöveges beviteli mező, kötelező, hibaüzenetek: `A projekt kötelező`)
        - feladat (neve: `feladat`, szöveges beviteli mező, kötelező, hibaüzenetek: `A feladat kötelező`)

    b. Helytelenül kitöltve a fenti hibaüzenetek jelenjenek meg egy `hibak` azonosítójú elemben (nem feltétlenül strukturáltan).

    c. Helyesen kitöltve az adatok kerüljenek módosításra a háttérrendszerben, majd jelenjen meg a listaoldal.

    ![](pages/subjects/webprog-pti/zh/2017-18-2/ugynokok/2_modosit.png)

4. **Ügynök választása le-föl lépegetéssel (10 pt)** A listaoldalon tegyük lehetővé, hogy a le-föl billentyűk segítségével lehessen lépdelni az ügynökök között.

    a. Az oldal betöltésekor egyik ügynök sem aktív.

    b. A lefele gomb megnyomásával kiválasztjuk az első ügynököt az aktív táblázatban és a térképen. A táblázatban az adott ügynök táblázatsorát a `table-active` stílusosztállyal kell ellátni. A térképen az adott `span`-t az `aktiv` stílusosztállyal kell felruházni.

    c. A lefele gomb tovább megnyomásával a következő ügynök legyen kiválasztva, az előző már nem. A lefele gomb a következő, a felfele gomb az előző ügynököt választja ki. A lefele gombbal az aktív táblázatból átmehetünk az inaktív táblázatra, a felfele gombbal pedig vissza. Ha az első ügynökről lépünk felfele, akkor egyik ügynök sem lesz kiválasztva.

    ![](pages/subjects/webprog-pti/zh/2017-18-2/ugynokok/2_kivalaszt.png)

5. **Fizikai állapot lekérdezése AJAX-szal (10 pt)** Ha egy ügynök ki van választva a listaoldalon, akkor az ENTER billentyű lenyomásával lekérdezhetjük a bőre alá ültetett csip  segítségével a fizikai állapotát. Az adatokat az `ul.allapot` listában jelenítsük meg.

    a. Ha nincs kiválasztva ügynök (így az oldal betöltésekor is), akkor az állapotpanel (`ul.allapot`) ne jelenjen meg!

    b. Kiválasztott ügynök esetén az ENTER billentyűt lenyomva küldjünk AJAX kérést a `http://webprogramozas.inf.elte.hu/webfejl2/gyak/allapot.php?id=1` végpontra, értelemszerűen az `id` értéke változik. Sikeres válasz esetén az állapotpanelt jelenítsük meg benne a válaszként kapott adatokkal. Az adatokat a megfelelő `badge-pill` stílusosztályú `span`-ba kell rakni. A válasz formátuma a következő:

        ```txt
        {
            "pulzus":105,
            "vernyomas":"169\/63",
            "faradtsag":61
        }
        ```

    c. A kiválasztott ügynökről továbblépve az állapotpanel eltűnik.

    ![](pages/subjects/webprog-pti/zh/2017-18-2/ugynokok/2_allapot.png)

6. **Projektszűrő (10 pt)** Adjunk lehetőséget projektek szűrésére egy megadott szövegrész alapján a lsitaoldalon. A szűrt projekteket jelöljük meg a táblázatokban!
    
    a. Tegyünk fel egy `szuro` azonosítójú szöveges beviteli mezőt az aktív ügynökök fejlécsora fölé.

    b. Ebbe egy szövegrészletet beleírva kijelölődnek azok a táblázasorok, amelyek projektneve tartalmazza a szöveges beviteli mezőt. A kijelöléshez az adott táblázatsoroknak `table-warning` stílusosztályt kell adni!

    c. Üres szűrőmező esetén egyik táblázatsornak sem szabad kijelölve lennie.

    ![](pages/subjects/webprog-pti/zh/2017-18-2/ugynokok/2_szuro.png)

7. **AJAX pozíciómódosítás (10 pt)** A listaoldalon a kiválasztott ügynök pozícióját legyen lehetőség módosítani a CTRL+iránybillentyűk segítségével! Az elmozdulások 10px-lel történjenek meg az adott irányban. Ne legyen lehetőség a térképről lelépni, azaz a szélesség 0 és 300 között, a hosszúság 0 és 500 között legyen mindig! A megváltozott pozíciót AJAX-szal mentsük el a háttérrendszerbe. Feltételezzük, hogy a mentés sikeres, a válasz formátuma és tartalma szabadon választható. Az oldalt újratöltve a megváltozott pozíciók legyenek!


