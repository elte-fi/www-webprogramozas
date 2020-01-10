# Webfejlesztés 2. (OTAK) Javító ZH - 2020.01.10. 10:00

## Tudnivalók

- A ZH időtartama 90 perc
- Bármilyen segédanyag használható, de **emberi segítség nem**
- A megoldás kinézete nem számít, csak a funkcionalitás
- Beadás: <http://webprogramozas.inf.elte.hu/ebr> &rarr; Feladatok &rarr; Javító ZH (JavaScript) (tömörítve `zip` állományban)

## 1. feladat: Karakterek száma

Adott egy szövegmező, melybe tetszőleges szöveg írható. A szövegmező mögötti gombra kattintva számold meg, hogy az egyes karakterekből hány darab található a szövegmezőbe írt szövegben! Az eredményt JSON formátumban jelenítsd meg 

- A kiírásnál a betűk sorrendje nem számít
- Amelyik betűből 0 db van, azt nem (feltétlenül) kell kiírni
- A kis és a nagy betűk között ne tegyen különbséget a program
- Az eredményben csak a betűk szerepeljenek, egyéb karakterek (szóköz, írásjelek, stb.) ne szerepeljenek a kimenetben

#### Segítség

- A darabszámokat érdemes egy erre alkalmas adatszerkezetben gyűjteni
- Az eredményt "olvasható" formátumra tudod hozni a `JSON.stringify` függvénnyel
- A betűkre való szűrést érdemes reguláris kifejezéssel (string-re alkalmazott `.match` metódus) megoldani

#### Az oldal HTML kódja:

```html
<article id="task-1">
  <input 
    type="text" 
    size="50"
    value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quae non ab consequuntur praesentium nam recusandae? Inventore aliquid saepe deleniti dolore vitae placeat, similique numquam minima quia eos laboriosam tempore."
  >
  <button>Számol</button>
  <pre></pre>
</article>
```

## 2. feladat: Képnézegető

Adott egy `thumbnails` azonosítójú `div` elem, melyben képek szerepelnek kis (100px×100px) méretben. Ezek közül a képek közül bármelyikre rákattintunk, akkor jelenjen meg a kép nagyobb méretben (500px×300px) a felette lévő `large` azonosítójú `figure` elemben.

#### Segítség

- A képek URL-je az alábbi módon épül fel: `https://picsum.photos/id/[kép azonosító]/[szélesség]/[magasság]`

#### Az oldal HTML kódja:

```html
<article id="task-2">
  <figure id="large">
    <img src="https://picsum.photos/id/200/500/300">
  </figure>
  <br>
  <div id="thumbnails">
    <img src="https://picsum.photos/id/200/100/100" alt="Random">
    <img src="https://picsum.photos/id/211/100/100" alt="Random">
    <img src="https://picsum.photos/id/222/100/100" alt="Random">
    <img src="https://picsum.photos/id/233/100/100" alt="Random">
    <img src="https://picsum.photos/id/244/100/100" alt="Random">
    <img src="https://picsum.photos/id/255/100/100" alt="Random">
    <img src="https://picsum.photos/id/266/100/100" alt="Random">
    <img src="https://picsum.photos/id/277/100/100" alt="Random">
    <img src="https://picsum.photos/id/288/100/100" alt="Random">
    <img src="https://picsum.photos/id/299/100/100" alt="Random">
  </div>
</article>
```

## 3. feladat: Rajzolóprogram

Adott egy `canvas` HTML elem. Feladatod egy egyszerű rajzoló program készítése. Az egérgombot lenyomva el tudunk kezdeni húzni egy 10px vastag fekete vonalat, melyet az egérgomb felengedéséig húz a program.

#### Segítség

- Érdemes egy változóban eltárolni, hogy éppen le van-e nyomva az egérgomb
- Érdemes eltárolni az egér előző pozícióját, hogy gyors egérmozgás esetén is folytonos vonalat kapj

#### Az oldal HTML kódja:

```html
<article id="task-3">
  <style>
    canvas { border: solid thin black; }
  </style>
  <figure>
    <canvas width="500" height="300"></canvas>
  </figure>
</article>
```