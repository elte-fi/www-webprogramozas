<style>
main img.floated {
  float: left;
  width: 20%;
  margin: 10px;
}
ul {
    display: table;
}
div.table-container {
  display: flex; 
  flex-wrap: wrap; 
  justify-content: center;
  clear: both;
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

# Messengers -- Web programming JavaScript home project

<img src="assets/images/webprog/king.png" class="floated"> There is a Hungarian tale in which when a great king sneezes, everyone in his kingdom needs to wish him good health. However, the realization of this simple principle has led to serious problems. Its execution was entrusted to the main chamberlain. The main chamberlain had to think long and hard, because the messengers' routes had to be planned, so that leaving the designated castles the messengers had to reach their destinations without crossing or touching each other's route, and passing through the whole kingdom. Help the main chamberlain plan the messengers' route!

The kingdom can be represented by a square grid. It has a few special cells from which the messengers depart and arrive. The endpoints of each messenger's route are indicated by the same number. The messenger can start from any of its endpoint. The routes of the messengers must be planned in accordance with the following rules:

- Identical numbers must be connected by a continuous route.
- Routes can only run horizontally and vertically touching the center of the fields, and they can be turned 90 degrees at that point.
- Routes must not cross or divide.
- Routes cannot pass through numbered fields, but all white fields must be passed by a route.

<div class="table-container">
<table class="game">
    <caption>Before departure</caption>
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
    <caption>After arrival</caption>
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

## Tasks

- On the home screen first the difficulty needs to be chosen: easy, medium and hard.
- Choosing the difficulty, the appropriate task is displayed.
- Using the mouse you need to connect the same numbers according to the rules above.
  + In a numbered field, press the left mouse button (`mousedown`), and with keeping down, select the messenger's route (`mouseover` or `mouseenter`) following the rules.
  + Release the mouse button (`mousedown`) when you reach the same number, and then the line should be fixed.
  + If you release the mouse button not on the same number field, the line will be dropped.
  + If you went in the wrong direction with the line, you can undo the last steps by following the line backwards.
  + If you move to a wrong field (e.g. crossing another line or entering a wrong number field), the line will not be extended.
  + Pressing the right mouse button on an already fixed line, will delete the line.
- If all the messengers' route are in place and the whole kingdom is covered, the user wins and it should be written on the screen. You should then be able to go back to the home page and select a new game.
- Make it possible to save a game position on all three levels. If you already have such a game save, confirm if you really want to overwrite it. Later, you should be able to load an already saved position for that level.

## The three tasks

<div class="table-container">
<table class="game">
    <caption>Easy</caption>
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
    <caption>Medium</caption>
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
    <caption>Hard</caption>
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

## Technical help

There is no requirement as to what technology (table, divs or canvas) you should use to solve the task, and there will be no stone-cut requirements for appearance and exact operations. You can draw a line even by setting the background color of the field. If you like the solution on this page, check it out with the developer toolbar.

It is worthwhile to provide the task description in some data structure. Not only will this help you to display the three predefined paths, but it will also make it easier for submitting to the database when we will use PHP. The task description may look like this:

```js
[
  [1,2,3,0,0],
  [0,0,0,4,0],
  [0,4,2,0,0],
  [0,0,0,0,0],
  [0,0,1,3,0],
]
```

It is worth using the `mouseover` or` mouseenter` event when following the mouse track. For these events, the event object contains a [`relatedTarget` property](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget) which refers to the element from which the mouse came. This can be used as needed.

## Points

### Required (no grade without them)

- At least 1 task is displayed.
- The points can be connected in some way (e.g. by clicking), but clearly (e.g. with different colors or numbers).
- Checking the final state, announcing the win.
- The page should contain the following statements:

  ```txt
  <Name>
  <Neptun ID>
  <Subject & Assignment name>
  <Submission date>
  This solution was submitted and prepared by <Name, Neptun ID> for the <Assignment name> assignment of the <Course name> course. 
  I declare that this solution is my own work. 
  I have not copied or used third party solutions. 
  I have not passed my solution to my classmates, neither  made it public. 
  Students’ regulation of Eötvös Loránd University (ELTE Regulations Vol. II. 74/C. § ) states 
  that as long as a student presents another student’s work - or at least the significant part of it - as his/her own performance, 
  it will count as a disciplinary fault. 
  The most serious consequence of a disciplinary fault can be dismissal of the student from the University.
  ```

### Extras

- Difficulty can be chosen, the appropriate task is displayed. (1 point)
- By holding down the left mouse button and moving the mouse, the messenger's route can be defined. (2 points)
- The route can only start from a number field. (1 point)
- If we finish on the same number as the starting point, the line will be fixed. (1 point)
- If we do not finish on the same number as the starting point, the drawn line disappears. (1 point)
- The line can be drawn following the rules, it cannot cross another line or number field. (1 point)
- The line can be shortened by going backwards, so that the last steps can be undone. (2 points)
- When you right-click on a finished line, the line disappears. (1 point)
- A game position can be saved for each level. (1 point)
- It is checked and the overwrite is confirmed, if there is any saved track when saving. (1 point)
- The game position can be loaded for a given level. (1 point)
- No major bugs, no strange phenomena during playing (1 point)
- 1 week delay (-2 points)
- 2 weeks delay (-4 points)
- more than 2 weeks late (not accepted, no grade)

## Evaluation

- 0-6 points: -0,5
- 7-11 points: 0
- 12-14 points: +0,5

## Submission

Solutions must be submitted to the [evaluation system](http://webprogramozas.inf.elte.hu/ebr).

Deadline: 2019. november 10. midnight
