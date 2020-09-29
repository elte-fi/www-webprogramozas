# Full-stack webprogramozás -- 2. gyakorlat: REST API: projekt, vezérlők, adatbázis

## Tervezés

- Funkcionális és nem funkcionális követelmények
- Szerepkörök
- Használatieset-diagram
- **Osztálydiagram, kapcsolati diagram**
- **Végpont tervek**

## Példa feladat

Készítsünk egy webes alkalmazást, amellyel bejelentezett felhasználóként olyan hibákat jelenthetünk be, amelyek az ELTE egyes termeiben találhatóak (pl. elromlott projektor), a bejelentett hibáinkat megtekinthetjük, ezekhez megjegyszést írhatunk. Adminként mindenki hibáját megtekinthetjük, változtathatjuk a hibák státuszát, és válaszolhatunk a felhasználók üzeneteire. Látogatóként csak statisztikát látunk, és regisztrálhatunk.

### Funkcionális követelmények

- Felhasználóként szeretnék bejelenteni egy gépterembeli hibát, hogy minél előbb javíthassák. --> Hiba bejelentése
- Felhasználóként szeretnék visszajelzést kapni, hogy a bejelentett hiba milyen státuszban van. --> Hibák listázása
- Felhasználóként szeretnék kérdést vagy megjegyzést fűzni egy hibához azután is, hogy felvettem. --> Hiba history, chat, forum.
- Operátorként szeretném látni a hibalistát.
- Operátorként szeretnék egy hibát megtekinteni és státuszát váltani. Státuszváltáskor kötelező üzenetet megadni.
- A felhasználók és operátorok bejelentkezés után használhatják a funkciókat. Ezeket egy előre megadott listából, vagy LDAP - authentikációval kell elvégezni.
- A főoldalon az alkalmazás ismertetése, esetleg statisztikák jelenik meg.

### Nem funkcionális követelmények

- Felhasználóbarát, ergonomikus elrendezés és kinézet.
- Gyors működés.
- Biztonságos működés: jelszavak tárolása, funkciókhoz való hozzáférés.

### Szerepkörök

- vendég: a főoldal tartalmához fér hozzá, rögzíteni nem tud.
- bejelentő: a vendég szerepkörén túl hibát tud bejelenteni, és saját bejelentett hibáit megtekinteni.
- operátor: a bejelentő szerepkörén túl az összes hibát meg tudja tekinteni, és annak státuszát állítani tudja.

