<?php
include('trackrepository.php');
include('filterrepository.php');

// New track
// var_dump($_POST);
function validate($post, &$data, &$errors) {
  if (!(isset($post['name']) && trim($post['name'])!=='')) {
    $errors['name'] = "The track name is required";
  } 
  else if (strlen($post['name']) > 20) {
    $errors['name'] = "The track name is too long";
  }
  else {
    $data['name'] = $post['name'];
  }

  if (!(isset($post['filename']) && trim($post['filename'])!=='')) {
    $errors['filename'] = "The audio filename is required";
  } 
  else if (filter_var($post['filename'], FILTER_VALIDATE_REGEXP, [
    "options"=>[
      "regexp"=>"/^(\w|\.)+\.\w+$/",
    ],
  ]) === false) {
    $errors['filename'] = "The audio filename has a wrong format";
  }
  else {
    $data['filename'] = $post['filename'];
  }

  if (!(isset($post['balance']) && trim($post['balance'])!=='')) {
    $errors['balance'] = "The balance is required";
  }
  else if (filter_var($post['balance'], FILTER_VALIDATE_INT) === false) {
    $errors['balance'] = "The balance has to be an integer";
  } else {
    $balance = (int)$post['balance'];
    if ($balance < -100 || $balance > 100) {
      $errors['balance'] = "The balance has to be between -100 and 100";
    } else {
      $data['balance'] = $balance;
    }
  }

  if (!(isset($post['volume']) && trim($post['volume'])!=='')) {
    $errors['volume'] = "The volume is required";
  }
  else if (filter_var($post['volume'], FILTER_VALIDATE_INT) === false) {
    $errors['volume'] = "The volume has to be an integer";
  } else {
    $volume = (int)$post['volume'];
    if ($volume < 0 || $volume > 100) {
      $errors['volume'] = "The volume has to be between 0 and 100";
    } 
    else if ($volume % 5 !== 0) {
      $errors['volume'] = "The volume has to be a multiple of 5";
    }
    else {
      $data['volume'] = $volume;
    }
  }

  if (isset($post['filters'])) {
    $data['filters'] = array_filter(array_map('trim', explode("\n", $post['filters'])), 'strlen');
  } else {
    $data['filters'] = [];
  }
  
  return count($errors) === 0;
}
function add_track($data) {
  $data["notes"] = [];
  $tr = new TrackRepository();
  $tr->insert($data);
}

$data = [];
$errors = [];
if ($_POST) {
  if (validate($_POST, $data, $errors)) {
    add_track($data);
    header('Location: index.php');
    exit();
  }
}

// Filters
$fr = new FilterRepository();
$filters = $fr->all();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Mixer - Add new track</title>
  <link rel="stylesheet" href="http://webprogramozas.inf.elte.hu/webprog/zh/mixer/mixer.css">
</head>
<body>
  <h2>Add new track</h2>
  <?php if (count($errors) > 0) : ?>
    <div class="errors">
      <?= var_dump($errors) ?>
    </div>
  <?php endif ?>
  <form action="" method="post">
    <div>
      <label for="name">Track name:</label>
      <input type="text" name="name" id="name" value="<?= $_POST['name'] ?? '' ?>" required>
      (required, max length 20 characters)
    </div>
    <div>
      <label for="filename">Audio file name:</label>
      <input type="text" name="filename" id="filename" value="<?= $_POST['filename'] ?? '' ?>" required>
      (required, filename.extension format)
    </div>
    <div>
      <label for="balance">Balance:</label>
      <input type="number" name="balance" id="balance" value="<?= $_POST['balance'] ?? '0' ?>" min="-100" max="100" required>
      (required, integer, between -100 and 100)
    </div>
    <div>
      <label for="volume">Initial volume:</label>
      <input type="number" name="volume" id="volume" value="<?= $_POST['volume'] ?? '50' ?>" min="0" max="100" step="5" required>
      (required, integer, between 0 and 100, multiple of 5)
    </div>
    <div>
      <label for="filters">Filters:</label>
      <textarea name="filters" id="filters" rows="10" cols="30"><?= $_POST['filters'] ?? '' ?></textarea>
      (can be empty; if not, then one filter per line)
      <br>
      <select id="all" size="10">
        <?php foreach($filters as $f) : ?>
          <option><?= $f['name'] ?></option>
        <?php endforeach ?>
      </select>
      <button type="button" id="select">⟶</button>
      <button type="button" id="deselect">⟵</button>
      <button type="button" id="moveup">↑</button>
      <button type="button" id="movedown">↓</button>
      <select id="selected" size="10"></select>
    </div>
    <div>
      <button type="submit">Add new track</button>
    </div>
  </form>
  <a href="index.php">Return to mixer</a>
  <script src="new.js"></script>
</body>
</html>