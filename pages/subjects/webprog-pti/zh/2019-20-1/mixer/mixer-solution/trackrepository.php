<?php
include_once('jsonstorage.php');
class TrackRepository extends JsonStorage {
  public function __construct() {
    parent::__construct('tracks.json');
  }
}
