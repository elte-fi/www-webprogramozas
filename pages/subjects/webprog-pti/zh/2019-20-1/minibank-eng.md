<style type="text/css">
main img {
    max-width: 100%;
}
main ul p, main ol p {
  display: block;
}
</style>

# Web programming retake test -- Mini bank

_2020. January 14. 9-12_

## Preparations

- Use the `webprogramming.inf.elte.hu` server to work. In your `www` folder, create a `minibank` subfolder. Work in this subfolder.
- Use the  [automated tester](http://webprogramozas.inf.elte.hu:2020/tester). **Always test first manually, and if you find that the feature is ready, check with the tester! Don't use the tester exclusively!** Always select the problem you're
working on. You'll see the results sooner, and it also eases the load on the server. You don't have to run the complete test suite, because we will sum up the points you got for each of the subtasks.
- You have 3 hours for the exam.
- We don't grade page design or code quality. Focus on achieving the highest possible score on the automated tests.
- **It's a good idea to start the solution with Task 1, because the other tasks are based on a successful listing of transactions!** Thereafter, you may choose to solve the problems in any order. We tried to keep dependencies between the problems to a minimum. Where there is a dependency, you may work around a missing piece by modifying the static page.
- Don't use a devtool that takes up resources on the server. The remote-ssh plugin for VSCode is such a tool. Students found using such a tool will be disqualified from the exam. Only use tools that upload or synchronize files, such as WinScp or FileZilla.
- The tests always use the UI for verifying correctness. There aren't any assertions that try to look at your .json files on the server.
- You may use any online resource during the test. However, it's not allowed to contact another person for help (in the room or via the internet). If you need help, contact an exam supervisor.
- Submissions are checked for similarities after the exam. Where two solutions appear too similar, you may be asked to prove that you understand your own code.
- Grading:
    + 0- points: 1
    + 50- points: 2
    + 75- points: 2,5
    + 100- points: 3
    + 120- points: 3,5
    + 140- points: 4
    + 160- points: 4,5 
    + 180-200 points: 5

## Task description

Create a simple web application to manage bank account transactions!

0. **Preparations**

    Sample data is included in the starter pack below. The pack contains sample data in the JSON format. We recommend that you work with JSON in your own solution too. JSON sample data in turn is included in two formats: as an object with id-keys and record-values, and as a list of records that also contain ids. Use whichever format you find easier to work with.
    For those who'd still prefer a different format, the starter pack also contains sample data in Markdown. Import these files on [tableconvert.com](https://tableconvert.com)], and select the format you'd like to export this data to. That site also supports SQL output. Again, only convert the sample data if you absolutely cannot work with JSON. In case there is any difference, the JSON files are definitive.

    1. **Transaction**: an object representing a banking transaction. We store its identifier (`id`), date of creation (`timestamp`), the source account number (`sourceAccount`), the name of the target account holder (`targetName`), the target account number (`targetAccount`), the message (`text`), the amount transferred (`value`), and the category of the transaction (`category`). 
        
        Don't change the sample transactions (`id`s between 1 and 7). However, you may add your own transactions later.
        The automated tester may adjust the category for transactions 6 and 7.

        ```md
        | id | timestamp             | sourceAccount              | targetName           | targetAccount              | text                                  | value  | category    |
        |----|-----------------------|----------------------------|----------------------|----------------------------|---------------------------------------|--------|-------------|
        | 1  | 1/1/2020 11:30:00 AM  | 10000000-00000000-00000000 | McDonalds            | 12345678-12345678-12345677 |                                       | 650    | Other       |
        | 2  | 1/7/2020 7:30:00 AM   | 10000000-00000000-00000000 | Coffee shop          | 12345678-12345678-12345678 |                                       | 690    | Restaurants |
        | 3  | 1/7/2020 4:30:00 PM   | 10000000-00000000-00000000 | Flat Mate            | 30000000-00000000-00000000 | Rent                                  | 80000  | Transfers   |
        | 4  | 1/10/2020 8:00:00 AM  | 20000000-00000000-00000000 | John Doe             | 10000000-00000000-00000000 | Monthly Salary                        | 200000 | Transfers   |
        | 5  | 1/10/2020 8:00:00 AM  | 20000000-00000000-00000000 | Flat Mate            | 30000000-00000000-00000000 | Alexander Victor LLC - Monthly Salary | 300000 | Transfers   |
        | 6  | 1/10/2020 5:00:00 PM  | 10000000-00000000-00000000 | Lidl                 | 12345678-12345678-12345679 |                                       | 50000  | Groceries   |
        | 7  | 1/10/2020 11:34:26 AM | 10000000-00000000-00000000 | Alexander Victor LLC | 20000000-00000000-00000000 | Test                                  | 10000  | Other       |
        ```

    2. **Accounts**: the possible account numbers. We store the identifier (`id`), the name (`name`) and the account number (`account_number`) for each account. Make no changes to the accounts at all.

        ```md
        | id | account_number             | name                 |
        |----|----------------------------|----------------------|
        | 1  | 10000000-00000000-00000000 | John Doe             |
        | 2  | 20000000-00000000-00000000 | Alexander Victor LLC |
        | 3  | 30000000-00000000-00000000 | Flat Mate            |
        ```

    The task consists of a single page: `index.php`.

    [DOWNLOAD STARTER PACK](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/minibank.zip)

    For those of you who'd like to use a database, we recommend SQLite. It's a file-based database management system, and PHP is set up to work with it on the web programming server. As a UI, we recommend [phpLiteAdmin](http://webprogramozas.inf.elte.hu/webprog/zh/mixer/phpliteadmin.zip). Unzip the file in your project folder, and visit from your browser. The password is `admin`. To create new databases, the server will need write access on the folder.

1. **List transactions for the first account (10000000-00000000-00000000) (PHP, 20 pts)** When displaying the main page (`index.php`), the transactions belonging to the first (10000000-00000000-00000000) account number must be displayed! All transactions must be displayed where the account number appears as either a source or a destination account!

    - a. Transactions must be displayed as rows of a table body with the id `transactions`!
    - b. Each table row has a `transaction` style class and stores the value of the `id` in its `data-id` attribute.
    - c. The first column of the row displays the timestamp when the transaction was created (`timestamp` field).
    - d. The second column contains several information:
        - The first `div` element represents the name of the owner of the transaction target account. (`targetName`)
        - In the second `div`, display the message. (`text`)
        - The third `div` has a form with a drop-down list containing the possible categories: Other, Restaurants, Transfers, Groceries. In the drop-down list, the option corresponding to the transaction category (`category`) is selected.
        - The fourth `div` is hidden due to the applied `hidden` style class. This `div` contains:
            - transaction identifier (`id`)
            - the source account of the transaction (`sourceAccount`)
            - the target account of the transaction (`targetAccount`)
        - Finally a button closes the column.
    - e. In the third column, the transaction value should be displayed with a negative sign on debit (the selected account number is the source account) and without a sign on credit (the selected account number is the target account).
    - f. Use the following formatting!
        - Display an empty message (`text`) in italics by applying the `empty` style class to the `div` of the message.
        - The value of the transaction should be three-segmented, i.e., there should be a space after every third decimal place! **Hint:** In PHP use `str_split`,` strrev`, and `implode` functions.
        - The transaction value should be red for debit and green for credit. To do this, apply the `credit` and `debit` style class, respectively, to the third table cell in the row.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/1.png)

2. **Switch between accounts (PHP, 15 pts)** The displayed account number should be given either as an URL parameter, or selected in the user interface!

    - a. Specify in the URL as the value of an `account` parameter, which account number you would like to display the transactions for. There are three account numbers in the system:
        - `index.php?account=10000000-00000000-00000000`
        - `index.php?account=20000000-00000000-00000000`
        - `index.php?account=30000000-00000000-00000000`
    - b. Choose the account number in the user interface. First, list the possible account numbers in the drop-down list in the form with id `account-filter` in the header of the page.
    - c. By selecting from the drop-down list and clicking on the "Select" button, after submitting the form, the transactions belonging to the selected account should be displayed!
    - d. After submission, the drop-down list shows the selected account number.
    - e. If the URL contains a bad value (non-existent account number) then the first account should be selected!

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/2.png)

