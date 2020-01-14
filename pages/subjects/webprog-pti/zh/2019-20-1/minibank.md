<style type="text/css">
main img {
    max-width: 100%;
}
main ul p, main ol p {
  display: block;
}
</style>

# Webprogramozás pót zh -- Mini bank

_2020. január 14. 9-12_

## Tudnivalók

- A feladatokat a `webprogramozas.inf.elte.hu` szerveren kell elkészíteni. A `www` mappádon belül hozzál létre egy `minibank` nevű mappát, és abban készítsd el a megoldásodat.
- A feladat tesztelését az [ellenőrző felületen](http://webprogramozas.inf.elte.hu:1701/tester) tudod elvégezni. **Előbb mindig kézzel végezd el a tesztelést, és ha úgy találod, hogy az adott funkció készen van, akkor nézd meg a tesztelővel! Ne CSAK a tesztelőt használd!** Mindig válaszd ki azt a feladatot, amin éppen dolgozol, így a tesztelés is hamarabb elkészül, és a szervert sem terheled. Nem kell az összes feladatra futtatni, mi majd utólag összeadjuk az egyes feladatokra kapott pontjaidat.
- A feladat elkészítésére 3 óra áll rendelkezésre.
- A megoldás kinézete, a kód minősége nem számít, csak a tesztelt funkcionalitások működőképessége.
- **Érdemes az 1. feladattal kezdeni a megoldást, mert egy sikeres listázásra épül a többi feladat is!** A további feladatokat nem szükségszerű a leírás sorrendjében elvégezni, a feladatok többsége nem épül a másikra, viszont ha kell, akkor a szükséges előfeltételeket, akár statikusan is, de biztosítani kell.
- NE használj olyan fejlesztő eszközt, amely a szerver erőforrásait használja (pl. remote-ssh plugin a VSCode-ban). Csak olyan eszközöket használj, amely a fájlok feltöltését, szinkronizálását elvégzi (pl. WinScp, FileZilla). Aki mégis tiltott eszközt használ, azt kizárjuk a zh-ról!
- A műveletek helyességét csak a felületen keresztül tudjuk ellenőrizni az adatok megjelenítésével, a háttérben tárolt adatokat közvetlenül nem vizsgáljuk.
- A zh-n bármilyen segédanyag használható, de humán segítség a jelenlévő gyakorlatvezetőkön kívül nem vehető igénybe.
- A zh után a megoldásokon plágiumellenőrzést végzünk, az esetlegesen hasonló megoldások készítőit védésre behívhatjuk.
- Ponthatárok:
    + 0- pont: 1
    + 50- pont: 2
    + 75- pont: 2,5
    + 100- pont: 3
    + 120- pont: 3,5
    + 140- pont: 4
    + 160- pont: 4,5 
    + 180-200 pont: 5

## Feladatleírás

Készíts egy egyszerű webes felületet, ahol számlákhoz tartozó tranzakciókat lehet kezelni!

0. **Előkészületek**

    A feladathoz kétféle adatot használunk. Az adatokat JSON formában alább le lehet tölteni, és ezzel ajánlott dolgozni. A JSON-t kétféle formában adjuk meg: az egyikben a külső adatszerkezet objektum, amiben az azonosítók kulcsok, az értékek pedig az egyes rekordok; a másikban a külső adatszerkezet tömb és ebben vannak felsorolva az egyes rekordok mint objektumok. Válaszd a számodra kényelmes formátumot. Ha mégis JSON-től eltérő formátumban szeretnél dolgozni, akkor a letöltésnél mellékelve vannak az adatok Markdown formátumban is, és ezt a [tableconvert.com](https://tableconvert.com) oldalon beimportálva tetszőleges formátumban ki tudod exportálni, pl. SQL-ben is. De erre csak akkor van szükség, ha a JSON fájllal nem tudsz dolgozni. Minden tekintetben a JSON fájl az irányadó.

    1. **Tranzakció** (transactions): egy banki tranzakciót reprezentáló objektum. Tároljuk az azonosítóját (`id`), létrejöttének időpontját (`timestamp`), a forrás számla számát (`sourceAccount`), a cél számla tulajdonosának nevét (`targetName`), a célszámla számát (`targetAccount`), a közleményt (`text`), az utalt összeget (`value`), valamint a tranzakció kategóriáját (`category`). 
        
        Ezeket az adatokat ne változtasd (`id` 1-től 7-ig), de később újakat hozzáadhatsz. A tesztelő a 6-os és 7-es azonosítójú sor `category` mezőjét változtathatja.

        ```md
        | id | timestamp             | sourceAccount              | targetName           | targetAccount              | text                                  | value  | category    |
        |----|-----------------------|----------------------------|----------------------|----------------------------|---------------------------------------|--------|-------------|
        | 1  | 1/1/2020 11:30:00 AM  | 10000000-00000000-00000000 | McDonalds            | 12345678-12345678-12345677 |                                       | 650    | Other       |
        | 2  | 1/7/2020 7:30:00 AM   | 10000000-00000000-00000000 | Coffee shop          | 12345678-12345678-12345678 |                                       | 690    | Restaurants |
        | 3  | 1/7/2020 4:30:00 PM   | 10000000-00000000-00000000 | Flat Mate            | 30000000-00000000-00000000 | Rent                                  | 80000  | Transfers   |
        | 4  | 1/10/2020 8:00:00 AM  | 20000000-00000000-00000000 | John Doe             | 10000000-00000000-00000000 | Monthly Salary                        | 200000 | Transfers   |
        | 5  | 1/10/2020 8:00:00 AM  | 20000000-00000000-00000000 | Flat Mate            | 30000000-00000000-00000000 | Alexander Victor LLC - Monthly Salary | 300000 | Transfers   |
        | 6  | 1/10/2020 5:00:00 PM  | 10000000-00000000-00000000 | Lidl                 | 12345678-12345678-12345679 |                                       | 50000  | Groceries   |
        | 7  | 1/10/2020 11:34:26 AM | 10000000-00000000-00000000 | Alexander Victor LLC | 20000000-00000000-00000000 | Test                                  | 10000  | Other       |
        ```

    2. **Számlák** (accounts): a lehetséges számlaszámok. Egy azonosító (`id`), egy név (`name`) és egy számlaszám (`account_number`) mezőből áll. Nem szabad megváltoztatni, nem kell hozzáadni, nem kell elvenni belőle.

        ```md
        | id | account_number             | name                 |
        |----|----------------------------|----------------------|
        | 1  | 10000000-00000000-00000000 | John Doe             |
        | 2  | 20000000-00000000-00000000 | Alexander Victor LLC |
        | 3  | 30000000-00000000-00000000 | Flat Mate            |
        ```

    A feladat egyetlen oldalból áll: `index.php`.

    [SEGÉDANYAGOK LETÖLTÉSE](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/minibank.zip)

    Ha valaki adatbáziskezelőt szeretne használni, akkor az SQLite lokális, fájl alapú adatbáziskezelőt ajánljuk, amihez van támogatás a webprogramozás szerveren PHP-ban. Grafikus felülethez a [phpLiteAdmin](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/phpliteadmin.zip) programot ajánljuk: kicsomagolva a php fájlt csak be kell másolni a projektmappába, és meghívni böngészőből; a jelszó `admin`. A mappára írásjogot kell adni, hogy az adatbázisok létre tudjanak jönni.
    
1. **Az első számlához (10000000-00000000-00000000) tartozó tranzakciók listázása (PHP, 20 pt)** A főoldalt (`index.php`) behívva meg kell jeleníteni az első (10000000-00000000-00000000) számlaszámhoz tartozó tranzakciókat! Mindazon tranzakcióknak szerepelnie kell, ahol a számlaszám vagy forrás-, vagy a célszámlaként megjelenik!

    - a. A tranzakciókat a `transactions` azonosítójú táblázattörzs soraiként kell megjeleníteni!
    - b. Minden táblázatsor `transaction` stílusosztályú és a `data-id` attribútumában tárolja az `id` mező értékét.
    - c. A sor első oszlopában jelenik meg a tranzakció felvételének időpontja (`timestamp` mező).
    - d. A második oszlop több információt tartalmaz:
        - Az első `div` elem a tranzakció célszámla tulajdonsának nevét tünteti fel. (`targetName`)
        - A második `div`-ben a közleményt jelenítsük meg. (`text`)
        - A harmadik `div`-ben egy űrlap van, amelyben a legördülő mező a lehetséges kategóriákat tartalmazza: Other, Restaurants, Transfers, Groceries. A legördülő mezőben az az opció van kiválasztva, ami a tranzakció kategóriájának megfelel (`category`).
        - A negyedik `div` el van rejtve a `hidden` stílusosztály miatt. Ebben a `div`-ben van:
            - a tranzakció azonosítója (`id`)
            - a tranzakció forrásszámlája (`sourceAccount`)
            - a tranzakció célszámlája (`targetAccount`)
        - Ezeket egy gomb zárja le.
    - e. A harmadik oszlopban a tranzakció értéke jelenjen meg méghozzá úgy, hogy terhelés esetén (a számlaszám a forrásszámla) negatív előjellel, jóváírás esetén (a számlaszám a célszámla) előjel nélkül.
    - f. A következő formázásokat alkalmazzuk!
        - Üres közlemény dőlten jelenjen meg az `empty` stílusosztálynak a közlemény `div`-jén való alkalmazásával.
        - A tranzakció értéke legyen hármas tagozódású, azaz hátulról minden harmadik helyiérték után egy szóköz jelenjen meg! **Technikai segítség:** PHP-ban használd a `str_split`, `strrev`, `implode` függvényeket!
        - A tranzakció értéke terhelésnél piros, jóváírásnál zöld legyen. Ehhez alkalmazd a harmadik oszlop celláján jóváírás esetén a `credit`, terhelés esetén a `debit` stílusosztályt.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/1.png)

2. **Számlák közötti váltás (PHP, 15 pt)** Tedd lehetővé, hogy URL-ben megadva, illetve a felületről választva a megfelelő számla adatai jelenjenek meg!

    - a. Az URL-ben egy `account` nevű paraméter értékeként add meg, melyik számlaszámhoz tartozó tranzakciókat szeretnéd megjeleníteni. Három számlaszám szerepel a rendszerben:
        - `index.php?account=10000000-00000000-00000000`
        - `index.php?account=20000000-00000000-00000000`
        - `index.php?account=30000000-00000000-00000000`
    - b. Tedd lehetővé, hogy az oldalról is választható legyen a számlaszám. Ehhez először az oldal fejlécében található `account-filter` azonosítójú űrlapban elhelyezkedő legördülő mezőbe listázd ki a lehetséges számlaszámokat!
    - c. A legördülő mezőből választva és a "Select" gombra kattintva az űrlap elküldése után az adott számlához tartozó tranzakciók jelenjenek meg!
    - d. Az elküldés után a legördülő mező őrizze meg értékét, azaz a legutoljára kiválasztott számla legyen benne kiválasztva.
    - e. Ha az URL rossz értéket tartalmaz (nem létező számlaszám), akkor az első számla legyen kiválasztva!

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/2.png)

