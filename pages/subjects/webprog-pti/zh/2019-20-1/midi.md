<style type="text/css">
main img {
    max-width: 100%;
}
main ul p, main ol p {
  display: block;
}
</style>

# Webprogramozás zh -- MIDI editor

_2020. január 7. 9-12_

## Tudnivalók

- A feladatokat a `webprogramozas.inf.elte.hu` szerveren kell elkészíteni. A `www` mappádon belül hozzál létre egy `midi` nevű mappát, és abban készítsd el a megoldásodat.
- A feladat tesztelését az [ellenőrző felületen](http://webprogramozas.inf.elte.hu:1701/tester) tudod elvégezni. Mindig válaszd ki azt a feladatot, amin éppen dolgozol, így a tesztelés is hamarabb elkészül, és a szervert sem terheled. A zh vége felé azonban futtasd le az összes feladatra is, hiszen az így kapott pontszám alapján kapod a jegyet.
- A feladat elkészítésére 3 óra áll rendelkezésre.
- A megoldás kinézete, a kód minősége nem számít, csak a tesztelt funkcionalitások működőképessége.
- A feladatokat nem szükségszerű a leírás sorrendjében elvégezni, a feladatok többsége nem épül a másikra, viszont ha kell, akkor a szükséges előfeltételeket, akár statikusan is, de biztosítani kell.
- NE használj olyan fejlesztő eszközt, amely a szerver erőforrásait használja (pl. remote-ssh plugin a VSCode-ban). Csak olyan eszközöket használj, amely a fájlok feltöltését, szinkronizálását elvégzi (pl. WinScp, FileZilla). Aki mégis tiltott eszközt használ, azt kizárjuk a zh-ról!
- A műveletek helyességét csak a felületen keresztül tudjuk ellenőrizni az adatok megjelenítésével, a háttérben tárolt adatokat közvetlenül nem vizsgáljuk.
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

Készíts egy MIDI editort, amelyben zenei MIDI trackeket tudsz felvenni, listázni, valamint egy trackhez hangjegyeket rögzíteni!

0. **Előkészületek**

    A feladathoz kétféle adatot használunk. Az alábbi adatokat JSON formában alább le lehet tölteni, és ezzel ajánott dolgozni. Ha mégis más formátumban szeretnél dolgozni, akkor a letöltésnél mellékelve vannak az adatok Markdown formátumban is, és ezt a [tableconvert.com](https://tableconvert.com) oldalon beimportálva tetszőleges formátumban ki tudod exportálni azt, pl. SQL-ben is. De erre csak akkor van szükség, ha a JSON fájllal nem tudsz dolgozni. Minden tekintetben a JSON fájl az irányadó.

    1. **Track**: egy zenei hangsávért felelős adatszerkezet. Tároljuk az azonosítóját (`id`), nevét (`name`), kategóriáját (`category`), a társított hangszer azonosítóját (`instrument`), a track színét (`color`) és a hozzá tartozó hangjegyek idősorát (`notes`). A hangjegysor tartalmazza, hogy melyik hang (`note`) mettől (`start`) meddig (`end`) van megszólaltatva ms-okban. 
        
        Ezeket az adatokat ne változtasd (`id` 1-től 5-ig), de később újakat hozzáadhatsz. A tesztelő a 4-es és 5-ös azonosítójú sor `notes` mezőit változtathatja.

        ```md
        | id | name        | category | instrument | color   | notes                                                                                                                                              |
        |----|-------------|----------|------------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------|
        | 1  | Hi hat 1    | Drum     | 114        | #ffeb3b | [{"note":"C","start":100,"end":600}]                                                                                                               |
        | 2  | Base bass   | Bass     | 45         | #ff5722 | [{"note":"D","start":0,"end":500},{"note":"A","start":1000,"end":2000},{"note":"B","start":2000,"end":2500},{"note":"C+","start":2500,"end":3000}] |
        | 3  | Main melody | Melody   | 4          | #03a9f4 | [{"note":"C","start":0,"end":100},{"note":"D","start":100,"end":200},{"note":"E","start":300,"end":400}]                                           |
        | 4  | Beat        | Drum     | 114        | #ffc107 | [{"note":"C","start":1000,"end":1500},{"note":"E","start":2000,"end":2500},{"note":"G","start":3000,"end":3500}]                                   |
        | 5  | Cello       | String   | 27         | #8bc34a | [{"note":"D","start":0,"end":2000},{"note":"F","start":2000,"end":4000},{"note":"B","start":4000,"end":6000},{"note":"A","start":6000,"end":8000}] |
        ```

    2. **Hangszer** (instrument): egy lista a lehetséges hangszerekről. Egy azonosító (`id`) és egy név (`name`) mezőből áll. Nem szabad megváltoztatni, nem kell hozzáadni, nem kell elvenni belőle. Alábbiakban csak néhány sorát tüntetjük fel, a teljes lista a JSON fájlban található.

        ```md
        | id  | name                 |
        |-----|----------------------|
        | 1   | Grand Piano          |
        | 2   | Bright Piano         |
        | 3   | Honky-tonk Piano     |
        | 4   | MIDI Grand Piano     |
        | 5   | Harpsichord          |
        ```

    A feladat két oldalból áll:

    1. főoldal (`index.php`)
    2. új track oldal (`new.php`)

    [SEGÉDANYAGOK LETÖLTÉSE](midi.zip)

    Ha valaki adatbáziskezelőt szeretne használni, akkor az SQLite lokális, fájl alapú adatbáziskezelőt ajánljuk, amihez van támogatás a webprogramozás szerveren PHP-ban. Grafikus felülethez a [phpLiteAdmin](phpliteadmin.zip) programot ajánljuk: kicsomagolva a php fájlt csak be kell másolni a projektmappába, és meghívni böngészőből; a jelszó `admin`. A mappára írásjogot kell adni, hogy az adatbázisok létre tudjanak jönni.
    
1. **Oldal egyes részeinek elrejtése (?? pt)** A főoldalon (`index.php`) URL-ben megadott paraméter (`hide`) segítségével add meg, hogy az oldal mely részei tűnjenek el (ne jelenjenek meg a markupban, DOM-ban). A lehetséges részek: `tracks`, `pianoroll`, `keyboard`. Ezek a részek az ugyanilyen stílusosztályú `div` elemeknek felelnek meg. Ha többet is el akarunk tűntetni, akkor vesszővel kell elválasztani a részeket.

    - a. Paraméter nélkül (`index.php`) minden jelenjen meg.
    - c. `index.php?hide=tracks`: a tracklista (`tracks` stílusosztályú `div`) nem jelenik meg
    - d. `index.php?hide=pianoroll`: a hangjegysor (`pianoroll` stílusosztályú `div`) nem jelenik meg
    - e. `index.php?hide=keyboard`: a zongorabillentyűk (`keyboard` stílusosztályú `div`) nem jelenik meg
    - f. `index.php?hide=tracks,pianoroll`: a tracklista és a hangjegysor nem jelenik meg
    - g. stb.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/midi/1.png)

2. **Trackek listázása (?? pt)** Listázd ki a háttérrendszerben tárolt trackeket a főoldalon (`index.php`)!

    - a. A trackeket a `tracks` stílusosztályú `div`-ben található felsorolás listaelemeiként kell megjeleníteni. Egy tracknek egy listaelem felel meg. Jelenítsd meg benne a track nevét, hangszerét zárójelben és a kategóriáját `span`-ban.
    - A listaelem háttérszínét a `style` attribútumon keresztül adjuk meg.
    - A listaelem `data-id` attribútumába a track `id`-ja kerüljön.
    - A listaelem `data-notes` attribútumába a track hangjegysora kerüljön JSON formátumban. **Technikai segítség**: mivel a JSON `"`-ket tartalmaz, ezért az attribútum értékét `'` között adjuk meg:

        ```html
        <li data-id="1" data-notes='[{"note":"C","start":100,"end":600}]'>
        ```

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/midi/2.png)

