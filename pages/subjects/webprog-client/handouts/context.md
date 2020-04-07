# React Context

React-ben a prop-ok köztes elemeken keresztüli propagálása elkerülhető az ún. Context használatával. Komponensek adott részfájára határozható meg vele közös állapot, mely a részfában tetszőleges helyen elérhető. Context-be globális állapotot szokás helyezni, vagyis olyat, melyet a React fában több helyen is használunk. Tipikusan ilyen az, hogy ki az aktálisan bejelentkezett felhasználó, illetve a szervertől kapott úgynevezett modell adatok, pl. egy blog esetén a blogbejegyzések listája. Context használata esetén a köztes elemeken nem kell keresztülvezetni azokat a prop-okat, melyeket nem is használnak.

Példakód a Context használatára:

```jsx
import React, { createContext, useContext, useState } from "react";

const CounterContext = createContext(); // 1

const CounterProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);
  const increaseCounter = () => setCounter(counter + 1);

  const value = { counter, increaseCounter }; // 3

  return <CounterContext.Provider value={value}>{children}</CounterContext.Provider>; // 2
};

const Button = () => {
  const { counter, increaseCounter } = useContext(CounterContext); // 5
  return <button onClick={increaseCounter}>Clicked {counter} times</button>;
};

const App = () => (
  // 4
  <CounterProvider>
    <Button />
  </CounterProvider>
);
```

1. A `createContext` egy Context objektumot hoz létre. Ebből az objektumból használjuk a `Provider` mezőt, továbbá szükségünk van rá, amikor ki akarunk olvasni a Context-ből.

2. A `Provider` egy React komponens. Elhelyezve a komponensfában, a leszármazottaiban elérhető az általa biztosított tartalom. Ez a tartalom a `value` nevű prop-ban adható át.

3. A Context-el felhasználó komponensek újrarenderelődnek, ha referencia szerint megváltozik a `value` prop-ban tárolt tartalom. A példánkban a `CounterProvider` minden renderelése esetén a `value`-ban új objektumot helyezünk el, így mindig újrarenderelődnek a használó komponensek is. A `value` prop-nak értékül rendszerint egy olyan objektumot adunk, mely mezőiben tartalmazza a tárolt adatot, továbbá tartalmaz függvényeket, melyeket hívva tudjuk a tárolt adatot módosítani. A módosítás algoritmusát az adatot birtokló komponensünk zárja magába, kívülről csupán a módosításhoz szükséges információt kell átadni, pl. ha lejátszási listákat és zeneszámokat tárolunk, és lehetővé akarjuk tenni, hogy felvegyenek egy számot egy lejátszási listára, akkor egy `addTrackToPlaylist` függvényt biztosíthatunk, mely paraméterben kapja a lejátszási lista és a zeneszám azonosítóját.

4. Itt látható a Context Provider elhelyezése a React fában. Ugyanaz a Provider egy fában többször is szerepelhet, akár egymás leszármazottjaiként is. Ilyenkor egy használó komponens a fában hozzá legközelebbi őse által biztosított adatot éri el.

5. A `Button` komponenst bárhol elhelyezhetjük a React fában, ha leszármazottja a `CounterProvider`-nek, eléri az általa biztosított adatot a `useContext` Hook segítségével. A Hook paraméterben a Context objektumot várja, és visszaadja a `value` prop-ban tárolt adatot.

_Megjegyzés:_ A React fában több Context Provider is elhelyezhető. Az ezeket kezelő komponensek (pl. CounterProvider) elérik a fában az őseikként elhelyezett Context-eket.

Irodalom:

- [React doksi: Context](https://reactjs.org/docs/context.html)
- [React doksi: usecontext Hook](https://reactjs.org/docs/hooks-reference.html#usecontext)
