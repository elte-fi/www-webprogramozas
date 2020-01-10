<?php
    $payload = array(
        'rate' => round(330.0 + 1.5 * mt_rand() / mt_getrandmax(), 2)
    );

    echo json_encode($payload);
?>
