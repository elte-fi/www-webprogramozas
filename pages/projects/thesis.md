# Szakdolgozati témák

## 1. Gyerekeknek szóló kognitív tesztek megvalósítása webes technológiákkal

Az alábbi feladat az Etológia Tanszékkel közös együttműködésben történne.
A feladat gyerekeknek szóló kognitív tesztek megvalósítása webes technológiákkal (HTML, CSS, JS), reszponzív módon. Néhány teszt/játék példa:

- Érzelem felismerés tesztek: elhangzik egy érzelem neve, megjelenik 4 érzelemkifejező arc vagy 2 videó, ki kell választani a megfelelőt. A válaszlehetőségeket egy nagyobb halmazból kell véletlenszerűen kiválasztani, és több ilyen kérdés van egymás után.
- Valós-látszólagos érzelmek teszt: elhangzik 2 random történet (hanglejátszás), mindkettő után egy-egy kérdőív jelenik meg, 2 kérdéssel, a válaszlehetőségek képek.
- Faux pas teszt: elhangzik 2 random történet (hanglejátszás + slideshow), mindkettő után egy-egy kérdőív jelenik meg, 6 kérdéssel, a válaszlehetőségek képek.
- Mentális rotáció teszt: megjelenik 3 síkidom/térbeli forma, az egyik a célinger, a másik kettő közül ki kell választani azt, ami a célinger elforgatott változata. Kiválasztáskor az ábra beforog a célingernek megfelelő pozícióba.

A kognitív teszteknek egységes dizájnnal kell készülnie, igazodva már meglévő 2 másik teszthez, illetve támogatniuk kell a válaszok naplózását (meg kell hívniuk egy naplózó függvényt, ami adott).

A szakdolgozatban lefejlesztendő játékok végső számát egyénileg egyeztetjük.

## 2. Kollaboratív fejlesztői környezet készítése

Szinkron online oktatás során kihívást jelent a programozásoktatásban az, hogy a videós beszélgetőplatformokon általában csak 1 képernyő osztható meg, és az interaktív kódolás is limitált. Sokkal jobb lenne, ha az online térben is meg lehetne valósítani azokat a körülményeket és célokat, amik a jelenléti oktatásban megvannak. Azaz, a tanárokhoz csoportok tartoznak; a csoportoknak tevékenységeik vannak (óra, gyakorlás, zh, stb); a tevékenységekhez pedig feladatokat lehet rendelni. 

Csoporttagként (diák, hallgató) az aktív tevékenységek közül lehet választani, és az azon belül megadott feladatokat megoldani. A feladat megoldása során egy böngészőben futó szerkesztőben lehet dolgozni. 

Oktatóként egy tevékenységet kiválasztva egy áttekintő ábrán látható, hogy melyik résztvevő melyik feladattal hogyan halad (pl. hány karaktert írt, vagy késznek jelezte-e), az egyes kódra kattintva meg tudja nézni azt, látja, hogy melyik feladattal dolgozik a résztvevő, és akár a résztvevővel közösen is tudja szerkeszteni a kódját. Engedélyt tud adni, hogy a csoportban ki kivel szerkeszthet közösen kódot. Meg tudja osztani a saját szerkesztőjét a diákokkal. Javítani és értékelni tudja a beadott megoldásokat.

A feladat elsősorban kliensoldali fejlesztést követel, a szerveroldali az adatokat szolgáltatja. A megoldást mindenképpen React-ben és redux-szal kell megoldani. A szerveroldali komponensnél TypeScript vagy Laravel ajánlott, az adatbázis PostgreSQL legyen! A kollaboratív szerkesztéshez kész megoldást tudok felajánlani (Yjs) kiindulásként.

Feladatok:
- felhasználók csoportokba rendezése
- csoportoknak események kiírása (pl. gyakorlat)
- eseményekhez több feladat kiírása
- tanár-diák nézőpont
- kollaboratív szerkesztés
- tanár képes a hallgatók kódját figyelni

Technológiák:
- Monaco editor
- React, redux
- REST API, RPC
- Yjs

## 3. Webes REPL felület készítése különböző programozási nyelvekhez

