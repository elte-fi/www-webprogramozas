# Webfejlesztés 2. (OTAK) 1. ZH - 2018.10.26. 16:00

## Tudnivalók

- A ZH időtartama 60 perc
- Bármilyen segédanyag használható, de **emberi segítség nem**
- A megoldás kinézete nem számít, csak a funkcionalitás
- A feladatokat - az egymásra épülő 2. és 3. feladat kivételével - nem szükséges sorrendben megoldani
- Pontozás: minden helyesen megoldott feladat +1 jegy
- Beadás: <http://webprogramozas.inf.elte.hu/ebr> &rarr; Feladatok &rarr; JavaScript ZH (tömörítve `zip` állományban)

## 1. feladat

Egészítsd ki az alábbi mintakódot úgy, hogy a háromszögön elhelyezett vezérlők (szög és átmérő) változására a másik két érték (két befogó) automatikusan frissüljenek! A háromszögben a szöget fokban lehessen megadni!


```html
<style>
  output { background: lightgray; }
  #task span { display: block; position: absolute; }
  #task span input, #task span output { border: solid black 1px; width: 50px; display: inline-block; height: 20px; position: absolute; }
  #task { position: relative; width: 1000px; height: 300px; }
  #a { left: 30px; top: 170px;}
  #b { left: 140px; top: 260px;}
  #c { left: 170px; top: 150px;}
  #x { left: 150px; top: 220px; color: white;}
  #triangle { width: 0; height: 0; position: absolute; top: 150px; left: 0; border: solid transparent 100px; border-top-color: black; transform: rotate(45deg)}
</style>
<div id="task">
  <div id="triangle"></div>
  <span id="x">α: <input></span>
  <span id="c">c: <input></span>
  <span id="a">a: <output></output></span>
  <span id="b">b: <output></output></span>
</div>
```

<style>
  output { background: lightgray; }
  #task span { display: block; position: absolute; }
  #task span input, #task span output { border: solid black 1px; width: 50px; display: inline-block; height: 20px; position: absolute; }
  #task { position: relative; width: 1000px; height: 300px; }
  #a { left: 30px; top: 170px;}
  #b { left: 140px; top: 260px;}
  #c { left: 170px; top: 150px;}
  #x { left: 150px; top: 220px; color: white;}
  #triangle { width: 0; height: 0; position: absolute; top: 150px; left: 0; border: solid transparent 100px; border-top-color: black; transform: rotate(45deg)}
</style>
<div id="task">
  <div id="triangle"></div>
  <span id="x">α: <input></span>
  <span id="c">c: <input></span>
  <span id="a">a: <output></output></span>
  <span id="b">b: <output></output></span>
</div>

_A feladat megjelenése_

**Segítség**: szöggel szemközti befogó: `átfogó × sin(szög)`; szög melletti befogó: `átfogó × cos(szög)`.


## 2. feladat

Készíts JavaScript programot, melyben az oldalon tetszőleges helyre kattintva az a síknegyed melyre kattintottunk piros színűvé változik!
Az oldalad összesen egy darab `div` elemet tartalmazhat (a JavaScript importáláson kívül). Megoldáshodhoz használhatsz CSS fájlt.

```html
<div></div>
```


## 3. feladat

Készíts egy tetszőleges, legalább 2 szintű felsoroláslistát! A felsoroláslista tartalmát - és a szükséges további tulajdonságokat - tárold memóriában! A lista HTML kódját JavaScript generálja! Oldd meg, hogy egy listaelemre kattintva az adott listaelemhez tartozó összes gyerek (beágyazott lista) eltűnjön vagy újra megjelenjen.

```html
<ul>
  <li>Elem 1</li>
  <li>Elem 2</li>
  <li>Elem 3
    <ul>
      <li>Elem 3.1</li>
      <li>Elem 3.2</li>
    </ul>
  </li>
  <li>Elem 4</li>
  <li>Elem 5
    <ul>
      <li>Elem 5.1</li>
    </ul>
  </li>
<ul>
```
_Példa többszintű listára_

Az elkészített listában minden listaelem mellett jelenjen meg egy gomb. Erre a gombra kattintva törlődjön az összes gyerekével együtt.
