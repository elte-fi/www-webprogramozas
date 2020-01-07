<style type="text/css">
main img {
    max-width: 100%;
}
main ul p, main ol p {
  display: block;
}
</style>

# Web programming test -- MIDI editor

_January 7, 2020. 9 - 12 AM

## General information

- You should solve all task on the server `webprogramming.inf.elte.hu`. Create a folder called `midi` inside the `www` folder of your home directory and create your solution there.
- You can test your solution on the [test website](http://webprogramming.inf.elte.hu:1701/tester). Always select the subtask you wish to test. This way the test runs faster and you don't use extra resources on the server. At the end of the test run all the tests together to make sure that all your solutions are correct. You'll get your mark based on the tests you run on all the tasks.
- You have 3 hours to complete the test.
- The visuals and the quality of your code does not count in the evaluation. Only functionality is tested.
- You can solve the subtasks in any order you like. Most of the tasks don't use results from previous tasks but if necessary you should provide all requirements for the tester (even if you do it with static code).
- Don't use any development tool that uses the resources of the server (e.g. the Remote SSH plugin in VS Code). Only use tools that upload/snyc files to the server (e.g. WinSCP, FileZilla). All students using tools that are not allowed are disqualified from the exam!
- Important We can only verify the correctness of the operations through the user interface by displaying the data, not directly checking the data stored in the background.
- During the test you can use any kind of support material, but using human assistance is prohibited, except for the help from the present teachers.
- After the test, we will perform a plagiarism check on the solutions, and we may call the creators of similar solutions for defending their solutions.

- Grading:
    + 0- points: 1
    + 65- points: 2
    + 97- points: 2,5
    + 130- points: 3
    + 162- points: 3,5
    + 195- points: 4
    + 218- points: 4,5
    + 240-260 points: 5

## Task description

Your task is to create a MIDI editor in which you can create, list and modify (add notes to) MIDI tracks.

0. **Preparations**

    Sample data is included in the starter pack below. The pack contains sample data in the JSON format. We recommend that you work with JSON in your own solution too. JSON sample data in turn is included in two formats: as an object with id-keys and record-values, and as a list of records that also contain ids. Use whichever format you find easier to work with.
    For those who'd still prefer a different format, the starter pack also contains sample data in Markdown. Import these files on [tableconvert.com](https://tableconvert.com)], and select the format you'd like to export this data to. That site also supports SQL output. Again, only convert the sample data if you absolutely cannot work with JSON. In case there is any difference, the JSON files are definitive.

    For this task you have to use two different kinds of data. The sample data contains:

    1. **Track**: this represents a music track. We store IDs (`id`), names (`name`), categories (`category`), the instrument to use to play the track (`instrument`), the color of the track (`color`) and the timeline of notes of the track (`notes`). This timeline contains the following: which note is played (`note`), from what time (`start`), to what time (`end`) -- in milliseconds. 
        
        Don't change the data from `id` 1-5. Later you can add new tracks to the data file. The tester may change the `notes` field of the tracks with the ID 4 and 5.

        ```md
        | id  | name        | category | instrument | color   | notes                                                                                                                                              |
        | --- | ----------- | -------- | ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
        | 1   | Hi hat 1    | Drum     | 114        | #ffeb3b | [{"note":"C","start":100,"end":600}]                                                                                                               |
        | 2   | Base bass   | Bass     | 45         | #ff5722 | [{"note":"D","start":0,"end":500},{"note":"A","start":1000,"end":2000},{"note":"B","start":2000,"end":2500},{"note":"C+","start":2500,"end":3000}] |
        | 3   | Main melody | Melody   | 4          | #03a9f4 | [{"note":"C","start":0,"end":100},{"note":"D","start":100,"end":200},{"note":"E","start":300,"end":400}]                                           |
        | 4   | Beat        | Drum     | 114        | #ffc107 | [{"note":"C","start":1000,"end":1500},{"note":"E","start":2000,"end":2500},{"note":"G","start":3000,"end":3500}]                                   |
        | 5   | Cello       | String   | 27         | #8bc34a | [{"note":"D","start":0,"end":2000},{"note":"F","start":2000,"end":4000},{"note":"B","start":4000,"end":6000},{"note":"A","start":6000,"end":8000}] |
        ```

    2. **Instrument**: a list of musical instruments that can be used. It contains an ID (`id`) nad a name (`name`) field. This data should not be changed, added to or modified in any way. Below is only a sample of the data. The full list is in the JSON file in the download.

        ```md
        | id  | name             |
        | --- | ---------------- |
        | 1   | Grand Piano      |
        | 2   | Bright Piano     |
        | 3   | Honky-tonk Piano |
        | 4   | MIDI Grand Piano |
        | 5   | Harpsichord      |
        ```

    Your solution should contain 2 pages:

    1. main page (`index.php`)
    2. new tack page (`new.php`)

    [DOWNLOAD STARTER PACK](http://webprogramozas.inf.elte.hu/webprog/zh/midi/midi.zip)

    If you wish to use a database manager in your solution then you can use the local, file based SQLite database manager. The server's PHP supports this. For a graphical interface you can use [phpLiteAdmin](http://webprogramozas.inf.elte.hu/webprog/zh/midi/phpliteadmin.zip): you have to extract the PHP file into your project folder and open it in your browser. The password is `admin`. You have to give write permissions to the server on your project folder to make the database manager work.
    
1. **Hiding parts of the page (20 pts)** On the main page (`index.php`) based on the `hide` parameter that is supplied via the URL, some parts of the page can be hidden (i.e. are not shown in the markup, in the DOM). Parts that can be hidden: `tracks`, `pianoroll`, `keyboard`. These values represents `div` elements on the site that have the same CSS classes. If you want to hide more than one such element you can pass a comma-separated list via the URL.

    - a. Without a `hide` parameter (`index.php`) everything is visible.
    - b. `index.php?hide=tracks`: the track list (`div` with the class `tracks`) is hidden
    - c. `index.php?hide=pianoroll`: the current music track (`div` with the class `pianoroll`) is hidden
    - d. `index.php?hide=keyboard`: the piano keys (`div` with the class `keyboard`) is hidden
    - e. `index.php?hide=tracks,pianoroll`: the track list and the current music track is hidden
    - f. etc.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/midi/1.png)

2. **Listing tracks (20 pts)** List all the tracks stored in the backend data source on the main page. (`index.php`)!

    - a. All tracks should be inside list in a `div` with the `tracks` class. One track should be represented by a list item. Show the name of the track, the instrument in parentheses `()` and the category in a `span` element.
    - b. The color of the list item is provided via the `style` attribute.
    - c. The `data-id` attribute of the list item should contain the `id` of the track.
    - d. The list item's `data-notes` attribute should contain the notes stored in JSON format. **Hint**: as the JSON data contains `"` characters you should set the attribute with the `'` symbol in HTML:

        ```html
        <li data-id="1" data-notes='[{"note":"C","start":100,"end":600}]'>
        ```

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/midi/2.png)

3. **Create new track (70 pts)**: Create a page where you can add a new track to the data source. This page is accessible with the "Add new track..." link. File name: `new.php`

    - a. The form contains the following fields:

      - the name of the track (name: `name`, type: text input, required, error messages: `The track name is required`)
      - the color of the track (name: `color`, type: szín, required, format: hexadecimal color code, e.g. `#1234af`, error messages: `The track color is required`, `The track color has a wrong format`)
      - the category of the track (name: `category`, type: text input with data list, required, error messages: `The category is required`)
      - the instrument to use (name: `instrument`, type: dropdown, required, number, error messages: `The instrument is required`, `The instrument has to be an integer`)

    - b. All the above mentioned fields can be missing from the POST request, can be empty or filled with bad values. In any of these cases you have to show the appropriate error messages (listed above) in an element with the class `errors` (not necessarily in a structured way, e.g. list, instead `var_dump` is enough). This error messages element should not be visible when the page first loads.

    - c. In case of an error make sure that the form maintains its state, that is, by filling the fields it with the submitted data.

    - d. If there are no errors create the new track in the backend data source. After adding the new element the show the main page where the new track is already visible.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/midi/3.png)

