var map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

let coins = 0;

setInterval(() => {
    coins++;
    document.getElementById("coins").innerText = coins;
}, 10000);

const cities = [
    {name:"Seoul",lat:37.5665,lng:126.9780},
    {name:"Tokyo",lat:35.6762,lng:139.6503},
    {name:"New York",lat:40.7128,lng:-74.0060},
    {name:"London",lat:51.5072,lng:-0.1276},
    {name:"Paris",lat:48.8566,lng:2.3522}
];

cities.forEach(city => {

    var marker = L.marker([city.lat, city.lng]).addTo(map);

    marker.on("click", function(){

        const nick = document.getElementById("nickname").value;

        if(!nick){
            alert("닉네임 입력하세요");
            return;
        }

        marker.bindPopup(city.name + " - " + nick).openPopup();

    });

});
