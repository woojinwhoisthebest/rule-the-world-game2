<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

<div id="map" style="height:600px"></div>

<script>
var map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19
}).addTo(map);

L.marker([37.5665,126.9780]).addTo(map)
.bindPopup("Seoul");
</script>
