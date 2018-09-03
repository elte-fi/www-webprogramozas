# Webfejlesztés 2. (PTI)

## Általános információk

Óraszám
: 1 előadás + 2 gyakorlat + 1 konzultáció

Előfeltétel
: Webfejlesztés 1. (IP-08tWF1EG)

Célkitűzés
: A dinamikus kliens- és szerveroldali webprogramozás alapjainak a megismertetése. A félév első felében a JavaScript nyelvvel és a hozzá kapcsolódó alapfokú webes technológiákkal ismerkednek meg a hallgatók, a félév második felében a PHP nyelven keresztül ismerkednek meg a szerveroldali webprogramozás alapjaival.

Környezet
: A szerveroldali dinamikus weblapok készítését a webprogramozas.inf.elte.hu szerver segítségével végezzük el. A szerveren Nginx webszerver, 7-es verziójú PHP fut. A szerverre a félév elején, a gyakorlati jelentkezések lejártakor minden hallgató kap hozzáférést. A webprogramozás szerverre kell a beadandó feladatokat feltölteni, ezen folyik a félév második felében a gyakorlati munka, illetve ezen írjuk a félév végi évfolyam ZH-t is.

## JavaScript beadandók

**A következő információk folyamatosan frissülnek!!!**

Ebben a félévben az Etológia Tanszék kérésére kisgyerekeknek szóló webes (telefonon futó) játékokat készítünk el. Több játék közül lehet választani, mindegyikre kb. 20 hallgató jut. A megfelelő táblázatban jelentkezni kell majd, hogy ki melyik játék implementálását végzi el. Mindegyik játék esetén a megoldások közül kiválasztjuk a legjobbat. A legjobb megoldások készítői nyereményben részesülnek, bemutatjuk alkalmazásaikat az előadáson és a webprogramozas oldalon is.

A játékok leírásai alább találhatók. Ezek egyelőre még nem véglegesek. Az implementálás olyan részleteihez, mint érintésvezérlés, vagy mobilra optimalizálás, adunk segítséget leírás formájában. 

