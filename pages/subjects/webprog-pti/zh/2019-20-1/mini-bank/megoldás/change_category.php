<?php
    $raw_transactions = file_get_contents('data/transactions.json');
    $transactions = json_decode($raw_transactions, TRUE);

    foreach ($transactions as $index => $transaction) {
        if ($transaction['id'] === intval($_POST['transactionId'])) {
            $transactions[$index]['category'] = $_POST['category'];

            break;
        }
    }

    file_put_contents('data/transactions.json', json_encode($transactions));
?>
