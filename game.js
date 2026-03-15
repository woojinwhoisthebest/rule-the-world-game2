var map = L.map('map',{
worldCopyJump:false,
maxBounds:[[-90,-180],[90,180]]
}).setView([20,0],2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19,
noWrap:true
}).addTo(map);


// 코인 시스템

let coins = 0;

setInterval(()=>{
coins++;
document.getElementById("coins").innerText = coins;
},3000);


// 도시 생성

const baseCities = [

{name:"Tokyo",lat:35.6762,lng:139.6503},
{name:"Seoul",lat:37.5665,lng:126.9780},
{name:"Beijing",lat:39.9042,lng:116.4074},
{name:"Bangkok",lat:13.7563,lng:100.5018},
{name:"Singapore",lat:1.3521,lng:103.8198},
{name:"Dubai",lat:25.2048,lng:55.2708},
{name:"London",lat:51.5072,lng:-0.1276},
{name:"Paris",lat:48.8566,lng:2.3522},
{name:"Berlin",lat:52.52,lng:13.4050},
{name:"Rome",lat:41.9028,lng:12.4964},
{name:"New York",lat:40.7128,lng:-74.0060},
{name:"Los Angeles",lat:34.0522,lng:-118.2437},
{name:"Chicago",lat:41.8781,lng:-87.6298},
{name:"Toronto",lat:43.6532,lng:-79.3832},
{name:"Sydney",lat:-33.8688,lng:151.2093},
{name:"Melbourne",lat:-37.8136,lng:144.9631},
{name:"Cape Town",lat:-33.9249,lng:18.4241},
{name:"Rio",lat:-22.9068,lng:-43.1729}
];

let cities = [];

baseCities.forEach(base=>{

for(let i=0;i<60;i++){

let lat = base.lat + (Math.random()*2-1);
let lng = base.lng + (Math.random()*2-1);

cities.push({
name:base.name+"-"+i,
lat:lat,
lng:lng,
owner:null,
price:50
});

}

});

cities = cities.slice(0,1000);


// 도시 표시

cities.forEach(city=>{

var marker = L.circleMarker([city.lat, city.lng],{
radius:4,
color:"red",
fillColor:"red",
fillOpacity:0.9
}).addTo(map);

marker.on("click",function(){

const nick = document.getElementById("nickname").value;

if(!nick){
alert("닉네임 입력하세요");
return;
}

// 코인 부족

if(coins < city.price){
alert("코인이 부족합니다! 필요 코인: "+city.price);
return;
}

// 코인 차감

coins -= city.price;
document.getElementById("coins").innerText = coins;

// 가격 상승

city.price += 2;

// 소유자 변경

city.owner = nick;

// 색 변경

marker.setStyle({
color:"blue",
fillColor:"blue"
});

marker.bindPopup(
city.name+
"<br>Owner: "+nick+
"<br>Next Price: "+city.price
).openPopup();

});

});