4. **Selecting a track and showing its notes (35 pt)**: On the main page when clicking on a track show the notes for the track in the multiline input field on the page in JSON format and also in a graphical format above (pianoroll).

    - a. When clicking on a track it should be selected (add a `selected` class to the list item corresponding to the track).
    - b. When clicking on a track the JSON format notes stored in the `data-notes` attribute should be visible in the multiline input field.
    - c. Create a visualization for the JSON data in the pianoroll area. This should be visible when clicking on the "Show JSON in SVG" button. The graphical representation should be done with the SVG element already in the page. Each note is represented by a `rect` element inside the SVG: 
        - Its `x` attribute is the `start` value of the note, 
        - its `width` attribute is the time between `end` and `start` values (ms), 
        - its `height` attribute always `10`, 
        - its `y` attribute is determined like this: 
            - in case of the note `C` the value is: 70
            - in case of the note `D` the value is: 60
            - in case of the note `E` the value is: 50
            - in case of the note `F` the value is: 40
            - in case of the note `G` the value is: 30
            - in case of the note `A` the value is: 20
            - in case of the note `B` the value is: 10
            - in case of the note `C+` the value is: 0

        ```html
        <svg>
            <rect x="100" y="70" width="500" height="10"></rect>
        </svg>
        ```
    - d. Clicking on the track should also show the track's notes in this visualization.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/midi/4.png)