3. **A számla egyenlegének kiszámolása (PHP, 12 pt)**: Jelenítsd meg az oldal fejlécében található `balance-in-huf` azonosítójú `span` elemben a számla egyenlegét, azaz a kilistázott tranzakciók előjeles összegét! Az összeget formázd hármas tagozásban, ahogy a tranzakciók értékét!

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/3.png)


4. **Új tranzakció felvétele (PHP, 58 pt)**: Adjunk lehetőséget új tranzakció rögzítésére! Ehhez az oldal jobb oldalán található "New transaction" blokkban van lehetőség.

    - a. A `new-transaction` azonosítójú űrlap az alábbi mezőket tartalmazza:

        - célszámla tulajdonosának neve (neve: `name`, típusa: szöveges beviteli mező, kötelező, hibaüzenetek: `Name is required`)
        - célszámla száma (neve: `accountNumber`, típusa: szöveges beviteli mező, kötelező, formátuma: 24 szám, 3*8-as tagolásban, kötőjellel elválasztva, pl. 12345678-12345678-12345678, hibaüzenetek: `Account number is required`, `Account number is invalid`)
        - közlemény (neve: `text`, típusa: szöveges beviteli mező, hibaüzenetek: `Text is to long! (max. 64 characters)`)
        - utalás értéke (neve: `value`, típusa: szöveges beviteli mező, kötelező, egész szám, 1-nél nem kisebb és a számla egyenlegénél nem nagyobb, hibaüzenetek: `Value is required`, `Value is not an integer`, `Value is less than or equal than 0`, `Value is greater than available balance`)
        - kategória (neve: `category`, típusa: legördülő lista, kötelező, hibaüzenetek: `Category is required`)

    - b. A fenti elemek **hiányozhatnak a POST kérésből**, üresek vagy rosszul kitöltöttek is lehetnek. Ezekben az esetekben a fenti hibaüzenetek közül a megfelelőek jelenjenek meg egy `errors` azonosítójú elemben (nem feltétlenül strukturáltan, azaz lehet a hibaüzeneteket pl. `var_dump`-pal kiíratni). Ez a hibaüzenet elem az űrlap első betöltésekor nem jelenik meg az oldalon.

    - c. Hiba esetén gondoskodj az űrlap állapottartásáról, azaz írd vissza a beviteli mezőkbe a felküldött adatokat!

    - d. Helyesen kitöltve vedd fel az adatokat a háttérrendszerben, majd jelenjen meg a főoldal, a tranzakciós listában már az új elemmel. Mentéskor a tranzakcióhoz a következőképpen rendelj adatokat:
        - `id`: egyedi legyen,
        - `timestamp`: a PHP `date` függvényét használd, pl. ezzel a formátummal: `n/j/Y g:i:s A`.
        - `sourceAccount`: az oldalon URL-lel kiválasztott számlaszám, illetve ha az első (10000000-00000000-00000000), ha nincs ilyen.
        - `targetName`: `name` mező értéke
        - `targetAccount`: `accountNumber` mező értéke
        - `text`: `text` mező értéke
        - `value`: `value` mező értéke számként
        - `category`: `category` mező értéke

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/4.png)

