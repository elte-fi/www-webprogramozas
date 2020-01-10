<?php
include_once('jsonstorage.php');
class FilterRepository extends JsonStorage {
  public function __construct() {
    parent::__construct('filters.json');
  }
}
