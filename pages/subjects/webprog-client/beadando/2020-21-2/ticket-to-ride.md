# Ticket-to-ride -- Kliensoldali webprogramozás

_Beadandó három felvonásban_

## Feladat

- [A fejlesztéshez szükséges térkép és adatok](http://webprogramozas.inf.elte.hu/pages/subjects/webprog-client/beadando/2020-21-2/ticket-to-ride-assets.zip)
- [A táblajáték szabálya](https://tarsasjatekrendeles.hu/shop_ordered/7237/pic/Compaya/Ticket_To_Ride_Europe.pdf)
- [A táblajáték videó bemutatója](https://www.youtube.com/watch?v=93grcuFXw2w)
- [Az online játék bemutatója](https://www.youtube.com/watch?v=Ox4YI-9HG2c) (nem így kell kinéznie, ez csak egy érdekesség, illetve lehet belőle ötleteket meríteni)

![Kép a játékról](https://scotscoop.com/wp-content/uploads/2020/03/IMG_8927-1-900x600.jpg)

Feladatod a Ticket-to-ride Europe nevű társasjáték egyszerűsített változatának számítógépes megvalósítása. A fenti linkeken lehet az eredeti táblajáték leírását és ismertetését megtekinteni, ebben a feladatban azonban eltekintünk néhány játékelemtől, az alagútaktól és a vasútállomásoktól. A játékot 1-5 játékos játszhatja. Célunk vasútvonalak építésével minél több pontot szerezni. Pontot a megépített vasútvonalak hossza után, illetve a játék közben húzott célok (menetjegy-kártyák) teljesítésével lehet kapni, illetve a játék végén plusz pont jár a leghosszabb összefüggő vasútvonalért is. A nem teljesített célok pontjai levonásra kerülnek. A játék elején minden játékos kap 1 hosszú célt, és 3 rövid célt. A 3 rövid célból legalább 1-et meg kell tartani. A célok mellett kapunk még 4 vasútkocsi-kártyát is. Az asztalon elő van készítve 5 felfedett vasútkocsi kártya, a vasútkocsi-kártyák talonja, valamint a célok talonja. Minden játékosnak emellett van 45 vagonja is.

Egy játékos a körében a következő három lehetőség közül választ:

1. **Vasútkocsi-kártyát húz**: ezt megteheti a felfedett kártyák közül, ilyenkor húzás után azonnal pótolni kell a lapot, vagy a talonból is húzhat. A mozdony két kártyát ér, így azt másodkként nem lehet húzni a felfedettek közül (talonból akár 2 is húzható). Ha a felfedett lapok között 3 mozdony van, akkor az 5 lap megy a dobópakliba, és 5 újat kell osztani.
2. **Útvonalat épít**: ekkor az útvonal színének megfelelő mennyiségű lapot kell kijátszania a kezéből. Szürke utak bármilyen, de egyféle színből megépíthetők. A mozdonyt ábrázoló utakhoz legalább annyi mozdonyt kell kijátszani, ahányat az út ábrázol. A mozdony egyébként joker, bármilyen vonatkocsi-kártyát helyettesíthet. A vagonokat fel kell helyezni a táblára. Az épített út pontértéke azonnal feltüntetésre kerül. A dupla sínpárokat az alap feladatból kihagyjuk, azaz minden várost csak egy sínpár köt össze. Plusz pontért lehet a dupla sínpárokat figyelembe venni: ahol dupla sínpár van két város között, oda ugyanaz a játékos nem építhet kétszer. Továbbá 1-3 játékos esetén pedig csak az egyik sínpár építhető meg, de ezt a szabályt is plusz pontért lehet alkalmazni.
3. **Új célkártyákat húz**: 3 új célkártya húzható, ebből legalább 1-et (legfeljebb 3-at) meg kell tartani. Ezt úgy egyszerűsítjük, hogy ezt a fázist kihagyjuk, és a játék elején mindenki kap 5 célkártyát, amiket teljesíteni kell. Plusz pontért lehet implementálni ezt a funkciót. Ld. a pontozásokat.

Vasútkocsi-kártyák:

- lila, fehér, kék, sárga, narancs, fekete, piros, zöld: mindegyikből 12db
- mozdony: 14db

A játék akkor ér véget, ha valamelyik játékos raktárában a vagonok száma 2 vagy kevesebb lesz. Ekkor az összes játékosnak van még egy utolsó köre, beleértve azt is, akinek először lefogyott ennyire. Ezután a pontok kiszámítása következik:

- (az utak hosszát menet közben számoljuk;)
- a teljesített célok pontértéke hozzáadásra kerül;
- a nem teljesített célok értéke levonásra kerül;
- a leghosszabb összefüggő út tulajdonosa +10 pontot kap.

## Képernyők és működésük

A tábla mellett a játék működtetéséhez egyéb képernyők is kellenek:

- **Főoldal**: logó, játékszabály (akár külön oldalon), és két funkció
  - új játék indítása: ki kell választani, hogy hányan játszanak, meg kell adni egy nevet (nem lehet üres), majd egy gomb megnyomására egy várakozó "szobába" kerülünk, ahol a megjelenik a szoba azonosítója. Ezt az azonosítót lehet valamilyen csatornán körbeküldeni a játékostársaknak.
  - csatlakozás szobához: meg kell adni egy nevet (nem lehet üres), és egy szöveges beviteli mezőbe kell beírni a szoba azonosítóját, majd egy gombot megnyomni. A gomb megnyomására a várakozó "szobába" kerülünk.
- **Várakozó szoba**: egy szobaszám és egy Vissza gomb, ami a főoldalra visz. Itt addig várakozunk, amíg a szoba meg nem telik a kívánt számű játékossal. Ha megtelik, akkor minden játékos a játékoldalra jut.
- **Játékoldal**: megjelenik a játéktábla, és elkezdődik a játék. Ha valamelyikük nyer, akkor visszaléphetünk a főoldalra.

A játék folyamata: amikor elkezdődik a játék, akkor a tábla elő van készítve. Mindenki kap 4 vasútkocsi-kártyát, 45 vagont és 1 hosszú célt. Ha a célok közül az egyszerűbb megoldást választod, akkor mindenki kap még 5 véletlen kiscélt is. Ha plusz pontokért dolgozol, akkor az első lépése mindenkinek az, hogy automatikusan kap 3 rövid célt, ami közül választani kell legalább 1-et, de akár az összeset is. (Ez mehetne a játékosok között párhuzamosan, de ez egy külön játékfázist jelentene. Így viszont szépen beépíthető a játék normál menetébe az első lépés is.) A játéktáblán fel kell tüntetni:

- a térképet
- az 5 felfedett vasútkocsi-kártyát (ezek gyakorlatilag színek, nem is kell egyéb design elem)
- a vasútkocsi-kártya húzópaklit
- a célok (menetjegyek) húzópakliját (ezek várospárok, tól-->ig)
- az egyes játékosokat, minden játékosnál
  - a nevét
  - elért pontszámát
  - vagonjai számát
  - hány kártya van a kezében
  - hány célja van
  - hányadik köre
- az utolsó két tevékenységet (history), pl.
  - "1. játékos kártyát húzott: piros, titkos"
  - "2. játékos utat épített: Pamplona-Madrid"
  - "3. játékos 2 új célt húzott"
- az aktuális játékosnál fel kell tüntetni:
  - a céljait
    - jelezni, melyek teljesültek már, és melyek nem
    - teljesületlen cél fölé víve az egeret, a térképen meg kell mutatni a két várost
    - teljesült cél fölé víve az egeret, a térképen a két város mellett az útvonalat is meg kell mutatni
  - a kezében lévő vasútkocsi-kártyákat: melyik színből hány darab van

Az aktuális játékos háromféle tevékenységét a következőképpen kell megoldani:

- **Vasútkocsi-kártya húzása**: ha a játékos az 5 felfedett kártya valamelyikére vagy a vasútkocsi-kártya húzópaklira kattint, akkor vasútkocsi-kártyát húz. A húzásnál ügyelni kell a fent leírt szabályokra (mozdony esetén csak 1 húzható; ha 3 mozdony van, akkor az 5 kártya a dobópakliba kerül, és 5 újat kell osztani). Ha meg tudod oldani, akkor érdemes a húzott kártyát az adott játékoshoz mozgatni (animáció). Ebben a fázisban építeni vagy célokat húzni nem lehet. Ha a húzópakli elfogyott, akkor a dobópaklit megkeverve kell a húzópakli helyébe tenni.
- **Útvonal építése**: útvonal építését többféleképpen meg lehet valósítani. Az alábbiakban csak javaslatokat adunk.

  - 1\. javaslat: ha a térképen egy adott városra kattintunk, akkor építés fázisba kerülünk. Ekkor a város kijelölésre kerül, majd a szomszéd városai közül azok, amelyekbe utat tud építeni, megjelölődnek (van hozzá elég vagon, és van hozzá kártya, nem foglalt az útvonal mások által, dupla útvonalak figyelembe vétele). Ezek egyikére kattintva megjelenik egy lista, hogy kártyáink közül milyen kombinációkkal tudjuk azt megépíteni. Pl. ha a kezünkben van két piros és két mozdony, és egy két hosszú piros útvonalat akarunk építeni, akkor a listában megjelenik:

    - 2 piros
    - 1 piros-1 mozdony
    - 2 mozdony

    A lista egy elemére kattintva az adott út az adott kártyákkal megépítésre kerül, a térképen is jelölve. A felhasznált kártyák a dobópakliba kerülnek.

  - 2\. javaslat: a kezünkben lévő kártyákra kattintva kártyákat jelölünk ki (bal gomb növel, jobb csökkent), és a kijelölt kártyák leszűkítik a lehetséges útvonalakat, és ezek közül választunk.
  - 3\. javaslat: 2 várost jelünk ki, kártyákat választunk ki, és a gép eldönti, hogy a két város közötti út megépíthető-e a kártyákból.

  Az építés eredménye valamilyen kiemelő animációval jelenjen meg a térképen. Ez akkor hasznos, ha nem az aktuális játékos épített.

- **Új célok húzása** (plusz pontért): ha a célkártya húzópaklira kattintunk, akkor három cél jelenjen meg egy listában. Föléjük húzva az egeret, a térképen kijelölésre kerülnek a városok. A célra kattintva megjelöljük megtartásra, még egyszer kattintva a kijelölés megszűnik. Egy gombra kattintva a kijelölt célok átkerülnek a céljaink közé. A többi kártya visszakerül a célpakli aljára. A gomb csak akkor kattintható, ha van kijelölve cél. Ha meg tudod oldani, akkor húzáskor a 3 kártya animálva mozogjon az adott játékoshoz.

Ha a játék véget ér, akkor egy összesítő táblázatnak kell megjelennie, amely minden játékosnál megjeleníti:

- az utak hosszának pontértékét (1 hosszú-1 pont, 2h-2p, 3h-4p, 4h-7p, 6h-15p, 7h-21p)
- a célokért kapott pontokat összpontszámot (a teljesített célok pontértéke hozzáadásra kerül; a nem teljesített célok értéke levonásra kerül)
  - ugyanitt egy céllista is megjelenik, zölddel a teljesített, pirossal a teljesítetlen, egérrel fölé víve pedig megjelenik a teljesített útvonal
- a leghosszabb összefüggő út tulajdonosa +10 pontot kap.

A fent leírtak működési elvektől kreatív módon el lehet térni, amíg az a játék eredeti céljainak megfelel.

## Mellékletek

A [melléklet](http://webprogramozas.inf.elte.hu/pages/subjects/webprog-client/beadando/2020-21-2/ticket-to-ride-assets.zip) tartalmazza:

- a játék térképét
- egy JavaScript fájlt, amiben meg vannak adva
  - a városok nevei és koordinátái (`cities`);
  - a városok közötti kapcsolatok (`connections`)
    - `from`, `to`: az összekötött városok id-ja,
    - `locomotive`: hány mozdony kell hozzá
    - `color`: az útvonal színe
    - `elements`: az útvonal elemeinek koordinátái
  - a rövid célok (`destinations`)
    - `from`, `to`: a végállomások id-ja
    - `value` a pontérték
  - a hosszú célok (`longDestinations`)
    - `from`, `to`: a végállomások id-ja
    - `value` a pontérték

Minden koordináta a kép méretéhez képesti százalékban van megadva!

## 1. felvonás (20 pont + 5 plusz pont)

React használatával készítsd el az egyes oldalak kvázi-statikus komponenseit és működését. Az első felvonásban alapvetően a HTML és CSS ismereteidre lesz szükség (sitebuild), majd az így elkészített prototípusokat komponensekbe kell helyezned. Ekkor már átgondolhatod, hogy mely oldalrészeket kell külön komponensbe kiszervezned. Annyi dinamikát kell tartalmaznia az oldalnak, hogy az egyes képernyők a megfelelő gombnyomásokra bejárhatóak legyenek. A következő képernyőket kell elkészíteni:

- főoldal
- várakozó szoba
- játékoldal

Ezek tkp. a játék egyes állapotaihoz kapcsolódnak:

- MAIN_PAGE
- WAITING_FOR_PLAYERS
- IN_GAME

Az egyes oldalakat nem kell külön útvonal alá tenni, és nem is szükséges react-routert használni. A játék állapotának megfelelően lehet egy elágazást csinálni, és eszerint a megfelelő komponenst megjeleníteni.

A játékoldalnak a fent már leírt elemeket kell tartalmaznia. Ezen kívül mutasd meg (ha kell, akkor csak sima statikus CSS-sel vagy elemekkel), hogyan építünk, hogyan húzunk 3 új célt, hogyan jelennek meg ezek a felületen, milyen a játék végi összegző táblázat. Ezek egyébként a játék egyes állapotainak felelnek meg, kb. így:

- USER_BEGIN
  - or DRAW_CARDS
    - (DRAW_CARD1) -- nem biztos, hogy meg kell különböztetni
    - (DRAW_CARD2)
  - or BUILD_LINE
    - SELECT_FROM
    - SELECT_TO
    - SELECT_CARDS
  - or NEW_DESTINATIONS
- END_GAME

Ha meg tudod oldani, akkor az alap animációkat is beleteheted. Az animációk mehetnek sima top-left vagy transform transition-ökkel, vagy kísérletezhetsz animációs függvénykönyvtárakkal, mint pl. a react-spring.

Elvárás az igényes kinézet. Ehhez érdemes valamilyen CSS keretrendszert vagy komponenskönyvtárat használni. Egy-egy háttérkép vagy háttérszín már sokat dob a megjelenésen. Próbáld megoldani, hogy a játékoldal minden eleme egy képernyőre kiférjen képernyőmérettől függetlenül (pl. Flexbox-szal).

A fentiekkel és alábbi értékelési szempontokkal kapcsolatban még egyszer hangsúlyozandó, hogy játéklogikát nem várunk el, csak azt, hogy az egyes komponensek legyenek statikusan előkészítve. A kipróbáláshoz használjatok valami egyszerű belső state-et, ami az egyes komponenseket váltogatja. Akár az is lehet, hogy ideiglenesen a játékoldalra felraktok pár gombot, amikre kattintva szimuláljátok, hogy mikor minek kellene megjelennie.

### Értékelés:

- Create-React-App használata (1pt)
- Legalább 4 komponens (1pt)
- Főoldal: megvan (1pt)
- Főoldal: szükséges elemeket tartalmazza (1pt)
- Főoldal: igényes megjelenésű (1pt)
- Várakozó szoba: megvan (1pt)
- Várakozó szoba: szükséges elemeket tartalmazza (1pt)
- Várakozó szoba: igényes megjelenésű (1pt)
- Játékoldal: megvan (1pt)
- Játékoldal: térkép (1pt)
- Játékoldal: 5 felfedett vasútkocsi-kártya, húzópakli, célok húzópaklija (1pt)
- Játékoldal: játékosok adatai (2pt)
- Játékoldal: aktuális játékos keze: vasútkocsi-kártyák, célok (2pt)
- Játékoldal: építés elemei: városok kijelölése, kártyák kiválasztása (2pt)
- Játékoldal: összegző táblázat (2pt)
- Játékoldal: igényes megjelenésű (1pt)
- Játékoldal: 3 új cél húzásának elemei (+2pt)
- Játékoldal: animációk használata (+3pt)
- 1 hét késés (-3 pont)
- 2 hét késés (-6 pont)

## 2. felvonás (40 pont + 10 plusz pont)

Ebben a felvonásban adjuk hozzá a játéklogikát az alkalmazáshoz. Ehhez használjunk redux-ot. Gondoljuk át, hogy milyen adatokat kell tárolni ahhoz, hogy az egyes funkciók működtethetők legyenek. Gondoljuk át az akciókat is, bár ezek majd fejlesztés közben szépen bővülnek majd. Itt most csak a játékoldalt kell fejleszteni úgy, hogy 2 játékossal működjön a játék.

A főoldalról mindenféle szobalogika nélkül jussunk el a játékoldalra. A játék állapotterét készítsük elő: 2 játékos játszik, megkevert vasútkocsi- és célkártyák, kiosztott hosszú cél kártya, stb. Normál esetben 5 rövid cél is kiadásra kerül minden játékosnak. Plusz pontokért az első lépés kötelezően 3 új cél húzása, azaz az első körben a játékos automatikusan a `NEW_DESTINATIONS` állapotban van. Ezt követően azonban a normális játékmenet van. Azaz: akár a játékoson van a sor, akár nem, a célkártyáit tudja böngészni, föléjük víve az egeret a két végpont kijelölődik, ha pedig teljesített is a cél, akkor a köztük lévő út is kijelölődik. Ha a játékosra kerül a sor, akkor vagy kártyát húz a felfordított 5 lap közül vagy a talonból; vagy utat épít; vagy 3 új célt húz a célkártya paklira kattintva (ez utóbbi plusz pontért). Ezeknek a részletes leírása fentebb megtalálható. Ha az adott játékos végzett, akkor a másik játékos következik, ami annyit jelent, hogy a kézben lévő dolgokat át kell váltani (vasútkocsi-kártyák és a célok). E váltás persze nem jelent az állapottérben változást, csupán a redux-os selectorban az aktuális játékos kezének adatait adjuk vissza. Ha valakinek kettő vagy kevesebb vagonja lett, akkor még van egy teljes kör, majd a játék véget ér és megjelenik az összegző táblázat.

Az egyes tevékenységeket jelezzük az utolsó műveletek között. Ha meg tudod oldani, akkor használj animációkat a kártyák mozgatásakor és az építéskor plusz pontért!

Gondold meg, milyen adatok kellenek a játék működtetéséhez! Gondold át az akciókat is! Képzeld magad egy valós játékasztal mellé, és gondold meg, hogy az aktuális helyzetet milyen adatok írják le! Próbáld meg csak a szükséges adatokat megadni, a származtatottakat majd a selectorok biztosítják!

Egy mellékelt `README.md` fájlban mellékelj pár state JSON-t, amit a Redux-devtool-ból mentettél ki (alul a lefele mutató nyilacska), és amiket értékeléskor a gyakorlatvezetők be tudnak importálni. Ezek az állapotok lehetővé teszik, hogy ne mindig elölről kelljen ellenőrizni a feladatot, hanem egy adott pontra ugorjunk.

### Értékelés

- Redux használata (1pt)
- Legalább 2 action (1pt)
- Minden actionhöz action creator (1pt)
- A root reducer legalább két alreducerre van bontva (1pt)
- Jól szervezett könyvtárstruktúra (1pt)
- Redux-dev-tool-lal oda-vissza léptethető állapottér (1pt)
- Redux-dev-tool-ba betölthető előre elkészített állapotterek és lépések (1pt)
- Játékoldal: a játékoldalra érve a játéktábla 2 játékossal elő van készítve (2pt)
- Játékoldal: aktív játékos jelölése (1pt)
- Játékoldal: az aktív játékosnál a megfelelő adatok jelennek meg (célok, kártyák, vagonok) (2pt)
- Játékoldal: az aktív játékosnál az utolsó két művelete feltüntetésre kerül (1pt)
- Játékoldal: teljesítetlen cél fölé víve az egeret a két végpont megjelölésre kerül a térképen (1pt)
- Játékoldal: teljesített cél fölé víve az egeret a két végpont megjelölésre kerül a térképen és az útvonal is kiemelt lesz (2pt)
- Játékoldal: ha most került ránk a sor, tudunk az asztalról egy vasútkocsi-kártyalapot húzni (1pt)
- Játékoldal: ha most került ránk a sor, tudunk a pakliból egy vasútkocsi-kártyalapot húzni (1pt)
- Játékoldal: tudunk még egy kártyalapot húzni (1pt)
- Játékoldal: ha mozdonyt húztunk a felfedett lapok közül, akkor nem tudunk még egy kártyalapot húzni (2pt)
- Játékoldal: a húzott lapok megjelennek a kezünkben (1pt)
- Játékoldal: a húzás során a kártyák animálva kerülnek a kezünkbe vagy a játékos adataihoz (+1pt)
- Játékoldal: húzás közben nem lehet építeni vagy célkártyát húzni (1pt)
- Játékoldal: húzás befejeztével a másik játékos jön (1pt)
- Játékoldal: ha most került ránk a sor, akkor elkezdhetünk utat építeni (1pt)
- Játékoldal: építkezésnél csak szomszédos városok között tudunk utat építeni (1pt)
- Játékoldal: építkezésnél csak akkor tudunk utat építeni, ha van hozzá kártya a kezünkben (1pt)
- Játékoldal: építkezésnél a szükséges kártyákat akár többféle kombinációból összeállíthatjuk, mozdonyok segítségével (2pt)
- Játékoldal: építkezés végén az út megépítésre kerül, a kártyák a kezünkből a dobópakliba kerülnek, a vagonok száma csökken (1pt)
- Játékoldal: a vagonok animálva kerülnek a táblára (+1pt)
- Játékoldal: építkezés közben nem lehet vasútkocsi-kártyát vagy célkártyát húzni (1pt)
- Játékoldal: az építkezés befejeztével a másik játékos jön (1pt)
- Játékoldal: ha most került ránk a sor, akkor a célkártyapaklira kattintva 3 új célkártyát kapunk (+1pt)
- Játékoldal: egy célkártyára kattintva megjelölhető (+1pt)
- Játékoldal: megjelölt célkártyára kattintva a jelölés visszavonódik (+1pt)
- Játékoldal: egy gomb akkor elérhető, ha legalább 1 célkártya ki van választva (+1pt)
- Játékoldal: erre a gombra kattintva a kijelölt kártyák átkerülnek a céljaink közé, a többi a célkártya pakli aljára (+1pt)
- Játékoldal: célkártyahúzás közben nem lehet vasútkocsi-kártyát húzni vagy építkezni (+0,5pt)
- Játékoldal: célkártyák animálva kerülnek a kezünkbe vagy a játékos adataihoz (+1pt)
- Játékoldal: a célkártyahúzás befejeztével a másik játékos jön (+0,5pt)
- Játékoldal: ha valakinek kettő vagy kevesebb vagonja van, akkor még egy teljes kör mehet (+1pt)
- Játékoldal: a játék végén megjelenik az összegző táblázat (1pt)
- Játékoldal: összegző táblázatban az utak pontszáma (1pt)
- Játékoldal: összegző táblázatban a célok pontszáma (1pt)
- Játékoldal: összegző táblázatban a célok listája zöld/piros (2pt)
- Játékoldal: összegző táblázatban a célok listájában fölé víve az egeret megjelenik az útvonal (2pt)
- Játékoldal: összegző táblázatban a leghosszabb út (1pt)
- 1 hét késés (-4 pont)
- 2 hét késés (-8 pont)

## 3. felvonás (30 pont + 5 plusz pont)

Eddig nem volt igazán többszemélyes a játék, mert a játékosok láthatták egymás kezében lévő lapokat, ahogy egy böngészőben a játékosok váltották egymást. Most Websocket kapcsolattal több böngészőt kötünk össze egy szobában, és egymás lapjait nem fogják látni. A fő feladatod az lesz, hogy a játék állapotterét és a megjelenítést ennek megfelelően alakítsd át. A folyamat a következő:

- Az összes játékos még a főoldalon van.
- Az első játékos egy új szobát hoz létre (megadja, hányan szeretnének játszani) és kapcsolódik. A szoba kódját elküldi pl. emailben vagy chatben a barátainak.
- A szoba létrehozásával egy közös játéktábla is inicializálásra kerül.
- A többi játékos megkapja a kódot és a főoldalon beírja. Ők is kapcsolódnak, a várakozó szobába kerülnek. A várakozó szobában tüntessük fel a már kapcsolódott játékosok nevét. Amikor a kapcsolódott játékosok száma eléri a megadott játékosok számát, akkor mindenki a játékoldalra kerül.
- A játékoldalon megjelenik a játéktábla. Mindenki csak a saját lapjait láthatja. Csak akkor léphetnek, ha rajtuk van a sor.
- Ha nem az adott játékoson van a sor, akkor is látnia kell, hogy ki az aktuális játékos. Az ő tevékenységéről vagy az előzmények (history) panelen keresztül értesül, vagy animációkkal. Ez azt jelenti, hogy ha nincs rajtunk a sor, akkor is látjuk, hogy mozognak a kártyák. Ha nem is használunk animációkat, azt közösen mindenki látja, ha változtak pl. a felfedett vasútkocsi-kártyák vagy építettek egy útvonalat.

A játék állapotát folyamatosan szinkronban kell tartani a játékosok között. Ezt most úgy érjük el, hogy minden akció esetén szinkronizáljuk az állapotteret a játékosok között. Ezt egyrészt megtehetjük úgy, hogy elküldjük a tábla és a játékosok állapotát a szervernek, amely minden szobára tárolja azt, és a szerver kiküldi minden résztvevőnek, akik befrissítik az alapján a saját állapotukat. De úgy is megtehető, hogy az akciót küldjük el a szervernek, amely minden résztvevőnek továbbküldi, és az akció alapján frissül a játékosok állapottere ugyanolyan módon.

[A Websocket szerver leírása itt található.](http://webprogramozas.inf.elte.hu/#!/subjects/webprog-client/handouts/websocket-server)

### Értékelés

- 2 játékos esetén
  - Az 1. játékos a főoldalon megadja a nevét, beállítja a játékosok számát 2-re és új játékszobát indít. Ekkor bekerül a várakozó szobába (itt jelenik meg a szoba kódja, amit el tud küldeni a játékon kívül a 2. játékosnak). (2pt)
  - A 2. játékos a főoldalon beírja a kódot, és így csatlakozik egy meglévő szobához. Mivel a szoba így megtelt, a folyamat végén mindkét játékos a játékoldalra kerül. (3pt)
  - A főoldalon a szobához csatlakozásnál ha érvénytelen a kód, akkor nem tud továbblépni. (Érvénytelen kód: nem létező szobaazonosító, vagy olyan szoba, amelyben már megtelt, vagy lezárt játék van. A kód érvényességét a szerver ellenőrzi.) (2pt)
  - A játékoldalon megjelenik a játéktábla. Mindkét játékos ugyanazokat az adatokat látja (térkép, játékosok, kirakott lapok, stb), kivéve azt, hogy mindegyik játékos a saját kezét látja. (3pt)
  - Az aktív játékos lépéséről a 2. játékos is értesül (változnak a kirakott lapok, megjelenik egy épített út a térképen, módosul a játékos history) (3pt)
  - Az aktív játékos lépéséről a 2. játékos animációval értesül (+2pt)
  - Amíg az 1. játékos aktív, addig a 2. játékos csak "nézegetni" tud, kezében a lapokat, a céljait, de lépni nem tud. (3pt)
  - Az 1. játékos végeztével a 2. játékos lesz az aktív, és minden igaz rá, ami fentebb az 1. játékosra, csak fordítva. (2pt)
  - Játék végén egy gombra kattintva visszakerülnek a főoldalra. (2pt)
- 3-5 játékos esetén
  - A várakozó szobába kerülnek a játékosok, amíg össze nem gyűlik az elején beállított játékosszám. (2pt)
  - A várakozó szobában feltüntetésre kerül a kapcsolódott játékosok neve. (+3pt)
  - A játékoldalon a játéktér állapota szinkronizálva van az összes játékossal. (2pt)
  - Csak az aktív játékos léphet. (2pt)
  - A nem aktív játékosok csak "nézelődhetnek" (kéz, célok, stb) (2pt)
  - Az aktív játékos lépésének befejeztével ciklikusan a következő játékos jön. (2pt)
- 1 hét késés (-3 pont)
- 2 hét késés (-6 pont)

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

A használt eszközök igény szerint bővíthetők. Pl. nagyon ajánlott git és privát Github repo használata is.
