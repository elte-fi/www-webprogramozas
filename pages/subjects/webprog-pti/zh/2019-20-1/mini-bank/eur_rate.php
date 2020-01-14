<?php
$payload = array(
    'rate' => 330 + mt_rand(-30, 30)
);

echo json_encode($payload);
