<style>
img.floated {
  float: left;
  width: 20%;
  margin: 10px;
}
ul {
    display: table;
}
table.game {
  border-collapse: collapse;
  --line-width: 5px;
  margin: 20px;
}
table.game tr:nth-child(even) {
    background: none;
}
table.game td {
  padding: 0;
  width: 40px;
  height: 40px;
  overflow: hidden;
  position: relative;
  border: solid black 1px;
  text-align: center;
  font-size: 120%;
  font-family: sans-serif;
}

.right::before,
.left::before {
  content: "";
  height: calc(var(--line-width) * 2);
  position: absolute;
  top: calc(50% - var(--line-width));
  left: calc(-1 * var(--line-width));
  right: calc(-1 * var(--line-width));
  border-radius: calc(2 * var(--line-width));
  z-index: -1;
}

.right::before {
  left: calc(50% - var(--line-width));
}

.left::before {
  right: calc(50% - var(--line-width));
}

.left.right::before {
  left: calc(-1 * var(--line-width));
  right: calc(-1 * var(--line-width));
}

.top::after,
.bottom::after {
  content: "";
  width: calc(var(--line-width) * 2);
  left: calc(50% - var(--line-width));
  top: calc(-1 * var(--line-width));
  bottom: calc(-1 * var(--line-width));
  position: absolute;
  border-radius: calc(2 * var(--line-width));
  z-index: -1;
}

.bottom::after {
  top: calc(50% - var(--line-width));
}

.top::after {
  bottom: calc(50% - var(--line-width));
}

.bottom.top::after {
  top: calc(-1 * var(--line-width));
  bottom: calc(-1 * var(--line-width));
}

.color1::after, .color1::before {
  background: #f44336;
}
.color2::after, .color2::before {
  background: #009688;
}
.color3::after, .color3::before {
  background: #ffc107;
}
.color4::after, .color4::before {
  background: #2196f3;
}
.color5::after, .color5::before {
  background: #e91e63;
}
.color6::after, .color6::before {
  background: #607d8d;
}
.color7::after, .color7::before {
  background: #9c27b0;
}
.color8::after, .color8::before {
  background: #4caf50;
}
.color9::after, .color9::before {
  background: #ff5722;
}
.color10::after, .color10::before {
  background: #9e9e9e;
}
.color11::after, .color11::before {
  background: #cddc39;
}
.color12::after, .color12::before {
  background: #795548;
}
</style>

## Küldöncök

> Hol volt, hol nem volt, volt egyszer egy király. Ez a király olyan hatalmas volt, hogy ha eltüsszentette magát, az egész ország népének rá kellett mondani: adj’ Isten egészségére! Hogyha náthás volt, nem is lehetett más szót hallani az országban, mint: “Adj’ Isten egészségére!”

<img src="assets/images/webprog/king.png" class="floated"> A csillagszemű juhász még gondolat sem volt szülei fejében, mikor Nekeresdországban már az volt a szokás, hogy ha a király tüsszent, akkor mindenkinek jó egészséget kell kívánnia neki. Az egyszerű elv megvalósítása azonban komoly fejtörést okozott. A kivitelezésével Furfangot, a főkamarást bízták meg. Főtt is a főkamarás feje, mert úgy kellett a küldöncök útvonalát megtervezni, hogy a kijelölt várakból a küldöncök elindulva, egymás útját nem keresztezve, nem érintve, az egész birodalmat bejárva jussanak el a kijelölt célba. Segíts Furfangnak a küldöncök útvonalának megtervezésében!

Nekeresdország egy négyzetráccsal ábrázolható. Van benne pár kitüntetett cella, ahonnan a küldöncök indulnak és ahova érkeznek. Egy-egy küldönc útvonalának végpontjait ugyanaz a szám jelzi. A küldönc bármelyik végpontból elindulhat. A küldöncök útvonalait az alábbi szabályok betartásával kell megtervezni:

- Az azonos számokat folytonos útvonallal kell összekötni.
- Az útvonalak csak vízszintesen és függőlegesen haladhatnak úgy, hogy a mezők közepét érinteniük kell, de ott 90 fokkal elfordulhatnak.
- Az útvonalak nem keresztezhetik egymást és nem ágazhatnak el.
- Az útvonalak számozott mezőkön nem mehetnek keresztül, viszont az összes fehér mezőn útvonalnak kell áthaladnia.

