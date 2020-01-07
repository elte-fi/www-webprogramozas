<style type="text/css">
main img {
    max-width: 100%;
}
main ul p, main ol p {
  display: block;
}
</style>

# Web programming test -- MIDI editor

_2020. January 7. 9-12_

## Tudnivalók

- A feladatokat a `webprogramozas.inf.elte.hu` szerveren kell elkészíteni. A `www` mappádon belül hozzál létre egy `midi` nevű mappát, és abban készítsd el a megoldásodat.
- A feladat tesztelését az [ellenőrző felületen](http://webprogramozas.inf.elte.hu:1701/tester) tudod elvégezni. Mindig válaszd ki azt a feladatot, amin éppen dolgozol, így a tesztelés is hamarabb elkészül, és a szervert sem terheled. A zh vége felé azonban futtasd le az összes feladatra is, hiszen az így kapott pontszám alapján kapod a jegyet.
- A feladat elkészítésére 3 óra áll rendelkezésre.
- A megoldás kinézete, a kód minősége nem számít, csak a tesztelt funkcionalitások működőképessége.
- A feladatokat nem szükségszerű a leírás sorrendjében elvégezni, a feladatok többsége nem épül a másikra, viszont ha kell, akkor a szükséges előfeltételeket, akár statikusan is, de biztosítani kell.
- NE használj olyan fejlesztő eszközt, amely a szerver erőforrásait használja (pl. remote-ssh plugin a VSCode-ban). Csak olyan eszközöket használj, amely a fájlok feltöltését, szinkronizálását elvégzi (pl. WinScp, FileZilla). Aki mégis tiltott eszközt használ, azt kizárjuk a zh-ról!
- A műveletek helyességét csak a felületen keresztül tudjuk ellenőrizni az adatok megjelenítésével, a háttérben tárolt adatokat közvetlenül nem vizsgáljuk.
- A zh-n bármilyen segédanyag használható, de humán segítség a jelenlévő gyakorlatvezetőkön kívül nem vehető igénybe.
- A zh után a megoldásokon plágiumellenőrzést végzünk, az esetlegesen hasonló megoldások készítőit védésre behívhatjuk.
- Ponthatárok:
    + 0- pont: 1
    + 65- pont: 2
    + 97- pont: 2,5
    + 130- pont: 3
    + 162- pont: 3,5
    + 195- pont: 4
    + 218- pont: 4,5 
    + 240-260 pont: 5

## Feladatleírás

Create a MIDI editor in which you can add, list, view MIDI tracks, and can record notes for the MIDI tracks!

0. **Előkészületek**

    A feladathoz kétféle adatot használunk. Az adatokat JSON formában alább le lehet tölteni, és ezzel ajánlott dolgozni. A JSON-t kétféle formában adjuk meg: az egyikben a külső adatszerkezet objektum, amiben az azonosítók kulcsok, az értékek pedig az egyes rekordok; a másikban a külső adatszerkezet tömb és ebben vannak felsorolva az egyes rekordok mint objektumok. Válaszd a számodra kényelmes formátumot. Ha mégis JSON-től eltérő formátumban szeretnél dolgozni, akkor a letöltésnél mellékelve vannak az adatok Markdown formátumban is, és ezt a [tableconvert.com](https://tableconvert.com) oldalon beimportálva tetszőleges formátumban ki tudod exportálni, pl. SQL-ben is. De erre csak akkor van szükség, ha a JSON fájllal nem tudsz dolgozni. Minden tekintetben a JSON fájl az irányadó.

    1. **Track**: Data structure for a soundtrack. We store the ID (`id`), name (`name`), category (`category`), associated instrument ID (`instrument`), track color (`color`) and the associated notes timeline (`notes`) for each track. The notes timeline contains the start time (`start`) and end time (`end`) of each note (`note`) in ms.
        
        Do not change this data (`id` from 1 to 5), but you can add new data later. The tester can change the `notes` field of track 4 and 5.

        ```md
        | id | name        | category | instrument | color   | notes                                                                                                                                              |
        |----|-------------|----------|------------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------|
        | 1  | Hi hat 1    | Drum     | 114        | #ffeb3b | [{"note":"C","start":100,"end":600}]                                                                                                               |
        | 2  | Base bass   | Bass     | 45         | #ff5722 | [{"note":"D","start":0,"end":500},{"note":"A","start":1000,"end":2000},{"note":"B","start":2000,"end":2500},{"note":"C+","start":2500,"end":3000}] |
        | 3  | Main melody | Melody   | 4          | #03a9f4 | [{"note":"C","start":0,"end":100},{"note":"D","start":100,"end":200},{"note":"E","start":300,"end":400}]                                           |
        | 4  | Beat        | Drum     | 114        | #ffc107 | [{"note":"C","start":1000,"end":1500},{"note":"E","start":2000,"end":2500},{"note":"G","start":3000,"end":3500}]                                   |
        | 5  | Cello       | String   | 27         | #8bc34a | [{"note":"D","start":0,"end":2000},{"note":"F","start":2000,"end":4000},{"note":"B","start":4000,"end":6000},{"note":"A","start":6000,"end":8000}] |
        ```

    2. **Instrument**: a list of possible instruments. An instrument consists of an id (`id`) and a name (`name`) field. Do not edit, add or delete this data. The example below is just a small part of the data, the full list is in the JSON file.

        ```md
        | id  | name                 |
        |-----|----------------------|
        | 1   | Grand Piano          |
        | 2   | Bright Piano         |
        | 3   | Honky-tonk Piano     |
        | 4   | MIDI Grand Piano     |
        | 5   | Harpsichord          |
        ```

    The task consists of two pages:

    1. Main page (`index.php`)
    2. New track page (`new.php`)

    [DOWNLOAD MATERIALS](http://webprogramozas.inf.elte.hu/webprog/zh/midi/midi.zip)

    If you want to use a database manager, we recommend SQLite, a local, file-based database manager that has support on the web programming server in PHP. For graphical interface we recommend [phpLiteAdmin](http://webprogramozas.inf.elte.hu/webprog/zh/midi/phpliteadmin.zip): after unpacking the php file, just copy it to the project folder and call it from the browser; the password is `admin`. You need to give write access to the folder so that the databases file can be created.
    
1. **Hide parts of the page (20 pt)** Use the URL parameter `hide` on the main page (`index.php`) to specify which parts of the page should be hidden (should not appear in the markup, or in the DOM). The possible page parts are: `tracks`, `pianoroll`, `keyboard`. These parts correspond to `div` elements of the same class name. If you want to hide more parts, you need to separate the parts with a comma.

    - a. Without parameter (`index.php`) everything should be displayed.
    - b. `index.php?hide=tracks`: the track list (`div` with `tracks` class name) is not shown
    - c. `index.php?hide=pianoroll`: the pianoroll (`div` with `pianoroll` class name) is not shown
    - d. `index.php?hide=keyboard`: the piano keyboard (`div` with `keyboard` class name) is not shown
    - e. `index.php?hide=tracks,pianoroll`: the track list and the pianoroll are not shown
    - f. etv.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/midi/1.png)

2. **Track list (20 pt)** List the tracks stored on the server on the main page (`index.php`)!

    - a. Tracks should be displayed as a list item in the `div` with the `tracks` style class. Display the track name, the instrument name in parentheses, and its category in `span`.
    - b. The background color of the list item should be specified with the `style` attribute.
    - c. The `data-id` attribute of the list item should be set to the `id` of the track.
    - d. The list item's `data-notes` attribute should store the notes timeline of the track in JSON format. **Technical help**: since JSON may contain `"`, the `'` should be used for the attribute value:

        ```html
        <li data-id="1" data-notes='[{"note":"C","start":100,"end":600}]'>
        ```

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/midi/2.png)

3. **Add new track (70 pt)**: Add a new track by clicking the "Add new track ..." link. Filename: `new.php`

    - a. The form contains the following input fields:

        - track name (name: `name`, type: text input field, required, error messages: `The track name is required`)
        - track color (name: `color`, type: color, required, format: hexa color code, eg. `#1234af`, error messages: `The track color is required`, `The track color has a wrong format`)
        - track category (name: `category`, type: text input field with data list, required, error messages: `The category is required`)
        - instrument (name: `instrument`, type: drop-down field, required, number, error messages: `The instrument is required`, `The instrument has to be an integer`)

    - b. The above items may be missing from the POST request, or may be empty or incorrect. In these cases, the appropriate error messages should be displayed in an element with `errors` style class (not necessarily structured, i.e. error messages can be displayed with` var_dump`). This error message element should not appear on the page when the form is first loaded.

    - c. In case of an error, make sure that the form state is kept, i.e. show the submitted data in the input fields.

    - d. Correctly filled in, the data should be saved on the server, and then be displayed in the track list on the main page.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/midi/3.png)

4. **Select a track and display its notes timeline (35 pt)**: Clicking on a track in the track list on the main page, display the notes timeline of the track in JSON format in the multi-line text input, and in the SVG element in a graphical format (pianoroll).

    - a. Clicking on a track, select it, which means, the list item corresponding to the track should have the `selected` style class!
    - b. Clicking on a track, read the JSON notes timeline stored in the `data-notes` attribute, and display it in the multi-line text input field on the page.
    - c. Display the JSON in the multi-line text input field graphically in the pianoroll SVG section. You can do this by clicking the button labeled "Show JSON in SVG". The graphic must be rendered in the SVG element on the page. Each note will be a `rect` element:
        - the `x` attribute contains the `start` value,
        - the `width` attribute is the time elapsed between `end` and `start` (ms),
        - the `height` attribute is always `10`,
        - the `y` attribute reads as follows:
            - for `C` note: 70
            - for `D` note: 60
            - for `E` note: 50
            - for `F` note: 40
            - for `G` note: 30
            - for `A` note: 20
            - for `B` note: 10
            - for `C+` note: 0

        ```html
        <svg>
            <rect x="100" y="70" width="500" height="10"></rect>
        </svg>
        ```
    - d. Display the notes timeline graphically by clicking on a track!

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/midi/4.png)

5. **Track selection with keys (25 pt)**: On the main page select tracks with the down and up arrow keys.

    - a. If no track is selected yet, press the down key to select the first track (that is, the list item should have the `selected` style class).
    - b. If no track is selected yet, press the up key to select the last track.
    - c. Pressing further up and down keys will select the next or previous track.
    - d. Moving from the first track to the previous track will select the last one.
    - e. Moving from the last track to the next track will select the first one.
    - f. After selecting a track by clicking on it, we can move on from that track with the up and down keys.
    
    **Technical help**: it is worth listening to the keystroke event at document level, where only `keydwon` and `keyup` events arrive.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/midi/5.png)

