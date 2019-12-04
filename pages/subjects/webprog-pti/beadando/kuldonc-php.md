# Küldöncök -- Webprogramozás PHP beadandó

Furfang és a küldöncök kalandjai a szerveroldalon folytatódnak. Egészítsd ki a JavaScript beadandóban megírt játékot szerveroldali funkcionalitásokkal.

## Feladatok

1. **Főoldal és próbajáték** A főoldalon legyen egy logó és egy rövid leírás a játékról, illetve itt lehessen is játszani az első beadandó pályáival bárki számára. (Azaz a főoldal legyen a JavaScriptes beadandó, kicsit formára igazítva.)

2. **Regisztráció** Legyen lehetőség regisztrálni az alkalmazásba (pl. egy külön oldalon). Ehhez név, jelszó, email cím megadása szükséges. Mindegyik kötelező mező, email cím formátumának ellenőrzése szükséges (a formátum legyen feltüntetve az email mező környékén, pl. placeholderként). A vizsgálatot kliens- és szerveroldalon is szükséges elvégezni.

3. **Hitelesítés** Legyen lehetőség bármikor belépni az alkalmazásba. Ehhez az email címet és jelszót kell megadni, mindkettő kötelező legyen, és vizsgáljuk az email mező megfelelő formátumát! Bejelentkezés után a regisztrációkor megadott név jelenik meg a felületeken. Bejelentkezett felhasználónak kilépésre is lehetőséget kell adni.

4. **Pályalista** Bejelentkezés után egy listaoldalra kerülünk, ahol a rendszerben tárolt pályák kerülnek felsorolásra. Egy pályánál fel kell tüntetni a nevét, a nehézségét (1-4), hányan oldották már meg, illetve a bejelentkezett felhasználó megoldotta-e már.

5. **Játék egy pályával** A listában egy pályára kattintva egy másik oldalon a kiválasztott pályával lehet játszani. A játék végeztével a sikerességet a szerveren tárolni kell az adott felhasználóhoz és pályához (lehet normál vagy AJAX hívás is).

6. **Játék mentése és betöltése** Játék közben legyen lehetőség játékállást menteni, de ez most ne a böngészőbe, hanem a szerverre mentse el a program AJAX hívással. Egy pálya megjelenítésekor pedig a pálya mellett listázzuk ki a bejelentkezett felhasználóhoz és a pályához tartozó mentett játékállásokat (játékálláslista) a mentés időpontjával azonosítva és megjelenítve őket, és ezekre kattintva AJAX-szal töltsük be a kiválasztott játékállást! Sikeres mentés után az új játékállás jelenjen meg a játékálláslistában! 

7. **Új pálya** Legyen egy speciális felhasználó (név: `admin`, email: `admin@admin.hu`, jelszó: `admin`), aki belépve még egy funkcióhoz hozzáfér: új pálya felviteléhez. Itt megadhatja az új pálya nevét, nehézségét (1-4), méretét (NxM), és szerkesztheti, hogy hol milyen számok vannak. Hogy ezek megadása miként történik, nincs megkötve. 
    
    - Lehet az, hogy valaki kirajzolja a pályát, majd az egérgomb lenyomásával vonalakat rajzol a táblára, mintha játszana. A vonal két végpontja ugyanazt a számot kapja. Itt is lehetne törölni vonalakat, pl. a jobb gombbal.
    - Lehet az is, hogy valaki egy `textarea`-ban egy olyan JSON szöveg szerkesztését követeli meg, amit a JavaScript beadandóban pályaleírásként ötletként már megadtam (vagy esetleg saját JSON formátumot). A JSON helyességét feltételezhetjük, ellenőrizni nem kell.

        ```json
        [
            [1,2,3,0,0],
            [0,0,0,4,0],
            [0,4,2,0,0],
            [0,0,0,0,0],
            [0,0,1,3,0],
        ]
        ```

        Elmentve az új pálya megjelenik a listaoldalon.

        Az admin képes a pályákat törölni is.

## Megjegyzések

- Természetesen örülünk a vizuálisan is igényes alkotásoknak, de kinézet szintjén nincs semmilyen elvárás. Az előírt funkciók működjenek.
- Ha valakinek a JavaScript beadandója nem volt tökéletes, ebben a beadandóban nem kell azt javítania. Ha pl. nem működött a normális játék, a vége ellenőrzése, stb, akkor ezt lehet szimulálni egy gomb felvételével, amire kattintva "megoldjuk" a pályát. Ugyanígy lehet szimulálni egy textarea tartalmával a játék aktuális állapotát, és az AJAX-os mentést, betöltést.

## Pontozás

- Főoldal: A főoldalról a játék elérhető és játszható. (kötelező)
- Regisztráció: Lehet regisztrálni, és a regisztrált adatokkal bejelentkezni. (1 pont)
- Hitelesítés: Be és ki lehet jelentkezni. (kötelező)
- Pályalista: Bejelentkezve megjelenik a pályalista a pályák nevével és nehézségével. (kötelező)
- Pályalista: A pályalista feltünteti a teljesítők számát. (1 pont)
- Pályalista: A pályalista feltünteti azt, hogy a bejelentkezett felhasználó megoldotta-e már. (1 pont)
- Játék: Egy pályát választva, az játszható. (kötelező)
- Játék: Bejelentkezett felhasználó sikeres megoldása után a sikerességet elmenti a szerveren. (1 pont)
- Játékállások: A játékoldal betöltésekor megjelenik az adott pályához és az adott felhasználó által elmentett játékálláslista. (1 pont)
- Játékállások: A játékálláslistában egy mentett játékállásra kattintva betöltődik a játékállás AJAX-szal. (1 pont)
- Játékállások: Egy pályán lehet AJAX-szal játékállást menteni. (1 pont)
- Játékállások: Sikeres mentés után az új játékállás megjelenik a játékálláslistában. (1 pont)
- Új pálya: Az admin felhasználónak elérhető az új pálya felvétele, és ott új pályát tud felvenni. (3 pont)
- Pálya törlése: Az admin felhasználó tud pályát törölni. (1 pont)
- Nincs nagyobb programhiba, nem csalhatók elő furcsa jelenségek (2 pont)
- 1 hét késés (-2 pont)
- 2 hét késés (-4 pont)
- 2 hétnél több késés (nincs elfogadva a beadandó, nincs jegy)
- Az oldalnak tartalmaznia kell a következő kijelentéseket (kötelező)

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

## Értékelés:

- 0-6 pont: -0,5
- 7-11 pont: 0
- 12-14 pont: +0,5

## Beadás

A megoldásokat a [beadási felületen](http://webprogramozas.inf.elte.hu/ebr) keresztül kell feltölteni. Ehhez az elkészült alkalmazást be kell csomagolni ZIP formátumba, ugyanis csak így fogadja el a feltöltő felület.

Határidő: 2020. január 5. éjfél