3. **Új track hozzáadása (?? pt)**: Adjunk lehetőséget új tracket hozzáadni az "Add new track..." hivatkozásra kattintva. Fájlnév: `new.php`

    - a. Az űrlap az alábbi mezőket tartalmazza:

      - track neve (neve: `name`, típusa: szöveges beviteli mező, kötelező, hibaüzenetek: `The track name is required`)
      - track színe (neve: `color`, típusa: szín, kötelező, formátuma: hexa színkód, pl. `#1234af`, hibaüzenetek: `The track color is required`, `The track color has a wrong format`)
      - track kategóriája (neve: `category`, típusa: szöveges beviteli mező adatlistával, kötelező, hibaüzenetek: `The category is required`)
      - megszólaló hangszer (neve: `instrument`, típusa: legördülő mező, kötelező, szám, hibaüzenetek: `The instrument is required`, `The instrument has to be an integer`)

    - b. A fenti elemek hiányozhatnak a POST kérésből, üresek vagy rosszul kitöltöttek is lehetnek. Ezekben az esetekben a fenti hibaüzenetek közül a megfelelőek jelenjenek meg egy `errors` stílusosztályú elemben (nem feltétlenül strukturáltan, azaz lehet a hibaüzeneteket pl. `var_dump`-pal kiíratni). Ez a hibaüzenet elem az űrlap első betöltésekor nem jelenik meg az oldalon.

    - c. Hiba esetén gondoskodj az űrlap állapottartásáról, azaz írd vissza a beviteli mezőkbe a felküldött adatokat!

    - d. Helyesen kitöltve vedd fel az adatokat a háttérrendszerben, majd jelenjen meg a főoldal, a tracklistában már az új elemmel.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/midi/3.png)

