<?php
include('trackrepository.php');

$json = json_decode($_POST['json'], true);

$tr = new TrackRepository();
foreach ($json as $e) {
    $id = $e['id'];
    $vol = $e['vol'];
    $tr->update(
        function ($track) use ($id) {
            return $track['id'] === $id;
        },
        function (&$track) use ($id, $vol) {
            $track['volume'] = $vol;
        }
    );
}