3. **Calculation of the account balance (PHP, 12 pts)**: Display the balance of the selected account in the element with id `balance-in-huf` in the header of the page, that is, the sum of the signed values of the listed transactions. Format the amount three-segmneted, in the same way as the values of the transactions!

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/3.png)


4. **Add a new transaction (PHP, 58 pts)**: Let us record a new transaction! You can do this in the "New transaction" block on the right side of the page.

    - a. A `new-transaction` azonosítójú űrlap az alábbi mezőket tartalmazza:
    - a. The form with id `new-transaction` has the following fields:

        - name of the target account holder (name: `name`, type: text input field, required, error messages: `Name is required`)
        - target account number (name: `accountNumber`, type: text input field, required, format: 24 numbers, in 3 groups of 8 numbers, separated by a hyphen, e.g. 12345678-12345678-12345678, error messages: `Account number is required`, `Account number is invalid`)
        - message (name: `text`, type: text input field, error messages: `Text is to long! (max. 64 characters)`)
        - value of the transaction (name: `value`, type: text input field, required, integer, Not less than 1 and not more than the account balance, error messages: `Value is required`, `Value is not an integer`, `Value is less than or equal than 0`, `Value is greater than available balance`)
        - category (name: `category`, type: drop-down list, required, error messages: `Category is required`)

    - b. Your application should be prepared for any of these elements **missing from the POST request**, or being present with an empty or a malformed value. In such a case, include the appropriate error message in an element with the `errors` id (it's okay to just `var_dump` the messages into this element). Don't show this element when the user first visits the page.

    - c. Make sure the user doesn't lose the input when there is a validation error. Echo each value into the appropriate input field.

    - d. When the form is correct, save the data on the server, and then display the main page with the new transaction in the transaction list. To save a transaction, follow these steps:
        - `id`: be unique,
        - `timestamp`: use the `date` function of PHP, e.g. with the format `n/j/Y g:i:s A`.
        - `sourceAccount`: the selected account number given in the URL, or the first one (10000000-00000000-00000000), if not.
        - `targetName`: `name` field value
        - `targetAccount`: `accountNumber` field value
        - `text`: `text` field value
        - `value`: `value` field value as an integer
        - `category`: `category` field value

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/4.png)

