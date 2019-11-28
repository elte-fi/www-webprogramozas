# Webfejlesztés 2. zh -- Vetületek

Egy kis kockákból álló térbeli alakzatnak háromféle vetületét állíthatjuk elő: felülnézet, oldalnézet, elölnézet.

<table>
<tr>
<td>

![](pages/subjects/webprog-pti/zh/2017-18-2/vetuletek/ortho.png)

</td>
<td>

![](pages/subjects/webprog-pti/zh/2017-18-2/vetuletek/ortho.gif)

</td>
</tr>
</table>

Egy ilyen alakzatot úgy adunk meg, hogy a felülnézeti vetületén definiáljuk, hány kocka van egymáson:

![](pages/subjects/webprog-pti/zh/2017-18-2/vetuletek/isometric.gif)

Egy olyan webes alkalmazást kell készíteni, amely lehetőséget ad ilyen alakzatok megadására, tárolására és vetületeinek megjelenítésére. Ezen kívül a jobban sikerülteket kedvencként is megjelölhetjük.

További tudnivalók:

- A feladatokat a `webprogramozas.inf.elte.hu` szerveren kell elkészíteni. A `www` mappádon belül hozzál létre egy `projections` mappát, és abban készítsd el a megoldásodat. 
- A megoldás kinézete nem számít, csak az oldalak funkcionalitása.
- A feladatokat nem szükségszerű a leírás sorrendjében elvégezni, a feladatok többsége nem épül a másikra.
- **Fontos** Azt, hogy az adatok megjelenítése dinamikus, csak sikeres mentés után tudjuk ellenőrizni. Így a megjelenítésekért kapott pontok egy része csak akkor érvényesül, ha működik a mentés is.
- A zh-n bármilyen segédanyag használható, de humán segítség a jelenlévő gyakorlatvezetőkön kívül nem vehető igénybe.
- A zh után a megoldásokon plágiumellenőrzést végzünk, az esetlegesen hasonló megoldások készítőit védésre behívhatjuk.

Ponthatárok:

- 0-20 pont: 1
- 21-30 pont: 2
- 31-40 pont: 2,5
- 41-50 pont: 3
- 51-60 pont: 3,5
- 61-70 pont: 4
- 71-80 pont: 4,5
- 81-90 pont: 5

### Feladatok

0. **Előkészületek**

    **Adatok előkészítése** Az adatok tárolását fájlban vagy adatbázisban is elvégezheted. Az alakzatokat úgy tárolod, ahogy akarod, a felületen egy JavaScript mátrix sorosított változatát kell megadni, érdemes ezt a szöveget tárolni. Három rekordot vegyél fel kezdetben, amiket később se módosíts (ezek kellenek a teszteléshez):

    ```txt
    id          név         szélesség   magasság    kedvenc    alakzat
    1           alma        2           2           igen       [[1,3],[0,2]]
    2           korte       3           3           nem       [[1,2,1],[0,0,3],[4,0,1]]
    200000000   szilva      3           2           nem        [[2,1,1],[2,0,0]] 
    ```

    A 10-100000000 `id` tartományba ne vegyél fel új elemet, azt a tesztelő használja majd a véletlen `id` generáláskor. A 200000000 sorra azért van szükség, hogy adatbázis használata esetén az üresen hagyott `auto_increment`-es mező onnantól adja hozzá az `id`-kat.

    Az automatikus tesztelő új elemeket vesz fel. Az így létrehozott elemeket bármikor törölheted az adataid közül, csak a fent említett 3 rekord maradjon változatlan!

    Ha adatbázist használsz, akkor az alábbi SQL utasítás bemásolásával létre tudod hozni (phpmyadminban kiválasztva az adatbázisod, SQL fül):

    ```sql
    CREATE TABLE `alakzatok` (
      `id` int(11) NOT NULL,
      `nev` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
      `szelesseg` int(11) NOT NULL,
      `magassag` int(11) NOT NULL,
      `kedvenc` tinyint(1) NOT NULL,
      `alakzat` text COLLATE utf8_hungarian_ci NOT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

    INSERT INTO `alakzatok` (`id`, `nev`, `szelesseg`, `magassag`, `alakzat`, `kedvenc`) VALUES
    (1, 'alma', 2, 2, '[[1,3],[0,2]]', 1),
    (2, 'korte', 3, 3, '[[1,2,1],[0,0,3],[4,0,1]]', 0),
    (200000000, 'szilva', 3, 2, '[[2,1,1],[2,0,0]]', 0);

    ALTER TABLE `alakzatok`
      MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=200000001;
    ```

    **Stílusok**

    Minden oldalon legyenek elérhetőek a következő stílusok:

    ```css
    * {
        box-sizing: border-box;
    }
    #tabla {
        border-collapse: collapse;
    }
    #tabla td {
        padding: 0;
        width: 25px;
        height: 25px;
        border: 1px solid black;
        text-align: center;
    }
    .vetulet {
        border: 1px solid orange;
        min-width: 10px;
        min-height: 10px;
    }
    table.vetulet {
        border-spacing: 0;
        display: inline-table;
    }
    table.vetulet td {
        padding: 0;
        width: 10px;
        height: 10px;
        border: 1px solid black;
    }
    table.vetulet td.black {
        background-color: lightgray;
    }
    div.vetulet {
        display: inline-flex;
        flex-direction: row;
        align-items: flex-end;
    }
    div.vetulet > div {
        width: 10px;
        display: flex;
        flex-direction: column;
    }
    div.vetulet > div > div {
        width: 10px;
        height: 10px;
        border: 1px solid black;
        background-color: lightgray;
    }
    ```