6. **Felvétel rögzítése(50 pt)**: Tedd lehetővé, hogy egy kiválasztott trackhez felvehessük a hangjegysort. A műveleteket billentyűkkel vezéreljük.

    - a. Az 1-8 billentyűket lenyomva a zongora megfelelő elemei kerülnek kijelölésre, ahogy az a zongorabillentyűkön fel is van tüntetve (azaz pl. az 1-es gomb a C hangnak felel meg). A `keyboard` stílusosztályú elemen belül a megfelelő `div` elem `active` stílusosztállyal való ellátása aktivál egy billentyűt. A billentyűt elengedve az aktiválás megszűnik.
    - b. A szóköz megnyomásával felvétel üzemmódba kerülünk. Ehhez az SVG elem `active` stílusosztályú lesz. A szóköz újbóli megnyomásával a felvétel üzemmód kikapcsol, az `active` stílusosztály lekerül az SVG elemről.
    - c. Felvétel üzemmódban el kell tárolni, hogy az 1-8 billentyűket a szóköz lenyomása óta mikor nyomtuk le (`start`) és engedtük fel (`end`). Ugyanaz a billentyű többször is lenyomásra kerülhet, de egyszerre csak egy billentyűt nyomunk le. A felvétel befejeztével a hangjegysor JSON-je jelenjen meg a többsoros beviteli mezőben!

    **Technikai segítség**: dokumentumszinten érdemes a billentyűleütéseket vizsgálni, ahova csak a `keydown` és `keyup` események érkeznek meg.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/midi/6.png)

7. **Felvétel AJAX mentése (40 pt)**: Kiválasztás és felvétel után a többsoros beviteli mezőben megjelenő hangjegysor JSON-t mentsük el a kiválasztott track `notes` mezőjében a háttérrendszerben AJAX POST kéréssel! Ehhez ki kell választani egy tracket, érvényes JSON-nel kitölteni a többsoros beviteli mezőt (nem kell feltétlenül felvétellel megtenni ezt), majd a "Save to selected track" feliratú gomb megnyomásával AJAX POST kérést küldeni a szervernek, amely az adott trackhez elmenti a JSON-t. A kérés során a kiválasztott track azonosítóját az URL-ben `id` néven küldjük fel! Sikeres mentés után a gombban lévő `span` elembe írjunk egy `✔` jelet!

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/midi/7.png)
