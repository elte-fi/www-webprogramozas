# Webfejlesztés 2. zh -- Levelező tanárszak

_2019.05.31._

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

1. **Szűrés (JavaScript, 10 pt)** Adott nevek tömbje. Ezt kell listaként a felületen megjeleníteni, majd szűrni. Fájl: `1/index.html`.
    
    - a. Hozz létre JavaScriptben egy nevekkel feltöltött tömböt, majd írd ki a konzolra! (2 pt)

    - b. Adott egy szövegrészlet. Válogasd ki azokat az elemeket a tömbből, amelyek tartalmazzák ezt a szövegrészletet. Az eredményül kapott tömböt írd ki a konzolra. Technikai segítség: használd a szöveg `includes` függvényét (pl. `'alma'.includes('ma')`). (2 pt)

    - c. Az előző feladatbeli funkcionalitást rakd egy `szur` nevű függvénybe. A függvény két paramétert kap: a szűrendő tömböt és a szűrőfeltételként szolgáló szövegrészletet. Hívd meg a függvényt, és az eredményt írd ki a konzolra! (2 pt)

    - d. Jelenítsd meg a neveket felsorolásként egy listában! (2 pt)

    - e. Tegyél a lista fölé egy szöveges beviteli mezőt. Ennek értékét gépelés közben (`keyup` vagy `input` esemény) használd fel a megjelenített névsor szűréséhez. Használd ehhez a korábban definiált `szur` függvényt. (2 pt)

2. **Karakterek száma (JavaScript vagy PHP, 10 pt)** Adott egy szöveg. Számold meg, hogy melyik karakter hányszor szerepel ebben a szövegben. Például a `barack` szónál az eredmény: `a:2, b:1, r:1, c:1, k:1` (a sorrend nem számít).  Fájl: `2/index.html` vagy `2/index.php`.

    - a. Készíts egy függvényt, ami a paraméterül megkapott szövegre elvégzi a fenti számítást. A függvény egy feladathoz illeszkedő adatszerkezettel tér vissza. Hívd meg a függvényt egy szövegre és az eredményét jelenítsd meg vagy a konzolon (JS), vagy `var_dump`-pal kiírva (PHP). (5 pt)

        Technikai segítség: JavaScriptben a szöveg `length` tulajdonsága adja meg a szöveg hosszát, egy karakterére pedig `s[i]`-ként lehet hivatkozni (0-tól kezdődik). Érdemes a tárolást egy objektumban elvégezni, ahol a kulcs a karakter, a darabszám az érték. Ha egy kulcs nem létezik az objektumban, akkor `o['kulcs']` `undefined`-dal tér vissza.

        PHP-ban a `strlen` függvény adja vissza egy szöveg hosszát. Az i. karakterre ott is `$s[$i]`-ként lehet hivatkozni (0-tól kezdődik). Tárolásra asszociatív tömböt ajánlok, az `isset` függvény mondja meg, hogy létezik-e egy tömb kulcsa (`isset($o['key'])`).

    - b. Készíts felhasználói felületet a funkció köré. Egy szöveges beviteli mezőben lehessen megadni a szöveget, majd egy gombra kattintva listázd ki az eredményt. A listázásnál elég a nyers szöveges JSON formátum, amit PHP-ban `json_encode`-dal (pl. `json_encode($tomb)`), JavaScriptben `JSON.stringify`-jal (pl. `JSON.stringify(tomb)`) lehet előállítani. (5 pt)

3. **Nyaralási öteletek (PHP, 20 pt)** Készíts egy kis alkalmazást nyaralási ötleteid tárolására.
    
    - a. Az adatokat adatbázisban tárold. A `nyaralas` tábla a következő adatokat tartalmazza:

        - id
        - hely
        - url
        - leiras

        A következő SQL utasítással gyorsan létrehozható a tábla, csak másold a [phpmyadmin](http://webprogramozas.inf.elte.hu/phpmyadmin/index.php) SQL fülén található szövegdobozba.

        ```sql
        CREATE TABLE `nyaralas` (
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `hely` varchar(50) NOT NULL,
          `url` varchar(1000),
          `leiras` text,
          PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        ```

        A tábla létrehozása után töltsd fel néhány példaadattal. (2 pt)

    - b. Listázd ki a `nyaralas` tábla tartalmát HTML táblázatként az oldalra (`3/index.php`). A táblázatnak két oszlopa legyen: hely és leírás (6 pt). Ha az `url` oszlop meg van adva, akkor a helyből legyen hivatkozás az adott URL-re (2 pt).

    - c. Legyen a listázó oldalon egy "Új nyaralási ötlet..." feliratú hivatkozás, amely behozza a `3/uj.php` oldalt. Ezen az oldalon adjunk lehetőséget új nyaralási tipp felvételére. Az űrlapon a következő beviteli mezők legyen a megfelelő szerveroldali validációkkal (3 pt):

        - hely (szöveges beviteli mező, kötelező)
        - url (szöveges beviteli mező, nem kötelező, de ha megadják, akkor  `http://` vagy `https://` szöveggel kell kezdődnie)
        - leírás (többsoros szöveges beviteli mező, nem kötelező)

        Ha nem sikerül a validáció, akkor a hibaüzeneteket az űrlap felett kell megjeleníteni számozás nélküli felsorolásként (4 pt). Ha sikerül a validáció, akkor az adatokat az adatbázisba kell menteni, majd a böngészőt átirányítani az `index.php` oldalra (4 pt).

 

