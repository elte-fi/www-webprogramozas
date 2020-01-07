<style type="text/css">
main img {
    max-width: 100%;
}
main ul p, main ol p {
  display: block;
}
</style>

# Web Programming End Term -- Mixer

_January 7th, 2020. 1 pm - 4 pm_

## Preparations

- Use the `webprogramming.inf.elte.hu` server to work. In your `www` folder, create a `mixer` subfolder. Work in this subfolder.
- Use the  [automated tester](http://webprogramozas.inf.elte.hu:1701/tester). Always select the problem you're
working on. You'll see the results sooner, and it also eases the load on the server. As the end of the exam approaches, also make sure to run the complete test suite at once. The tester's score will determine your
grade.
- You have 3 hours for the exam.
- We don't grade page design or code quality. Focus on achieving the highest possible score on the automated tests.
- You may choose to solve the problems in any order. We tried to keep dependencies between the problems to a minimum. Where there is a dependency, you may work around a missing piece by modifying the static page.
- Don't use a devtool that takes up resources on the server. The remote-ssh plugin for VSCode is such a tool. Students found using such a tool will be disqualified from the exam. Only use tools that upload or synchronize files, such as WinScp or FileZilla.
- The tests always use the UI for verifying correctness. There aren't any assertions that try to look at your .json files on the server.
- You may use any online resource during the test. However, it's not allowed to contact another person for help (in the room or via the internet). If you need help, contact an exam supervisor.
- Submissions are checked for similarities after the exam. Where two solutions appear too similar, you may be
asked to prove that you understand your own code.

- Grading:
    + 0- points: 1
    + 65- points: 2
    + 97- points: 2,5
    + 130- points: 3
    + 162- points: 3,5
    + 195- points: 4
    + 218- points: 4,5
    + 240-260 points: 5

## Problems

Create a web application for music producers. The application lets the user adjust the volume for a song's tracks.

0. **Preparations**

    Sample data is included in the starter pack below. The pack contains sample data in the JSON format. We recommend that you work with JSON in your own solution too. JSON sample data in turn is included in two formats: as an object with id-keys and record-values, and as a list of records that also contain ids. Use whichever format you find easier to work with.
    For those who'd still prefer a different format, the starter pack also contains sample data in Markdown. Import these files on [tableconvert.com](https://tableconvert.com)], and select the format you'd like to export this data to. That site also supports SQL output. Again, only convert the sample data if you absolutely cannot work with JSON. In case there is any difference, the JSON files are definitive.

    For this task you have to use two different kinds of data. The sample data contains:

    1. **Tracks**: A track is musical recording. We store its identifier (`id`), name (`name`), the name of
    the file that contains the recording (`filename`), the left-right balance (`balance`), the volume
    (`volume`), as well as a list of applied filters (`filters`).

        Don't change the sample tracks (`id`s between 1 and 5). However, you may add your own tracks.
        The automated tester may adjust the volumes for tracks 4 and 5.

        ```md
        | id | name            | filename     | balance | volume | filters                             |
        |----|-----------------|--------------|---------|--------|-------------------------------------|
        | 1  | Drum 1          | drum1.wav    | -10     | 35     | ["XCompressor"]                     |
        | 2  | Drum 2          | drum2.wav    | 15      | 40     | ["Compressor","FFT"]                |
        | 3  | Lead guitar     | lead.wav     | -20     | 60     | ["Compressor","Equalizer","Reverb"] |
        | 4  | Acoustic guitar | acoustic.wav | 20      | 30     | ["Pitch","Reverb"]                  |
        | 5  | Keyboard        | piano.wav    | 3       | 75     | ["FFT"]                             |
        ```

    2. **Filters**: This is a list of available filters. A filter consists of an identifier (`id`) and
      a name (`name`). Make no changes to the filters at all.

        ```md
        | id | name                     |
        |----|--------------------------|
        | 1  | Compressor               |
        | 2  | XCompressor              |
        | 3  | Delay                    |
        | 4  | Reverb                   |
        | 5  | Equalizer                |
        | 6  | FFT                      |
        | 7  | Gate                     |
        | 8  | Pitch                    |
        | 9  | Tune                     |
        | 10 | Low-frequency oscillator |
        ```

    Your solution will consist of two pages:

    1. the main page (`index.php`), and
    2. a page for creating new tracks (`new.php`).

    [DOWNLOAD STARTER PACK](http://webprogramozas.inf.elte.hu/webprog/zh/mixer/mixer.zip)

    For those of you who'd like to use a database, we recommend SQLite. It's a file-based database management system, and PHP is set up to work with it on the web programming server. As a UI, we recommend [phpLiteAdmin](http://webprogramozas.inf.elte.hu/webprog/zh/mixer/phpliteadmin.zip). Unzip the file in your project folder, and visit from your browser. The password is `admin`. To create new databases, the server will need write access on the folder.

1. **Number of bars on the status bar volume control (10 pt) test: | count number of characters**
Extend the main page (`index.php`) with a URL parameter (`bars`) to set the number of bars on the volume control in the status bar. For each bar, generate a `span` element that contains a `|` character. For example, `index.php?bars=145`. If the parameter is missing or it contains a negative number, generate 100 bars. Otherwise, show as many bars as the URL requests.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/mixer/1.png)

2. **Track listing (10 pt)** On the main page (`index.php`), show a list of tracks based on the data on the server.

    - a. Show the tracks in an HTML element with the id `tracks`. For each track, generate a div with the `track` class.
    - b. Within the div, use a `header` element to show the name of the track.
    - c. Track names should be links pointing to the main page. As a GET parameter, they should pass the track id. (`index.php?id=1`)
    - d. Set the value of the range slider according to the track's volume.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/mixer/2.png)

3. **Track details (20 pt)**: When clicking on a track's name, the main page should display a bottom-aligned details panel.

    - a. Hide the details panel (the element with id `details`) by default.
    - b. Show the details panel when there is a track id in the URL. Show the tracks details: name, filename, balance and volume.
    - c. In the element with the id `details`, place a `div` with the class `filters`. Include a `span` for each filter, in the appropriate order.

4. **New track (80 pt)**: The user should be able to add a new track by clicking on the "Add new track..." link. Filename: `new.php`

    - a. Add the following fields to the form:

      - track name (name: `name`, type: text input, required, at most 20 characters, error messages: `The track name is required`, `The track name is too long`).
      - track filename (name: `filename`, type: text input, required, format: filename.extension, eg. `drum.wav`. error messages: `The audio filename is required`, `The audio filename has a wrong format`)
      - balance (name: `balance`, type: number, required, integer, between -100 and 100, error messages: `The balance is required`, `The balance has to be an integer`, `The balance has to be between -100 and 100`)
      - volume (name: `volume`, type: number, required, integer between 0 and 100, a multiple of 5, error messages:  `The volume is required`, `The volume has to be an integer`, `The volume has to be between 0 and 100`, `The volume has to be a multiple of 5`)
      - filters (name: `filters`, type: multiline text input, not required, one filter a line, no error messages)

    - b. Your application should be prepared for any of these elements missing from the POST request, or being present with an empty or a malformed value. In such a case, include the appropriate error message in an
    element with the `errors` class (it's okay to just `var_dump` the messages into this element). Don't show
    this element when the user first visits the page.

    - c. Make sure the user doesn't lose the input when there is a validation error. Echo each value into
    the appropriate input field.

    - d. When the form is correct, save the data on the server, and redirect to the main page. This page should
    already show the new track.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/mixer/4.png)

5. **Better UI for adding filters (45 pt)** On the page for adding a new track (`new.php`), help the user by providing a list of available filters.

  - a. There are two lists on the page. On the left, the list has the id `all`. On the right, the list has the
    id `selected`.
  - b. In the list with id `all`, show the available filters. Use the data from the server.
  - c. The `⟶` button moves the selected element from the list on the left to the list on the right.
  - d. The `⟵` button moves the selected element from the list on the right to the list on the left.
  - e. The `↑` button moves up the selected element in the list on the right.
  - f. The `↓` button moves down the selected element in the list on the right.
  - g. The multiline input should always include exactly the elements from the `selected` list. Each
  element should have its own line.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/mixer/5.png)

6. **Value and color of volume slider (15 pt)**: Show the volume slider's value in the element above it, on the main page. Set the background color according to the slider's value.

    - a. For each track, display the volume value in the `span` above the slider.
    - b. Set the `span`'s background color according to the volume. Your style should set the background to  `hsl(h, s%, 50%)`, where `h = 100 - volume`, and `s = volume`. So when `volume = 80`, you'd set the background to `hsl(20, 80%, 50%)`.
    - c. Upon dragging a slider with the mouse, the value and background color of the respective span should change accordingly. Use the `input` event.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/mixer/6.png)

