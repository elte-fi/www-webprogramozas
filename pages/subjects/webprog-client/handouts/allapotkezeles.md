# Állapotkezelés

Az első hook-ot talán jó lenne izoláltan minél kisebb programban megnézni. A [React doksi mintájára](https://reactjs.org/docs/hooks-overview.html#state-hook) készítsünk egy gombot, mely kiírja, hogy hányszor kattintottak eddig rá:

```jsx
import React, { useState } from "react";

const CounterButton = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount(count + 1);

  return <button onClick={handleClick}>{count}</button>;
};

export default CounterButton;
```

Ezt a gombot akár létrehozhatjuk a _track-list_ projektben és megjeleníthetjük az App komponensben.

A `useState` egy ún. hook. React könyvtárból importáljuk. Függvény komponensben hívjuk meg, lokális állapotot adunk a komponenshez. Az állapot a példánkban egy `number` érték, a kattintások száma. Egy ilyen `useState` hívással tetszőleges típusú állapotot kezelhetünk, lehet benne adatszerkezet is. Egy komponensben több `useState` hívás is lehet.

A hook hívásokat a komponensekben a legfelsőbb szinten kell elvégezni, nem szabad feltételben, ciklusban, beágyazott függvényben hívni. Ez a megkötés a hook-ok belső implementációjának módja miatt van. Én a függvény komponenseimet a hook hívásokkal szoktam kezdeni. Ha a _react-app_-ra épülő eslint konfigurációt használjuk, akkor a következő esetben:

```javascript
if (true) {
  const [count, setCount] = useState(0);
}
```

az alábbi hibával figyelmeztet is a linter:

> React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render.

A `useState` hívás paraméterben várja a kezdő értéket, egy kételemű tömbbel tér vissza. Első eleme a tárolt érték, ezt az értéket a React megőrzi a renderelések között, második eleme a függvény, mellyel frissíthetjük az értéket. Az első példában szereplő

```javascript
const [count, setCount] = useState(0);
```

kóddal ekvivalens:

```javascript
const state = useState(0);
const count = state[0];
const setCount = state[1];
```

A módosító függvénynek **paraméterben függvény is megadható**, melyben megkapja az aktuális értéket. Az alábbi függvény eggyel fogja megnövelni csak az értéket:

```javascript
const handleClick = () => {
  setCount(count + 1);
  setCount(count + 1);
};
```

Míg az alábbi kettővel növeli:

```javascript
const handleClick = () => {
  setCount(prevCount => prevCount + 1);
  setCount(prevCount => prevCount + 1);
};
```

**A tárolt értéket nem szabad közvetlenül módosítani.**

```javascript
const [todos, setTodos] = useState([{ text: "Learn Hooks" }]);

const addTodo = todoText => {
  // Rossz:
  // todos.push({ text: todoText });

  // Jó:
  setTodos([...todos, { text: todoText }]);
};
```

Az előbbi példában a rossznak jelölt kód két ok miatt is hibás:

1. A _setTodos_ függvényhívásból tudja a React, hogy változott az állapot, ez nélkül nem fog újrarenderelődni a komponens.
2. Az állapotot immutábilis módon kell módosítani. a _push_ metódus az eredeti tömböt módosítja (mutálja), a tárolt tömb referenciája ugyanaz marad. Helyette a jó megoldásban egy új tömböt hozunk létre, melybe bemásoljuk a régi tömb elemeit, és a végére helyezzük az új elemet. React világban sokszor támaszokodunk, illetve a használt eszközök támaszkodnak arra, hogy az adat akkor módosul, ha a referenciája változik. Ez egy optimalizáció. Egy másik példa immutábilis frissítésre:

   ```javascript
   const [todos, setTodos] = useState([
     { id: 0, text: "Learn Hooks" },
     { id: 1, text: "Wash the dishes" }
   ]);

   const updateTodo = (todoId, todoText) => {
     const newTodos = todos.map(todo => {
       if (todo.id !== todoId) return todo;
       return { ...todo, text: todoText };
     });
     setTodos(newTodos);
   };
   ```

   Az _updateTodo_ függvény a megadott azonosítójú elem szövegét frissíti. Itt a tömb és az adott todo objektum referenciája fog módosulni, a többi todo objektum referenciája a régi marad. A módosítás pedig úgy történik, hogy létrehozunk egy új objektumot, melybe az adott todo objektumból átmásolunk minden mezőt, és a _text_ mezőt felülírjuk.

A **hook-ok** függvények, melyekkel bele tudunk "akaszkodni" a React-ban tárolt állapotba és a React életciklusába. A `useState` mellett elérhetőek más beépített hook-ok is, illetve mi is készíthetünk sajátot. Nevezéktani konvenció, hogy nevüket _use_-zal kezdjük.

Nem mindent tekintünk **állapotnak**, ami elsőre annak tűnhet. Egy React alapú alkalmazásban a következő esetekben biztos nem állapotról van szó:

- nem változik meg idővel,
- más állapotból vagy prop-okból ki lehet számítani,
- nincs felhasználva renderelésre.

Az állapot kialakításánál a DRY (Don't Repeat Yourself), azaz ne ismételd magad elvet érdemes követni. Az alkalmazásállapot minimális reprezentációjának kialakítása a cél, és minden egyéb ebből vezethető le. A minimális reprezentációval elkerüljük a redundanciát, ami gyakori hibaforrás a szoftverfejlesztésben. Például, ha az állapot részét képezi a teljes ToDo lista, ne tároljuk el mellette a ToDo elemek számát is, hiszen az kiszámítható az előbbi adatból.

A React egyirányú adatfolyamon alapul. Ha valamilyen állapotot több komponens is használ, valamely szülő komponensben kell azt elhelyezni. A gyerek komponenseknek ezt az adatot prop-okban lehet leküldeni. Fonos, hogy a gyerek komponensek se módosítsák közvetlenül az állapotot, ugyanúgy prop-ban küldhetünk függvényt a módosításhoz. Az állapot ideális helyének megtalálása nehéz feladat tud lenni. Ha nem találunk ilyen komponenst, külön komponens is létrehozható csak az adott állapot kezelésére, nem muszáj, hogy rendereljen HTML-t.

**TODO**. Ezután mondjuk a track-list alkalmazásban megcsinálhatnánk, hogy az App komponensből kiemeljük a listázást egy TrackList komponensbe. Létrehoznánk egy komponenst egy űrlaphoz, melyben új számot lehet felvenni a listára. Lehetne két menüpont, egyik a listára, másik az űrlapra. Ezt először megcsinálhatnánk useState-tel, később átírhatnánk React Router-es megoldásra. Ezután jöhetne az űrlap lokális állapota, `<form>` elem, `<input>` elemek, események, adatkötés, az állapot a single source of truth, meg ilyesmi. Ezután ki lehetne emelni a listázott számok listáját mondjuk az App komponensbe állapotba, és propagálni, az űrlapos komponens kapna egy függvényt prop-ban, mellyel újat tud felvenni.

Irodalom:

- [React doksi: state-and-lifecycle](https://reactjs.org/docs/state-and-lifecycle.html) (itt osztály alapú komponensekről van szó)
- [React doksi: Hooks at a Glance](https://reactjs.org/docs/hooks-overview.html#state-hook)
- [React doksi: Using the State Hook](https://reactjs.org/docs/hooks-state.html)
- [Getting Closure on React Hooks](https://www.youtube.com/watch?v=KJP1E-Y-xyo) - videó a hook-ok megértéséhez
