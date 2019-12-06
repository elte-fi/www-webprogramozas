<style type="text/css">
main img {
    max-width: 100%;
}
main ul p, main ol p {
  display: block;
}
</style>

# Web programming zh -- Avengers

_2019. May 29._

## About

- Tasks must be solved on the `webprogramming.inf.elte.hu` server. Within your `www` folder, create an `avengers` folder and create your solution there.
- You can test this task on the [tester page](http://webprogramozas.inf.elte.hu:1701/tester).
- There are 3 hours to complete the task.
- The look-out of the solution doesn't matter, just the functionality of the pages.
- The tasks are not necessarily have to be sold in the order of the description, because most of the tasks are not based on the other, but if necessary, the prerequisites, even statically, must be provided.
- **Important** We can only verify the correctness of the operations through the user interface by displaying the data, not directly checking the data stored in the background.
- During the test you can use any kind of support material, but using human assistance is prohibited, except for the help from the present teachers.
- After the test, we will perform a plagiarism check on the solutions, and we may call the creators of similar solutions for defending their solutions.
- Points:
    + 0-19 points: 1
    + 20-29 points: 2
    + 30-39 points: 2,5
    + 40-49 points: 3
    + 50-59 points: 3,5
    + 60-66 points: 4
    + 67-74 points: 4,5
    + 75-80 points: 5

## Task description

The Avengers and Thanos prepare for their final fight. Help organizing the team and the missions on one side, and collecting the infinity stones and snapping on the other!

0. **Preparations**

    **Preparing the data** You can store the data in a file or database, although using the database is recommended (in that semester). The application works with two types of data: the data of Avengers and the log of each mission.
    
    We keep a record of each avenger's name, real name, strength, speed and durability, and whether he/she is of terrial or not. Do not modify, add or delete this data!
    
    ```txt
    id  name            real_name          strength  speed  durability  terrial
    1   Iron Man        Tony Stark         85        58     85          1
    2   Captain America Steven Rogers      19        35     56          1
    3   Thor            Thor               100       92     100         0
    4   Hulk            Bruce Banner       100       47     100         1
    5   Black Widow     Natasha Romanova   13        27     32          1
    6   Hawkeye         Clint Barton       12        23     14          1
    7   Scarlet Witch   Wanda Maximoff     10        23     42          1
    8   Vision                             72        54     95          1
    9   Doctor Strange  Stephen Strange    10        12     84          1
    10  Black Panther   T'Challa           16        30     60          1
    11  Ant-Man         Scott Lang         10        23     28          1
    12  Star Lord       Peter Quill        20        20     30          0
    13  Groot                              85        33     70          0
    14  Rocket Raccoon                     5         23     28          0
    15  Spider-Man      Peter Parker       55        60     74          1
    16  War Machine     James Rhodes       80        63     100         1
    17  Falcon          Sam Wilson         13        50     28          1
    18  Winter Soldier  Bucky Barnes       32        35     65          1
    19  Fury            Nick Fury          11        23     42          1
    20  Loki            Loki               57        47     85          0
    ```

    For missions, we keep track of the name of the mission, the strength, speed, and durability it requires, and the two avengers sent on the mission. Please do not modify these records below, but you will need to add new data later.

    ```txt
    id   name                terrial  strength  speed  durability  avenger1  avenger2
    1    Sokovia             1        50        30     60          iron-man  captain-america
    2    Escape from prison  0        20        70     40          star-lord rocket-raccoon
    ```
    
    In JSON format:

    ```json
    [
        {"id": "1", "name": "Iron Man", "real_name": "Tony Stark", "strength": 85, "speed": 58, "durability": 85, "terrial": true},
        {"id": "2", "name": "Captain America", "real_name": "Steven Rogers", "strength": 19, "speed": 35, "durability": 56, "terrial": true},
        {"id": "3", "name": "Thor", "real_name": "Thor", "strength": 100, "speed": 92, "durability": 100, "terrial": false},
        {"id": "4", "name": "Hulk", "real_name": "Bruce Banner", "strength": 100, "speed": 47, "durability": 100, "terrial": true},
        {"id": "5", "name": "Black Widow", "real_name": "Natasha Romanova", "strength": 13, "speed": 27, "durability": 32, "terrial": true},
        {"id": "6", "name": "Hawkeye", "real_name": "Clint Barton", "strength": 12, "speed": 23, "durability": 14, "terrial": true},
        {"id": "7", "name": "Scarlet Witch", "real_name": "Wanda Maximoff", "strength": 10, "speed": 23, "durability": 42, "terrial": true},
        {"id": "8", "name": "Vision", "real_name": "", "strength": 72, "speed": 54, "durability": 95, "terrial": true},
        {"id": "9", "name": "Doctor Strange", "real_name": "Stephen Strange", "strength": 10, "speed": 12, "durability": 84, "terrial": true},
        {"id": "10", "name": "Black Panther", "real_name": "T'Challa", "strength": 16, "speed": 30, "durability": 60, "terrial": true},
        {"id": "11", "name": "Ant-Man", "real_name": "Scott Lang", "strength": 10, "speed": 23, "durability": 28, "terrial": true},
        {"id": "12", "name": "Star Lord", "real_name": "Peter Quill", "strength": 20, "speed": 20, "durability": 30, "terrial": false},
        {"id": "13", "name": "Groot", "real_name": "", "strength": 85, "speed": 33, "durability": 70, "terrial": false},
        {"id": "14", "name": "Rocket Raccoon", "real_name": "", "strength": 5, "speed": 23, "durability": 28, "terrial": false},
        {"id": "15", "name": "Spider-Man", "real_name": "Peter Parker", "strength": 55, "speed": 60, "durability": 74, "terrial": true},
        {"id": "16", "name": "War Machine", "real_name": "James Rhodes", "strength": 80, "speed": 63, "durability": 100, "terrial": true},
        {"id": "17", "name": "Falcon", "real_name": "Sam Wilson", "strength": 13, "speed": 50, "durability": 28, "terrial": true},
        {"id": "18", "name": "Winter Soldier", "real_name": "Bucky Barnes", "strength": 32, "speed": 35, "durability": 65, "terrial": true},
        {"id": "19", "name": "Fury", "real_name": "Nick Fury", "strength": 11, "speed": 23, "durability": 42, "terrial": true},
        {"id": "20", "name": "Loki", "real_name": "Loki", "strength": 57, "speed": 47, "durability": 85, "terrial": false}
    ]
    ```
    ```json
    [
        {"id": "1", "name": "Sokovia", "terrial": true, "strength": 50, "speed": 30, "durability": 60, "avenger1": "iron-man", "avenger2": "captain-america"},
        {"id": "2", "name": "Escape from prison", "terrial": false, "strength": 20, "speed": 70, "durability": 40, "avenger1": "star-lord", "avenger2": "rocket-raccoon"}
    ]
    ```

    For database, import this SQL:

    ```sql
    CREATE TABLE `avengers` (
      `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
      `name` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
      `real_name` varchar(50) COLLATE utf8_hungarian_ci DEFAULT NULL,
      `strength` int(10) UNSIGNED NOT NULL,
      `speed` int(10) UNSIGNED NOT NULL,
      `durability` int(10) UNSIGNED NOT NULL,
      `terrial` tinyint(1) NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

    INSERT INTO `avengers` (`id`, `name`, `real_name`, `strength`, `speed`, `durability`, `terrial`) VALUES
    (1, 'Iron Man', 'Tony Stark', 85, 58, 85, 1),
    (2, 'Captain America', 'Steven Rogers', 19, 35, 56, 1),
    (3, 'Thor', 'Thor', 100, 92, 100, 0),
    (4, 'Hulk', 'Bruce Banner', 100, 47, 100, 1),
    (5, 'Black Widow', 'Natasha Romanova', 13, 27, 32, 1),
    (6, 'Hawkeye', 'Clint Barton', 12, 23, 14, 1),
    (7, 'Scarlet Witch', 'Wanda Maximoff', 10, 23, 42, 1),
    (8, 'Vision', '', 72, 54, 95, 1),
    (9, 'Doctor Strange', 'Stephen Strange', 10, 12, 84, 1),
    (10, 'Black Panther', 'T''Challa', 16, 30, 60, 1),
    (11, 'Ant-Man', 'Scott Lang', 10, 23, 28, 1),
    (12, 'Star Lord', 'Peter Quill', 20, 20, 30, 0),
    (13, 'Groot', '', 85, 33, 70, 0),
    (14, 'Rocket Raccoon', '', 5, 23, 28, 0),
    (15, 'Spider-Man', 'Peter Parker', 55, 60, 74, 1),
    (16, 'War Machine', 'James Rhodes', 80, 63, 100, 1),
    (17, 'Falcon', 'Sam Wilson', 13, 50, 28, 1),
    (18, 'Winter Soldier', 'Bucky Barnes', 32, 35, 65, 1),
    (19, 'Fury', 'Nick Fury', 11, 23, 42, 1),
    (20, 'Loki', 'Loki', 57, 47, 85, 0);

    CREATE TABLE `missions` (
      `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
      `name` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
      `terrial` tinyint(1) NOT NULL,
      `strength` int(11) NOT NULL,
      `speed` int(11) NOT NULL,
      `durability` int(11) NOT NULL,
      `avenger1` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
      `avenger2` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

    INSERT INTO `missions` (`id`, `name`, `terrial`, `strength`, `speed`, `durability`, `avenger1`, `avenger2`) VALUES
    (1, 'Sokovia', 1, 50, 30, 60, 'iron-man', 'captain-america'),
    (2, 'Escape from prison', 0, 20, 70, 40, 'star-lord', 'rocket-raccoon');
    ```

    **Recommended page structure for the main page**

    The main page (`index.php`) should be structured like this:

    ```html
    <!DOCTYPE html>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="http://webprogramozas.inf.elte.hu/webprog/zh/avengers/index.css">

    <div class="container-fluid">
      <div class="row">
        <div class="col-md">
          <h2>Avengers</h2>
          <div class="card">
            <div class="card-body">
              <p class="card-text d-flex justify-content-end">
                <span class="mx-1 badge badge-primary">Strength</span>
                <span class="mx-1 badge badge-success">Speed</span>
                <span class="mx-1 badge badge-danger">Durablity</span>
              </p>
            </div>
            <ul class="list-group list-group-flush avengers-list">
              <li class="list-group-item" data-id="1">
                <div class="d-flex align-items-center p-1">
                  <span class="avenger iron-man"></span>
                  <h5 class="m-2 flex-fill">
                    <a href="#">
                      Iron Man
                    </a>
                    <small class="text-muted">
                      Tony Stark
                      <i class="fas fa-globe-africa"></i>
                    </small>
                  </h5>
                  <div class="d-flex flex-nowrap">
                    <span class="mx-1 badge badge-primary">50</span>
                    <span class="mx-1 badge badge-success">80</span>
                    <span class="mx-1 badge badge-danger">60</span>
                  </div>
                </div>
                <img src="http://webprogramozas.inf.elte.hu/webfejl2/zh/avengers/noise.png">
              </li>
            </ul>
          </div>
        </div>

        <div class="col-md">
        <h2>Missions</h2>
          <div class="card mission-form">
            <h4>New mission</h4>
            <div class="alert alert-success">
              Sikeres mentés
            </div>
            
            <div class="alert alert-danger">
              Hibaüzenetek
            </div>

            <form action="#" class="card-body">
              <div class="form-group row">
                <label for="name" class="col-sm-5 col-form-label">Name</label>
                <input type="text" name="name" class="form-control col-sm-7" id="name">
              </div>
              <div class="form-group">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="terrial" id="terrial1" value="1">
                  <label class="form-check-label" for="terrial1">Terrial</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="terrial" id="terrial2" value="0">
                  <label class="form-check-label" for="terrial2">Space</label>
                </div>
              </div>
              <div class="form-group row">
                <label for="range1" class="col-sm-5 col-form-label">Strength</label>
                <input type="range" name="strength" class="form-control col-sm-5" id="range1" min="1" max="100">
                <span class="col-sm-2"></span>
              </div>
              <div class="form-group row">
                <label for="range2" class="col-sm-5 col-form-label">Speed</label>
                <input type="range" name="speed" class="form-control col-sm-5" id="range2" min="1" max="100">
                <span class="col-sm-2"></span>
              </div>
              <div class="form-group row">
                <label for="range3" class="col-sm-5 col-form-label">Durability</label>
                <input type="range" name="durability" class="form-control col-sm-5" id="range3" min="1" max="100">
                <span class="col-sm-2"></span>
              </div>
              <div class="form-group row">
                <label for="avenger1" class="col-sm-5 col-form-label">Avenger1</label>
                <input type="text" name="avenger1" class="form-control col-sm-6" id="avenger1">
                <span class="avenger"></span>
              </div>
              <div class="form-group row">
                <label for="avenger2" class="col-sm-5 col-form-label">Avenger2</label>
                <input type="text" name="avenger2" class="form-control col-sm-6" id="avenger2">
                <span class="avenger"></span>
              </div>
              <div class="form-group row">
                <button type="submit" class="btn btn-primary">New mission</button>
              </div>
            </form>
          </div>

          <div class="card">
            <h4>Mission list</h4>
            <ul class="list-group list-group-flush mission-list">
              <li class="list-group-item" data-id="1">
                <div class="d-flex align-items-center p-1">
                  <h5 class="m-2 flex-fill">
                    Find Thanos
                    <small class="text-muted">
                      <i class="fas fa-rocket"></i>
                    </small>
                  </h5>
                  <div>
                    <span class="mx-1 badge badge-primary">30</span>
                    <span class="mx-1 badge badge-success">70</span>
                    <span class="mx-1 badge badge-danger">20</span>
                  </div>
                  <span class="mx-1 avenger rocket-raccoon"></span>
                  <span class="mx-1 avenger star-lord"></span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-md">
          <h2>Thanos</h2>
          <div class="card thanos">
            <img src="http://webprogramozas.inf.elte.hu/webfejl2/zh/avengers/gauntlet.jpg" class="card-img thanos">
            <div class="stone-place stone1">
              <div class="stone"></div>
            </div>
            <div class="stone-place stone2">
              <div class="stone"></div>
            </div>
            <div class="stone-place stone3">
              <div class="stone"></div>
            </div>
            <div class="stone-place stone4">
              <div class="stone"></div>
            </div>
            <div class="stone-place stone5">
              <div class="stone"></div>
            </div>
            <div class="stone-place stone6">
              <div class="stone"></div>
            </div>
            <div class="gauntlet"></div>
          </div>
        </div>
      </div>
    </div>
    ```

    **Recommended structure of the detail page**

    The detail page (`card.php`) should be structured like this:

    ```html
    <!DOCTYPE html>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="http://webprogramozas.inf.elte.hu/webprog/zh/avengers/index.css">

    <div class="container">
      <div class="row">
        <div class="col-lg">
          <h2>Avengers</h2>
          <div class="card">
            <div class="row no-gutters">
              <div class="col-md-3">
                <span class="card-img avenger captain-america" style="width: 180px; height: 240px;">
              </div>
              <div class="col-md-9">
                <div class="card-body">
                  <h3 class="card-title">Captain America</h3>
                  <dl class="row">
                    <dt class="col-sm-3">Real name</dt>
                    <dd class="col-sm-9">
                      Steven Rogers
                    </dd>
                    <dt class="col-sm-3">Terrial</dt>
                    <dd class="col-sm-9">
                      Yes
                    </dd>
                    <dt class="col-sm-3">Strength</dt>
                    <dd class="col-sm-9">
                      <span class="badge badge-primary">70</span>
                    </dd>
                    <dt class="col-sm-3">Speed</dt>
                    <dd class="col-sm-9">
                      <span class="badge badge-success">50</span>
                    </dd>
                    <dt class="col-sm-3">Durability</dt>
                    <dd class="col-sm-9">
                      <span class="badge badge-danger">60</span>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>    
    ```

1. **Avengers list (10 pts)** List the avengers and their missions on the main page! Filename: `index.php`.

    - a. Display the avengers in the list with `avengers-list` class attribute. An avenger takes place in a list item with `list-group-item` class attribute. Display the name, real name (if any), strength, speed and durability of the avenger. The `data-id` attribute of the list item should include the avenger's `id`.

    - b. If the avenger is terrial (`terrial` is true), then the `fa-globe-africa` icon should appear inside the `i` element. If not terrial, then `fa-rocket`.

    - c. To display the avenger's picture, you need to write a classname derived from the avenger's name to the `span` element with `avenger` classname. Rewriting rules:
        - lowercase
        - dash instead of space
        - e.g. Iron Man --> `iron-man`
    
    - d. The avenger's name is a hyperlink. This should point to `card.php`, passing the value of `id` under the name `id` as a GET parameter.
    
    - e. Missions must be displayed as list items in the list with `mission-list` classname. For each mission, display the mission name, power, speed, and durability required for the mission. The `data-id` attribute of the list item should contain the `id` of the mission.

    - f. If the mission is terrial (`terrial` is true), then the `fa-globe-africa` icon should appear inside the `i` element. If not terrial, then `fa-rocket`.

    - g. Display the portrait of the avenger duo in the mission! To do so, use the lowercase dash-styled name of the Avengers in the `span` element with `avenger` classname (see subtask c.).

    ![](http://webprogramozas.inf.elte.hu/webfejl2/zh/avengers/1.png)

2. **Show the details of an avenger (8 pts)** On the `card.php` page, display the data of an avenger, whose `id` is received as a parameter in the URL. The displayed data: name, real name (if any), power, speed, durability; earth or space (`terrial` based on `yes` or `no`).

    The page should also have a link back to the main page!

    ![](http://webprogramozas.inf.elte.hu/webfejl2/zh/avengers/2.png)

3. **Add new mission (17 pts)** There is a form for adding new missions at the top of the middle column on the main page.

    - a. The form contains the following fields:

      - mission name (name: `name`, required, error messages:` Name is required`)
      - earth or space mission (name: `terrial`, radio buttons, required, value: `1` (terrial), `0` (space), error messages: `Terrial is required`)
      - strength (name: `strength`, range slider, required, number, value between 1 and 100, error messages: `Strength is required`, `Strength is not an integer`, `Strength should be between 1 and 100`)
      - speed (name: `speed`, range slider, required, number, value between 1 and 100, error messages: `Speed ​​is required`, `Speed is not an integer`, `Speed should be between 1 and 100`)
      - durability (name: `durability`, range slider, required, number, value between 1 and 100, error messages: `Durability is required`, `Durability is not an integer`, `Durability should be between 1 and 100`)
      - 1\. avenger dash-styled, lowercase name (name: `avenger1`, text input field, required, error messages: `Avenger1 is required`, `Avenger1's name should be dashed`)
      - 2\. avenger dash-styled, lowercase name (name: `avenger2`, text input field, required, error messages: `Avenger2 is required`, `Avenger2's name should be dashed`)

    - b. For invalid data, the appropriate error messages (see above) should appear in an element with `alert-danger` classname (not necessarily in a  structured way, e.g. list, instead `var_dump` is enough).

    - c. In this case, make sure that the form maintains its state, that is, by writing back the submitted data in the input fields.

    - d. For valid data, save them in the backend, and then display the new mission in the mission list on the main page.

    - e. In this case show a success message in an element with `alert-success` classname with a text indicating the success.

    ![](http://webprogramozas.inf.elte.hu/webfejl2/zh/avengers/3.png)

4. **Display the range slider value (10 pts)** When adding missions, you do not see the range slider value when dragging the slider. Let's display them for all three sliders!

    - a. After loading the main page, display the current value of the slider within the `span` elements immediately after the sliders.

    - b. Dragging the slider, update the displayed value. Technical support: use the `input` event!

    ![](http://webprogramozas.inf.elte.hu/webfejl2/zh/avengers/4.png)

5. **Collecting the Inifinity Stones (10 pts)** Thanos is determined to collect the infinity stones. The stones appear as small, pulsating circles on the screen. Structurally, the stones are `divs` with `stone` classname, which are located in their place (the `stone-place` classname).

    - a. Clicking on a stone, give the stone a `collected` classname! This puts the stone in its place.

    - b. Refine this process by first moving the stone into its place, and then applying the `collected` classname on it. To move, simply set the `top` and `left` properties of the style of the stone to the position of the `div` element with `stone-place` classname containing the stone. You can get this position using the `getBoundingClientRect()` method. Once the stone is in its place (at the end of the movement), apply the `collected` classname to it.

    - c. Ha az összes kő begyűjtésre került, azaz mindegyiknek van `collected` stílusosztálya, akkor a `gauntlet` stílusosztályú `div`-nek add az `activated` stílusosztályt, ezzel a kesztyűt aktiválod.
    - c. If all the stones have been collected, that is, each has a `collected` classname, then add the `activated` classname to the `div` with `gauntlet` class to activate the glove.

    ![](http://webprogramozas.inf.elte.hu/webfejl2/zh/avengers/5.png)

6. **Thanos snap (10 pts)** If the glove is active, then Thanos can snap to halve the number of Avengers.
    
    - a. If the glove is active (the `div` of the `gauntlet` class has an `activated` class, too), then by clicking on it, select 10 of the 20 avengers randomly, and apply the `dust` class to those list items. As a result, the appropriate avengers will turn into dust.

    - b. By clicking on the active glove again, the avengers return, that is, remove the `dust` style class.

    ![](http://webprogramozas.inf.elte.hu/webfejl2/zh/avengers/6.png)

7. **Selecting the two most suitable avengers for a new mission (15 pts)** When creating a new mission, you can use the range sliders to determine the difficulty of each parameter of that mission. Let's make an AJAX function that selects which two avengers suit the mission based on the current value of the sliders. Suitability is determined by looking at how much the average of each parameter (power, speed, durability) for each avenger duo differ from the value of a given parameter of the mission. These differences are calculated and summed for each of the three parameters (force, velocity, durability) and the most appropriate pair will be those for whom this value is the smallest. For the `change` event of the sliders, send an AJAX request to a PHP script you have written, specifying `strength`, `speed` and `durability` as GET parameters. And, based on the response from the server, display the two avatars of your choice in the `avenger` classed `span` elements after the input fields named `avenger1` and` avenger2`, by writing a dash-styled lower case name to the class attribute of the `span` element.

    ![](http://webprogramozas.inf.elte.hu/webfejl2/zh/avengers/7.png)

