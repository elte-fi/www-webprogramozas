# Kliensoldali webprogramozás - React

## Környezet kialakítása

### Előkövetelmények

- Node LTS verzió
- VSCode kódszerkesztő

### Projekt inicializálása

A `create-react-app` nevű npm csomag segít abban, hogy inicializáljunk
egy React projektet. Az alábbi módon használjuk ehhez:

```
npx create-react-app <alkalmazás neve>
```

A létrejött könyvtárban az `npm start` parancsot kiadva már el is indul az
előkészített alkalmazás. Később is így fogjuk tudni elindítani. A kód
szerkesztésekor az alkalmazás automatikusan frissül a böngészőben, így ezt elég
egyszer elindítanunk, és csak figyelni, hogy a változtatásaink megjelennek-e.

### A környezet finomhangolása (opcionális)

VSCode kiegészítők telepítése:

- Prettier
- ESLint

VSCode beállítások: workspaceben .vscode mappa létrehozása, a mappán belül
settings.json fájl létrehozása. A fájl tartalma:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.wordWrap": "on",
  "editor.formatOnSave": true,
  "editor.minimap.enabled": false,
  "editor.tabSize": 2,
  "files.autoSave": "onWindowChange"
}
```

## A létrehozott projekt áttekintése

- **README.md**: Ebben a fájlban lehet leírást elhelyezni a projektről. Például,
hogy miről szól, hogyan kell használni, hogyan lehet elindítani, milyen dolgokra
kell esetleg figyelni a fejlesztés közben, stb.
- **package.json**: A projekt leírója. Ebben találhatók npm scriptek, amik például
a projekt futtatásához, teszteléséhez, buildeléséhez szükségesek. Továbbá itt
vannak leírva a projekt függőségei is.
- **.gitignore**: A verziókezelésből kizárt fájlok.
- **package-lock.json**: A projekt függőségeit pontosan leíró fájl. Habár ez egy
generált fájl, általában mégis érdemes verziókezelni.
- **public**: A build artifactba változás nélkül, vagy csak jól definiált
változtatásokkal bekerülő fájlok (pl.: index.html-be bekerül a projektből
generált scriptet behúzó tag).
- **src**: A projekt forráskódja
  - **index.js**: Az alkalmazás belépési pontja.
  - **setupTests.js**: A tesztek futtatásához szükséges globális előkészítések.
  - **serviceWorker.js**: Service worker telepítése.
  - **App.js**: Egy komponens.

## Projektötlet

Lejátszási lista készítő alkalmazás. Néhány adat bevitelével felvihetünk
zeneszámokat. A felvitt zeneszámok egy listában megjelennek, és a kívánt számok
kiválasztásával létre tudunk hozni lejátszási listákat. Egy lejátszási lista
megjelenítésekor a számok ugyanúgy jelennek meg, mint ahogy a létrehozó képernyőn
is. Ezen a képernyőn változtatható a számok sorrendje is.

Ebből egyelőre a számokat megjelenítő listát fogjuk elkészíteni.

## Kiindulási alap

```html
<div class="w-screen h-screen bg-gray-200 pt-2">
  <div class="max-w-sm mx-auto flex flex-col bg-gray-700 rounded-lg shadow-xl">
    <div class="flex px-6 py-2 items-center border-b border-white">
      <img class="mr-2 w-20 h-20" src="https://via.placeholder.com/70" />
      <div>
        <div class="text-xl text-white">Shooting Stars</div>
        <div class="text-gray-400">Bag Raiders</div>
      </div>
    </div>
    <div class="flex px-6 py-2 items-center border-b border-white">
      <div class="mr-2 w-20 h-20"></div>
      <div>
        <div class="text-xl text-white">All Star</div>
        <div class="text-gray-400">Smash Mouth</div>
      </div>
    </div>
    <div class="flex px-6 py-2 items-center border-b border-white">
      <img class="mr-2 w-20 h-20" src="https://via.placeholder.com/70" />
      <div>
        <div class="text-xl text-white">Sandstorm</div>
        <div class="text-gray-400">Darude</div>
      </div>
    </div>
  </div>
</div>
```

## Komponensek keresése

A komponensalapú fejlesztésnél arra törekszünk, hogy azonosítsunk az alkalmazás
felületén olyan elemeket, amelyek valamilyen szempontból összetartoznak, jó
esetben többször is előfordulnak. Keressünk a példában ilyen részeket!

Egy lehetséges felbontás:
- zeneszám,
- zeneszám lista,
- az egész oldal.
Habár ez a legutóbbi kicsit furcsa lehet, de erre is érdemes komponensként
gondolni. Esetleg egy kitüntetett szerepű komponensként, amit nevezhetünk
page-nek.

## Komponensek implementációja

Elsőként, még szétbontás nélkül, készítsünk komponenst a htmlből. Módosítsuk az
alábbira az App.js fájl tartalmát:

```jsx
import React from 'react';

