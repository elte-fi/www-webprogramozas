# Oktatási rendszer -- Szerveroldali webprogramozás

*Beadandó két felvonásban*

Feladatod az alábbi oktatási rendszer funkcióinak megvalósítása.

Ebben az oktatási rendszerben kétféle felhasználó van: tanár és diák. Tanárként a következő lehetőségünk van:
- új tárgyat létrehozni
- tárgy részleteit megtekinteni
- tárgyat meghirdetni
- tárgy meghirdetését visszavonni
- tárgyon belül új feladatot kiírni
- feladat részleteit megtekinteni
- a feladathoz tartozó megoldásokat megtekinteni
- a feladathoz tartozó megoldásokat értékelni

A diák a következő feladatokat végezheti el:
- meghirdetett tárgyra feljelentkezni
- meghirdetett tárgyról lejelentkezni
- a tárgy részleteit megtekinteni
- a tárgyhoz kapcsolódó feladatokat megtekinteni
- a tárgyhoz kapcsolódó feladathoz megoldást beküldeni
- teljesítetlen feladatokat kilistázni

A feladatot Laravel alkalmazásként kell megvalósítani, lokális SQLite adatbázis használatával. A táblákat migrációval kell feltölteni, és pár adattal előre feltölteni. A következő utasításokkal kell tudni üzembe helyezni az alkalmazást:

```bash
php artisan migrate:fresh
php artisan seed --class=LmsSeeder
php artisan serve
```

## Modellek

### 1. felvonás

- Felhasználók, ezeknél jelezni kell, hogy tanár-e az illető
- Tantárgyak

- Egy tanárnak több tárgya lehet, de egy tárgy csak 1 tanárhoz tartozik (User 1 --< N Subject)
- Egy diáknak több tárgya lehet, és egy tárgy több diákhoz is tartozhat (User N >--< N Subject)

### 2. felvonás

- Feladatok
- Megoldások

- Egy tárgyhoz több feladat tartozhat, de egy feladat csak 1 tárgyhoz tartozik
- Egy feladatnak több megoldása lehet, de minden megoldás csak 1 feladathoz tartozik

## Adatbázis

SQLite

## Kinézet

Elvárás az igényes kinézet. Ehhez valamilyen CSS framework és komponenskönyvtár, pl. Twitter bootstrap használatát ajánlom.

## Segédletek
Alább találsz a feladathoz segítségként használható anyagokat, vagy tippeket. Alapvetően arra koncentrálj, hogy jól működjön a feladat és teljesítse az elvárt követelményeket! Elvárás a jó kinézet is, erre a célra tökéletes az alapértelmezett Bootstrap kinézet, de kialakítása teljes mértékben az alkotóra van bízva.

