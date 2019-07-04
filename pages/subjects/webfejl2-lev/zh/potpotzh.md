# Webfejlesztés 2. pótpótzh -- Levelező tanárszak

_2019.07.05._

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

1. **Betűstatisztika (JavaScript, 10 pt)** Számold meg egy szóban a magánhangzók és mássalhangzók számát! Fájl: `1/index.html`.

    - a. Vedd föl a magánhagzókat és mássalhangzókat egy-egy tömbbe, és írasd ki őket a konzolra. Megjegyzés: a szöveg karakterek tömbje. (2 pt)

    - b. Adott egy szöveg egy változóban. Írd ki, hogy az 1. karaktere szerepel-e a magánhangzók vagy a mássalhangzók között! (2 pt)

    - c. A szöveg mindegyik karakterére nézd meg a fenti feltételt, és számold meg ez alapján hány magán-, illetve hány mássalhangzó van a szövegben. (2 pt)

    - d. Ezt a logikát szervezd egy függvénybe, ami paraméterként megkapja a vizsgálandó szöveget, és a magánhangzók és mássalhangzók számával tér vissza. (2 pt)

    - e. Vegyél fel a felületre egy szöveges beviteli mezőt és egy gombot. A gomb megnyomására olvasd ki a szöveges beviteli mezőbe írt elemet, és az előző függvényt meghívva írd ki a felületre az eredményeket! (2 pt)
    

2. **Vakáció (JavaScript, 10 pt)** Utazási ötleteinket tartjuk nyilván. Mindegyik utazásról tároljuk az országnak és a városnak a nevét. A felületen válasszunk ki egy országot, és jelenítsük meg hozzá tartozó városokat. Fájl: `2/index.html`.
    
    - a. Hozz létre JavaScriptben egy utazási célokkal feltöltött tömböt. Egy utazási cél egy olyan objektum, aminek van ország és város mezője. A tömböt írd ki a konzolra! (2 pt)

    - b. Adott egy ország (pl. `Ausztria`). Válogasd ki azokat az utazási célokat, amelyek ebbe az országba szólnak! Az eredményül kapott tömböt írd ki a konzolra. (2 pt)

    - c. Az előző feladatbeli funkcionalitást rakd egy `varosok` nevű függvénybe. A függvény két paramétert kap: a szűrendő tömböt és az ország nevét. Hívd meg a függvényt, és az eredményt írd ki a konzolra! (2 pt)

    - d. Jelenítsd meg az utazási célok városait felsorolásként egy listában! (2 pt)

    - e. Tegyél a lista fölé egy legördülő listát. A lista elemei legyenek beégetett országok. A listából választva jelenítsd meg az adott országhoz tartozó városokat a felsorolásban. Használd ehhez a korábban definiált `varosok` függvényt. (2 pt)

3. **Autókereskedés (PHP, 20 pt)** Egy autókereskedés adatbázisban tárolja az árult gépkocsik adatait.
    
    - a. Az `autok` tábla a következő adatokat tartalmazza:

        - id
        - márka
        - modell
        - ár
        - km
        - eladott-e

        A következő SQL utasítással gyorsan létrehozható a tábla, csak másold a [phpmyadmin](http://webprogramozas.inf.elte.hu/phpmyadmin/index.php) SQL fülén található szövegdobozba.

        ```sql
        CREATE TABLE `autok` (
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `marka` varchar(50) NOT NULL,
          `modell` varchar(50) NOT NULL,
          `ar` int(11) NOT NULL,
          `km` int(11) NOT NULL,
          `eladott` boolean NOT NULL default 0,
          PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        ```

        A tábla létrehozása után töltsd fel néhány példaadattal. (2 pt)

    - b. Listázd ki az `autok` táblából azokat az autókat, amelyek még nincsenek eladva, HTML táblázatként az oldalra (`3/index.php`). A táblázatban a következő oszlopok legyenek: márka, modell, ár, km. (8 pt).

    - c. Legyen a listázó oldalon egy "Új autó felvitele..." feliratú hivatkozás, amely behozza a `3/uj.php` oldalt. Ezen az oldalon adjunk lehetőséget új autó felvételére. Az űrlapon a következő beviteli mezők legyen a megfelelő szerveroldali validációkkal (3 pt):

        - márka (legördülő mező, kötelező, értékei: `opel`, `renault`, `nissan`)
        - modell (szöveges beviteli mező, kötelező)
        - ár (szöveges beviteli mező, kötelező, pozitív egész szám lehet csak)
        - km (szöveges beviteli mező, kötelező, pozitív egész szám lehet csak)

        Ha nem sikerül a validáció, akkor a hibaüzeneteket az űrlap felett kell megjeleníteni számozás nélküli felsorolásként (4 pt). Ha sikerül a validáció, akkor az adatokat az adatbázisba kell menteni, majd a böngészőt átirányítani az `index.php` oldalra (4 pt).

 