<div style="display: flex; flex-wrap: wrap; clear: both;">
<table class="game">
    <caption>Kiindulási állapot</caption>
    <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>4</td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td>1</td>
        <td>3</td>
        <td></td>
    </tr>
</table>

<table class="game">
    <caption>Megoldva</caption>
    <tr>
        <td class="color1 bottom">1</td>
        <td class="color2 bottom">2</td>
        <td class="color3 right">3</td>
        <td class="color3 left right"></td>
        <td class="color3 left bottom"></td>
    </tr>
    <tr>
        <td class="color1 top bottom"></td>
        <td class="color2 top right"></td>
        <td class="color2 left bottom"></td>
        <td class="color4 bottom">4</td>
        <td class="color3 top bottom"></td>
    </tr>
    <tr>
        <td class="color1 top bottom"></td>
        <td class="color4 bottom ">4</td>
        <td class="color2 top">2</td>
        <td class="color4 top bottom "></td>
        <td class="color3 top bottom"></td>
    </tr>
    <tr>
        <td class="color1 top bottom"></td>
        <td class="color4 top right"></td>
        <td class="color4 left right"></td>
        <td class="color4 left top"></td>
        <td class="color3 top bottom"></td>
    </tr>
    <tr>
        <td class="color1 top right"></td>
        <td class="color1 left right"></td>
        <td class="color1 left">1</td>
        <td class="color3 right">3</td>
        <td class="color3 top left"></td>
    </tr>
</table>
</div>

### Feladatok

- A nyitóképernyőn lehessen választani könnyű, közepes és nehéz feladat közül.
- Egy feladatot kiválasztva megjelenik az adott feladat.
- Az egér segítségével legyen lehetőség a számokat a szabályok betartásával összekötni. 
  + Egy számozott mezőn lenyomjuk az egérgombot (`mousedown`), majd nyomva tartva kijelöljük a küldönc útvonalát (`mouseover` vagy `mouseenter`) a szabályok betartásával. 
  + Ugyanahhoz a számhoz érve elengedve az egérgombot (`mousedown`) a vonal rögzül. 
  + Ha nem ugyanazon a szám mezőn engedjük el a gombot, akkor a vonal megszűnik. 
  + Ha a vonallal rossz irányban mentünk, akkor a vonalat visszafele követve lehetőség van az utolsó lépéseket törölni. 
  + Ha szabálytalan mezőre lépnénk (pl. egy másik vonalat kereszteznénk vagy rossz szám mezőre lépünk), akkor a vonal nem hosszabbodik meg. 
  + Egy már rögzült vonalon jobb gombot nyomva, a vonal törlődik.
- Ha az összes küldönc útvonala a helyére került, és az egész ország le van fedve, akkor a játék írja ki, hogy a felhasználó nyert. Ezután legyen lehetőség a főoldalra visszamenni, és új játékot választani.
- Legyen lehetőség mindhárom pályánál a játékállást elmenteni. Ha már van ilyen játékállás, akkor kérdezzen rá, hogy valóban felül akarja-e írni. Később az adott pályához egy már mentett állás legyen betölthető.

### A három feladat

<div style="display: flex; flex-wrap: wrap;">
<table class="game">
    <caption>Könnyű</caption>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>2</td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td>1</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td>2</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>3</td>
        <td></td>
        <td></td>
        <td>3</td>
        <td></td>
    </tr>
    <tr>
        <td>1</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>

<table class="game">
    <caption>Közepes</caption>
    <tr>
        <td>2</td>
        <td></td>
        <td></td>
        <td>9</td>
        <td></td>
        <td></td>
        <td></td>
        <td>5</td>
        <td></td>
    </tr>
    <tr>
        <td>1</td>
        <td></td>
        <td></td>
        <td>8</td>
        <td></td>
        <td>11</td>
        <td></td>
        <td></td>
        <td>5</td>
    </tr>
    <tr>
        <td></td>
        <td>2</td>
        <td></td>
        <td></td>
        <td>6</td>
        <td></td>
        <td>7</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>11</td>
        <td></td>
        <td>10</td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>7</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>4</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>3</td>
        <td>6</td>
    </tr>
    <tr>
        <td></td>
        <td>9</td>
        <td></td>
        <td>4</td>
        <td>8</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td>1</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>10</td>
        <td>3</td>
    </tr>