- [Példaalkalmazás](https://canvas.elte.hu/files/334047/download?download_frd=1)
- Telepítő: [szerveroldali-webprogramozas.exe](https://github.com/totadavid95/elte/raw/master/SzerveroldaliWebprogramozas/Installer/szerveroldali-webprogramozas.exe)
- [Laravel dokumentáció](https://laravel.com/docs)
- [PHP dokumentációja](https://www.php.net/manual/en/)
- [Bootstrap dokumentáció](https://getbootstrap.com/docs/)  
- [DB Browser for SQLite](https://sqlitebrowser.org/)
- Egyéb tippek
  - [Fontawesome ikonkészlet](https://fontawesome.com/)  
	- [Materialize](https://materializecss.com/)
	- [Bulma](https://bulma.io/)

A felsoroltakon kívül bármilyen más CSS Framework is használható.

## 1. felvonás funkciói

1. **Főoldal** Az alkalmazás főoldalán az alkalmazás fő tulajdonságai mellett írjuk ki a rendszer által nyilvántartott tanárok, diákok, feladatok és megoldások számát.

2. **Kapcsolat** A kapcsolat oldal tartalmazza az alkalmazás készítőjének nevét, Neptun kódját, email címét.

3. **Belépés és regisztráció** Legyen lehetőség az alkalmazásba regisztrálni. A regisztráció során kérjük be a felhasználó nevét, email címét, jelszavát (kétszer). Beléptet az email cím és a jelszó megadásával történjen. A belépés során NE legyen lehetőség a jelszó megváltoztatására (ne legyen kint a link). Belépés után kerüljünk:
    - tanár esetében a tanári főoldalra, diák esetében a diák főoldalra ([doksi](https://laravel.com/docs/7.x/authentication#included-authenticating))
    - ha ez nem menne, akkor a főoldalra.

4. **Tanár vagy diák** Legyen lehetőség megadni, hogy tanár vagy diák a belépett felhasználó. Erre három lehetőség adott egyre kevesebb pontszámmal:
    - a. A regisztráció során legyen egy rádiógombcsoport, amellyel kiválasztható, hogy a regisztrált user tanár vagy diák-e. A regisztráció során ezt az értéket a `User` modellben el kell tárolni.
    - b. Legyen legalább 1 oktató a rendszerben. Ő ki tudja listázni a felhasználókat egy oldalon, és ott a kiválasztott usert oktatónak tud beállítani.
    - c. A rendszerben vannak előre felvitt tanárok. Regisztráció során csak diákként lehet beregisztrálni.

5. **Profil** A menüben a bejelentkezett felhasználó nevére kattintva egy profiloldal jelenik meg a felhasználó adataival: név, email, tanár/diák.

6. **Kilépés** Bejelentkezés után legyen lehetőség kijelentkezni.

Tanári funkciók:

7. **Menü** Bejelentkezés után a menü a következő lehetőségeket tartalmazza:
    - Tárgyaim (→ tanári főoldal)
    - Új tárgy meghirdetése (→ Új tárgy meghirdetése)

8. **Tanári főoldal** Bejelentkezés után a tanár erre az oldalra érkezik. Itt egy lista jelenik meg a tanár által létrehozott tárgyakkal: tárgy neve, leírás, tantárgyi kód, kreditérték. 

9. **Publikálás és visszavonása** A lista oldalon mindegyik tárgy mellett legyen egy gomb: ha a tárgy még nem publikált, akkor "Publikál" felirattal, ha publikált, akkor "Publikálás visszavonása" felirattal. 

10. **Új tárgy meghirdetése** A listaoldal tartalmaz még egy hivatkozást "Új tárgy meghirdetése" felirattal, amely a nevének megfelelő oldalra visz.Ezen az oldalon van lehetőség új tárgy hozzáadására a tanár tárgyai közé. Megadandó: 
    - tárgy neve (kötelező, legalább 3 hosszú), 
    - leírása, 
    - tantárgyi kód (kötelező, IK-SSSNNN formájú, ahol S az angol ábécé valamelyik nagybetűje, N pedig egy szám), 
    - kreditérték (kötelező, szám)

    A validációs hibaüzeneteket az egyes mezőknél kell jelezni. Siker esetén mentés és a tanári főoldalra irányítás.

11. **Tárgy részletei** A tanári főoldal tárgylistájában a tárgy nevére kattintva jelenítsük meg egy külön oldalon a tárgy részleteit: név, leírás, kód, kredit, létrehozás és utolsó módosítás dátuma, a jelentkezett hallgatók száma. Alatta egy listában jelenjenek meg a tárgyra jelentkezett diákok nevei és email címei.

12. **Tárgy módosítása** A tárgy részletei oldalon legyen egy link, amellyel a tárgy szerkesztése oldalra kerülünk. Itt legyen lehetőség módosítani mindegyik értéket, amelyet a felvételkor megadtunk. A validációs szabályok is ugyanazok. Mentéskor a tárgy részletei oldalra kerüljünk vissza.

13. **Tárgy törlése** A tárgy részletei oldalon legyen egy link, amellyel a tárgy törölhető. Mivel nem szeretnénk fizikailag törölni az adatokat, ezért használjuk a [Laravel soft delete funkcionalitását](https://laravel.com/docs/7.x/eloquent#soft-deleting).

Diák funkciók:

14. **Menü** Bejelentkezés után a menü a következő lehetőségeket tartalmazza:
    - Tárgyaim (→ diák főoldal)
    - Tárgy felvétele (→ Tárgy felvétele)
    - Feladatok listája (→ Feladatok listája)

15. **Diák főoldal** Bejelentkezés után a diáknak jelenjenek meg a felvett tárgyai listában: tárgy neve, leírása, kód, kreditérték, tanár neve minden tárgynál. 

16. **Tárgy leadása** A listaoldalon mindegyik felvett tárgy mellett egy gomb "Lead" felirattal. Erre kattintva a tárgy kikerül a diák listájából, és a listaoldal jelenik meg.

17. **Tárgy felvétele** A listaoldalon legyen egy gomb "Tárgy felvétele" felirattal. Erre kattintva egy olyan oldal jelenik meg, ahol az összes olyan tárgy kilistázásra kerül, amelyet a diák eddig még nem vett fel: tárgy neve, leírása, kód, kreditérték, tanár neve minden tárgynál. Mindegyik tárgy mellett egy "Felvesz" feliratú gomb szerepel. Erre kattintva a diák főoldala jelenik meg már az új tárggyal.

18. **Tárgy részletei** A diák főoldal tárgylistájában a tárgy nevére kattintva jelenítsük meg egy külön oldalon a tárgy részleteit: név, leírás, kód, kredit, létrehozás és utolsó módosítás dátuma, a jelentkezett hallgatók száma, a tanár neve és email címe. Alatta egy listában jelenjenek meg a tárgyra jelentkezett diákok nevei és email címei.

## 2. felvonás funkciói

Tanári funkciók

19. **Feladat kiírása** A tárgy részletei oldalon legyen egy "Új feladat" link, amivel egy új oldalon egy új feladatot lehet létrehozni. A következő adatok megadása szükséges:
    - Feladat neve (kötelező, min. 5 hosszú)
    - Feladat leírása (kötelező)
    - Pontértéke
    - Határidő tól
    - Határidő ig

    A validációs hibaüzeneteket az egyes mezőknél kell jelezni. Siker esetén mentés és a tárgy részletei oldalra irányítás.

20. **Feladatlista** A tárgy részletei oldalon jelenítsük meg táblázatban `határidő ig` szerint csökkenő sorrendbe rendezve a feladatokat: név, pontszám, tól-ig. Külön háttérszíne legyen a még elkövetkező, a folyamatban lévő, és a már lejárt feladatoknak.

21. **Feladat részletei** A feladatlistában egy feladat nevére kattintva jelenítsük meg a feladat adatait: név, leírás, pont, határidő tól-ig, beadott megoldások száma, értékelt megoldások száma.

22. **Feladat módosítása** A feladat részletei oldalon legyen egy link "Feladat módosítása" felirattal. Erre kattintva legyen lehetőségünk mindazon adatok módosítására, amit a felvételnél megadtunk. A validációs szabályok is ugyanazok.

23. **Megoldáslista** A feladat részleteinél jelenjenek meg a beadott megoldások is. Minden megoldásnál a beadás dátum és a beadó diák neve és email címe. Ha a megoldás értékelve is volt, akkor jelenjen meg az értékelés pontszáma és időpontja, valamint a bal oldali keret zöldre festésével jelezzük ezt.

24. **Megoldás értékelése** A feladat részleteinél a meg nem oldott megoldásoknál legyen egy "Értékel" gomb. Egy új oldalon megjelenik a feladat szövege egy összecsukható elemben (`<details>`) összecsukva, a megoldás szövege, valamint egy szám típusú beviteli mező, min. 0, maximum a feladatnál meghatározott pontszám értékkel, és egy többsoros beviteli mező is, ahol értékelést lehet írni. A pontérték kötelező mező. A validációs hibát jelezni kell. Mentés után a feladat részletei oldalra kerülünk. Ha van feltöltött fájl, akkor legyen lehetőség letölteni azt.

Diák funkciók:

25. **Tárgyhoz tartozó feladatok** A tárgy részletei oldalon jelenjenek meg az adott tárgynál kiírt aktív feladatok (határidő tól-ig közé esők): feladat neve, pontszám, határidő tól-ig, be volt-e már adva.

26. **Feladat megoldása** A listában a feladat nevére kattintva egy új oldalon megjelenik a tárgy neve, a tanár neve, a feladat leírása egy összecsukható elemben (`<details>`) kinyitva, a feladat pontszáma és a határidő tól-ig. Egy többsoros beviteli mezőben adható meg a megoldás. Ez a mező kötelező és validálandó. Sikeres beadás után a feladat részletei oldalra kerülünk. Egy feladat többször beadható.

27. **Feladatok listája** Egy külön oldalon (menüből elérhető) jelenjen meg az aktív feladatok listája tárgyankénti csoportosításban. Itt a feladat nevére kattintva a feladat megoldás oldalra jutunk.

28. **Fájl feltöltése** Legyen lehetőség fájl feltöltésére a feladat megoldása oldalon. Ha van feltöltött fájl, akkor a feladatok listájában (mindkét helyen a tárgynál és az összesített listában is) legyen egy link a listában, amire kattintva [a fájl letölthető](https://laravel.com/docs/7.x/filesystem#downloading-files) (vagy [így](https://laravel.com/docs/7.x/responses#file-downloads)).

## További melléklet

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

