# Webfejlesztés 2. pótzh -- Levelező tanárszak

_2019.06.07._

### Tudnivalók:

- Mindegyik megoldást, még a JavaScripteseket is a webprogramozas szerveren oldjátok meg.
- Készítsetek egy `wf2zh` mappát a `www` könyvtáratokon belülre.
- A kód és kinézet nem számít, csak a funkcionalitás.
- Bármit lehet használni. Humán segítséget csak az oktatótól lehet kérni.
- Ponthatárok:
    + 0-19 pts: 1
    + 20-24 pts: 2
    + 25-29 pts: 3
    + 30-34 pts: 4
    + 35-40 pts: 5


### Feladatok

1. **Könyvek (JavaScript, 10 pt)** Adott könyvek tömbje. Mindegyik könyvről tudjuk a címét és kategóriáját. A felületen válasszunk egy kategóriát, és jelenítsük meg az annak megfelelő könyveket. Fájl: `1/index.html`.
    
    - a. Hozz létre JavaScriptben egy könyvekkel feltöltött tömböt. Egy könyv egy olyan objektum, aminek van cím és kategória mezője. A tömböt írd ki a konzolra! (2 pt)

    - b. Adott egy kategória (pl. `mese`). Válogasd ki azokat a könyveket, amelyeknek ez a kategóriája. Az eredményül kapott tömböt írd ki a konzolra. (2 pt)

    - c. Az előző feladatbeli funkcionalitást rakd egy `kivalogat` nevű függvénybe. A függvény két paramétert kap: a szűrendő tömböt és a kategória nevét. Hívd meg a függvényt, és az eredményt írd ki a konzolra! (2 pt)

    - d. Jelenítsd meg a könyveket felsorolásként egy listában! (2 pt)

    - e. Tegyél a lista fölé egy legördülő listát. A lista elemei legyenek beégetett kategória értékek. A listából választva jelenítsd meg az adott kategóriába tartozó könyveket a felsorolásban. Használd ehhez a korábban definiált `kivalogat` függvényt. (2 pt)

2. **Étellista (JavaScript, 10 pt)** Fájl: `2/index.html` vagy `2/index.php`.

    - a. Adott egy jelölőmező lista.

        ```html
        <div>
            <input type="checkbox" value="alma"> alma <br>
            <input type="checkbox" value="körte"> körte <br>
            <input type="checkbox" value="szilva"> szilva <br>
        </div
        ```

    - b. Egy jelölőmezőt választva, írd ki annak az értékét a konzolra! (1 pt)

    - c. Több jelölőmezőt választva, az értékeiket vesszővel elválasztva írd ki a konzolra! (2 pt)

    - d. Működjön visszairányba is, azaz ha megszüntetünk egy jelölést, akkor is a bejelöltek listája íródjon ki! (2 pt)

    - e. Jelenítsd meg az összefűzött szöveget a felületen egy `div` elemben. (1 pt)

    - f. Vegyél fel egy tömböt ételnevekkel! Írd ki a konzolra! (1 pt)

    - g. Az a. feladatbeli listát állítsd elő a tömb alapján, és a többi funkcionalitás is működjön! (3 pt)

3. **Kutyatár (PHP, 20 pt)** Készíts egy kis alkalmazást kutyák tárolására.
    
    - a. Az adatokat adatbázisban tárold. A `kutya` tábla a következő adatokat tartalmazza:

        - id
        - fajta
        - név
        - születési év
        - halálozási év

        A következő SQL utasítással gyorsan létrehozható a tábla, csak másold a [phpmyadmin](http://webprogramozas.inf.elte.hu/phpmyadmin/index.php) SQL fülén található szövegdobozba.

        ```sql
        CREATE TABLE `nyaralas` (
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `fajta` varchar(50) NOT NULL,
          `nev` varchar(50) NOT NULL,
          `szuletesi_ev` int(11) NOT NULL,
          `halalozasi_ev` int(11),
          PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        ```

        A tábla létrehozása után töltsd fel néhány példaadattal. (2 pt)

    - b. Listázd ki a `kutya` tábla tartalmát HTML táblázatként az oldalra (`3/index.php`). A táblázatban három oszlop legyen: név, fajta és az év. Az év formátuma: `2005-2008` vagy `2005-`, ha nincs megadva a halálozási éve. (8 pt).

    - c. Legyen a listázó oldalon egy "Új kutya felvitele..." feliratú hivatkozás, amely behozza a `3/uj.php` oldalt. Ezen az oldalon adjunk lehetőséget új kutya felvételére. Az űrlapon a következő beviteli mezők legyen a megfelelő szerveroldali validációkkal (3 pt):

        - fajta (legördülő mező, kötelező, értékei: `husky`, `tacskó`, `vizsla`)
        - név (szöveges beviteli mező, kötelező)
        - születési év (szöveges beviteli mező, kötelező, szám lehet csak 1900 és 2100 között)
        - halálozási év (szöveges beviteli mező, nem kötelező, de ha meg van adva, akkor szám lehet csak 1900 és 2100 között)

        Ha nem sikerül a validáció, akkor a hibaüzeneteket az űrlap felett kell megjeleníteni számozás nélküli felsorolásként (4 pt). Ha sikerül a validáció, akkor az adatokat az adatbázisba kell menteni, majd a böngészőt átirányítani az `index.php` oldalra (4 pt).

 