Célunk egy böngészőben futó programozási környezet készítése. Ennek egyik része, hogy a szerkesztőben megírt kódot a háttérrendszeren futtatni lehessen. A futtatás egyszerűbb formája az, amikor nincs interakció futás közben. Kezdő programozásoktatásnál azonban fontos, hogy olyan programokat is írhassunk, ahol a felhasználó a konzolon adatokat tud bevinni. Így fontos, hogy a háttérben futó parancssort kivezessük a böngészőben futó felületre. Nem titkolt inspirációs forrás a [repl.it](https://repl.it/) működése.

A téma magját tehát az adja, hogy egy háttérben futó virtuális gép konzolját hogyan tudjuk a böngészőben megjeleníteni és használni (oda-vissza kommunikáció). Ehhez vannak már meglévő megoldások, library-k, ezeket kellene megvizsgálni, és alkalmazni. Böngészős komponense pl. az xterm.js lehetne. Mikor egy bash konzolt sikeresen kivezettünk, utána lehetne elmozdulni programok futtatása felé. Alapvetően kétféle környezet van: az egyik biztosít REPL felületet, pl. TypeScript, mások bináris állományt fordítanak és azt futtatnak, pl. C++. Célunk pl. ennek a két nyelvnek a támogatása. Ha ez is megvan, akkor e köré egy olyan feladatot lehet húzni, ahol belépett felhasználók egy egyszerű szerkesztőben képesek kódot írni, futtatni, ezeket a kódokat elmenteni, listázni, szerkeszteni, törölni, megosztani.

Figyelem! A téma szerveroldali komponense nehéz, és új ismereteket követel! Csak az vállalja, akinek vagy van már tapasztalata, vagy lesz elég ideje kikísérletezni a jó megoldást!

Feladatok:
- böngészőben futó szerkesztő
- kód futtatása egy virtuális környezetben a szerveren
- futás termináljának kivezetése a böngészőbe (pl. xterm.js)
- több felhasználó támogatása
- az így írt REPL kódok szerkesztése, futtatása, mentése

Nyelvek:
- C++
- TypeScript

Technológiák:
- Monaco editor
- docker
- React + Redux
- REST API (TypeScript vagy Laravel)

## 4. Böngészőben futó fejlesztői környezet webes alkalmazások írásához (akár három külön téma!)

A Webprogramozás tárgyhoz tartozó feladatok kiadását és megoldását szeretném egy böngészőben futó környezetbe áttenni.

Nézzük először a kliensoldali munkafolyamatot. Jelenleg valahol megjelenik a feladat, van egy kiváló szerkesztőnk (VSCode), és az ott elkészült dokumentumot egy böngészőben nyitjuk meg. Jó lenne ezt a hármast egyben kezelni egy böngészőben futó alkalmazáson belül. Ki lennének írva feladatok. A feladatra kattintva megjelenik annak leírása, és egy szerkesztő felület, ahol fájlokat lehet létrehozni, törölni, szerkeszteni. A HTML fájlokat pedig meg lehetne jeleníteni egy oldalsávban. Cél a megoldási lehetőségek körüljárása, és egy megoldás kidolgozása. A megjelenített oldalnak biztosan jól szeparáltnak kell lennie a futtató oldaltól, így ott nagy valószínűséggel iframe-et kell használni. Kérdés, hogy az iframe-be a szülőoldalból be lehet-e injektálni a fájlokat, vagy egy szerver roundtripre van szükség (ez utóbbi a valószínű). Példák: JSBin, JSFiddle, Repl.it. Ezeket lehet elemezni és ötletet meríteni.

A szerveroldali webprogramozáshoz más megoldások kellenek. Itt a háttérben futnia kell egy szervernek, amely futtatja az állományainkat. Két modell van:
1. pl. PHP. Ekkor a fájlokat csak a megfelelő könyvtárba kell másolni a kliensről, egy közös webszerver pedig kiszolgálja azokat.
2. pl. Node.js. Itt annyi szerverre van szükség, ahány felhasználó szeretne ilyet használni, tehát virtualizációs megoldásokban kell gondolkozni.

Ha ezek megvannak, akkor a további működés hasonló a kliensoldalinál leírtakhoz. Kell egy szerkesztő, vannak fájlok, amiket futtatni szeretnénk és az eredményt egy oldalpanelen megjeleníteni.

Lehet, hogy ez a feladat nagy, és 3 részre bontható: kliensoldali, PHP és Node.js támogatás részre, hiszen három különböző megközelítést igényel a szerveren. Figyelem! A téma szerveroldali komponense nehéz, és új ismereteket követel! Csak az vállalja, akinek vagy van már tapasztalata, vagy lesz elég ideje kikísérletezni a jó megoldást!

Feladatok:
- HTML, CSS, JS fájlok szerkesztése a böngészőben, a generált oldal megtekintése, kipróbálása
- PHP projekt írása böngészőben, a szerveroldali alkalmazás kipróbálása
- Node.js alkalmazás írása böngészőben, a szerveroldali alkalmazás kipróbálása

Technológiák:
- React
- Monaco editor
- REST, RPC
- virtuális futtató környezet a szerveroldalon
