# Rasztergrafika használata -- Flappy bird

Készíts egy Flappy bird jellegű játékot! Legyen egy madár, aminek a közeledő oszlopokon kell áthaladnia az oszlopok érintése nélkül. A madár lefele zuhan, de gombnyomásra felugrik egy kicsit!

A megoldáshoz a [böngészők rasztergrafikus megjelenítőjét, a **canvas**-t (rajzvászon)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) fogjuk használni!

## Előkészületek

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

## Alakzatok rajzolása

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

## Madár esése

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

## Billentyűleütésre ugrás

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

## Oszlopok

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

## Ütközésvizsgálat

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

## Vége jelzése

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

## Képek alkalmazása

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
