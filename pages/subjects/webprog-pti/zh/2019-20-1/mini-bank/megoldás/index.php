<?php
    $raw_accounts = file_get_contents('data/accounts.json');
    $accounts = json_decode($raw_accounts, TRUE);
    $selected_account = $accounts[0];

    if (isset($_GET['accountId'])) {
        foreach ($accounts as $account) {
            if ($account['id'] == $_GET['accountId']) {
                $selected_account = $account;

                break;
            }
        }
    }

    $raw_transactions = file_get_contents('data/transactions.json');
    $transactions = json_decode($raw_transactions, TRUE);

    $own_transactions = [];
    $min_value = NULL;
    $max_value = NULL;

    foreach ($transactions as $transaction) {
        if ($transaction['sourceAccountId'] === $selected_account['id'] || $transaction['target']['accountNumber'] === format_account_id($selected_account['id'])) {
            array_push($own_transactions, $transaction);

            if ($min_value === NULL || $transaction['value'] < $min_value) {
                $min_value = $transaction['value'];
            }
            else if ($max_value === NULL || $transaction['value'] > $max_value) {
                $max_value = $transaction['value'];
            }
        }
    }

    $categories = [
        'Other',
        'Restaurants',
        'Transfers',
        'Groceries'
    ];

    function is_valid_an_part($part) {
        $trimmed_part = rtrim($part, '0');

        return strlen($part) === 8 && (is_numeric($trimmed_part) || empty($trimmed_part));
    }

    function is_invalid_account_number($account_number) {
        $parts = explode('-', $account_number);

        return !is_valid_an_part($parts[0]) || !is_valid_an_part($parts[1]) || !is_valid_an_part($parts[2]);
    }

    function calculate_balance($account_id, $transactions) {
        $balance = 0;

        foreach ($transactions as $transaction) {
            if ($transaction['sourceAccountId'] === $account_id) {
                $balance -= $transaction['value'];
            }
            else if ($transaction['target']['accountNumber'] === format_account_id($account_id)) {
                $balance += $transaction['value'];
            }
        }

        return $balance;
    }

    $errors = [];

    if ($_POST) {
        if (empty($_POST['name'])) {
            array_push($errors, 'Name is required!');
        }

        if (empty($_POST['accountNumber'])) {
            array_push($errors, 'Account Number is required!');
        }
        else if (is_invalid_account_number($_POST['accountNumber'])) {
            array_push($errors, 'Account Number is invalid!');
        }

        if (strlen($_POST['text']) > 64) {
            array_push($errors, 'Text is to long! (max. 64 characters)');
        }

        if (empty($_POST['value'])) {
            array_push($errors, 'Value is required!');
        }
        else if (intval($_POST['value']) > calculate_balance($selected_account['id'], $transactions)) {
            array_push($errors, 'Value is greater than available balance!');
        }

        if (count($errors) === 0) {
            array_push($transactions, array(
                'id' => count($transactions) + 1,
                'timestamp' => date('n/j/Y g:i:s A'),
                'sourceAccountId' => $selected_account['id'],
                'target' => array(
                    'name' => $_POST['name'],
                    'accountNumber' => $_POST['accountNumber']
                ),
                'text' => $_POST['text'],
                'value' => intval($_POST['value']),
                'category' => $_POST['category']
            ));

            file_put_contents('data/transactions.json', json_encode($transactions));
        }
    }

    function is_selected_account($account_id, $index) {
        if (isset($_GET['accountId'])) {
            return $_GET['accountId'] == $account_id;
        }

        return $index === 0;
    }

    function format_account_id($account_id) {
        return  implode('-', str_split(str_pad($account_id, 24, '0'), 8));
    }

    function format_value($balance) {
        return strrev(implode(' ', str_split(strrev($balance), 3)));
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Mini Bank</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
        <style>
            .red {
                color: red;
            }

            .green {
                color: darkgreen;
            }

            .left-aligned {
                text-align: left;
            }

            .right-aligned {
                text-align: right;
            }

            .empty {
                font-style: italic;
            }

            .marked > td {
                background-color: lightyellow;
            }

            .hidden {
                display: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Mini Bank</h1>
            <form class="form-inline mb-3">
                <label class="mr-3">Account</label>
                <select name="accountId" class="form-control mr-3">
                    <?php foreach ($accounts as $index => $account): ?>
                        <option value="<?= $account['id'] ?>"<?= is_selected_account($account['id'], $index) ? ' selected' : '' ?>>
                            <?= format_account_id($account['id']) ?>
                        </option>
                    <?php endforeach ?>
                </select>
                <button class="btn btn-primary">Select</button>
            </form>
            <h2>Balance</h2>
            <p><span id="balance-in-huf"><?= format_value(calculate_balance($selected_account['id'], $own_transactions)) ?></span> HUF (~<span id="balance-in-eur">?</span> EUR)</p>
            <h2>Transactions</h2>
            <details open class="mb-3">
                <summary>Add</summary>
                <?php if (count($errors) > 0): ?>
                    <ul>
                        <?php foreach ($errors as $error): ?>
                            <li><?= $error ?></li>
                        <?php endforeach ?>
                    </ul>
                <?php endif ?>
                <form method="POST">
                    <div class="form-group">
                        <label>Name *</label>
                        <input type="text" name="name" class="form-control" value="<?= $_POST ? $_POST['name'] : '' ?>">
                    </div>
                    <div class="form-group">
                        <label>Account Number *</label>
                        <input type="text" name="accountNumber" class="form-control" value="<?= $_POST ? $_POST['accountNumber'] : '' ?>">
                    </div>
                    <div class="form-group">
                        <label>Text</label>
                        <input type="text" name="text" class="form-control" value="<?= $_POST ? $_POST['text'] : '' ?>">
                    </div>
                    <div class="form-group">
                        <label>Value *</label>
                        <input type="text" name="value" class="form-control" value="<?= $_POST ? $_POST['value'] : '' ?>">
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <select name="category" class="form-control">
                            <?php foreach ($categories as $category): ?>
                                <option><?= $category ?></option>
                            <?php endforeach ?>
                        </select>
                    </div>
                    <button class="btn btn-primary">Submit</button>
                </form>
            </details>
            <details class="mb-3">
                <summary>Filter</summary>
                <form id="filter-form">
                    <div class="form-group">
                        <label>Category</label>
                        <select class="form-control" id="category">
                            <option></option>
                            <?php foreach ($categories as $category): ?>
                                <option><?= $category ?></option>
                            <?php endforeach ?>
                        </select>
                    </div>
                    <div class="form-row">
                        <div class="col form-group">
                            <label>Min. Value</label>
                            <input type="range" min="<?= $min_value ?>" max="<?= $max_value ?>" value="<?= $min_value ?>" class="form-control" id="min-value"> 
                        </div>
                        <div class="col form-group">
                            <label>Max. Value</label>
                            <input type="range" min="<?= $min_value ?>" max="<?= $max_value ?>" value="<?= $max_value ?>" class="form-control" id="max-value"> 
                        </div>
                    </div>
                </form>
            </details>
            <table class="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Details</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody id="transactions">
                    <?php foreach ($own_transactions as $transaction): ?>
                        <tr class="transaction">
                            <td><?= $transaction['timestamp'] ?></td>
                            <td>
                                <div><?= $transaction['target']['name'] ?></div>
                                <?php if ($transaction['text'] === NULL): ?>
                                    <div class="empty">No text was provided.</div>
                                <?php else: ?>
                                    <?= $transaction['text'] ?>
                                <?php endif ?>
                                <div>
                                    <form class="form-inline">
                                        <label class="mr-1">Category:</label>
                                        <select class="form-control mr-3 category" data-id="<?= $transaction['id'] ?>">
                                            <?php foreach ($categories as $category): ?>
                                                <option<?= $category === $transaction['category'] ? ' selected' : '' ?>><?= $category ?></option>
                                            <?php endforeach ?>
                                        </select>
                                    </form>
                                </div>
                                <div class="mb-3 hidden">
                                    <div>Identifier: <?= $transaction['id'] ?></div>
                                    <div>Target Account Number: <?= $transaction['target']['accountNumber'] ?></div>
                                </div>
                                <button class="btn btn-outline-dark more-button">More</button>
                            <td class="<?= $transaction['sourceAccountId'] === $selected_account['id'] ? 'red left-aligned' : 'green right-aligned' ?>"><?= $transaction['sourceAccountId'] === $selected_account['id'] ? '-' : '' ?><?= format_value($transaction['value']) ?></td>
                        </tr>
                    <?php endforeach ?>
                </tbody>
            </table>
        </div>
        <script>
            setInterval(function () {
                fetch('/eur_rate.php')
                    .then(r => r.json())
                    .then(r => {
                        const rawBalanceInHuf = document.getElementById('balance-in-huf').innerHTML;
                        const balanceInHuf = parseInt(rawBalanceInHuf.replace(/\s/g, ''));

                        document.getElementById('balance-in-eur').innerHTML = (balanceInHuf / r.rate).toFixed(2);
                    });
            }, 5000);

            document.getElementById('category').addEventListener('change', function (event) {
                const transactions = document.querySelectorAll('.transaction');

                for (const transaction of transactions) {
                    transaction.classList.remove('marked');

                    const category = transaction.querySelector('.category').value;

                    if (category === event.target.value) {
                        transaction.classList.add('marked');
                    }
                }
            });

            document.getElementById('filter-form').addEventListener('change', function (event) {
                const min = document.getElementById('min-value').value;
                const max = document.getElementById('max-value').value;
                const transactions = document.querySelectorAll('.transaction');

                for (const transaction of transactions) {
                    transaction.classList.remove('hidden');

                    const value = parseInt(transaction.querySelector('td:last-child').innerHTML.replace(/\s|-/g, ''));

                    if (value < min || value > max) {
                        transaction.classList.add('hidden');
                    }
                }
            });

            const transactions = document.getElementById('transactions');

            transactions.addEventListener('change', function (event) {
                if (event.target.classList.contains('category')) {
                    fetch('/change_category.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: `transactionId=${ event.target.getAttribute('data-id') }&category=${ event.target.value }`
                    });
                }
            });

            transactions.addEventListener('click', function (event) {
                if (event.target.classList.contains('more-button')) {
                    event.target.previousElementSibling.classList.toggle('hidden');
                }
            });
        </script>
    </body>
</html>
