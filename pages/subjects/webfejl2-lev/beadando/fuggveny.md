# Függvényábrázolás -- Beadandó feladat -- Webfejlesztés 2. levelező tanári

Készíts olyan programot, amely függvényábrázolásra alkalmas, és amely el tudja menteni és később be tudja tölteni a függvényeket! Az alábbiakban a feladatot lépésekre bontom, érdemes ilyen sorrendben elvégezni őket! A JavaScriptes feladatokat külön mappába kérném elvégezni. Mivel egymásra épülnek, ezért mielőtt a következő feladatra lépsz, mentsd el egy külön mappába az akutális megoldást. A mappák nevei a feladat sorszámai legyenek! A változó paraméterszámmal nem kötelező megoldani, ezek plusz pontszámot jelentenek! A PHP-s feladatokat a webprogramozas.inf.elte.hu szerveren oldjátok meg, ha lehet.

Szeretném kérni, hogy önállóan dolgozzatok, egymásnak kódot ne, legfeljebb ötletet adjatok. Ha ilyen előfordul, akkor forduljatok olyasképpen a segítséget kérőhöz, mintha a diákotok lenne, akinek nem a megoldást mondjátok el, hanem segítséget adtok, hogy rátaláljon a megoldásra. De azért próbáljátok meg önállóan megoldani, és tőlem segítséget kérni.

Feltöltendő a Canvasre a JavaScriptes rész mappái, a PHP-s fájlok letöltve a szerverről, és egy `README.txt` fájlban a webprogramozas szerveren a megoldás linkje.

## Értékelés

Két jegy születik, egy a JavaScriptre és egy a PHP-ra. Mindkettőből 50 pont szerezhető (+ 10-10 a változó számú paraméterekre).
- 0-19: 1
- 20-26: 2
- 27-34: 3
- 35-41: 4
- 42-50: 5

Az egyik feladatrészben szereplő többlet pontok hozzáadódnak a másik feladatrészhez, ha ott önmagában legalább a kettes megvan.

## Érdemjegy

- Kapható, ha a beadandó be van adva
- 1-es, ha valamelyik 1-es
- egyébként a két jegy átlaga

## JavaScript

1. (5 pont) A függvényábrázoláshoz a böngésző `canvas` elemét fogjuk használni. A rajzoló kontextusnak mininális eszközkészletét használjuk ki, `moveTo` és `lineTo` metódusokat fogjuk főleg használni. Az első probléma, amivel meg kell birkóznunk, hogy van a canvasünknek egy koordináta-rendszere és mérete, és van egy koordináta-rendszer, amiben viszont a feladatot szeretnénk elvégezni. Nevezzük az elsőt a canvas koordináta-rendszernek (CKR), a másodikat feladat koordináta-rendszernek (FKR). Szükségünk lesz a két koordináta-rendszer közötti átjárásra.

    ```
    xCKR:   0      +--------------------->   xCKR: 400 (cw)
    xFKR: -10 (ax) +--------------------->   xFKR:  10 (bx)
          +----------------------------------------+
          |                                        | yCKR: 0        yFKR: 30 (by)
          |                                        |  
          |                                        |   +               ^
          |                                        |   |               |
          |                                        |   |               |
          |                                        |   |               |
          |                                        |   |               |
          |                                        |   |               |
          |                                        |   |               |
          |                                        |   |               |
          |                                        |   |               |
          |                                        |   |               |
          |                                        |   v               +
          |                                        |
          |                                        | yCKR: 300 (ch) yFKR: -30 (ay)
          +----------------------------------------+
    ```

    A fenti esetben van egy canvasünk, ami 400px széles (`cw`) és 300px magas (`ch`). De a feladatban azt szeretném, ha vízszintesen -10-től 10-ig ábrázolódna (`ax`-`bx`), függőlegesen pedig -30-tól 30-ig ábrázolódna a grafikon (`ay`-`by`).

    Készíts négy függvényt, ami egy adott x vagy y koordinátát egyik koordináta-rendszerből a másikba vált át.
    - `xCKRToxFKR = ax + xCKR * (bx - ax) / cw`
    - `xFKRToxCKR = (xFKR - ax) * cw / (bx - ax)`
    - `yCKRToyFKR = ay + (ch - yCKR) * (by - ay) / ch`
    - `yFKRToyCKR = ch - (yFKR - ay) * ch / (by - ay)`

    Próbáljátok ki a függvényeket! `console.log`-gal jelenítsétek meg, hogy jól számolnak-e:
    - CKR: 0,0  --> FKR: -10, 30
    - CKR: 400,300  --> FKR: 10, -30
    - FKR: -10, 30 --> CKR: 0,0  
    - FKR: 10, -30 --> 400,300
    - FKR: 0,0 --> CKR: 200, 150