[Játékok és leírásaik](https://drive.google.com/open?id=1Bxc7mUzePM-J7eFUhylTenT4gYXaWDeS) (frissítve 2018.04.10.-én!):

- Irányok mátrix
- 2D mátrix
- Irányok
- Tangram
- Szín sudoku
- Memória
- TicTacToe
- Mastermind

### Technikai segítség

A játékokat szeretnénk mobiltelefonok böngészőjében futtatni. Ehhez összeraktunk egy olyan kis oldalt, amely példát mutathat számos apektusban. A legtöbb játékban ugyanis van drag and drop, az oldal felosztása, stb. Hangsúlyozzuk, ez nem egy sablon, nem egy az egyben kell átvenni, de vannak benne olyan megoldások, amelyeket alkotó módon fel lehet használni a megoldásban:

- [Forráskód](https://repl.it/@horvathgyozo/touch2)
- [Kipróbálás, pl. mobiltelefonon](https://touch2--horvathgyozo.repl.co)

#### Delegate

```javascript
function delegate(parent, type, selector, fn) {

  function delegatedFunction(e) {
    if (e.target.matches(`${selector},${selector} *`)) {
      let target = e.target;
      while (!target.matches(selector)) {
        target = target.parentNode;
      }
      e.delegatedTarget = target;
      return fn(e);
      // vagy
      // return fn.call(target, e);
    }
  }

  parent.addEventListener(type, delegatedFunction, false);
}
```

#### Tesztelés

Az alkalmazás teszteléséhez nem kell állandóan mobiltelefonon kipróbálni a változtatásokat. A Chrome böngészőben pl. a fejlesztői eszköztár bal felső sarkában a 2. ikon épp arra szolgál, hogy az oldalt mobiltelefonos környezetben szimulálja. Ez nemcsak az oldal átméretezését jelenti, hanem az események szinjén is az egéreseményeket érintéseseménnyé alakítja. Ebben ajánlott tesztelni az alkalmazást.

#### Eseménykezelés

Ha azt szeretnénk, hogy az alkalmazásunkat egérrel, érintéssel vagy érintős tollal is lehessen használni, akkor nehéz helyzetbe kerülhetünk, mert külön események vannak az egérhez (`mouse`), az érintéshez (`touch`) és a tollhoz (`pen`). Szerencsére az utóbbi években megjelent egy olyan eseménymodell, amely ezeket egységes interfészen keresztül kezeli: [Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events). Gyakorlatilag az egéreseményekben lévő `mouse` kulcsszót kell `pointer`-re cserélni, így lesznek a következő események:

- `pointerdown`
- `pointermove`
- `pointerup`
- stb.

Az eseményeket a következő kiegészítik a következő CSS tulajdonságok:

- `touch-action`: a mobilböngészőnek számos alapértelmezett művelete van érintés esetén, pl. az oldal görgetése. Bármelyik elemhez hozzáérünk, akkor ez az alapértelmezett művelet hajtódik végre, és ez megállítja a `pointer` eseményeket. Hogy a böngésző ne reagáljon az alapértelmezett műveletekre, ezt CSS-ben a `touch-action: none;`-nal lehet beállítani. A fenti példában az egész játékfelületet adó `#container` elemre van ez beállítva.

- `pointer-events`: nem összekeverendő a fentebb említett esemény API-val. A `pointer-events` CSS tulajdonsággal azt lehet beállítani, hogy egy adott elem érzékelje-e egyáltalán a kattintást, érintést. A `pointer-events: none;` beállítással például az pointer eseményekre átlátszó elemeket lehet megadni. A példában ott használjuk ezt ki, hogy amikor draggeljük a négyzetet, akkor a négyzet alatti elemre vagyunk kíváncsiak, hogy az droppable zóna-e. Így az elemen kikapcsoljuk az események érzékelését draggelés közben.

#### Drag and drop érintéssel

A HTML5 drag and drop API kiválóan alkalmas asztali böngészőkben egéreseményekkel. Sajnos azonban egyelőre egyáltalán nem optimalizálták érintésvezérlésre ezt az API-t. Így a drag and drop-ot nekünk kell megvalósítani. Ehhez kétféle segédosztályt vezettem be: `.draggable` jelzi a vonszolható objektumokat, `.dropzone` az ejtési zónákat. Emellett van egy `activeDropZone` nevű globális változó, ami nyomon követi, hogy aktuálisan melyik zóna fölött vagyunk.

1. **onPointerDown**: a container kap egy `.dragging` stílusosztályt, hogy pár elem viselkedését megváltoztathassuk. A vonszolt objektum `.active` lesz. A `setPointerCapture`-rel pedig azt állítjuk be, hogy a vonszolás során az *összes* eseményt a vonszolt objektum kapja meg.

2. **onPointerMove**: először kiszűrjük azokat az elemeket, akikhez valóban tartozik az esemény (`hasPointerCapture`), majd lekérjük az egér x, y koordinátáit. Az `elementFromPoint` metódussal lekérdezzük az egérmutató alatti elemet (átlát a `pointer-events: none` elemeken). A következő if-ekben az ejtési zóna kezelése van: nem-aktív --> aktív, aktív --> aktív, aktív --> nem-aktív. Végül a vonszolt elemet (`e.target`) az egérmutató alá helyezzük.

3. **onPointerUp**: a stílusosztályok eltávolítása mellett a legfontosabb, hogy ha ejtési zóna fölött vagyunk, akkor mi történjen: a mi esetünkben az adott elem gyerekeként adjuk hozzá a vonszolt elemet (`appendChild`).


#### Mobil layout

A legtöbb alkalmazásban szükség lesz egy fejlécre, és egy -- akár több részre osztott -- játéktérre. Mivel különböző oldalarányú eszközökön is futhat a játék, ezt valahogy kezelni kell. A méreteket akár a játék elején JavaScripttel is beállíthatjuk, erre mutat példát az `index.js` elején található pár kikommentelt kódsor. Ugyanakkor a layout nagy része CSS-sel is megoldható. Az `index.css` első része tartalmazza az ehhez kapcsolódó kódot.

- elemek elhelyezése: mind a `body`, mind a `#container` flexboxot használ arra, hogy az elemeket egymás alá, megfelelő módon helyezze el.

- elemek szélessége és magassága: a `width`, `height`, `max-width`, `max-height` tulajdonságokkal, és `vw`, `vh` mértékegységekkel és a `calc` metódussal lehet megoldani pár trükköt. A szélességet például a magasságban lehet limitálni, a magasságot pedig a szélességben, így alakulhat ki a példában egy mindig négyzet alakú játéktér (erre nem biztos, hogy minden játék esetén szükség van!).


## PHP beadandó

### Feladatleírás

Készíts egy alkalmazást, amelyben nyilván tarthatod az elolvasott és elolvasandó könyveidet! Az adatok tárolása tetszőleges formában (adatbázis, fájl) történhet.

Az alkalmazásnak a következő funkciókat kell tudnia:

1. **Főoldal** A főoldal megjelenít egy üdvözlő szöveget, és kiírja, hogy jelenleg hány felhasználónak összesen hány könyve van az alkalmazásban.

2. **Hitelesítés** Minden további funkció csak hitelesítés után érhető el. A főoldalon legyen lehetőség bejelentkezni: ehhez email címet és jelszót kérjünk be. Ugyancsak a főoldalon legyen egy link, amin keresztül a regisztrációs oldalra mehetünk. Itt meg kell adni a teljes nevet (kötelező), az email címet (kötelező, email formátum) és a jelszót (kötelező, legalább 6 karakter hosszú). Sikeres regisztráció után újra a főoldalra kerülünk, ahol bejelentkezhetünk. Bejelentkezés után legyen lehetőség kijelentkezni!

3. **Listázó oldal** Sikeres bejelentkezés után a listázó oldalra kerülünk, ahol táblázatos formában megjelennek a bejelentkezett felhasználóhoz tartozó könyvek: szerző, cím, kategória, elolvasva-e.

4. **Új könyv** A listázó oldalról egy link vigyen át egy olyan oldalra, ahol új könyv adatait lehet felvenni. Egy könyvről a következőket kell megadni:

    - szerző (kötelező)
    - cím (kötelező)
    - oldalszám (csak egész szám)
    - kategória (legördülő, szabadon megadható, ld. [datalist](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist))
    - ISBN szám (10 vagy 13 hosszú számsor)
    - elolvasva-e (jelölőmező).

    Hibás kitöltés esetén a hibákat jelezni kell! Siker esetén irányítsuk át az oldalt a listázó oldalra!

5. **Könyv módosítása** A listázó oldalon minden könyv mellett jelenjen meg egy "Módosít" feliratú link. Erre kattintva egy külön oldalon jelenjen meg az új könyv felviteléhez hasonló űrlap, amelyen keresztül módosítani lehet a kívánt könyvet. Első megjelenéskor az űrlapmezők legyenek kitöltve az adott könyv adataival. Módosítás után ellenőrizzük a bevitt adatokat! Ha hibás, jelezzük az oldalon, ekkor már a felküldött adatokat jelenítve meg az űrlapmezőkben. Sikeres módosítás esetén irányítsuk az oldalt a listázó oldalra!

6. **Könyv törlése** A listázó oldalon minden könyv mellett jelenjen meg egy "Törlés" link is. Erre kattintva az adott könyvet töröljük az adatbázisból, és újra jelenjen meg a listázó oldal.

7. **AJAX lapozás** A táblázatban mindig csak 5 elem jelenjen meg. Ha ennél több van, akkor legyen lapozás funkció, azaz a táblázat alatt legyen egy "Előző"-"Következő" link, amire kattintva az előző 5 vagy következő 5 elem jelenik meg a táblázatban. Ha tovább nem lehet menni, akkor az a link ne jelenjen meg. A megoldást AJAX segítségével készítsd el, azaz a teljes oldal újratöltése nélkül.

    A listázó oldal kaphassa meg paraméterként, hogy hányadik oldal töltődik be (pl. `list.php?page=2` -- ez a 6-10. sort fogja mutatni)

    Technikai segítség:

    - A tábla sorainak megszámolása: `SELECT count(1) FROM table`.
    - A tábla rendezése: `SELECT * FROM table ORDER BY id`.
    - A tábla sorai közül valahonnan csak bizonyos mennyiséget lekérdezni: `SELECT * FROM table LIMIT 5 OFFSET 10`.
    - A megjelenő URL átírása: `history.replaceState(null, null, '?page=10')`

    Könyv törlése után a `page` paraméter őrizze meg az értékét!

#### Pontozás

- Főoldal: megjelenik (kötelező)
- Főoldal: számláló (1 pont)
- Hitelesítés: Regisztráció (1 pont)
- Hitelesítés: Bejelentkezés (kötelező)
- Hitelesítés: Kijelentkezés (kötelező)
- Listázó oldal: könyvlista (kötelező)
- Új könyv oldal: hibaellenőrzés (1 pont)
- Új könyv oldal: sikeres mentés (kötelező)
- Könyv módosítása: űrlap kitöltve (1 pont)
- Könyv módosítása: hibaellenőrzés, űrlap állapotmegőrzése további küldéseknél (1 pont)
- Könyv módosítása: sikeres mentés (1 pont)
- Könyv törlése: sikeres törlés (1 pont)
- Könyv törlése: megőrzi a `page` paraméter értékét (1 pont)
- AJAX lapozás (3 pont)
- 1 hét késés (-2 pont)
- 2 hét késés (-4 pont)
- 2 hétnél több késés (nincs elfogadva a beadandó, nincs jegy)

#### Értékelés

- 0-4: -0,5
- 5-8: 0
- 9-11: 0,5

#### Beadás

Tömörített ZIP állományként kell beadni a [feltöltő felületen](http://webprogramozas.inf.elte.hu/ebr).

Határidő: 2018. május 27. éjfél

## Számonkérés

Összevont (folyamatos) értékelésű tárgy.

### Az értékelés összetevői

* Beadandó feladat: [JavaScript](#javascript-beadandók)

    Határidő: 2018. április 22.

    [Beadás](http://webprogramozas.inf.elte.hu/ebr)

* Beadandó feladat: [PHP](#php-beadandó--könyvespolc)

    Határidő: 2018. május 27. éjfél

    [Beadás](http://webprogramozas.inf.elte.hu/ebr)

* [Évfolyam ZH](http://webprogramozas.inf.elte.hu/webfejl2/gyak/zh.html)

    2018\. május 28. 9:00-12:00, Lovarda és Nyelvi labor

* PótZH

    2018\. június 5. 9:00-12:00, Lovarda

### A beadandók értékelése

* A beadandók értékelése háromértékű skálán történik: -0,5; 0; 0,5 jegy kapható rá.
* Az értékelés egy mindenki számára elérhető szempontok alapján történik.
* A beadandókat határidőre kell elkészíteni.
* A határidő leteltével a beadandó jegyéből a késés mértékének megfelelően vonunk le pontokat
* A beadandókat a webprogramozás szerverre kell feltölteni a [feltöltő felületen](http://webprogramozas.inf.elte.hu/ebr) keresztül. Más módon küldött beadandókat nem fogadunk el.
* A beadandók plágiumellenőrzésen mennek keresztül az esetleges másolásokat kiszűrendő.
* A beadandók készítőit szükség esetén megkérhetjük megoldásaik megvédésére.

### Az évfolyam ZH értékelése

* Az évfolyam ZH értékelése jeggyel történik 1-5 skálán.
* A megoldások plágiumellenőrzésen esnek át a ZH után. A gyanúsan hasonló megoldást adó hallgatókat megkérhetjük a ZH-ik megvédésére. A másolt ZH-k automatikusan 1-es osztályzatot kapnak.

### Jegyszerzés feltételei

* Részvétel a gyakorlatok legalább 75%-án (maximum 3 hiányzás)
* Két elfogadott beadandó
* Megírt évfolyam ZH

### Értékelés

* Évfolyam ZH jegye + a két beadandó értékelése
* A kettes érdemjegyhez legalább kettesre megírt évfolyam ZH szükséges

## Előadások

## Gyakorlatok

## Segédanyagok

### Elektronikus tananyag

* [Bevezetés a kliens- és szerveroldali webalkalmazások készítésébe (elektronikus tananyag)](http://webprogramozas.inf.elte.hu/tananyag/wf2/index.html)

### Példa beadandók és ZH-k

* [Példa JavaScript beadandó feladat](webfejl2/gyak/js_grafilogika.html)
* [Példa PHP beadandó feladat](webfejl2/gyak/php_grafilogika.html)
* [Példa évfolyam ZH (névjegy)](webfejl2/gyak/pelda_zh.html)
* [Példa évfolyam ZH (csillag)](webfejl2/gyak/pelda_zh2.html)

## Oktatók

### Előadó

Horváth Győző

### Gyakorlatvezetők

* Bende Imre
* Demsa Miklós
* Kereszti Krisztián
* Kereszti Zalán
* Horváth Győző
* Rakonczai Sándor
* [Visnovitz Márton](https://github.com/vimtaai/elte/tree/master/2017-18-2)
