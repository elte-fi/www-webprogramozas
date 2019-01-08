# Webfejlesztés 2. (OTAK) 1. ZH javító - 2019.01.08. 10:00

## Tudnivalók

- A ZH időtartama 90 perc
- Bármilyen segédanyag használható, de **emberi segítség nem**
- A megoldás kinézete nem számít, csak a funkcionalitás

## 1. feladat

Készíts színválasztó eszközt! Az oldalon egy szín beviteli mező segítségével legyen lehetőség egy színt kiválasztani! Egy gombra kattintva a beviteli mező mellett jelenjen meg a bevitt szín hexadecimális és RGB formában is.

```html
<input type="color">
<button>Átvált</button>
<output id="hex"></output>
<output id="rgb"></output>
```
*A számoló űrlap felépítése*

**Segítség**: Az `input[type=color]` beviteli mező értéke egy hexadecimális színkód.

```js
function convertColor(color) {
  if(color.substring(0,1) == '#') {
     color = color.substring(1);
   }

  var rgb = {};

  rgb.r = parseInt(color.substring(0,2), 16);
  rgb.g = parseInt(color.substring(2,4), 16);
  rgb.b = parseInt(color.substring(4), 16);

  return rgb;
}
```
*Segédfüggvény a hexadecimális forma R, G és B komponensekre bontásához*

## 2. feladat

Készíts egy 3×3-as táblázatot! A táblázat tartalmát - és a szükséges további tulajdonságokat - tárold az állapotban! **A táblázat HTML kódját JavaScript generálja!** Készíts a táblázat mellett egy szám beviteli mezőt! A beviteli mezőbe egy számot beírva, a beviteli mező változására reagálva (`change` esemény) a táblázatban a beírt számnál nagyobb értékek zöld, a nála kisebb értékek piros színnel jelenjenek meg! Az értékek színezéséhez használhatod a példában szereplő CSS osztályokat!

```html
<style>
  .nagyobb { color: green; }
  .kisebb { color: red; }
</style>
<input type="number">
<table>
  <tr><td>12</td><td>14</td><td>4</td></tr>
  <tr><td>5<td><td>7</td><td>12</td></tr>
  <tr><td>72</td><td>1</td><td>50</td></tr>
</table>
```
*Példa a generált táblázatra és a hozzá tartozó beviteli mezőre*

## 3. feladat

A táblázat egy cellájára kattintva legyen lehetőség szerkeszteni az adott elemet! A cellára kattintva jelenjen meg egy szám beviteli mező a cellában! A beviteli mező kezdőértéke legyen a cella eredeti tartalma! Az enter gomb lenyomására az állapotban frissüljön a tárolt érték, tűnjön el a beviteli mező és a táblázat már a módosított értékkel jelenjen meg! Ilyen módon egyszerre csak egy cellát lehessen szerkeszteni!
