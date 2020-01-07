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
  <form action="" method="post">
    <div>
      <label for="name">Track name:</label>
      <input type="text" name="name" id="name" required>
      (required, max length 20 characters)
    </div>
    <div>
      <label for="filename">Audio file name:</label>
      <input type="text" name="filename" id="filename" required>
      (required, filename.extension format)
    </div>
    <div>
      <label for="balance">Balance:</label>
      <input type="number" name="balance" id="balance" value="0" min="-100" max="100" required>
      (required, integer, between -100 and 100)
    </div>
    <div>
      <label for="volume">Initial volume:</label>
      <input type="number" name="volume" id="volume" value="50" min="0" max="100" step="5" required>
      (required, integer, between 0 and 100, multiple of 5)
    </div>
    <div>
      <label for="filters">Filters:</label>
      <textarea name="filters" id="filters" rows="10" cols="30"></textarea>
      (can be empty; if not, then one filter per line)
      <br>
      <select id="all" size="10">
        <option>Filter1</option>
        <option>Filter2</option>
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
</body>

</html>