5. **A minimális és maximális érték szűréséhez használt range sliderek értékének kiírása (PHP + JS, 20 pt)**: A "Filters" feliratú blokkban található két csúszka (`min-value` és `max-value` azonosító beviteli mezők), amellyel később majd a megjelenítendő tranzakciók értékhatárait lehet beállítani. Ebben a részben az a feladat, hogy

    - a. a csúszkák `min` és `max` attribútumának értékeit állítsd az oldal betöltésekor kilistázott tranzakciók **abszolút értékének** legkisebb, illetve legnagyobb értékére, a `value` attribútumukat pedig a `min-value` elem esetén a `min` értékre, a `max-value` elem esetén a `max` értékre állítsd (PHP);
    - b. az oldal betöltésekor jelenítsd meg a csúszkák értékeit a nekik megfelelő, `min-value-span` és `max-value-span` azonosítójú `span` elemekben (PHP/JS);
    - c. a csúszkák mozgatására frissítsd a megjelenített értékeket (JS). Ehhez használd az `input` eseményt!
    
    ![](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/5.png)

6. **Értékhatárok közé eső tranzakciók megjelenítése (JS, 15 pt)**: A "Filters" blokkban található két csúszkát mozgatva csak azokat a tranzakciókat jelenítsük meg a tranzakciós listában, amelyeknek értéke a `min-value` és `max-value` csúszka értékei közé esik (zárt intervallum). Az eltüntetendő tranzakcióknál a nekik megfelelő táblázatsort kell `hidden` stílusosztállyal ellátni, a megjelenőknél pedig értelemszerűen ennek a stílusosztálynak nem szabad megjelennie. **Technikai segítség:** a hármas csoportokba formázott értékekből a szóközöket legegyszerűbb reguláris kifejezéssel üres szövegre cserélni (`replace`, `/ /g`); továbbá használjuk a `change` eseményt (a tesztelő is azt hívja meg)!

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/6.png)

