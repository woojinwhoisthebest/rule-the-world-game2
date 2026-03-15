<!DOCTYPE html>
<html>

<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Rule The World</title>
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
<style>
body { margin:0; font-family:Arial; }
#map { height:100vh; }
#ui {
  position:absolute;
  top:10px;
  left:10px;
  background:white;
  padding:10px;
  border-radius:10px;
  z-index:1000;
}
</style>
</head>

<body>
<div id="ui">
<input id="nickname" placeholder="닉네임">
<div>Coins: <span id="coins">0</span></div>
</div>
<div id="map"></div>

<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
<script src="game.js"></script>
</body>
</html>