2. (10 pont) Az előzőekben definiált függvények segítségével rajzold meg a koordináta-rendszer tengelyeit fekete vonalakkal:
    - FKR: (ax,0) --> (bx,0)
    - FKR: (0, ay) --> (0, by)

3. (15 pont) Ábrázoljunk egy beégetett függvényt: `3 * (x + 2) - 5`. Ez egy egyenes lesz. Adok egy keretet, ezt kell kiegészíteni, hogy rajzoljon:

    ```js
    function plot() {
      function f(x) {
        return 3 * (x + 2) - 5
      }
      console.log(f(0)) // 1

      // rajzolás
    }
    ```

    A rajzolás menete: indíts egy ciklust a canvas szélességében végig 0-tól cw-ig. És minden egyes canvasbeli x koordinátához (xCKR) határozd meg a canvasbeli y koordinátát (yCKR). Mivel azonban az `f(x)` függvény fKRB-ben számol, ezért először az xCKR-t át kell váltani xFKR-be, ezzel meghívni az `f(x)` függvényt, az visszaad egy yFKR-t, amit át kell váltani yCKR-be. Az így kapott (xCKR, yCKR) pontpárokat kell kirajzolni a canvas `lineTo` metódusával. Pl.:

    ```js
    ctx.strokeStyle = 'orange'
    ctx.beginPath()
    ctx.moveTo(10, 10)
    ctx.lineTo(11, 13)
    ctx.lineTo(12, 15)
    ctx.lineTo(13, 5)
    // ...
    ctx.stroke()
    ```

4. (3 pont) Ábrázoljuk egy fokkal nehezebb függvényt: `-4 + 10 * sin(x * 2)`. Matematikai függvények közül azokat használhatjuk és olyan formában, ahogy az a JavaScript [`Math`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) objektumában meg van adva. A `plot` függvény az alábbiak szerint változik. Ebben a `with` kulcsszó egy ritkán használatos (és általában tiltott) JavaScript elem, amely azt a célt szolgálja, hogy egy ismeretlen változó értékét megpróbálja a with-ben megadott objektum kontextusában feloldani. Pl. a mi esetünkben a `sin()` függvény nem létezik, de megpróbálja `Math.sin()`-ként is feloldani, és így már létezik.

    ```js
    function plot() {
      function f(x) {
        with (Math) {
          return -4 + 10 * sin(x * 2)
        }
      }
      console.log(f(0)) // -4

      // rajzolás
    }
    ```

5. (1 pont) Eddig egy függvény paraméterei az `x`-en kívül be voltak égetve. Most szeretnénk, ha ezeket meg tudnánk adni kívülről, hogy majd később a felületen tudjuk állítani az értékeiket. Vegyük az előző függvényt, és általánosítsuk így: `p1 + p2 * sin(x * p3)`. Ekkor a `plot` függvény így néz ki. Ebben a paramétereket is objektumként adjuk át, amelyet ugyanúgy a `with` segítségével oldunk fel.

    ```js
    function plot() {
      function f(x, parameters) {
        with (parameters) {
          with (Math) {
            return p1 + p2 * sin(x * p3)
          }
        }
      }

      const parameters = {
        p1: -4,
        p2: 10,
        p3: 2,
      }
      console.log(f(0, parameters)) // -4

      // rajzolás
    }
    ```

6. (1 pont) Eddig a függvény képlete be volt égetve az `f()` függvénybe. Jó lenne, ha ez is tetszőleges lehetne, azaz szövegként tudnánk megadni. Dinamikusan kell előállítani az `f()` függvényt. Ezt a következőképpen lehet:

    ```js
    function plot() {
      const fn = `p1 + p2 * sin(x * p3)`

      const f = new Function('x', 'parameters', `
        with (parameters) {
          with (Math) {
            return ${fn}
          }
        }
      `)

      const parameters = {
        p1: -4,
        p2: 10,
        p3: 2,
      }
      console.log(f(0, parameters)) // -4

      // rajzolás
    }
    ```

