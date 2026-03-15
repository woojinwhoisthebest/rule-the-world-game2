var map = L.map('map',{
worldCopyJump:false,
maxBounds:[[-90,-180],[90,180]]
}).setView([20,0],2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19,
noWrap:true
}).addTo(map);


// 🪙 코인 시스템 (1초에 5개)

let coins = 0;

setInterval(()=>{
coins += 5;
document.getElementById("coins").innerText = coins;
},1000);


// 🌍 전세계 균등 도시 생성

let cities = [];

let latStep = 8;
let lngStep = 8;

for(let lat=-60; lat<=70; lat+=latStep){

for(let lng=-180; lng<=180; lng+=lngStep){

cities.push({
lat:lat,
lng:lng,
owner:null,
price:50
});

}

}

cities = cities.slice(0,1000);


// 🗺 영토 타일 생성

cities.forEach(city=>{

let size = 3; // 타일 크기

let polygon = L.polygon([
[city.lat-size, city.lng-size],
[city.lat-size, city.lng+size],
[city.lat+size, city.lng+size],
[city.lat+size, city.lng-size]
],{

color:"blue",
fillColor:"blue",
fillOpacity:0.15,
weight:1

}).addTo(map);


// 클릭

polygon.on("click",function(){

const nick = document.getElementById("nickname").value;

if(!nick){
alert("닉네임 입력하세요");
return;
}

if(coins < city.price){
alert("필요 코인: "+city.price);
return;
}

coins -= city.price;

document.getElementById("coins").innerText = coins;


// 가격 상승

city.price += 2;

city.owner = nick;


// 색 변경

polygon.setStyle({

color:"red",
fillColor:"red",
fillOpacity:0.25

});

polygon.bindPopup(
"Owner: "+nick+
"<br>Next price: "+city.price
).openPopup();

});

});