7. **Kategóriák kiemelése (JS, 16 pt)**: A "Filters" blokkban található legördülő mezőből egy kategóriát választva az ugyanolyan kategóriájú tranzakciók kiemelésre kerülnek a tranzakciós listában.

    - a. A kategóriaszűrő azonosítója: `category`. Ebben az alábbi opciók jelennek meg: üres elem, Other, Restaurants, Transfers, Groceries.
    - b. Üres elemet választva egyik tranzakció sincs megjelölve.
    - c. Nem üres kategóriát választva az ugyanolyan kategóriájú tranzakciók táblázatsorát `marked` stílusosztállyal kell ellátni, a többinél ennek a stílusosztálynak nem szabad megjelennie.
    - **Technikai segítség**: használjuk a `change` eseményt (a tesztelő is azt hívja meg)!

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/7.png)

8. **Tranzakció részleteinek megtekintése (JS, 9 pt)**: A tranzakciólistában minden tranzakciónál szerepel egy "More" feliratú gomb. Erre kattintva jelenítsük meg a tranzakció további részleteit a gomb előtt található `div` elem `hidden` stílusosztályának levételével. Újra a gombra kattintva a részletek eltűnnek, ehhez az előbbi `div` elemet újra `hidden` stílusosztállyal kell ellátni.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/8.png)

