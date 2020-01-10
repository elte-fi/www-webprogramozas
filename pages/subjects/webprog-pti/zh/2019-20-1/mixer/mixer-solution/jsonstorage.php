<?php
include_once('jsonio.php');
class JsonStorage {
  private $io;
  private $filename;
  public function __construct(string $filename) {
    $this->io = new JsonIO();
    $this->filename = $filename;
  }
  public function all() {
    return $this->io->load_from_file($this->filename, true);
  }
  public function filter(callable $fn) {
    $all = $this->all();
    return array_filter($all, $fn);
  }
  public function insert(array $item): string {
    $all = $this->all();
    $id = uniqid('', true);
    $item['id'] = $id;
    $all[$id] = $item;
    $this->io->save_to_file($this->filename, $all);
    return $id;
  }
  public function update(callable $filter, callable $updater) {
    $all = $this->all();
    array_walk($all, function (&$item) use ($filter, $updater) {
      if ($filter($item)) {
        $updater($item);
      }
    });
    $this->io->save_to_file($this->filename, $all);
  }
  public function delete(callable $filter) {
    $remaining = $this->filter(function ($elem) use ($filter) {
      return !$filter($elem);
    });
    $this->io->save_to_file($this->filename, $remaining);
  }
}