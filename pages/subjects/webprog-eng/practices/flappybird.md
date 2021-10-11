# Flappy bird -- Using raster graphics

Create a flappy bird-like game! A bird has to fly through passage of columns without touching them. The bird only moves in vertical directions, accelerating downwards by the gravity and jumping up on keypress!

To solve the problem we will use the [canvas API]((https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)) that is the raster graphics engine of the browser.

## Preparations

In HTML only a `<canvas>` element and a `<script>` tag will be required

```html
<!-- index.html -->
<canvas width="600" height="400" id="game"></canvas>
<script src="index.js"></script>
```

JavaScript oldalon globális változókba felvesszük a rajzoláshoz szükséges változókat. Rajzolni a `ctx` változón keresztül tudunk majd:
In the JavaScript file we prepare the global variables for drawing. We can draw with the `ctx` variable:

```js
// index.js
const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
```

## Drawing shapes

We will draw basic shapes in a `draw` function on startup:

```js
// Start
draw()

function draw() {

}
```

The only basic shape we will use is the rectangle, filled (`fillRect`) or outlined (`strokeRect`):

```js
ctx.fillStyle = "red"
ctx.fillRect(10, 10, 20, 50)
```

Other shapes can be drawn by combining one or more paths:

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

## The background

Paint the background of the canvas to blue! (draw a blue rectangle in canvas width (`canvas.width`) and height (`canvas.height`))

## The bird

Draw the bird as a brwon rectangle, vertically centered, and 50px from the left side.

For this create an object in which the bird data is stored:

- position (`x`, `y`)
- width and height (`width`, `height`)

```js
const bird = {
    x: 50,
    y: canvas.height / 2,
    width: 30,
    height: 50
}
```

## Bird fall

For making the bird fall we have to move the rectangle. We solve this problem by redrawing the canvas (`draw`) always (`gameLoop`), while modifying the application state (`update`). We have to keep track of the elapsed time:

```js
// State = data
let prevTime = performance.now();

function gameLoop(now = performance.now()) {
    const dt = (now - prevTime) / 1000;
    prevTime = now;

    update(dt);
    draw();

    requestAnimationFrame(gameLoop);
}
function update(dt) {
    // Updating application state
}
function draw() {
    // Drawing
}

// Start
gameLoop();
```

Introduce a velocity (`vy`) and an acceleration (`ay`) for the bird.
Modify the position of the bird with the help of the kinematic laws of the motion:

```js
const bird = {
    x: 50,
    y: canvas.height / 2,
    width: 30,
    height: 50,
    vy: 0,   // px/s
    ay: 250,    // px/s^2
}

function update(dt) {
    // Bird moves
    // Changing velocity: da = v * dt
    // Changing position: ds = v * dt
}
```

## Jump on keypress

We will listen to the `keydown` events on `document` level, and will give an upwards initial velocity for the bird on keypress (let `vy` be `-200`).


Next, solve the problem that the bird can not leave the game area upwards.

The bird can not leave the game area downwards.

## Columns

The columns will be **stored** in an array, as we will have a lot of columns. We introduce some constants as well:

```js
const columns = []
const GAP = 150;    // px, the gap between the upper and lower column
const COLUMN_DISTANCE = 300;  // px, distance between consecutive columns
const COLUMN_VELOCITY = -200;  // px, horizontal speed of columns
```

We add new columns in pairs: upper and lower column. **Add new column pair**:

```js
function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}
function newColumn() {
    const h = random(10, canvas.height / 2);
    columns.push(
        {
            x: canvas.width,
            y: 0,
            width: 30,
            height: h,
        },
        {
            x: canvas.width,
            y: h + GAP,
            width: 30,
            height: canvas.height - GAP - h,
        },
    );
}
// Start
newColumn()
```

We draw the columns as white rectangles. **Drawing columns**:

```js
function draw() {
    // columns
    ctx.fillStyle = 'white';
    columns.forEach(column => {
        // draw a white rectangle for a column
    });
}
```

Introducing **new pair of columns**:

```js
function update(dt) {
    // ...

    // Add a pair of columns
    // If the last column moved from the right edge of canvas to COLUMN_DISTANCE,
    // then add a new pair of column
}
```

**Moving columns**:

```js
function update(dt) {
    // ...

    // moving columns
    columns.forEach(column => {
        // moving a column with COLUMN_VELOCITY
    });
}
```

**Removing columns**:

```js
function update(dt) {
    // removing columns
    // If the column on the beginning of the array has left the canvas, remove the first two columns (array.shift())
}
```

## Collision detection

Helper function:

```js
function isCollide(a, b) {
    return !(
        b.y + b.height  < a.y ||
        a.x + a.width < b.x ||
        a.y + a.height  < b.y ||
        b.x + b.width < a.x
    );
}
```

Collision detection when moving columns:

```js
function update(dt) {
    // moving columns
    columns.forEach(column => {
        // moving column with COLUMN_VELOCITY
        // If the column and the bird collides, then the game is over
    });
}
```

## The end

Application state:

```js
let isEnd = false
```

**Drawing**

```js
function draw() {
    // ...

    // The end
    if (isEnd) {
        ctx.fillStyle = 'red';
        ctx.font = '100px serif';
        ctx.fillText('Game over', 10, 50);
    }
}
```

**Stopping animation**

```js
function gameLoop(now = 0) {
    if (!isEnd) requestAnimationFrame(gameLoop);
}
```

**Bird fall**: Let the game end even if the bird falls out of canvas!

## Using images

**Image collection and loading** ([example](assets/images/webprog/flappybird/images.zip)):

```js
const images = {
    bird: new Image(),
    background: new Image(),
    column: new Image(),
};

// Start
images.bird.src = 'bird.png';
images.background.src = 'bg.png';
images.column.src = 'column.png';
```

**Drawing images**

```js
ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
// INSTEAD
ctx.drawImage(images.bird, bird.x, bird.y, bird.width, bird.height);
```

## Score

On column removal increase a counter by 1. Draw the points in the game!