5. **Selecting a track with the keyboard (25 pts)**: Make it possible to select tracks with the keyboard (up and down buttons).

    - a. If there is no track selected then pressing the down button the first track becomes selected (gets the `selected` CSS class).
    - b. If there is no track selected then pressing the up button selects the last track.
    - c. Pressing the up and down button moves to the previous/next track.
    - d. Pressing the up button when the first track is selected causes the last track to be selected.
    - e. Pressing the down button when the last track is selected causes the first track to be selected.
    - f. When selecting a track with the mouse all keyboard movements become relative to the track selected with the mouse.
    
    **Hint**: it is recommended to handle events on the document level where only `keydown` and `keyup` events are registered.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/midi/5.png)

6. **Record notes (50 pts)**: Make it possible to record new notes for a track. This is controlled by the keyboard.

    - a. Pressing the number 1-8 on the keyboard causes the keys on the piano to be selected as it is shown on the keyboard (i.e. number 1 represents the key C on the piano). Activate piano keys by adding the `active` class to the appropriate `div` within the `keyboard` element. Releasing the pressed key ends the `ąctive` state on a piano key.
    - b. Pressing the spacebar causes the program to go to "recording" state. Add the `active` class to the SVG element. Pressing the spacebar again ends the "recording" state, the `active` class is removed from the SVG element.
    - c. When in "recording" mode you should store the time of the keypress (`start`) and key release (`end`) since pressing the spacebar for the numbers 1-8. The same key can be used multiple times in the tune but only one key can be pressed at the same time. When the recording is complete it's JSON representation should show up in the multiline input field.

    **Hint**: it is recommended to handle events on the document level where only `keydown` and `keyup` events are registered.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/midi/6.png)

7. **Saving the recording with AJAX (40 pts)**: After selecting a track and recording a new tune the JSON should be visible in the multiline input field. This `notes` value for the currently selected track can be saved on the server with a POST AJAX request. To do this, you have to select a track, fill the multiline input field with a valid JSON (not necessarily with the recording function) and click the "Save to selected track" button. Pressing the button sends an AJAX POST request to the server that stores the new JSON tune for the selected track. The ID of the selected track should be sent in the URL with the name `id`. After a successful save change the text in the  `span` within the button to a checkmark (`✔`)!

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/midi/7.png)