9. **Tranzakció katgeóriájának megváltoztatása AJAX-szal (JS + PHP, 25 pt)**: A tranzakciólistában minden tranzakciónál szerepel egy legördülő mező, amiben a lehetséges kategóriaértékek vannak felsorolva. Ez az oldal betöltésekor a tranzakciónak megfelelő értéket veszi fel (ld. 1. feladat). A legördülő mezőben másik elemet választva változtassuk meg a tranzakció kategóriáját a háttérrendszerben tárolt adatnál is. Ehhez küldjünk egy POST kérést AJAX-szal a szervernek elküldve pl. a tranzakció azonosítóját. Sikeres módosításról úgy tudunk meggyőződni, hogy az oldal újratöltése után az adott tranzakciónál már a módosított kategóriaérték fog látszódni. **Figyelem!** Ne változtassuk meg az 1-5 azonosítójú tranzakciók kategóriabesorolását! **Technikai segítség**: használjuk a `change` eseményt (a tesztelő is azt hívja meg)!

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/9.png)

10. **Az egyenleg átváltása euroba AJAX-szal (JS, 10 pt)**: Az oldal fejlécében az egyenleg mellett van egy `convert` azonosítójú, "Convert (refresh)" feliratú gomb. Erre kattintva kérjük le a szervertől az aktuális EUR árfolyamot, majd segítségével váltsuk át HUF egyenleget EUR-ba. GET kérést küldjünk AJAX-szal a `http://webprogramozas.inf.elte.hu/webprog/zh/minibank/eur_rate.php` oldalra, ahonnan a következő formátumú JSON választ kapjuk:

    ```json
    {
        "rate": 317
    }
    ```

    Ezzel az értékkel osszuk el a HUF egyenleget, majd az EUR egyenleget jelenítsük meg a `balance-in-eur` azonosítójú `span` elemben. **Technikai segítség:** a hármas csoportokba formázott értékből a szóközöket legegyszerűbb reguláris kifejezéssel üres szövegre cserélni (`replace`, `/ /g`)

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/10.png)
