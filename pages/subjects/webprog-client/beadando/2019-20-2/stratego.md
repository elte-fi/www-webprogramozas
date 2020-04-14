# Stratego -- Kliensoldali webprogramozás

*Beadandó három felvonásban*

## Feladat

![](https://www.playmonster.com/wp-content/uploads/2019/07/7476_Stratego_Original_Contents.png)

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

React használatával készítsd el az egyes oldalak kvázi-statikus komponenseit és működését. AZ első felvonásban alapvetően a HTML és CSS ismereteidre lesz szükség (sitebuild), majd az így elkészített prototípusokat komponensekbe kell helyezned. Ekkor már átgondolhatod, hogy mely oldalrészeket kell külön komponensbe kiszervezned. Annyi dinamikát kell tartalmaznia az oldalnak, hogy az egyes képernyők a megfelelő gombnyomásokra bejárhatóak legyenek. A következő képernyőket kell elkészíteni:
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

Az előzőleg elmondott 6x6-os pályára kell felrakosgatni az előzőleg felsorolt bábukat. Jelenjen meg a tábla, és legyen egy külön hely, ahol a felteendő bábuk vannak. Oda kattintunk, majd a tábla egy cellájára. Csak az alsó két sorba rakhatunk. Hosszú távon jó lenne meghatározni azokat a cellákat is, ahova felhelyezhető bábu. A tábláról le is vehető bábu. A Tovább gomb csak akkor aktív, ha minden bábu fel van rakva a táblára.

## 3. felvonás (20 pont)

Eddig nem volt igazán kétszemélyes a játék, mert a két játékos láthatta egymás bábuit. Most Websocket kapcsolattal két böngészőt kötünk össze egy szobában, és egymás bábuit nem fogják látni. A fő feladatod az lesz, hogy a játék állapotterét és a megjelenítést ennek megfelelően alakítsd át. A folyamat a következő:

- Mindkét játékos még a főoldalon van.
- Az első játékos egy új szobát hoz létre és kapcsolódik. A szoba kódját elküldi pl. emailben vagy chatben a barátjának, aki a második játékos lesz.
- A szoba létrehozásával egy közös tábla is elkészül, a felrakandó bábukkal.
- A második játékos megkapja a kódot és a főoldalon beírja. Amikor ő is kapcsolódik, akkor ő is és az első játékos is az előkészítő oldalra kerül.
- Az előkészítő oldalon csak a saját bábuikat látják. Ha készen van az egyik, akkor megnyomja a Tovább gombot, és ezzel játékra várakozó állapotba kerül. A másik közben még rakosgat. Ha ő is elkészül, akkor mindketten játék állapotba kerülnek.
- Játék állapotban megjelenik a játéktábla. Mindketten csak a saját bábuikat láthatják. Csak akkor léphetnek, ha rajtuk van a sor.

A játék állapotát folyamatosan szinkronban kell tartani a két játékos között. Ezt most úgy érjük el, hogy minden akció esetén elküldjük a tábla és a játékosok állapotát a szervernek, amely minden szobára tárolja azt, és a szerver kiküldi minden résztvevőnek, akik befrissítik az alapján a saját állapotukat.

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

## Linkek

- [A táblajáték szabálya](http://www.ketaklub.hu/letoltes/Stratego%20Aoriginal%20Piatnik.pdf)
- [Az online játék bemutatója](https://www.youtube.com/watch?v=uX2Y5CK5OIY)

