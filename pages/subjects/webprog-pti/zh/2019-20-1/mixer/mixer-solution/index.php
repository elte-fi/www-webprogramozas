<?php
include('trackrepository.php');

// List tracks
$tr = new TrackRepository();
$tracks = $tr->all();

// Volume bars
$bars = 100;
if (isset($_GET['bars']) && filter_var($_GET['bars'], FILTER_VALIDATE_INT) !== false && (int)$_GET['bars'] > 0) {
  $bars = (int)$_GET['bars'];
}

// Show details
$show_details = false;
if (isset($_GET['id'])) {
  $show_details = true;
  $id = $_GET['id'];
  $shown_track = array_values($tr->filter(function ($track) use ($id) {
    return $track['id'] === $id;
  }))[0];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Mixer</title>
  <link rel="stylesheet" href="http://webprogramozas.inf.elte.hu/webprog/zh/mixer/mixer.css">
</head>
<body>
<div id="main">
    <nav>
      <h3>Mixer</h3>
      <ul>
        <li><a href=new.php">Add new track...</a></li>
        <li><button>Save <span></span></button></li>
        <li><span>⟵,⟶, Space</span> Select tracks</li>
        <li><span>↑,↓</span> Change selected tracks</li>
        <li><span>s</span>: Select all</li>
        <li><span>d</span>: Deselect all</li>
      </ul>
    </nav>
    <section id="tracks">
      <?php foreach($tracks as $track) : ?>
        <div class="track" data-id="<?= $track['id'] ?>">
          <header><a href="?id=<?= $track['id'] ?>"><?= $track['name'] ?></a></header>
          <span></span>
          <input type="range" orient="vertical" min="0" max="100" step="5" value="<?= $track['volume'] ?>">
          <input type="checkbox">
        </div>
      <?php endforeach ?>
    </section>
    
      <section id="details" <?php if (!$show_details) : ?>style="display: none"<?php endif ?>>
        <dl>
          <dt>Name</dt>
          <dd><?= $shown_track['name'] ?></dd>
          <dt>Filename</dt>
          <dd><?= $shown_track['filename'] ?></dd>
          <dt>Balance</dt>
          <dd><?= $shown_track['balance'] ?></dd>
          <dt>Volume</dt>
          <dd><?= $shown_track['volume'] ?></dd>
        </dl>
        <div class="filters">
          <?php foreach($shown_track['filters'] as $f) : ?>
            <span><?= $f ?></span>
          <?php endforeach ?>
        </div>
      </section>
    
    <section id="status">
      Number of tracks: <?= count($tracks) ?>
      <!-- <span>Muted tracks: 3</span> -->
      Average volume: <?php for($i=1; $i<=$bars; $i++) : ?><span>|</span><?php endfor ?>
    </section>
  </div>
  <script src="index.js"></script>
</body>
</html>