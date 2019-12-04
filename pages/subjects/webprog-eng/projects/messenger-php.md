# Messengers -- Web programming PHP home project

The adventures of the main chamberlain and the messengers continue on the server side. Add server-side functionality to the game written in your JavaScript home project.

## Tasks

1. **Home page and trial game** The home page should have a logo and a brief description of the game, and here anyone can play with the game of the JavaScript home project. (That is, the homepage itself is the JavaScript home project with some small modifications.)

2. **Registration** Be able to register in the application (e.g. on a separate page). The registraion form requires a name, password, and email address. Each field is required, and verify the format of the email address (the format should be displayed around the email field, e.g. as a placeholder). The validation must be performed on both the client and the server side.

3. **Authentication** A user may log in to the application at any time. For this the email address and password should be given, both of them are required, and check the format of the email field! After logging in, the name the user specified during registration should appear on further pages. The logged-in user may log out.

4. **Puzzle list** After logging in, the user is redirected to a list page, where the stored puzzles are listed. The puzzle list contains the name and difficulty (1-4) of the puzzle, and informations on how many users have been solved the puzzle, and whether the logged-in user has already solved it or not.

5. **Solving a puzzle** Clicking on a puzzle in the list will load the selected puzzle on another page, where we can solve it. At the end of the game, the fact, that the user has solved the puzzle, must be stored on the server for that user and that puzzle (via either a normal or an AJAX call).

6. **Saving and loading the game state** It should be possible to save the game state while playing, but now the data should be stored on the server with an AJAX call instead of using the local storage of the browser. When the user opens a puzzle, list the saved game states too for the logged-in user and for that puzzle (gamestate-list). Identify a gamestate with the timestamps of the save. Clicking on a timestamp, load the selected game state with an AJAX call! After a successful game state save, the new game state should appear in the gamestate-list!

7. **New puzzle** Prepare a special user (name: `admin`, email:` admin @ admin.com`, password: `admin`) who has access to one more function: adding a new puzzle. On this new page, the user can enter the name, difficulty (1-4), size (NxM) of the new puzzle, and can edit where the numbers are. There is no restriction on how to do this.
    
    - Someone might be setting and displaying a table, and then drawing lines on the table with the mouse as if they were playing. the same number should be assigned to the two ends of a drawn line. Here the lines can also be deleted, eg. with clicking the right button.
    - It is also possible that someone put a `textarea` on the page, and edit a JSON text that was already provided as an example in the JavaScript home project (or maybe your own JSON format). The JSON can be assumed to be correct and does not need to be verified.

        ```json
        [
            [1,2,3,0,0],
            [0,0,0,4,0],
            [0,4,2,0,0],
            [0,0,0,0,0],
            [0,0,1,3,0],
        ]
        ```

        Saving a puzzle, it appears on the list page.

        The admin can also delete puzzles.

## Notes

- Of course we welcome visually good-looking solutions, but there is no expectation about the appearance. It is the functionally, which must be correct in the application.
- If your JavaScript home project was not perfect, you don't need to correct it in this submission. If, for example, normal game didn't work, checking the solution wasn't good, etc., then this can be bypassed by adding a button to "solve" the puzzle. You can also simulate the current state of the game with the content of a textarea, and save and load it with AJAX.

## Points

- Home page: From the home page, the game is accessible and playable. (required)
- Registration: You can register, and log in with the registered data. (1 point)
- Authentication: You can log in and out. (required)
- Puzzle list: When logged in, the puzzle list with puzzle names and difficulty will be displayed. (required)
- Puzzle list: The puzzle list shows the number of users who has already solved the puzzle. (1 point)
- Puzzle list: The puzzle list shows whether the logged-in user has already solved it. (1 point)
- Game: By choosing a puzzle, it is playable. (required)
- Game: After solving the puzzle successfully, this information is saved on the server for the logged-in user. (1 point)
- Game states: When the game page loads, a list of game states saved for the current puzzle and saved by the logged-in user is displayed. (1 point)
- Game states: Clicking on a saved game state in the gamestate-list will load the game state with AJAX. (1 point)
- Game states: Game state can be saved via an AJAX call. (1 point)
- Game states: After a successful save, the new game state is displayed in the gamestate-list. (1 point)
- New puzzle: The admin user can add a new puzzle. (3 points)
- Delete a puzzle: The admin user can delete a puzzle. (1 point)
- No major bugs, no strange phenomena (2 points)
- 1 week delay (-2 points)
- 2 weeks delay (-4 points)
- more than 2 weeks late (not accepted, no grade)
- The page should contain the following statements: (required)

    ```txt
    <Name>
    <Neptun ID>
    <Subject & Assignment name>
    <Submission date>
    This solution was submitted and prepared by <Name, Neptun ID> for the <Assignment name> assignment of the <Course name> course. 
    I declare that this solution is my own work. 
    I have not copied or used third party solutions. 
    I have not passed my solution to my classmates, neither  made it public. 
    Students’ regulation of Eötvös Loránd University (ELTE Regulations Vol. II. 74/C. § ) states 
    that as long as a student presents another student’s work - or at least the significant part of it - as his/her own performance, 
    it will count as a disciplinary fault. 
    The most serious consequence of a disciplinary fault can be dismissal of the student from the University.
    ```

## Evaluation:

- 0-6 points: -0,5
- 7-11 points: 0
- 12-14 points: +0,5

## Beadás

Solutions must be submitted to the [evaluation system](http://webprogramozas.inf.elte.hu/ebr) in a zipped format.

Deadline: 2020. January 5. midnight

