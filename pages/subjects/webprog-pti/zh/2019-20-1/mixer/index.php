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
        <li><a href="new.php">Add new track...</a></li>
        <li><button>Save <span></span></button></li>
        <li><span>⟵,⟶, Space</span> Select tracks</li>
        <li><span>↑,↓</span> Change selected tracks</li>
        <li><span>s</span>: Select all</li>
        <li><span>d</span>: Deselect all</li>
      </ul>
    </nav>
    <section id="tracks">
      <div class="track">
        <header>Name 1</header>
        <span></span>
        <input type="range" orient="vertical" min="0" max="100" step="5">
        <input type="checkbox">
      </div>
      <div class="track">
        <header>Name 2</header>
        <span></span>
        <input type="range" orient="vertical" min="0" max="100" step="5">
        <input type="checkbox">
      </div>
    </section>
    <section id="details">
      <dl>
        <dt>Name</dt>
        <dd>name 1</dd>
        <dt>Filename</dt>
        <dd>filename 1</dd>
        <dt>Balance</dt>
        <dd>balance 1</dd>
        <dt>Volume</dt>
        <dd>volume 1</dd>
      </dl>
      <div class="filters">
        <span>Filter 1</span>
        <span>Filter 2</span>
      </div>
    </section>
    <section id="status">
      Number of tracks: 10
      Average volume: <span>|</span><span>|</span><span>|</span><span>|</span><span>|</span>
    </section>
  </div>
</body>

</html>