7. (10 pont) Eddig az adatok (függvény, paraméterek, koordináta-rendszer méretei) be voltak égetve a kódba. Most a canvas mellé vegyél fel űrlapmezőket, amelyekben ezeket az adatokat be tudod kérni a felhasználótól:
    - `ax`: szám
    - `bx`: szám
    - `ay`: szám
    - `by`: szám
    - `f`: szöveg
    - `p1`: szám
    - `p2`: szám
    - `p3`: szám

    Legyen egy gomb a felületen, amelyre kattintva meghívódik a `plot` függvény és a megadott adatokkal megtörténik a rajzolás.

8. (5 pont) Oldd meg, hogy minden mező változtatásakor a `plot` függvény automatikusan meghívódjon (`input` esemény). Próbáld meg egy eseménykezelővel megoldani!

9. (10 pont) Eddig a paraméterek száma fix volt (3). Tedd ezt is általánossá. Egyrészt a felületen legyen lehetőség a paraméterek számát megadni a mezőben, és ennek megfelelő számú beviteli mezőt írni ki az oldalra. A `plot` függvényen belül a `parameters` objektum feltölthető ciklussal, ehhez egy kis segítség:

    ```js
    const parameters = {}
    parameters.p1 = -4
    parameters.p2 = 10
    parameters.p3 = -2
    // Ami így is írható
    parameters['p1'] = -4
    // Vagy akár így is
    parameters['p' + 1] = -4
    // És akár az 1-es helyén egy ciklusváltozó is állhat...
    ```

## PHP

10. (5 pont) Jó lenne elmenteni az így megadott függvényeinket. Ezért most áttérünk PHP oldalra. Adatbázisban vegyél fel egy `fuggvenyek` nevű táblát a következő mezőkkel. Ebben a táblában felkészülünk arra, hogy fix számú (három) paramétert elmentsünk, de rugalmas paraméterszámra is felkészülünk.
    - `ax`: INT
    - `bx`: INT
    - `ay`: INT
    - `by`: INT
    - `f`: VARCHAR(200)
    - `p1`: INT, lehet NULL
    - `p2`: INT, lehet NULL
    - `p3`: INT, lehet NULL
    - `pszam`: INT (paraméterek száma), lehet NULL
    - `parameters`: VARCHAR(200), lehet NULL

11. (10 pont) Az eddig HTML oldalunkat nevezzük át `uj.php`-ra. Az eddigi mezőket rakjuk `form` elembe, és legyen benne egy mentés gomb. A kötelező mezőket (amik nem lehetnek NULL-ak) és a számokat tartalmazó mezőket ellenőrizzük szerveroldalon. Ha hiba van, akkor írjuk ki listaként. Ha nincs hiba, akkor az adatokat mentsük el a `fuggvenyek` táblába.

    (5 pont) Technikai segítség a változó paraméterszámú mentéshez: vegyél fel egy rejtett mezőt (`<input type="hidden">`). A form elküldésekor (`submit` esemény) gyűjtsd össze a paramétereket egy objektumba, ahogy azt a `plot` függvénynél is tennéd, majd ezt sorosítsd le a `JSON.stringify(parameters)` utasítással. Ez egy szöveg lesz, amit írj be a rejtett mező értékeként. Így ezt is elküldi a form.

12. (5 pont) Készítsünk egy listázó oldalt, ahol az eddigi függvényeket kilistázhatjuk (`index.php`). 

13. (10 pont) A listázó oldalon egy függvényre kattintva bejön az adott függvény szerkesztő oldala, a mezők feltöltve a mentett értékkel. Ez az oldal gyakorlatilag az `uj.php` oldala, ami GET paraméterként megkapja a függvény `id`-ját: `uj.php?id=3`. Ha jelen van ez a GET paraméter, akkor be kell tölteni adatbázisból az adatokat, ha nincs, akkor üresen jelennek meg a mezők. A megtekintés elég, módosító mentés nem kell.

    (5 pont) Technikai segítség a változó paraméterszámú betöltéshez: a rejtett mezőbe írd bele a `parameters` oszlop értékét. Onnan `JSON.parse(szöveg)` utasítással tudod előállítani a `parameters` objektumodat, amiből az értékeket aztán beírhatsz a megfelelő felületi elemekbe.

14. (10 pont) A listázó oldalon legyen egy link minden függvény mellett, amelyre kattintva törölhető az adott függvény. Ez egy `torol.php?id=3` oldalra mutat, ahol az adott `id`-jú függvényt töröljük, majd átirányítással újra a listaoldalon leszünk.

15. (10 pont) Az alkalmazást egészítsük ki regisztrálással, bejelentkezéssel, kilépéssel, és azzal, hogy minden felhasználó csak a saját függvényeit listázhassa. (Nyugodtan lehet a gyakorlatbeli kódrészleteket használni.)
