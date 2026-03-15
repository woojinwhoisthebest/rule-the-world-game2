var map = L.map('map').setView([20,0],2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map);

let coins = 0;

setInterval(()=>{
coins++;
document.getElementById("coins").innerText = coins;
},3000);

// 도시 1000개 생성

const cities = [];

for(let i=0;i<1000;i++){

let lat = (Math.random()*140)-70;
let lng = (Math.random()*360)-180;

cities.push({
name:"City"+i,
lat:lat,
lng:lng,
owner:null
});

}

cities.forEach(city=>{

var marker = L.circleMarker([city.lat, city.lng],{
radius:4,
color:"red",
fillColor:"red",
fillOpacity:0.8
}).addTo(map);

marker.on("click",function(){

const nick = document.getElementById("nickname").value;

if(!nick){
alert("닉네임 입력하세요");
return;
}

city.owner = nick;

marker.setStyle({
color:"blue",
fillColor:"blue"
});

marker.bindPopup(city.name + " - " + nick).openPopup();

});

});