4. **Track kiválasztása és hangjegysorának megjelenítése (?? pt tesztben: előtte nincs kiválasztva és más nincsen kiválasztva, több kattintásnál mindig csak egy legyen kiválasztva)**: A főoldalon egy trackre kattintva jelenítsd meg a többsoros beviteli mezőben a track hangjegysorát JSON formátumban, illetve fölötte grafikus formátumban is (pianoroll).

    - a. Egy trackre kattintva legyen kiválasztva, azaz a listaelem legyen `selected`stílusosztályú!
    - b. Egy trackre kattintva olvasd ki a `data-notes` attribútumában tárolt JSON hangjegysort és jelenítsd meg az oldalon található többsoros szöveges beviteli mezőben!
    - c. A többsoros szöveges beviteli mezőben megjelenő JSON-t jelenítsd meg grafikusan a mező fölötti pianoroll részen. Ezt a "Show JSON in SVG" feliratú gombra kattintva érhetjük el. A grafikus megjelenítést az oldalon található SVG elemben kell megtenni. A hangjegysor minden egyes eleme egy-egy `rect` elem lesz: 
        - `x` attribútuma a `start` értéket tartalmazza, 
        - `width` attribútuma az `end` és `start` között eltelt időt (ms), 
        - `height` attribútuma mindig `10`, 
        - `y` attribútuma pedig a következőképpen alakul: 
            - `C` hang esetén: 70
            - `D` hang esetén: 60
            - `E` hang esetén: 50
            - `F` hang esetén: 40
            - `G` hang esetén: 30
            - `A` hang esetén: 20
            - `B` hang esetén: 10
            - `C+` hang esetén: 0

        ```html
        <svg>
            <rect x="100" y="70" width="500" height="10"></rect>
        </svg>
        ```
    - d. Trackre kattintva is jelenjen meg grafikusan a hangjegysor!

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/midi/4.png)

5. **Track kiválasztása billentyűkkel (?? pt)**: Tedd lehetővé a főoldalon, hogy a trackek kiválasztása a le-föl billentyűkkel is lehetséges legyen!

    - a. Ha még nincs kiválasztva egy track sem, akkor a lefele billentyűvel az első track kerül kiválasztásra.
    - b. Ha még nincs kiválasztva egy track sem, akkor a felfele billentyűvel az utolsó track kerül kiválasztásra.
    - c. További le-föl billentyűt nyomogatva a következő, illetve előző track kerül kiválasztásra.
    - d. Az első trackről az előzőre lépve az utolsó kerül kiválasztásra.
    - e. Az utolsó trackről a következőre lépve az első kerül kiválasztásra.
    - f. Egérrel való kiválasztás után arról a trackről lépünk tovább.
    
    **Technikai segítség**: dokumentumszinten érdemes a billentyűleütéseket vizsgálni, ahova csak a `keydown` és `keyup` események érkeznek meg.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/midi/5.png)

6. **Felvétel rögzítése(?? pt)**: Tedd lehetővé, hogy egy kiválasztott trackhez felvehessük a hangjegysort. A műveleteket billentyűkkel vezéreljük.

    - a. Az 1-8 billentyűket lenyomva a zongora megfelelő elemei kerülnek kijelölésre, ahogy az a zongorabillentyűkön fel is van tüntetve (azaz pl. az 1-es gomb a C hangnak felel meg). A `keyboard` stílusosztályú elemen belül a megfelelő `div` elem `active` stílusosztállyal való ellátása aktivál egy billentyűt. A billentyűt elengedve az aktiválás megszűnik.
    - b. A szóköz megnyomásával felvétel üzemmódba kerülünk. Ehhez az SVG elem `active` stílusosztályú lesz. A szóköz újbóli megnyomásával a felvétel üzemmód kikapcsol, az `active` stílusosztály lekerül az SVG elemről.
    - c. Felvétel üzemmódban el kell tárolni, hogy az 1-8 billentyűket a szóköz lenyomása óta mikor nyomtuk le (`start`) és engedtük fel (`end`). Ugyanaz a billentyű többször is lenyomásra kerülhet, de egyszerre csak egy billentyűt nyomunk le. A felvétel befejeztével a hangjegysor JSON-je jelenjen meg a többsoros beviteli mezőben!

    **Technikai segítség**: dokumentumszinten érdemes a billentyűleütéseket vizsgálni, ahova csak a `keydown` és `keyup` események érkeznek meg.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/midi/6.png)

7. **Felvétel AJAX mentése (?? pt)**: Kiválasztás és felvétel után a többsoros beviteli mezőben megjelenő hangjegysor JSON-t mentsük el a kiválasztott track `notes` mezőjében a háttérrendszerben AJAX POST kéréssel! Ehhez ki kell választani egy tracket, érvényes JSON-nel kitölteni a többsoros beviteli mezőt (nem kell feltétlenül felvétellel megtenni ezt), majd a "Save to selected track" feliratú gomb megnyomásával AJAX POST kérést küldeni a szervernek, amely az adott trackhez elmenti a JSON-t. A kérés során a kiválasztott track azonosítóját az URL-ben `id` néven küldjük fel! Sikeres mentés után a gombban lévő `span` elembe írjunk egy `✔` jelet!

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/midi/7.png)
