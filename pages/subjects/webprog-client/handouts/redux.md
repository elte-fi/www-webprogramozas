# Redux

Ha nagyra nő az alkalmazás, érdemes lehet a React komponensekből kiszervezni az állapotkezelést, elvégre a React csak egy nézet réteget megvalósító könyvtár. A legelterjedtebb JavaScript állapotkezelő könyvtár a Redux.

Ha használni szeretnénk a React alkalmazásunkban az alábbi paranccsal tudjuk telepíteni:

```bash
npm install redux react-redux
```

A _react-redux_ könyvtár segíti a Redux React-hoz való kapcsolását.

A Redux egyirányú adatfolyamon alapul, szemléltető ábra:

![](https://raw.githubusercontent.com/urunium/Urunium.Redux/master/resources/redux.gif)

Példakód a Redux használatára:

```jsx
import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";

// Action type:
const INCREMENT = "INCREMENT";

// 7) Action creator:
const increaseCounter = (x) => ({
  type: INCREMENT,
  payload: x,
});

// 6) Initial state for a reducer
const initialState = 0;

// 4) reducer
const counterReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === INCREMENT) {
    return state + payload;
  }

  return state; // 5)
};

// 3) root reducer
const rootReducer = combineReducers({ counter: counterReducer });

// 8) selector
const getCounter = (state) => state.counter;

// 2) Redux store
const store = createStore(rootReducer);

// Component which uses Redux state
const Button = () => {
  const counter = useSelector(getCounter);
  const dispatch = useDispatch();
  const handleClick = () => dispatch(increaseCounter(1));

  return <button onClick={handleClick}>Clicked {counter} times</button>;
};

// 1) Conection React and Redux
const App = () => (
  <Provider store={store}>
    <Button />
  </Provider>
);
```

A Redux-ot a `Provider` komponens (1) illeszti be a React fába Context segítségével, így minden leszármazottban előrhető lesz. Jellemzően egy alkalmazásban csak egy Redux példányt használunk, mely minden globális állapotot kezel.

A Redux példányunkat a `createStore` függvénnyel hozzuk létre (2). Első paraméterben megkap egy ún. reducer függvényt. Második opcionális paraméterben egy előre elkészített kezdőállapot adható át. Harmadik paraméterben middleware függvények adhatóak át. Szignatúrája a következő:<br />
`createStore(reducer, [preloadedState], [enhancer])`

A Redux által kezelt állapot egy darab JSON objektum. A Redux-nak egy reducer függvényt adunk át, mely kezeli az állapotunkat, viszont ezt érdemes tovább bontani. A részekre bontásra különböző megoldások lehetségesek. A Redux könyvtár biztosít egyet a `combineReducers` függvénnyel (3). Ez a függvény egy objektumot vár paraméterként, melyben az értékek reducer függvények és visszatér egy darab reducer függvénnyel. A függvény meghívásával kapott állapot egy objektum lesz, melyben levő kulcsok a paraméterként kapott objektum kulcsai, értékek az egyes reducer függvények által előállított értékek. Így minden reducer függény az állapot egy szeletéért fele.

```javascript
rootReducer = combineReducers({potato: potatoReducer, tomato: tomatoReducer})
// This would produce the following state object
{
  potato: {
    // ... potatoes, and other state managed by the potatoReducer ...
  },
  tomato: {
    // ... tomatoes, and other state managed by the tomatoReducer, maybe some nice sauce? ...
  }
}
```

A reducer függvények (4) tiszta függvények, tehát nem hajtanak végre mellékhatást, csak a paraméterekből előáálítják a visszatérési értéket. Szignatúrájuk a következő:<br />
`(state, action) => state`<br />
Megkapják a régi állapotot és egy ún. action objektumot, és ezekből állítják elő az új állapotot. `combineReducers` esetén minden akció kiváltódásakor az összes reducer függvény meghívódik, első paraméterben az általuk kezelt állapotszeletet kapják, második paraméterben ezt az akció objektumot. Ha olyan akció váltódott ki, amit nem kezel az adott reducer függvény, akkor vissza kell térni a régi állapottal (5). Első alkalommal a reducer paraméter nélkül hívódik meg (a `state` paraméter értéke `undefined`), ilyenkor vissza kell térni a kezdőállapottal (6).

Redux nem tesz elérhetővé kifele műveleteket az állapot módosítására. Ha módosítani szeretnénk az állapotot, akkor action objektumot kell átadni a Redux-nak. Ez az objektum kell tartalmazzon egy `type` mezőt, melynek string típusú értéket szokás adni, ezen kívül tetszőleges egyéb mezője lehet. Elterjedt Flux Standard Action Convention nevezéki konvenció, mely szerint a `type` mezőn kívül az objektumnak csak `payload`, `meta` és `error` mezői lehetnek. a `payload` mezőbe rakjuk az adatot.

Az action objektum létrehozását nem szokás a nézetre bízni. Az alkalmazás rétegeinek jobb szétválasztása érdekében ún. actionCreator függvényeket készítünk (7), melyek meghívva visszatérnek adott action objektummal.

React-ben a `useDispatch` hook segítségével tudjuk elérni a Redux `dispatch` függvényét, mellyel action objektumot adhatunk át a Redux-nak.

A Redux állapot egy részét ha le szeretnénk kérdezni, a `useSelector` hook-ot használhatjuk. Paraméterül egy függvényt vár. A selector függvénynek tiszta függvénynek kell lennie. Megkapja az egész Redux állapotot és abból állíthat elő egy leképezést. Meghívódik amikor a komponens renderelődik, illetve meghívódik miután egy akció kiváltódott. Utóbbi esetben ha a szelektor más értéket ad vissza, mint előző alkalommal, a komponens újrarenderelődik. A szelektor függvényt érdemes az állapotkezelés mellett tartani (8), nem pedig a nézeten belül implementálni. Ezzel is jobban szét tudjuk választani a két réteget. A szelektor egy bonyolultabb leképezés is lehet, pl. eltároljuk a ToDo elemeket és egy szűrési feltételt, a kettőből kombinálva leképezzük a ToDo elemek szűrt listáját.

A számláló gombos példaalkalmazásunkban a következő folyamatok játszódnak le a következő sorrendben:

- Renderelődik a Provider komponens, meghívódik a createStore függvény, meghívja a rootReducer függvényt paraméter nélkül, mely meghívja a counterReducer függvényt, mely visszatér a 0 értékkel. A következő állapot áll elő: `{ counter: 0 }`.

- Renderelődik a Button komponens, mely a useSelector függvény segítségével olvas a Redux-ban tárolt állapotból, a `counter` konstans értéke 0 lesz.

- A felhasználó megnyomja a gombot.

- Meghívódik a Button komponensben a handleClick eseménykezelő, mely az increaseCounter actionCreator-t használva végrehajta a `dispatch({ type: 'INCREMENT', payload: 1 })` műveletet.

- A rootReducer megkapja a `{ type: 'INCREMENT', payload: 1 }` action-t, mellyel meghívja a counterReducer-t. `(1, { type: 'INCREMENT', payload: 1 })` paraméterekkel hívódik és `2` értékkel tér vissza.

- Az új állapot a `{ counter: 1 }` objektum.

- Lefut újra a useSelector függvénye a Button komponensben, az előzőtől eltérő értékkel tér vissza, így újrarenderelődik a komponens.

## Middleware

A Redux állapotkezelésünk ún. middleware függvényekkel bővíthető. Ha akció váltódik ki, az action objektum ezeknek a függvényeknek a láncán halad végig mielőtt meghívódna a reducer. Közben módosíthatják vagy akár el is nyelhetik az action-t, újakat válthatnak ki, lekérhetik az aktuális állapotot, mellékhatást hajthatnak végre.

Példa middleare hozzáadása az alkalmazásunkhoz:

```jsx
...
import { createStore, combineReducers, applyMiddleware } from "redux";
...
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

// 2) Redux store
const store = createStore(rootReducer, applyMiddleware(logger));
...
```

Az `applyMiddleware` fűzi láncba a middleware függvényeket. A példában szereplő `logger` függvény egy saját middleware, mellyel minden akció kiváltódásakor logolhatjuk azt és az új állapotot a konzolba.

Nem feltétlenül szükséges saját middleware függvényeket írnunk, használhatunk mások által megírtakat is. A legelterjedtebb megoldás Redux-ban mellékhatás kezelésére a Redux Thunk könyvtár. Segítségével az akció objektumokhoz hasonlóan függvényeket küldhetünk a Redux-nak, melyek megkapják paraméterben a `dispatch` és a `getState` műveleteket, így újabb akciókat lőhetnek el, illetve lekérhetik az állapotot.

A következő példában a Redux Thunk segítségével elérjük, hogy a gomb megnyomása után csak 1 másodperccel növelődjön a számláló:

```jsx
...
import thunk from "redux-thunk";
...
const increaseCounterAsync = x => {
  return dispatch => {
    setTimeout(() => {
      dispatch(increaseCounter(x));
    }, 1000);
  };
};
...
// 2) Redux store
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

// Component which uses Redux state
const Button = () => {
  const counter = useSelector(getCounter);
  const dispatch = useDispatch();
  const handleClick = () => dispatch(increaseCounterAsync(1));

  return <button onClick={handleClick}>Clicked {counter} times</button>;
};
...
```

Fontos, hogy a thunk legyen a legelső az `applyMiddleware`-nek adott paraméterek között, mivel ő kezeli és nyeli el az action-ként ellőtt függvényeket.

Irodalom:

- [Redux weboldala](https://redux.js.org/)
- [React Redux weboldala](https://react-redux.js.org/)
- [Redux Thunk](https://github.com/reduxjs/redux-thunk)