export function App() {
  return (
    <div className="w-screen h-screen bg-gray-200 pt-2">
      <div className="max-w-sm mx-auto flex flex-col bg-gray-700 rounded-lg shadow-xl">
        <div className="flex px-6 py-2 items-center border-b border-white">
          <img alt="" className="mr-2 w-20 h-20" src="https://via.placeholder.com/70" />
          <div>
            <div className="text-xl text-white">Shooting Stars</div>
            <div className="text-gray-400">Bag Raiders</div>
          </div>
        </div>
        <div className="flex px-6 py-2 items-center border-b border-white">
          <div className="mr-2 w-20 h-20"></div>
          <div>
            <div className="text-xl text-white">All Star</div>
            <div className="text-gray-400">Smash Mouth</div>
          </div>
        </div>
        <div className="flex px-6 py-2 items-center border-b border-white">
          <img alt="" className="mr-2 w-20 h-20" src="https://via.placeholder.com/70" />
          <div>
            <div className="text-xl text-white">Sandstorm</div>
            <div className="text-gray-400">Darude</div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Két dologra érdemes most figyelni. Az egyik az, hogy a class-ok helyett
className-ként kell megadnunk az elemekre felhelyezendő classokat. A másik pedig,
hogy habár a React kulcsszó sehol sem jelenik meg az import-on kívül, mégis
szükségünk van erre. Érdemes kipróbálni, hogy mi történik, ha kikommentezzük. A
következő hibaüzenet jelenik meg:

```
'React' must be in scope when using JSX.
```

<!-- TODO: Mi is az a JSX? Mi a célja? Mire fordul? - lehet, hogy elég előadáson is, de
én szívesen megmutatnám gyakorlaton is a hallgatóknak -->

React komponenseket többféle módon is létre lehet hozni. A tárgy keretén belül
általában az előbb látott ```function component``` típusú komponensekkel fogunk
találkozni. A másik lehetőség az úgynevezett ```class component```, de ezzel
kevesebbet fogunk foglalkozni.

Bontsuk tovább a komponenseinket.

TrackList.js:

```jsx
import React from 'react';

export function TrackList() {
  return (
    <div className="max-w-sm mx-auto flex flex-col bg-gray-700 rounded-lg shadow-xl">
      <div className="flex px-6 py-2 items-center border-b border-white">
        <img
          alt=""
          className="mr-2 w-20 h-20"
          src="https://via.placeholder.com/70"
        />
        <div>
          <div className="text-xl text-white">Shooting Stars</div>
          <div className="text-gray-400">Bag Raiders</div>
        </div>
      </div>
      <div className="flex px-6 py-2 items-center border-b border-white">
        <div className="mr-2 w-20 h-20"></div>
        <div>
          <div className="text-xl text-white">All Star</div>
          <div className="text-gray-400">Smash Mouth</div>
        </div>
      </div>
      <div className="flex px-6 py-2 items-center border-b border-white">
        <img
          alt=""
          className="mr-2 w-20 h-20"
          src="https://via.placeholder.com/70"
        />
        <div>
          <div className="text-xl text-white">Sandstorm</div>
          <div className="text-gray-400">Darude</div>
        </div>
      </div>
    </div>
  );
}
```

App.js:

```jsx
import React from 'react';
import { TrackList } from './TrackList';

export function App() {
  return (
    <div className="w-screen h-screen bg-gray-200 pt-2">
      <TrackList></TrackList>
    </div>
  );
}
```

Habár már az index.js-ben is láthattuk, de most figyeljük meg a JSX-nek egy újabb
eszközét. Nem csak HTML tageket használhatok benne, hanem más komponenseket is.
Ezeket legegyszerűbben úgy különböztethetjük meg, hogy nagy betűvel írjuk a
nevüket.

A következő lépésben már az egyes Trackeket kellene komponenssé alakítanunk, és
itt felmerül a probléma, hogy ezeknek már konkrét adatokat kellene
megjeleníteniük. Hogyan tudunk adatok megjeleníteni? Egyelőre dolgozzunk egy darab
track adataival.

Track.js
```jsx
import React from 'react';

const track = {
  thumbnailSrc: 'https://via.placeholder.com/70',
  name: 'Shooting Stars',
  author: 'Bag Raiders',
};

export function Track() {
  return (
    <div className="flex px-6 py-2 items-center border-b border-white">
      {track.thumbnailSrc ? (
        <img alt="" className="mr-2 w-20 h-20" src={track.thumbnailSrc} />
      ) : (
        <div class="mr-2 w-20 h-20"></div>
      )}
      <div>
        <div className="text-xl text-white">{track.name}</div>
        <div className="text-gray-400">{track.author}</div>
      </div>
    </div>
  );
}
```

Ha JSX-ben szeretnénk adatokat megjeleníteni, akkor kapcsos zárójelek közé rakva
tehetjük ezt meg. A kapcsos zárójelek között tetszőleges JavaScript kifejezés
kiértékelhető. Most láthatunk egy elágazást is a templateünkben. Ezt akár az
alábbi módon is leírhatnánk:

```jsx
export function Track() {
  let thumbnail;
  if (track.thumbnailSrc) {
    thumbnail = (
      <img alt="" className="mr-2 w-20 h-20" src={track.thumbnailSrc} />
    );
  } else {
    thumbnail = <div class="mr-2 w-20 h-20"></div>;
  }
  return (
    <div className="flex px-6 py-2 items-center border-b border-white">
      {thumbnail}
      <div>
        <div className="text-xl text-white">{track.name}</div>
        <div className="text-gray-400">{track.author}</div>
      </div>
    </div>
  );
}
```

Tehát, ha egy változó "jsx elemet" tartalmaz, akkor ahova behelyettesítjük, ott
megjelenik. Ha végiggondoljuk, akkor ennek a komponensnek egy paramétere lesz a
track, amit meg kell jelenítenie. Az ilyen adatok function componentek esetén a
függvény paraméterében jelennek meg. A komponensek paramétereit **prop**-oknak
nevezzük.

```jsx
export function Track({ track }) { /* ... */ }
```

A karbantarthatóság kedvéért érdemes felírni, hogy milyen típusú paramétert
várunk. Erre használhatóak az ún. PropType-ok.

```jsx
import PropTypes from 'prop-types';
// ...
Track.propTypes = {
  track: PropTypes.shape({
    thumbnailSrc: PropTypes.string,
    name: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }),
};
```

Most már nincs helye a konkrét adatoknak a Track.js-ben, ezért helyezzük el az
adatokat egy tömbben a TrackList.js-ben.

```js
const trackList = [
  {
    id: 1,
    thumbnailSrc: 'https://via.placeholder.com/70',
    name: 'Shooting Stars',
    author: 'Bag Raiders',
  },
  {
    id: 2,
    name: 'All Start',
    author: 'Smash Mouth',
  },
  {
    id: 3,
    thumbnailSrc: 'https://via.placeholder.com/70',
    name: 'Sandstorm',
    author: 'Darude',
  },
];
```

Jelenítsük meg annyi Track-et, ahány trackünk van:

```jsx
export function TrackList() {
  const tracks = trackList.map(track => (
    <Track track={track} key={track.id}></Track>
  ));
  return (
    <div className="max-w-sm mx-auto flex flex-col bg-gray-700 rounded-lg shadow-xl">
      {tracks}
    </div>
  );
}
```

Itt azt érdemes megfigyelni, hogy a paramétereket hasonlóan adjuk át, mintha
attribútumok lennének, de komplexebb paramétereknél már szinte mindig kapcsos
zárójelek közé kell rakni a paramétert. Láthatjuk, hogy itt több elemet szeretnénk
egy helyre behelyettesíteni, de a már megszokott módon leírjuk a változó nevét,
és azon a helyen megjelennek az elemek. A Track komponensünknek nincs key
paramétere, mi viszont most mégis megadtuk. Próbáljuk ki nélküle! Figyelmeztetést
fogunk kapni a React-től. Optimalizációs célokból, ha sok elemet akarunk kirakni,
akkor érdemes valamilyen kulcsot használni az egyes elemek azonosítására.
Természetesnek tűnhetne a tömbben elfoglalt helyét megadni, de ezzel általában
megöljük azokat az optimalizációkat, amik miatt kéri tőlünk a React a key propot.

A trackeknek ebben a hierarchiában igazából egy szinttel magasabban kellene
lennie, mert a TrackListre csak megjelenítő komponensként érdemes gondolni (hisz
máshol is akarjuk majd használni). Próbáljuk meg a trackek listáját még eggyel
magasabb szintre emelni!


<!-- TODO: JSX: Mi az alternatíva? pro-con? ez nem biztos, hogy gyakorlatra kell. -->
