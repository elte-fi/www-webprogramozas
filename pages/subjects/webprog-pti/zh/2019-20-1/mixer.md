<style type="text/css">
main img {
    max-width: 100%;
}
main ul p, main ol p {
  display: block;
}
</style>

# Webprogramozás zh -- Mixer

_2020. január 7. 13-16_

## Tudnivalók

- A feladatokat a `webprogramozas.inf.elte.hu` szerveren kell elkészíteni. A `www` mappádon belül hozzál létre egy `mixer` nevű mappát, és abban készítsd el a megoldásodat.
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

Készíts egy olyan alkalmazást, ahol egy zeneszámhoz tartozó különböző hangfelvételeket (trackeket) tudod kezelni, és ezeknek a hangerejét külön-külön beállítani!

0. **Előkészületek**

    A feladathoz kétféle adatot használunk. Az adatokat JSON formában alább le lehet tölteni, és ezzel ajánlott dolgozni. Ha mégis más formátumban szeretnél dolgozni, akkor a letöltésnél mellékelve vannak az adatok Markdown formátumban is, és ezt a [tableconvert.com](https://tableconvert.com) oldalon beimportálva tetszőleges formátumban ki tudod exportálni, pl. SQL-ben is. De erre csak akkor van szükség, ha a JSON fájllal nem tudsz dolgozni. Minden tekintetben a JSON fájl az irányadó.

    1. **Track**: egy zenei hangfelvételért felelős adatszerkezet. Tároljuk az azonosítóját (`id`), nevét (`name`), a felvétel fájlnevét (`filename`), a bal-jobb eltolás mértékét (`balance`), a hangerejét (`volume`) és az alkalmazott szűrők listáját (`filters`). 
        
        Ezeket az adatokat ne változtasd (`id` 1-től 5-ig), de később újakat hozzáadhatsz. A tesztelő a 4-es és 5-ös azonosítójú sor `volume` mezőjét változtathatja.

        ```md
        ```

    2. **Szűrők** (filters): egy lista a lehetséges szűrőkről. Egy azonosító (`id`) és egy név (`name`) mezőből áll. Nem szabad megváltoztatni, nem kell hozzáadni, nem kell elvenni belőle.

        ```md
        ```

    A feladat két oldalból áll:

    1. főoldal (`index.php`)
    2. új track oldal (`new.php`)

    [SEGÉDANYAGOK LETÖLTÉSE](mixer.zip)

    Ha valaki adatbáziskezelőt szeretne használni, akkor az SQLite lokális, fájl alapú adatbáziskezelőt ajánljuk, amihez van támogatás a webprogramozás szerveren PHP-ban. Grafikus felülethez a [phpLiteAdmin](phpliteadmin.zip) programot ajánljuk: kicsomagolva a php fájlt csak be kell másolni a projektmappába, és meghívni böngészőből; a jelszó `admin`. A mappára írásjogot kell adni, hogy az adatbázisok létre tudjanak jönni.
    
1. **A státuszsorban lévő hangerőkijelző elemeinek száma (?? pt) teszt: | karakter vizsgálata** A főoldalon (`index.php`) URL-ben megadott paraméter (`bars`) segítségével add meg, hogy a státuszsorban lévő hangerősáv hány karakterből álljon. Az "Average volume" szöveg után kell megfelelő számú `span` elemet generálni, benne a `|` karakterrel. Pl. `index.php?bars=145`. Ha nincs megadva vagy nem nemnegatív számot tartalmaz, akkor alapértelmezetten 100 elemet generáljunk. Egyéb esetben a paraméterben érkező értéknek megfelelő számút.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/mixer/1.png)

