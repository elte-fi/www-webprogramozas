# Stratego Socket.io szerver

A szerver itt érhető el: `webprogramozas.inf.elte.hu:3030`

Két játékos kapcsolattartására szolgáló függvényeket definiál. A szobakezeléshez és az állapotszinkronizáláshoz adnak eszközöket. Ez utóbbit többféleképpen meg lehet tenni. Alapvetően két üzenet van, és ez is kétféleképpen használható. A `sync-state` üzenet az egész állapottér szinkronizálsára szolgál. A `sync-action` üzenet egy action továbbítására szolgál. Mindkettő meghívható úgy, hogy csak a másik játékos kapja meg a szervertől a továbbított adatot, de úgy is, hogy mindketten megkapják. 

Erre többféle szinkronizálási stratégia építhető fel. Pl. minden action dispatch-elésekor azt egy middleware nem engedi a store-ig eljutni, hanem a `sync-action`-nel fellövi a szervernek úgy, hogy mindenki (azaz a küldő kliens is) megkapja. Az `action-sent` eseményt figyelő függvény pedig dispatcheli a store felé az actiont. Persze a dispatch-et újra elkaphatja az első middleware, ezért a kapott action-be elhelyezhetünk egy metaadatot, hogy a szerverről érkezett, és ezt a middleware-ben megadjuk, hogy ne küldje újra a szervernek.

Ezen kívül még számos megoldás létezik.

## Kliens által küldhető üzenetek

### `create-room`

Ezzel az üzenettel lehet új szobát létrehozni a szerveren. A létrehozó kliens automatikusan bekerül a szobába. A visszaigazolásban megkapjuk a szobaazonosítót.

Paraméterek:
- `ack`: választ megkapó visszaigazoló függvény

Válasz (acknowledgement):
- Helyes: `{ status: 'ok', roomId: ''}`
- Hibás: `{ status: 'error', message: '' }`

Események: --

### `join-room`

Ezzel az üzenettel lehet egy szobához csatlakozni. Nagy valószínűséggel a szobát még nem hagyta el a létrehozója, így csatlakozáskor rögtön `room-is-full` üzenetet kapunk.

Paraméterek:
- `roomId`: szobaazonosító
- `ack`: választ megkapó visszaigazoló függvény

Válasz (acknowledgement):
- Helyes: `{ status: 'ok', state: ''}`
- Hibás: `{ status: 'error', message: '' }`

Események:
- `player-joined`
- `room-is-full`

### `sync-state`

A két kliens állapotterének szinkronizálására szolgáló üzenet. A felküldött állapottér tárolásra is kerül adatbázisban.

Paraméterek:
- `roomId`: szobaazonosító
- `state`: tárolandó állapot, JSON sorosítással kerül tárolásra
- `broadcast`: logikai, igaz érték esetén csak a másik játékos kapja meg a `state-changed` üzenetet, hamis érték esetén a hívó fél is kap erről üzenetet.
- `ack`: választ megkapó visszaigazoló függvény

Válasz (acknowledgement):
- Helyes: `{ status: 'ok' }`
- Hibás: `{ status: 'error', message: '' }`

Események:
- `state-changed`

### `sync-action`

A két kliens állapotterének szinkronizálására szolgáló üzenet, mely esetben az egyik kliens el tudja küldeni a másik kliensnek az action-jét. Nem tárolódik adatbázisban.

Paraméterek:
- `roomId`: szobaazonosító
- `action`: megosztandó action objektum, ahogy érkezik, úgy kerül továbbításra
- `broadcast`: logikai, igaz érték esetén csak a másik játékos kapja meg az `action-sent` üzenetet, hamis érték esetén a hívó fél is kap erről üzenetet.
- `ack`: választ megkapó visszaigazoló függvény

Válasz (acknowledgement):
- Helyes: `{ status: 'ok' }`
- Hibás: `{ status: 'error', message: '' }`

Események:
- `action-sent`

### `leave-room`

Szoba elhagyására szolgáló üzenet. Játék végén érdemes a szobát elhagyni.

Paraméterek:
- `roomId`: szobaazonosító
- `ack`: választ megkapó visszaigazoló függvény

Válasz (acknowledgement):
- Helyes: `{ status: 'ok' }`
- Hibás: `{ status: 'error', message: ''}`

Események:
- `player-left`


## Szervertől kapott üzenetek

### `room-is-full`

Leírás:
Ha a szoba megtelt (2 kliens), akkor minden klienst meghív átadva a szobaazonosítót, a szobaállapotot, és egy játékosazonosítót, ami a jelentkezés sorrendjét mutatja, és ami alapján eldönthető, hogy ki legyen az 1. és 2. játékos. Megjegyzés: nem kell feltétlenül ezt használni, mert az is feltételezhető, hogy aki a szobát készítette, az az 1. játékos, és aki csatlakozott, az a 2. játékos.

Adatok: objektum
- `roomId`: szobaazonosító
- `state`: adatbázisban tárolt érték, szöveges formában, a kliensnek vissza kell sorosítania nagy valószínűséggel
- `player`: játékosazonosító (1 vagy 2)

### `player-join`

Leírás:
Új játékosnak a szobához való csatlakozásakor hívódik meg.

Adatok: objektum
- `roomId`: szobaazonosító
- `socketId`: a csatlakozott játékos socket azonosítója

### `state-changed`

Leírás:
A másik játékos `sync-state` hívásra keletkezett üzenet az állapot szinkronizálására. Ez az egyik lehetőség a két játékos állapotterének összhangban tartására. A másik a `sync-action`.

Adatok: objektum
- `roomId`: szobaazonosító
- `state`: a másik játékos által küldött nyers állapot, az adatbázisba sorosítva kerül.

### `action-sent`

Leírás:
A másik játékos `sync-action` hívásra keletkezett üzenet az üzenetek szinkronizálására. Ez az egyik lehetőség a két játékos állapotterének összhangban tartására. A másik a `sync-state`.

Adatok: objektum
- `roomId`: szobaazonosító
- `action`: a másik játékos által küldött üzenet egy az egyben továbbítva.

### `player-left`

Leírás:
Játékos szobát elhagyásakor meghívódó üzenet.

Adatok: objektum
- `roomId`: szobaazonosító
- `socketId`: a távozó játékos socket azonosítója