1. **Listázás** Listázd ki a tárolt alakzatokat egy táblázatban. Fájlnév: `lista.php`
    
    a. A táblázatnak 4 oszlopa legyen ilyen sorrendben:
        - Név
        - Méret
        - Kedvenc
        - Funkciók

    b. A táblázatnak legyen fejlécsora, ahol az oszlopneveket tüntetjük fel `th` elemekben.

    c. A táblázat adatait tartalmazó soroknak legyen az `id`-t tartalmazó `data-id` attribútuma (pl. `<tr data-id="1">`).

    d. A Kedvenc oszlopban teli szívvel jelezzük, ha kedvenc az alakzat, üres szívvel, ha nem. Használd ezeket az UTF-8 karaktereket: ♥, ♡.

    e. A Funkciók oszlopban egyetlen hivatkozás szerepel "Megjelenít" felirattal. A hivatkozás a `megjelenit.php`-ra mutat átadva az `id` értékét `id` név alatt GET paraméterként.

    f. Legyen lehetőség csak a kedvenceket vagy a nem kedvenceket kilistázni. Ezt GET paraméterként jelezzük: `lista.php?kedvenc=true` vagy `lista.php?kedvenc=false`. Ennek megadását a felületen nem kell elvégezni.

    g. Legyen egy link az oldalon "Új alakzat felirattal", ami az `uj.php`-ra mutat.

    ![](pages/subjects/webprog-pti/zh/2017-18-2/vetuletek/lista.png)

2. **Megjelenítés** A listázó oldalon az egyik alakzat "Megjelenít" hivatkozására kattintva a `megjelenit.php` oldal jelenik meg, URL-ben átadva a megjelenítendő alakzat `id`-ját.

    a. Az oldalon egy definíciós listában kell a kiválasztott elem adatait megmutatni. A vetületek a `vetulet` stílusosztályú táblába, illetve `div`-ekbe fognak kerülni.

    ```html
    <dl>
        <dt>Azonosító</dt>
        <dd>200000000</dd>

        <dt>Név</dt>
        <dd>szilva</dd>
        
        <dt>Méret</dt>
        <dd>2 x 3</dd>
        
        <dt>Kedvenc</dt>
        <dd>♡</dd>
        
        <dt>Vetületek</dt>
        <dd>
            <table>
                <tr>
                    <th>Felülnézet</th>
                    <th>Oldalnézet</th>
                    <th>Elölnézet</th>
                </tr>
                <tr>
                    <td>
                        <table class="vetulet" id="felul"></table>
                    </td>
                    <td>
                        <div class="vetulet" id="oldal"></div>
                    </td>
                    <td>
                        <div class="vetulet" id="elol"></div>
                    </td>
                </tr>
            </table>
        </dd>
    </dl>
    ```

    b. A vetületek generálását kliens- vagy szerveroldalon is elvégezheted, a végső struktúra kerül ellenőrzésre. (Tesztek szempontjából a 2. teszt az előre megadott alakzatok közül választ véletlenszerűen, a x. teszt egy új alakzat esetén vizsgálja meg. Ezért a vetületekre kapható pontokat kettéválasztottuk.)

    c. A felülnézeti vetületet a `table.vetulet#felul` elemben kell megjeleníteni. A szilva nevű alakzat esetén ez így néz ki. Fontos, hogy `black` stílusosztállyal lássuk el azokat a cellákat, ahol van kocka.

    ```html
    <table class="vetulet" id="felul">
        <tr>
            <td class="black"></td>
            <td class="black"></td>
            <td class="black"></td>
        </tr>
        <tr>
            <td class="black"></td>
            <td class=""></td>
            <td class=""></td>
        </tr>
    </table>
    ```

    d. Oldalnézeti vetületet a `div.vetulet#oldal` elembe kell generálni. Ebben annyi `div` van, ahány oszlop, egy oszlopon belül pedig annyi `div`, ahány kocka van egymáson.

    ```html
    <div class="vetulet" id="bal">
        <div>
            <div></div>
            <div></div>
        </div>
        <div>
            <div></div>
            <div></div>
        </div>
    </div>
    ```

    e. Hasonlóan épül fel az elölnézeti vetület, amelyet a `div.vetulet#elol` elembe kell generálni. Ebben annyi `div` van, ahány oszlop, egy oszlopon belül pedig annyi `div`, ahány kocka van egymáson.

    ```html
    <div class="vetulet" id="elol">
        <div>
            <div></div>
            <div></div>
        </div>
        <div>
            <div></div>
        </div>
        <div>
            <div></div>
        </div>
    </div>
    ```

    ![](pages/subjects/webprog-pti/zh/2017-18-2/vetuletek/megjelenit.png)

