<?php
    $raw_accounts = file_get_contents('data/accounts.json');
    $accounts = json_decode($raw_accounts, TRUE);
    $selected_account = $accounts[0];

    if (isset($_GET['account'])) {
        foreach ($accounts as $account) {
            if ($account['account_number'] == $_GET['account']) {
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

    function calculate_balance($account, $transactions) {
        $balance = 0;

        foreach ($transactions as $transaction) {
            if ($transaction['sourceAccount'] === $account) {
                $balance -= $transaction['value'];
            }
            else if ($transaction['target']['accountNumber'] === $account) {
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
            array_push($errors, 'Account number is required!');
        }
        else if (is_invalid_account_number($_POST['accountNumber'])) {
            array_push($errors, 'Account number is invalid!');
        }

        if (strlen($_POST['text']) > 64) {
            array_push($errors, 'Text is to long! (max. 64 characters)');
        }

        if (empty($_POST['value'])) {
            array_push($errors, 'Value is required!');
        }
        else if (filter_var($_POST['value'], FILTER_VALIDATE_INT) === false) {
            array_push($errors, 'Value is not an integer!');
        }
        else if (intval($_POST['value']) <= 0) {
            array_push($errors, 'Value is less than or equal than 0!');
        }
        else if (intval($_POST['value']) > calculate_balance($selected_account['account_number'], $transactions)) {
            array_push($errors, 'Value is greater than available balance!');
        }

        if (empty($_POST['category'])) {
            array_push($errors, 'Category is required!');
        }

        if (count($errors) === 0) {
            array_push($transactions, array(
                'id' => count($transactions) + 1,
                'timestamp' => date('n/j/Y g:i:s A'),
                'sourceAccount' => $selected_account['account_number'],
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

    foreach ($transactions as $transaction) {
        // if ($transaction['sourceAccountId'] === $selected_account['id'] || $transaction['target']['accountNumber'] === format_account_id($selected_account['id'])) {
        if ($transaction['sourceAccount'] === $selected_account['account_number'] || $transaction['target']['accountNumber'] === $selected_account['account_number']) {
            array_push($own_transactions, $transaction);

            if ($min_value === NULL || $transaction['value'] < $min_value) {
                $min_value = $transaction['value'];
            }
            else if ($max_value === NULL || $transaction['value'] > $max_value) {
                $max_value = $transaction['value'];
            }
        }
    }

    function is_selected_account($account, $index) {
        if (isset($_GET['account'])) {
            return $_GET['account'] == $account;
        }

        return $index === 0;
    }

    function format_account_id($account_id) {
        return  implode('-', str_split(str_pad($account_id, 24, '0'), 8));
    }

    function format_value($balance) {
        return ($balance < 0 ? '-' : '') . strrev(implode(' ', str_split(strrev(abs($balance)), 3)));
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Mini Bank</title>
        <link rel="stylesheet" href="index.css">
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark d-flex justify-content-start">
            <span class="navbar-brand mb-0 h1">Mini bank</span>
            <form id="account-filter" class="form-inline ml-5">
                <label class="mr-3 text-light">Account</label>
                <select name="account" class="form-control form-control-sm">
                    <?php foreach ($accounts as $index => $account): ?>
                        <option <?= is_selected_account($account['account_number'], $index) ? ' selected' : '' ?>>
                            <?= $account['account_number'] ?>
                        </option>
                    <?php endforeach ?>
                </select>
                <button class="btn btn-sm btn-primary ml-1">Select</button>
            </form>
            <span class="navbar-text ml-5">
                <strong>Balance:</strong>
                <span class="badge badge-warning">
                    <span id="balance-in-huf"><?= format_value(calculate_balance($selected_account['account_number'], $own_transactions)) ?></span> HUF
                </span>
                (~<span id="balance-in-eur">?</span> EUR)
                <button id="convert" class="btn btn-sm btn-primary ml-1">Convert (refresh)</button>
            </span>
        </nav>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md">
                    <div class="card my-2">
                        <div class="card-header bg-info text-light">Filters</div>
                        <div class="card-body">
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
                                        <label>Min. Value: <span id="min-value-span" class="badge badge-info"></span></label>
                                        <input type="range" min="<?= $min_value ?>" max="<?= $max_value ?>" value="<?= $min_value ?>" class="form-control" id="min-value"> 
                                    </div>
                                    <div class="col form-group">
                                        <label>Max. Value: <span id="max-value-span" class="badge badge-info"></span></label>
                                        <input type="range" min="<?= $min_value ?>" max="<?= $max_value ?>" value="<?= $max_value ?>" class="form-control" id="max-value"> 
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    <div class="card my-2">
                        <div class="card-header bg-info text-light">Transactions</div>
                        <div class="card-body">
                            <table class="table table-striped table-sm">
                                <thead>
                                    <tr class="table-primary">
                                        <th>Date</th>
                                        <th>Details</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody id="transactions">
                                    <?php foreach ($own_transactions as $transaction): ?>
                                        <tr class="transaction" data-id="<?= $transaction['id'] ?>">
                                            <td><?= $transaction['timestamp'] ?></td>
                                            <td>
                                                <div><?= $transaction['target']['name'] ?></div>
                                                <?php if ($transaction['text'] === NULL): ?>
                                                    <div class="empty">No text was provided.</div>
                                                <?php else: ?>
                                                    <div><?= $transaction['text'] ?></div>
                                                <?php endif ?>
                                                <div>
                                                    <form class="form-inline">
                                                        <label class="mr-1">Category:</label>
                                                        <select class="form-control form-control-sm mr-3 category">
                                                            <?php foreach ($categories as $category): ?>
                                                                <option <?= $category === $transaction['category'] ? 'selected' : '' ?>><?= $category ?></option>
                                                            <?php endforeach ?>
                                                        </select>
                                                    </form>
                                                </div>
                                                <div class="mb-3 hidden">
                                                    <div>Identifier: <?= $transaction['id'] ?></div>
                                                    <div><?= $transaction['sourceAccount'] ?></div>
                                                    <div><?= $transaction['target']['accountNumber'] ?></div>
                                                </div>
                                                <button class="btn btn-sm btn-outline-dark more-button">More</button>
                                            </td>
                                            <td class="<?= $transaction['sourceAccount'] === $selected_account['account_number'] ? 'debit' : 'credit' ?>"><?= $transaction['sourceAccount'] === $selected_account['account_number'] ? '-' : '' ?><?= format_value($transaction['value']) ?></td>
                                        </tr>
                                    <?php endforeach ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-md">
                    <div class="card my-2">

                        <div class="card-header bg-info text-light">New transaction</div>
                        <div class="card-body">                                         
                            <?php if (count($errors) > 0): ?>
                                <ul id="errors" class="alert alert-danger">
                                    <?php foreach ($errors as $error): ?>
                                        <li><?= $error ?></li>
                                    <?php endforeach ?>
                                </ul>
                            <?php endif ?>
                            <form id="new-transaction" method="POST">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input type="text" name="name" class="form-control" placeholder="Target name" value="<?= $_POST ? $_POST['name'] : '' ?>">
                                    <small class="form-text text-muted">Required</small>
                                </div>
                                <div class="form-group">
                                    <label>Account Number</label>
                                    <input type="text" name="accountNumber" class="form-control" placeholder="12345678-12345678-12345678" value="<?= $_POST ? $_POST['accountNumber'] : '' ?>">
                                    <small class="form-text text-muted">Required, account number format</small>
                                </div>
                                <div class="form-group">
                                    <label>Text</label>
                                    <input type="text" name="text" class="form-control" placeholder="Message text" value="<?= $_POST ? $_POST['text'] : '' ?>">
                                    <small class="form-text text-muted">Max. 64 characters</small>
                                </div>
                                <div class="form-group">
                                    <label>Value</label>
                                    <input type="text" name="value" class="form-control" placeholder="1234" value="<?= $_POST ? $_POST['value'] : '' ?>">
                                    <small class="form-text text-muted">Required, integer, greater than 0, less than available balance</small>
                                </div>
                                <div class="form-group">
                                    <label>Category</label>
                                    <select name="category" class="form-control">
                                        <?php foreach ($categories as $category): ?>
                                            <option <?= (isset($_POST['category']) && $category === $_POST['category']) ? 'selected' : '' ?>><?= $category ?></option>
                                        <?php endforeach ?>
                                    </select>
                                    <small class="form-text text-muted">Required</small>
                                </div>
                                <button class="btn btn-primary" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script>
            document.querySelector('#min-value').addEventListener('input', showRangeValues)
            document.querySelector('#max-value').addEventListener('input', showRangeValues)
            function showRangeValues() {
                document.querySelector('#min-value-span').innerHTML = document.querySelector('#min-value').value
                document.querySelector('#max-value-span').innerHTML = document.querySelector('#max-value').value
            }
            showRangeValues()

            document.querySelector('#convert').addEventListener('click', hufToEur)
            function hufToEur() {
                fetch('eur_rate.php')
                    .then(r => r.json())
                    .then(r => {
                        const rawBalanceInHuf = document.getElementById('balance-in-huf').innerHTML;
                        const balanceInHuf = parseInt(rawBalanceInHuf.replace(/\s/g, ''));

                        document.getElementById('balance-in-eur').innerHTML = (balanceInHuf / r.rate).toFixed(2);
                    });
            }

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
                    fetch('change_category.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: `transactionId=${ event.target.closest('.transaction').getAttribute('data-id') }&category=${ event.target.value }`
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