7. **Keyboard shortcuts (40 pt)**: On the main page, introduce keyboard shortcuts for selecting tracks and changing their volumes with the arrow keys.

    - a. When no tracks are selected, the right arrow selects the first track. (Applies the `active` class to the track's `div`).
    - b. When no tracks are selected, the left arrow selects the last track.
    - c. Further presses on the right or left arrow move the selection accordingly.
    - d. Moving right from the first track selects the last track.
    - e. Moving left from the last track selects the first track.
    - f. Space marks or unmarks the selected track. Toggle marked status by checking or unchecking the selected track's checkbox, and adding or removing the `selected` class on the track's `div`. It is possible to mark multiple tracks, by selecting the first, pressing space, then moving around with the arrow keys and pressing space again.
    - g. The `s` key marks all tracks by checking their checkboxes and setting their `selected` class. It has no effect on the `active` class.
    - h. The `d` key unmarks all tracks by unchecking their checkboxes and removing their `selected` class. It has no effect on the `active` class.
    - i. The up-down arrows modify the marked track's field by +/- 5, respectively.

    **Hint**: It is a good idea to listen to key-events on the document level, where only `keydown` and `keyup` propagate.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/mixer/7.png)

8. **Save volume using AJAX (40 pt)** The "Save" button in the top left corner should save each track's volume on the server. Use an AJAX POST request. If the save was successful, display a `✔` mark in the `span` element after the button.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/mixer/8.png)