3. **Új alakzat felvitele** Az `uj.php` oldalon kell megvalósítani egy új alakzat felvitelét. Ehhez meg kell adni a következő mezőket. A validációt szerveroldalon kell elvégezni. A hibaüzeneteket egy `hibak` azonosítójú elembe kell kiíratni (nincs speciális struktúra).
    
    - id (azonosítója: `id`, szöveges, nem kötelező, ha meg van adva, akkor szám)
    - név (azonosítója: `nev`, szöveges, kötelező)
    - magasság (azonosítója: `magassag`, szöveges, kötelező, szám)
    - szélesség (azonosítója: `szelesseg`, szöveges, kötelező, szám)
    - kedvenc (azonosítója: `kedvenc`, checkbox)
    - alakzat (azonosítója: `alakzat`, többsoros szöveges beviteli mező, kötelező, valid JSON -- ez utóbbi hibáját a PHP-s `json_decode` függvény `NULL` visszatérési értéke jelzi)

    Sikeres mentéskor a listázó oldalra (`lista.php`) kell átirányítani a böngészőt.

    ![](pages/subjects/webprog-pti/zh/2017-18-2/vetuletek/uj_form.png)

4. **Új alakzat megadása kattintgatással** A felvivő oldalon macerás az alakzat mátrixának JSON kódját kézzel megadni. Segítsük ezt a folyamatot azzal, hogy egy felülnézeti táblázatot generálunk az oldalra, és a cellákba kattintgatva adjuk meg, hány kocka is van egymáson!
    
    a. Tegyünk fel egy gombot `general` azonosítóval. Erre kattintva az oldalon meg kell jelennie egy `n`x`m`-es táblázatnak, ahol `n` értékét a magasság mezőből, `m` értékét a szélesség mezőből olvassuk ki. A megjelenő táblázat azonosítója `tabla` (`table#tabla`), és eleinte mindegyik értéke 0.

    b. A táblában kattintgatva az adott cella értéke 1-gyel növekszik.

    c. Minden kattintás után a táblának megfelelő JSON mátrix az alakzatnak megfelelő többsoros szöveges beviteli mezőben megjelenik.

    ![](pages/subjects/webprog-pti/zh/2017-18-2/vetuletek/uj_js.png)

5. **AJAX szerkesztés** A megjelenítő oldalon tegyük lehetővé az adatok szerkesztését és AJAX-os mentését.

    a. Tegyünk fel egy `szerkeszt` azonosítójú gombot, amire kattintva az oldalon megjelenik három beviteli mező (az alakzat aktuális értékeivel) és egy gomb, amik addig el voltak rejtve (érdemes a `hidden` attribútummal vagy a `display: none`-nal elrejteni őket):

        - név (azonosítója: `nev`, szöveges)
        - kedvenc (azonosítója: `kedvenc`, checkbox)
        - alakzat (azonosítója: `alakzat`, többsoros szöveges beviteli mező)
        - gomb (azonosítója: `mentes`, felirata)



    b. A Mentés gombra kattintva egy AJAX kérést kell küldeni a szervernek, ott elmenteni a változásokat, majd a szélesség és magasság adatokat visszaküldeni a kliensre, ahol a méreteknél megjelenítjük. Más dolgot nem kell tenni. A szerver válasza JSON formátumban küldje vissza az adatot:

    ```json
    {
        "szelesseg": 33,
        "magassag": 23
    }
    ```

    ![](pages/subjects/webprog-pti/zh/2017-18-2/vetuletek/megjelenit_szerkeszt.png)