</table>

<table class="game">
    <caption>Nehéz</caption>
    <tr>
        <td>1</td>
        <td></td>
        <td></td>
        <td></td>
        <td>3</td>
        <td></td>
        <td>5</td>
        <td></td>
        <td>2</td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>8</td>
        <td>5</td>
        <td></td>
    </tr>
    <tr>
        <td>7</td>
        <td>4</td>
        <td></td>
        <td>6</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>1</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>2</td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td>4</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td>7</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>3</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>6</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>8</td>
    </tr>
</table>
</div>

### Működés és segítség

Nincs elvárás arra vonatkozóan, hogy milyen technológiával (táblázat, div-ek vagy canvas) oldod meg a feladatot, továbbá a megjelenést és működést illetően sincsenek kőbe vésett elvárások. A vonal meghúzását akár a mező háttérszínével is jelezheted. Ha tetszik az ezen az oldalon alkalmazott megoldás, akkor nézd meg az oldal forrását.

Érdemes a pályaleírást valamilyen adatszerkezetben megadni. Ez nemcsak a három előre megadott pálya megjelenítését segíti, de a PHP-s beadandónál az adatbázisban való tárolást is megkönnyíti majd. A leírás pl. történhet így:

```js
[
  [1,2,3,0,0],
  [0,0,0,4,0],
  [0,4,2,0,0],
  [0,0,0,0,0],
  [0,0,1,3,0],
]
```

Az egér nyomon követésénél a `mouseover` vagy a `mouseenter` eseményt érdemes használni. Ezeknél az eseményeknél az eseményobjektum egy [`relatedTarget` tulajdonságban](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget) azt az elemet tartalmazza, ahonnan az egér érkezett. Igény szerint ezt is ki lehet használni.

### Pontozás

Ha szükséges, akkor a pályák átalakíthatók a lenti feltételek kielégítése végett.

#### Kötelező (enélkül nincs jegy):

- Legalább 1 pálya megjelenik.
- A pontok valamilyen módon (pl. kattintgatással), de egyértelműen (pl. különböző színekkel, vagy számokkal) összeköthetők.
- A végállapot ellenőrzése, nyerés kiírása.

#### Nem kötelező

- A pályák választhatóak, a kiválasztott pálya megjelenik. (1 pont)
- Az egérgombot lenyomva tartva és az egeret mozgatva a küldönc útvonala kijelölhető. (2 pont)
- Az útvonal csak számból indulhat. (1 pont)
- Ha a kiindulásival megegyező számon végzünk, akkor a vonal rögzül. (1 pont)
- Ha nem a kiindulásival megegyező számon végzünk, akkor a húzott vonal eltűnik. (1 pont)
- A vonal a szabályok betartásával húzható, nem mehet át másik vonalon vagy számmezőn. (1 pont)
- A vonal visszafele menve rövidíthető, az utolsó elrontott lépések így visszavonhatók. (2 pont)
- Egy kész vonalra jobb gombbal kattintva a vonal eltűnik. (1 pont)
- Játékállás mindegyik pályánál elmenthető. (1 pont)
- Mentéskor ellenőrzi, hogy van-e már mentett pálya. (1 pont)
- Egy adott pályánál a játékállás betölthető. (1 pont)
- Nincs nagyobb programhiba, nem csalhatók elő furcsa jelenségek (1 pont)
- 1 hét késés (-2 pont)
- 2 hét késés (-4 pont)
- 2 hétnél több késés (nincs elfogadva a beadandó, nincs jegy)

### Értékelés:

- 0-6 pont: -0,5
- 7-11 pont: 0
- 12-14 pont: +0,5

### Beadás

A megoldásokat a webprogramozas.inf.elte.hu szerver [beadási felületén](http://webprogramozas.inf.elte.hu/ebr) kell megtenni.

Határidő: 2019. november 10. éjfél