2. **Trackek listázása (?? pt)** Listázd ki a háttérrendszerben tárolt trackeket a főoldalon (`index.php`)!

    - a. A trackeket a `tracks` azonosítójú elemben kell megjeleníteni. Egy tracknek egy `track` stílusosztályú `div` felel meg. 
    - b. Az ezen belüli `header` elemben jelenítsd meg a track nevét.
    - c. A track neve legyen hivatkozás, amely a főoldalra mutat, GET paraméterként átadva a track azonosítóját `id` név alatt. (`index.php?id=1`)
    - d. A range slider elem értékét állítsd be a track hangerejének megfelelően!

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/mixer/2.png)

3. **Track részleteinek megtekintése (?? pt)**: Egy track nevének hivatkozására kattintva a főoldal jöjjön be, de jelenjen meg alul egy részletező panel, ahol a track részleteit láthatjuk.

    - a. A részletező panel (`details` azonosítójú elem) alapértelmezetten nem jelenik meg.
    - b. Ha az URL egy track id-t tartalmaz, akkor megjelenik, és a benne lévő definíciós lista a track megfelelő adatait tartalmazza: név, fájlnév, balansz és hangerő.
    - c. A `details` azonosítójú elemen belüli `filters` stílusosztályú `div` a megfelelő szűrőket a megfelelő sorrendben sorolja fel, mindegyiket egy-egy `span` elembe rakva.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/mixer/3.png)


4. **Új track hozzáadása (?? pt)**: Adjunk lehetőséget új tracket hozzáadni az "Add new track..." hivatkozásra kattintva. Fájlnév: `new.php`

    - a. Az űrlap az alábbi mezőket tartalmazza:

      - track neve (neve: `name`, típusa: szöveges beviteli mező, kötelező, legfeljebb 20 karakter hosszú, hibaüzenetek: `The track name is required`, `The track name is too long`)
      - track fájlneve (neve: `filename`, típusa: szöveges beviteli mező, kötelező, formátuma: fájlnév.kiterjesztés, pl. `drum.wav`, hibaüzenetek: `The audio filename is required`, `The audio filename has a wrong format`)
      - balansz (neve: `balance`, típusa: szám, kötelező, egész szám, -100 és 100 között, hibaüzenetek: `The balance is required`, `The balance has to be an integer`, `The balance has to be between -100 and 100`)
      - hangerő (neve: `volume`, típusa: szám, kötelező, egész szám, 0 és 100 között, 5 többszöröse, hibaüzenetek: `The volume is required`, `The volume has to be an integer`, `The volume has to be between 0 and 100`, `The volume has to be a multiple of 5`)
      - szűrők (neve: `filters`, típusa: többsoros beviteli mező, lehet üres, ha nem, akkor egy szűrő soronként, hibaüzenetek: nincsen)

    - b. A fenti elemek hiányozhatnak a POST kérésből, üresek vagy rosszul kitöltöttek is lehetnek. Ezekben az esetekben a fenti hibaüzenetek közül a megfelelőek jelenjenek meg egy `errors` stílusosztályú elemben (nem feltétlenül strukturáltan, azaz lehet a hibaüzeneteket pl. `var_dump`-pal kiíratni). Ez a hibaüzenet elem az űrlap első betöltésekor nem jelenik meg az oldalon.

    - c. Hiba esetén gondoskodj az űrlap állapottartásáról, azaz írd vissza a beviteli mezőkbe a felküldött adatokat!

    - d. Helyesen kitöltve vedd fel az adatokat a háttérrendszerben, majd jelenjen meg a főoldal, a tracklistában már az új elemmel.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/mixer/4.png)

