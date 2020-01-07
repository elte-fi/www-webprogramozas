<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>MIDI editor</title>
  <link rel="stylesheet" href="http://webprogramozas.inf.elte.hu/webprog/zh/midi/midi.css">
</head>

<body>
  <div id="main">
    <div class="row tracks-container">

      <div class="tracks">
        <h3>MIDI editor</h3>
        <p>Press 1-8 to play notes, and SPACE to toggle record mode</p>
        <a href="new.php">Add new track...</a>
        <ul>
          <li>
            <span>Category 1</span>
            Name 1 (Instrument 1)
          </li>
          <li>
            <span>Category 2</span>
            Name 2 (Instrument 2)
          </li>
        </ul>
      </div>

      <div class="pianoroll-container">

        <div class="pianoroll">
          <div class="row">
            <div class="notes">
              <div>C+</div>
              <div>B</div>
              <div>A</div>
              <div>G</div>
              <div>F</div>
              <div>E</div>
              <div>D</div>
              <div>C</div>
            </div>
            <svg viewBox="0 0 10000 80" width="100%" height="200" preserveAspectRatio="none">
              <!-- <rect x="0" y="70" width="10" height="10" /> -->
            </svg>
          </div>
          <textarea></textarea>
          <button id="savebutton">Save to selected track <span></span></button>
          <button id="showbutton">Show JSON in SVG</button>
        </div>

        <div class="keyboard">
          <div>C<span>1</span></div>
          <div>D<span>2</span></div>
          <div>E<span>3</span></div>
          <div>F<span>4</span></div>
          <div>G<span>5</span></div>
          <div>A<span>6</span></div>
          <div>B<span>7</span></div>
          <div>C+<span>8</span></div>
        </div>

      </div>

    </div>
  </div>
</body>

</html>