5. **Displays the value of range sliders (PHP + JS, 20 pts)**: In the block labeled "Filters" there are two range sliders (input fields with id `min-value` and `max-value`), which can be used later to set the value limits for the transactions to be displayed. In this section the task is to

    - a. set the `min` and `max` attributes of the slider to the minimum and maximum value of the listed transactions, and set their `value` attribute to `min` for `min-value` and `max` for `max-value` (PHP);
    - b. display the range slider values after page loading in the appropriate `span` elements with id `min-value-span` and `max-value-span` (PHP/JS);
    - c. update the displayed values ​​by moving the sliders. To do this, use the `input` event! (JS)
    
    ![](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/5.png)

6. **Display transactions that fall within a value range (JS, 15 pts)**: Move the two sliders in the "Filters" block to display only transactions with values ​​between `min-value` and `max-value`, inclusively. For transactions to be hidden, the appropriate table row must be given a `hidden` style class, and for displayed transactions, obviously this style class should not appear. **Hint:** The simplest way to omit spaces in the formatted transaction values is to replace empty spaces with regular expressions (`replace`, `/ /g`); and use the `change` event (also used by the tester)!

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/6.png)

7. **Highlight categories (JS, 16 pts)**: By selecting a category from the drop-down list in the "Filters" block, transactions of the same category are highlighted in the transaction list.

    - a. The category filter has id `category`. The following options are displayed: empty, Other, Restaurants, Transfers, Groceries.
    - b. If you select an empty item, no transactions are highlighted.
    - c. If you select a non-empty category, the table row for transactions of the same category must have a `marked` style class; the rest of the transactions shouldn't apply this style class.
    - **Hint**: Use the `change` event (also used by the tester)!

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/7.png)

8. **View transaction details (JS, 9 pts)**: There is a button labeled "More" for each transaction. Click to display further details of the transaction by removing the `hidden` style class from the previous `div` element. Clicking on the button again will hide the details, for which the previous `div` element must be applied the `hidden` style class.

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/8.png)

9. **Change the category of a transaction with AJAX (JS+PHP, 25 pts)**: Each transaction has a drop-down box listing the possible category values. The appropriate option is selected on page load (see Task 1). In the drop-down box, select another item to change the transaction category, and store this data in the backend. To do this, send a POST request with AJAX to the server, e.g. with the transaction id. To ensure that a successful modification was made, reload the page,  and the modified category value should be displayed for that transaction. **Attention** Do not change the category of transactions 1-5! **Hint**: Use the `change` event (also used by the tester)!

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/9.png)

10. **Convert your balance to Euro with AJAX (JS, 10 pts)**: In the header of the page there is a button with id `convert` and labeled "Convert (refresh)" beside the balance. Click on this to retrieve the current EUR exchange rate from the server, and then use it to convert your HUF balance to EUR. Send a GET request with AJAX to `http://webprogramozas.inf.elte.hu/webprog/zh/minibank/eur_rate.php`, where we get the following JSON response:

    ```json
    {
        "rate": 317
    }
    ```

    Ezzel az értékkel osszuk el a HUF egyenleget, majd az EUR egyenleget jelenítsük meg a `balance-in-eur` azonosítójú `span` elemben. **Technikai segítség:** a hármas csoportokba formázott értékből a szóközöket legegyszerűbb reguláris kifejezéssel üres szövegre cserélni (`replace`, `/ /g`)
    Use this value to divide the HUF balance, and then display the EUR balance in the `span` element with the id `balance-in-eur`. **Hint:** The simplest way of omitting spaces in the formatted balance is using a regular expression (`replace`, `/ /g`).

    ![](http://webprogramozas.inf.elte.hu/webprog/zh/minibank/10.png)