5. **Szűrők megadása (?? pt)**: Az új track felvivő oldalon (`new.php`) tegyük egyszerűbbé a szűrők megadását úgy, hogy a felhasználó egy listából válogathatja össze a szűrőket.

    - a. Adott az oldalon két listadoboz. A baloldali az `all` azonosítójú, a jobboldali a `selected` azonosítójú. 
    - b. Az `all` azonosítójúban (bal) jelenjenek meg a háttérrendszerben tárolt szűrőnevek. 
    - c. A `⟶` gomb megnyomásával a bal oldali listadobozból kerüljön át a kiválasztott elem a jobboldaliba!
    - d. A `⟵` gomb megnyomásával a jobb oldali listadobozból kerüljön át a kiválasztott elem a baloldaliba!
    - e. A `↑` gomb megnyomásával a jobb oldali listadobozban kijelölt elem kerüljön eggyel feljebb!
    - f. A `↓` gomb megnyomásával a jobb oldali listadobozban kijelölt elem kerüljön eggyel lejjebb!
    - g. A `selected` azonosítójú listadobozban lévő elemek jelenjenek meg a többsoros beviteli mezőben a listadoboz minden változtatásakor. Minden listaelem 1 sor legyen a beviteli mezőben!
    
    ![](http://webprogramozas.inf.elte.hu/webprog/zh/mixer/5.png)

6. **Hangerő slider értékeinek és színének megjelenítése (?? pt)**: A főoldalon az oldal betöltése után jelenítsd meg a hangerő slider értékét a fölötte lévő elemben, és ugyanennek az elemnek a háttérszínét állítsd be a hangerőnek megfelelően!

    - a. Mindegyik tracknél olvasd ki a hangerő slider értékét, majd írd ki a fölötte levő `span` elembe!
    - b. Ugyanennek a `span` elemnek a háttérszínét állítsd be a hangerőnek megfelelően a következő szabályok szerint: a HSL színtérben a hue érték a 100-tól való eltérést tartalmazza, a saturation érték a hangerőnek legyen megfelelő, a lightness pedig legyen 50%. Azaz pl. egy 80-as hangerőnél: `hsl(20, 80%, 50%)`.
    - c. Egy hangerő slidert egérrel megfogva és mozgatva, a `span` értéke és háttérszíne megfelelően változik. Használd az `input` eseményt!

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/mixer/6.png)

7. **Hangerőkezelés billentyűkkel (?? pt)**: Tedd lehetővé a főoldalon, hogy a trackek kiválasztása és hangereik változtatása a bal-jobb-le-föl billentyűkkel is lehetséges legyen!

    - a. Ha még nincs kiválasztva egy track sem, akkor a jobb billentyűvel az első track kerül kiválasztásra (azaz a tracknek megfelelő `div` legyen `active` stílusosztályú).
    - b. Ha még nincs kiválasztva egy track sem, akkor a bal billentyűvel az utolsó track kerül kiválasztásra.
    - c. További jobb-bal billentyűt nyomogatva a következő, illetve előző track kerül kiválasztásra.
    - d. Az első trackről az előzőre lépve az utolsó kerül kiválasztásra.
    - e. Az utolsó trackről a következőre lépve az első kerül kiválasztásra.
    - f. A szóköz billentyűt megnyomva a tracknél található jelölőmező jelöltsége megváltoztatható. Bejelöléskor a track-nek megfelelő `div` `selected` stílusosztályú lesz. Jelölés elvételekor a stílusosztály is megszűnik a tracken. Jobbra-balra mozgáskor több is kijelölhető.
    - g. A föl-le billentyűkkel a kijelölt trackek hangereje 5 értékkel növekszik, illetve csökken.
    
    **Technikai segítség**: dokumentumszinten érdemes a billentyűleütéseket vizsgálni, ahova csak a `keydown` és `keyup` események érkeznek meg.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/mixer/7.png)

7. **Hangerők AJAX mentése (?? pt)**: A felül található "Save" feliratú gombra kattintva mentsük el a beállított hangerőket minden trackhez a háttérrendszerben AJAX POST kéréssel! Ehhez állítsuk valamilyen módon át a trackek hangereit, majd a "Save" feliratú gomb megnyomásával AJAX POST kéréssel küldjük el a hangerőadatokat. Sikeres mentés után a gombban lévő `span` elembe írjunk egy `✔` jelet!

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/mixer/8.png)
