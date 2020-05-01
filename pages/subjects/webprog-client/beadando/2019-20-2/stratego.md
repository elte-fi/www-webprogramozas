# Stratego -- Kliensoldali webprogramozás

*Beadandó három felvonásban*

## Feladat

- [A táblajáték szabálya](http://www.ketaklub.hu/letoltes/Stratego%20Aoriginal%20Piatnik.pdf)
- [Az online játék bemutatója](https://www.youtube.com/watch?v=uX2Y5CK5OIY)

![](https://upload.wikimedia.org/wikipedia/commons/0/05/Stratego.png)

Feladatod a Stratego nevű társasjáték számítógépes megvalósítása. A játékban két játékos játszik egymással egy-egy hadsereg élén. Cél az ellenfél zászlójának megszerzése. A tábla 10x10 cellából áll. Eredetileg mindkét félnek 40 bábuja van: 1 zászló, 5 bomba, és katonák 1-től 10-es erővel. Egymás bábuit azonban nem látják, csak akkor, amikor két bábu csatázni kezd. Ekkor az erősebb bábu marad a pályán, a gyengébbik leesik a tábláról. Ha két azonos bábu harcol egymással, akkor mindkettő lekerül a tábláról. Minden bábu csak 1-et léphet előre, hátra, jobbra, balra. a zászló és az akna értelemszerűen nem tud lépni. A táblán lehetnek olyan mezők, amelyre nem lehet lépni (tó). Van pár speciális figura:
- a 2-es a felderítő, ő akárhány mezőt átugorva léphet vagy támadhat. Tavat ő sem tudja átugrani.
- a 3-as az aknász. Csak ő tudja hatástalanítani a bombát
- az 1-es a kém, ha ő támadja meg az ellenfél 10-esét, akkor megöli.
- bomba: aki rálép, az felrobban, a bomba viszont megmarad. Csak az aknász képes leszedni a tábláról.

A tábla mellett a játék működtetéséhez egyéb képernyők is kellenek:
- Főoldal: logó, játékszabály (akár külön oldalon), és két funkció
  - új játék indítása: ekkor egy várakozó "szobába" kerülünk, ahol a megjelenik a szoba azonosítója. Ő lesz az 1. játékos.
  - csatlakozás szobához: egy szöveges beviteli mezőbe kell beírni a szoba azonosítóját, majd egy gombot megnyomni. A gomb megnyomására az előkészítő oldalra kerülünk. Ő lesz a 2. játékos.
- Várakozó szoba: egy szobaszám és egy Vissza gomb, ami a főoldalra visz.
- Előkészítő oldal: itt lehet a bábukat a táblára helyezni. Ha készen vagyunk, akkor egy gomb megnyomásával jelezzük ezt. Ekkor a játékoldalra kerülünk.
- Játékoldal: megjelenik a játéktábla, a két játékos felváltva lép. Ha valamelyikük nyer, akkor visszaléphetünk a főoldalra.

Játék folyamata: az 1. játékos választ egy figurát. Ekkor opcionálisan jelezzük a táblán, hogy az adott bábu hova léphet. Ha újra a kiválasztott figurára kattintunk, akkor a kijelölés megszűnik. Kiválasztás után választunk egy cellát. Ha nem léphet az adott cellára, akkor nem történik semmi. Ha oda léphet a bábu, akkor odalép. Ha ez ellenséges bábu volt, akkor csata lesz, ami azt jelenti, hogy 3mp-ig kiírjuk mindkét játékos bábujának számát a tábla mellé, majd az erőviszonyoknak megfelelően leveszünk egy vagy két bábut. A levett bábu megjelenik az adott játékos listájában. 3mp után a 2. játékos jön. Ha nem volt csata, akkor lépés után a 2. játékos jön. Az aktuális játékost jelezzük a felületen.


## 1. felvonás (20 pont)

React használatával készítsd el az egyes oldalak kvázi-statikus komponenseit és működését. Az első felvonásban alapvetően a HTML és CSS ismereteidre lesz szükség (sitebuild), majd az így elkészített prototípusokat komponensekbe kell helyezned. Ekkor már átgondolhatod, hogy mely oldalrészeket kell külön komponensbe kiszervezned. Annyi dinamikát kell tartalmaznia az oldalnak, hogy az egyes képernyők a megfelelő gombnyomásokra bejárhatóak legyenek. A következő képernyőket kell elkészíteni:
- főoldal
- várakozó szoba
- előkészítő oldal
- játékoldal

Ezek tkp. a játék egyes állapotaihoz kapcsolódnak:
- MAIN_PAGE
- WAITING_FOR_SECOND_PLAYER
- PREPARE_GAME
- IN_GAME

Az egyes oldalakat nem kell külön útvonal alá tenni, és nem is szükséges react-routert használni. A játék állapotának megfelelően lehet egy elágazást csinálni, és eszerint a megfelelő komponenst megjeleníteni.

Elvárás az igényes kinézet. Ehhez érdemes valamilyen CSS keretrendszert vagy komponenskönyvtárat használni. Egy-egy háttérkép vagy háttérszín már sokat dob a megjelenésen.

### Értékelés:

- Create-React-App használata (1pt)
- Legalább 4 komponens (1pt)
- Főoldal: megvan (1pt)
- Főoldal: szükséges elemeket tartalmazza (2pt)
- Főoldal: igényes megjelenésű (1pt)
- Várakozó szoba: megvan (1pt)
- Várakozó szoba: szükséges elemeket tartalmazza (2pt)
- Várakozó szoba: igényes megjelenésű (1pt)
- Előkészítő oldal: megvan (1pt)
- Előkészítő oldal: szükséges elemeket tartalmazza (3pt)
- Előkészítő oldal: igényes megjelenésű (1pt)
- Játékoldal: megvan (1pt)
- Játékoldal: szükséges elemeket tartalmazza (3pt)
- Játékoldal: igényes megjelenésű (1pt)

## 2. felvonás (30 pont)

Ebben a felvonásban adjuk hozzá a játéklogikát az alkalmazáshoz. Ehhez használjunk redux-ot. Gondoljuk át, hogy milyen adatokat kell tárolni ahhoz, hogy az egyes funkciók működtethetők legyenek. Gondoljuk át az akciókat is, bár ezek majd fejlesztés közben szépen bővülnek majd. Két fő részt kell itt megoldani.

### Játékoldal

Az egyszerűség kedvéért dolgozzunk kisebb táblával és kevesebb bábuval, és ne legyen tó a pályán. A pályánál készüljünk tetszőleges dimenziókra, de most legyen a pálya 6x6-os. A pályára előre rakjuk fel mindkét játékos bábuit, játékosonként:
- 1 zászló
- 2 bomba
- 1 kém (1)
- 2 felderítő (2)
- 2 aknász (3)
- 1 4-es
- 1 6-os
- 1 8-as
- 1 10-es

Majd az így felrakott bábukkal a játék szabályai szerint lépjünk. Kattintással kijelölünk egy cellát, majd egy újabb kattintással egy másikat. Ld. a szabályokat fentebb. A táblán mindig azokat a bábukat fedjük fel, amelyik játékos aktív. Az 1. játékos kezd. 

Gondold meg, milyen adatok kellenek a játék működtetéséhez. Gondold át az akciókat is!

### Előkészítő oldal

Az előzőleg elmondott 6x6-os pályára kell felrakosgatni az előzőleg felsorolt bábukat. Elég csak az egyik játékos bábuinak felrakását elvégezni, a másik játékos bábuit egyelőre fixen rakjuk fel, égessük be!

Jelenjen meg a tábla, és legyen egy külön hely, ahol a felteendő bábuk vannak (nevezzük kéznek). Oda kattintunk, majd a tábla egy cellájára. Csak az alsó két sorba rakhatunk. Hosszú távon jó lenne meghatározni azokat a cellákat is, ahova felhelyezhető bábu (engedélyezett mezők). A tábláról le is vehető bábu vissza a kézbe. Összességében ez az oldal úgy működik, hogy tetszőleges bábura kattintva, az kijelölődik, függetlenül attól, hogy korábban volt-e bábu kijelölve vagy sem. Üres és engedélyezett mezőkre kattintva pedig -- legyen az a táblán vagy a kézben -- a kijelölt bábu odahelyeződik.

A Tovább gomb csak akkor aktív, ha minden bábu fel van rakva a táblára.

### Értékelés

- Redux használata (1pt)
- Legalább 2 action (1pt)
- Minden actionhöz action creator (1pt)
- A root reducer legalább két alreducerre van bontva (1pt)
- Jól szervezett könyvtárstruktúra (1pt)
- Redux-dev-tool-lal oda-vissza léptethető állapottér (1pt)
- Játékoldal: a bábuk megjelennek, mindegyiknek látszik a száma (1pt)
- Játékoldal: aktív játékos jelölése (1pt)
- Játékoldal: üres cellára kattintva nem történik semmi (1pt)
- Játékoldal: ellenséges bábura kattintva nem történik semmi (1pt)
- Játékoldal: saját bábura kattintva, kijelölésre kerül (1pt)
- Játékoldal: saját bábura kattintva, kijelölésre kerülnek azok a mezők, ahova léphetünk (1pt)
- Játékoldal: kijelölt bábu mellett ugyanarra kattintva a kijelölés megszűnik (1pt)
- Játékoldal: kijelölt bábu mellett nem léphető cellára kattintva nem történik semmi (1pt)
- Játékoldal: kijelölt bábu mellett léphető cellát kijelölve odalép a bábu (3pt)
- Játékoldal: ha üres cellára lépett, a másik játékos jön (1pt)
- Játékoldal: ha ellenséges bábura lépett, akkor megjelenik mindkét játékos száma/ereje/karaktere 3mp-ig. 3mp után az erőviszonyoktól függően levételre kerül egy vagy két bábu. (2pt)
- Játékoldal: A leszedett bábuk megjelennek a tábla mellett játékosonként. (1pt)
- Játékoldal: Harc után a másik játékos lesz kiválasztva. (1pt)
- Játékoldal: Ellenséges zászlót elérve véget ér a játék (2pt)
- Előkészítő oldal: A tábla megjelenik üresen, egy külön területen pedig (kéz) a felrakandó bábuk. (1pt)
- Előkészítő oldal: A táblán jelölve vannak azok a cellák (pl. háttérszínnel vagy kerettel), ahova a bábuk helyezhetők. (1pt)
- Előkészítő oldal: bábura kattintva (mindegy, hogy a táblán vagy a kézben), az a bábu kijelölődik. Ha volt korábban bábu kijelölve, akkor annak kijelölése megszűnik. (1pt)
- Előkészítő oldal: Ha ki van jelölve bábu, akkor üres és engedélyezett mezőre kattintva (mindegy, hogy a táblán vagy a kézben) a bábu odahelyeződik. (1pt)
- Előkészítő oldal: Az egyik játékos bábui felrakhatóak. (1pt)
- Előkészítő oldal: Ha a kézből az összes bábu a pályán van, akkor a Tovább gomb elérhető. (1pt)


## 3. felvonás (30 pont)

Eddig nem volt igazán kétszemélyes a játék, mert a két játékos láthatta egymás bábuit. Most Websocket kapcsolattal két böngészőt kötünk össze egy szobában, és egymás bábuit nem fogják látni. A fő feladatod az lesz, hogy a játék állapotterét és a megjelenítést ennek megfelelően alakítsd át. A folyamat a következő:

- Mindkét játékos még a főoldalon van.
- Az első játékos egy új szobát hoz létre és kapcsolódik. A szoba kódját elküldi pl. emailben vagy chatben a barátjának, aki a második játékos lesz.
- A szoba létrehozásával egy közös tábla is elkészül, a felrakandó bábukkal.
- A második játékos megkapja a kódot és a főoldalon beírja. Amikor ő is kapcsolódik, akkor ő is és az első játékos is az előkészítő oldalra kerül.
- Az előkészítő oldalon csak a saját bábuikat látják. Ha készen van az egyik, akkor megnyomja a Tovább gombot, és ezzel játékra várakozó állapotba kerül. A másik közben még rakosgat. Ha ő is elkészül, akkor mindketten játék állapotba kerülnek.
- Játék állapotban megjelenik a játéktábla. Mindketten csak a saját bábuikat láthatják. Csak akkor léphetnek, ha rajtuk van a sor.

A játék állapotát folyamatosan szinkronban kell tartani a két játékos között. Ezt most úgy érjük el, hogy minden akció esetén elküldjük a tábla és a játékosok állapotát a szervernek, amely minden szobára tárolja azt, és a szerver kiküldi minden résztvevőnek, akik befrissítik az alapján a saját állapotukat.


### Értékelés

- 1. játékos a főoldalon új játékszobát indít, és bekerül a várakozó szobába (itt jelenik meg a szoba kódja, amit el tud küldeni a játékon kívül a 2. játékosnak). A 2. játékos a főoldalon beírja a kódot, és így csatlakozik egy meglévő szobához. Ekkor az 1. és a 2. játékos is az előkészítő szobába kerül. (8pt)
- Főoldal: szobához csatlakozásnál ha érvénytelen a kód, akkor nem tud továbblépni. (Érvénytelen kód: nem létező szobaazonosító, vagy olyan szoba, amelyben már két játékos van, vagy lezárt játék van. A kód érvényességét a szerver ellenőrzi.) (3pt)
- Az előkészítő szobában mindkét játékos csak a saját bábúit láthatja és pakolhatja fel. Ha az egyik játékos készen van és a tovább gombra kattint, akkor várakozó állapotba kerül (vagy itt az előkészítő szobában, vagy a játékoldalon). Ha a másik játékos is végez, akkor mindketten a játékoldalra jutnak. Játékot elkezdeni csak akkor lehet, ha mindketten felpakolták a bábuikat. (8pt)
- A játékoldalon megjelenik a játéktábla. Mindketten csak a saját bábuikat és az általuk leszedett bábukat láthatják. A másik játékos bábuinak csak a pozícióit látják. Csak akkor csinálhatnak bármit is, ha rajtuk van a sor, azaz ők az aktív játékosok. (8pt)
- Játék végén egy gombra kattintva visszakerülnek a főoldalra. (3pt)

## README

A feladatnak tartalmaznia kell egy `README.md` fájlt, aminek a következő információkat kell tartalmaznia:

```txt
<Név>
<Neptun ID>
<Tárgy & beadandó neve>
<Beküldés ideje>
Ezt a megoldást <Név, Neptun ID> küldte be és készítette a <Tárgy neve> kurzus <Feladat neve> feladatához.
Kijelentem, hogy ez a megoldás a saját munkám.
Nem másoltam vagy használtam harmadik féltől származó megoldásokat.
Nem továbbítottam megoldást hallgatótársaimnak, és nem is tettem közzé.
Az Eötvös Loránd Tudományegyetem Hallgatói Követelményrendszere (ELTE szervezeti és működési szabályzata, II. Kötet, 74/C. §) kimondja, 
hogy mindaddig, amíg egy hallgató egy másik hallgató munkáját - vagy legalábbis annak jelentős részét - saját munkájaként mutatja be, 
az fegyelmi vétségnek számít. A fegyelmi vétség legsúlyosabb következménye a hallgató elbocsátása az egyetemről.
```

## Beadás és futtatás

Az egyes felvonásokat a Canvas rendszerbe kell határidőre feltölteni. Feltöltés előtt a `node_modules` mappa törlése kötelező! Az így kapott projektmappát kell zip állományba tömörítve feltölteni.

Az értékelés során a gyakorlatvezetők a mappát letöltik, kitömörítik és a következő parancsokat futtatják:

```
npm install
npm start
```

Erre az alkalmazásnak el kell indulnia egy új böngészőablakban.

Nagy segítség lenne nekünk, ha a projektet egy online platformon is elérhetővé tennétek, és ennek linkjét beírnátok a README fájlba. Ekkor nem kellene nekünk helyben minden projekthez a függőségeket egyesével feltelepítenünk.
- [Codesandbox](https://codesandbox.io)
- [Stackblitz](https://stackblitz.com/)

A használt eszközök igény szerint bővíthetők. Pl. nagyon ajánlott git és privát Github repo használata is. Ez utóbbit egyébként a Codesandboxba be lehet húzni, és az automatikusan frissül az újabb commitokkal.
