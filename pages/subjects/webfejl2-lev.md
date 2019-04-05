# Webfejlesztés 2. (PTI)

## Előadások

1. 2019.02.28. [Javascript, felületi elemek programozása, eseménykezelés, kódszervezés](http://webprogramozas.inf.elte.hu/webfejl2tl/ea/01/)

## 1. gyakorlat

1. Decemberben N napon át megmértük a déli hőmérsékletet.

    1. Határozzuk meg az átlaghőmérsékletet!
    2. Döntsük el, hogy emelkedett-e a hőmérséklet 10 fok fölé a mért intervallumban!
    3. Határozzuk meg, melyik nap volt a leghidegebb! Írjuk ki a nap nevét is, ha tudjuk, hogy a méréseket hétfőn kezdtük!
    4. Hány olyan nap volt, amikor fagyott délben.
    5. Keressünk egy olyan napot, amelyen mért hőmérséklet egy előre megadott intervallumba esik!
    6. Állapítsuk meg, hogy szigorúan monoton növekedő-e a sorozat!
    7. Keressünk egy olyan napot, amelyen mért hőmérséklet ugyanakkora, mint valamelyik szomszédja!
    8. Hány olyan volt, hogy adott elem kisebb a két szomszédjánál (lokális minimum).

2. Az ország néhány helységében madármegfigyelést végeztünk. Mindegyikben megadtuk, hogy milyen fajú madárból hányat láttunk.

    Készíts programot, amely megad egy olyan helységet, ahol egyetlen madarat sem láttunk!

3. Írj egy kör kerületét kiszámoló programot!

4. Készíts egy szókitalálós akasztófa játékot!

5. Adott egy könyvtári nyilvántartás. Egy könyvről a következő adatokat tároljuk:

    - szerző
    - cím
    - kiadás éve
    - kiadó
    - ISBN szám

    1. Felületen kérj be egy évszámot, és listázd ki az abban az évben megjelent könyvcímeket!

    2. Készíts egy legördülő mezőt, amelyben az egyes kiadók vannak felsorolva. Egy gombra kattintva táblázatos formában jelenítsd meg a kiválasztott kiadóhoz tartozó könyveket!

    3. Egy beviteli mezőben gépelve folyamatosan frissíts egy listát, melyben azok a szerzők jelennek meg, kiknek neve tartalmazza a beviteli mezőbe beírt szövegrészletet!


## 2. gyakorlat

1. Készíts egy diákokat listázó oldalt. Egy szöveges beviteli mezőbe gépelve lehessen szűrni a diákokat! A diákoknál legyen lehetőség jegybeírásra is, ugyancsak egy szöveges beviteli mezőben!

2. Készíts egy kincskereső alkalmazást! Jelenjen meg egy táblázat, amelynek valamelyik koordinátáján található a kincs. Egyes cellákra kattintva döntsük el, hogy ott van-e a kincs vagy sem. Legyen lehetőség a táblázat méreteit a felületen megadni!


## 3. gyakorlat

Készíts egy Flappy bird jellegű játékot! Legyen egy madár, aminek a közeledő oszlopokon kell áthaladnia az oszlopok érintése nélkül. A madár lefele zuhan, de gombnyomásra felugrik egy kicsit!

A megoldáshoz a [böngészők rasztergrafikus megjelenítőjét, a **canvas**-t (rajzvászon)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) fogjuk használni!

### Előkészületek

HTML-ben csupán egy `<canvas>` elemre és a JavaScriptet behúzó `<script>` elemre lesz szükség:

```html
<!-- index.html -->
<canvas width="600" height="400"></canvas>
<script src="index.js"></script>
```

JavaScript oldalon globális változókba felvesszük a rajzoláshoz szükséges változókat. Rajzolni a `ctx` változón keresztül tudunk majd:

```js
// index.js
const canvas = document.querySelector('#jatek');
const ctx = canvas.getContext('2d');
```

### Alakzatok rajzolása

Egy `draw` függvényben fogunk alap alakzatokat kirajzolni a program indulásakor:

```js
// Start
draw()

function draw() {

}
```

Az egyetlen alapelem, a téglalap, kitöltve (`fillRect`) vagy kitöltetlen (`strokeRect`):

```js
ctx.fillStyle = "red"
ctx.fillRect(10, 10, 20, 50)
```

A többi alakzatot egy vagy több [útvonal](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#Paths) kombinálásával lehet megadni:

```js
ctx.beginPath()
ctx.moveTo(20,30)
ctx.lineTo(50,60)
// ctx.arc
// ctx.rect
// ctx.ellipse
ctx.closePath()
ctx.stroke()
```

Feladatok

1. Fessük a rajzvászon hátterét kékre! (rajzoljunk egy kék téglalapot teljes szélességben (`canvas.width`) és magassá
gban (`canvas.height`))

2. Rajzoljuk ki a madarat egy barna téglalapként, függőlegesen középre, balról 50px-re.

Ez utóbbi feladathoz vegyünk fel egy objektumot, amiben a madár adatait tároljuk:

- hol van (`x`, `y`)
- milyen széles, magas (`szelesseg`, `magassag`)

```js
const madar = {
    x: 50,
    y: canvas.height / 2,
    szelesseg: 30,
    magassag: 50
}
```

### Madár esése

A madár eséséhez mozgatni kell a téglalapot. Ezt úgy szoktuk megoldani, hogy mindig (`jatekciklus`) újra- és újrarajzoljuk (`draw`) a vásznat, közben az állapotteret módosítjuk (`update`).

```js
// Start
gameloop();

// Játékciklus
function jatekciklus() {
    requestAnimationFrame(jatekciklus);

    update(dt);
    draw();
}
function update(dt) {
    // Állapottér módosítása
}
function draw() {
    // Kirajzolás
}
```

Kell számolni a két hívás között eltelt időt:

```js
// Állapottér = adatok
let elozoIdo = 0;

function jatekciklus(most = 0) {
    requestAnimationFrame(jatekciklus);
    const dt = most - elozoIdo
    elozoIdo = most

    update(dt);
    draw();
}
```

A madárnak sebességet (`vy`) és gyorsulást (`ay`) vezetünk be.
Kinematikai számolással módosítjuk a madár helyét:

```js
const madar = {
    x: 50,
    y: canvas.height / 2,
    szelesseg: 30,
    magassag: 50,
    vy: 0,   // px/s
    ay: 250,    // px/s^2
}

function update(dt) {
    // Madár mozog
    madar.vy += madar.ay * dt / 1000;
    madar.y += madar.vy * dt / 1000;
}
```

### Billentyűleütésre ugrás

A `document`-hez érkező `keydown` eseményeket fogjuk figyelni, és adunk a madárnak egy kezdősebességet felfelé:

```js
// Eseménykezelő
document.addEventListener('keydown', onKeyDown);
function onKeyDown(e) {
    if (e.key === ' ') {
        madar.vy = -200;
    }
}
```

### Oszlopok

Oszlopok tárolása egy tömbben lesz, mivel több oszlop lesz. Bevezetünk pár állandót is

```js
const oszlopok = []
const RES = 150;    // px
const OSZLOP_TAVOLSAG = 300;  // px
const OSZLOP_SEBESSEG = -200;  // px
```

Oszloppár hozzáadása:

```js
function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}
function ujOszlop() {
    const h = random(10, canvas.height / 2);
    oszlopok.push(
        {
            x: canvas.width,
            y: 0,
            width: 30,
            height: h,
        },
        {
            x: canvas.width,
            y: h + RES,
            width: 30,
            height: canvas.height - RES - h,
        },
    );
}
// Start
ujOszlop()
```

Oszlopok kirajzolása

```js
function draw() {
    // Oszlopok
    ctx.fillStyle = 'white';
    oszlopok.forEach(oszlop => {
        ctx.fillRect(oszlop.x, oszlop.y, oszlop.szelesseg, oszlop.magassag);
    });
}
```

Új oszloppár megjelenése

```js
function update(dt) {
    // Oszloppár hozzáadása
    // Ha az utolsó oszlop a canvas jobb szélétől OSZLOP_TAVOLSAG-ra eltávolodott,
    // akkor új oszlop hozzáadása
}
```

Oszlopok mozgatása

```js
function update(dt) {
    // Oszlopok mozgatása
    oszlopok.forEach(oszlop => {
        // oszlop mozgatása OSZLOP_SEBESSEG-gel
    });
}
```

Oszlopok törlése

```js
function update(dt) {
    // Oszlopok törlése
    // Ha több mint 20 oszlop van, akkor vedd ki az első kettőt ( tömb.shift() )
}
```

### Ütközésvizsgálat

Segédfüggvény:

```js
function utkozikE(a, b) {
    return !(
        b.y + b.magassag  < a.y ||
        a.x + a.szelesseg < b.x ||
        a.y + a.magassag  < b.y ||
        b.x + b.szelesseg < a.x
    );
}
```

Ütközés vizsgálata az oszlopok mozgatásakor:

```js
function update(dt) {
    // Oszlopok mozgatása
    oszlopok.forEach(oszlop => {
        // oszlop mozgatása OSZLOP_SEBESSEG-gel
        // Ha ütközik az oszlop és a madár, akkor vége
    });
}
```

### Vége jelzése

Állapottér és módosítása ütközésnél:

```js
let vege = false
```

Vége kirajzolása

```js
function draw() {
    // Vége
    if (vege) {
        ctx.fillStyle = 'red';
        ctx.font = '100px serif';
        ctx.fillText('Vége', 10, 50);
    }
}
```

Animáció leállítása

```js
function jatekciklus(now = 0) {
    if (!vege) requestAnimationFrame(jatekciklus);
}
```

### Képek alkalmazása

Képek gyűjteménye és betöltése:

```js
const kepek = {
    madar: new Image(),
    hatter: new Image(),
    oszlop: new Image(),
};

// Start
kepek.madar.src = 'bird.png';
kepek.hatter.src = 'bird.png';
kepek.oszlop.src = 'bird.png';
```

Képek kirajzolása

```js
ctx.fillRect(madar.x, madar.y, madar.szelesseg, madar.magassag);
// HELYETTE
ctx.drawImage(images.madar, madar.x, madar.y, madar.szelesseg, madar.magassag);
```


## Elektronikus tananyagok

* [A böngésző mint alkalmazásfejlesztési platform (elektronikus tananyag)](http://webprogramozas.inf.elte.hu/tananyag/kliens/)
* [Dinamikus weboldalak előállítása szerveroldali technológiákkal (elektronikus tananyag)](http://webprogramozas.inf.elte.hu/tananyag/szerver/)

## Oktatók

### Előadó

Horváth Győző

### Gyakorlatvezető

* Horváth Győző
