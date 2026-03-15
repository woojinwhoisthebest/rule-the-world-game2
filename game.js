var map = L.map('map',{
worldCopyJump:false,
maxBounds:[[-90,-180],[90,180]]
}).setView([25,10],2);

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


// 실제 도시 데이터 (세계 주요 도시)

const baseCities = [

{name:"Tokyo",lat:35.6762,lng:139.6503},
{name:"Seoul",lat:37.5665,lng:126.9780},
{name:"Beijing",lat:39.9042,lng:116.4074},
{name:"Shanghai",lat:31.2304,lng:121.4737},
{name:"Bangkok",lat:13.7563,lng:100.5018},
{name:"Singapore",lat:1.3521,lng:103.8198},
{name:"Jakarta",lat:-6.2088,lng:106.8456},
{name:"Manila",lat:14.5995,lng:120.9842},

{name:"Delhi",lat:28.7041,lng:77.1025},
{name:"Mumbai",lat:19.0760,lng:72.8777},
{name:"Karachi",lat:24.8607,lng:67.0011},

{name:"Dubai",lat:25.2048,lng:55.2708},
{name:"Riyadh",lat:24.7136,lng:46.6753},
{name:"Tehran",lat:35.6892,lng:51.3890},

{name:"Moscow",lat:55.7558,lng:37.6173},
{name:"Istanbul",lat:41.0082,lng:28.9784},
{name:"Berlin",lat:52.52,lng:13.4050},
{name:"Paris",lat:48.8566,lng:2.3522},
{name:"London",lat:51.5072,lng:-0.1276},
{name:"Madrid",lat:40.4168,lng:-3.7038},
{name:"Rome",lat:41.9028,lng:12.4964},

{name:"New York",lat:40.7128,lng:-74.0060},
{name:"Los Angeles",lat:34.0522,lng:-118.2437},
{name:"Chicago",lat:41.8781,lng:-87.6298},
{name:"Toronto",lat:43.6532,lng:-79.3832},
{name:"Mexico City",lat:19.4326,lng:-99.1332},

{name:"Sao Paulo",lat:-23.5505,lng:-46.6333},
{name:"Rio",lat:-22.9068,lng:-43.1729},
{name:"Buenos Aires",lat:-34.6037,lng:-58.3816},
{name:"Lima",lat:-12.0464,lng:-77.0428},
{name:"Bogota",lat:4.7110,lng:-74.0721},

{name:"Cairo",lat:30.0444,lng:31.2357},
{name:"Lagos",lat:6.5244,lng:3.3792},
{name:"Nairobi",lat:-1.2921,lng:36.8219},
{name:"Cape Town",lat:-33.9249,lng:18.4241},

{name:"Sydney",lat:-33.8688,lng:151.2093},
{name:"Melbourne",lat:-37.8136,lng:144.9631},
{name:"Auckland",lat:-36.8485,lng:174.7633}

];


// 도시 확장 생성

let cities = [];

baseCities.forEach(base=>{

for(let i=0;i<30;i++){

let lat = base.lat + (Math.random()*4-2);
let lng = base.lng + (Math.random()*4-2);

cities.push({

name:base.name+"-"+i,
lat:lat,
lng:lng,
owner:null,
price:50

});

}

});

// 최대 1000개

cities = cities.slice(0,1000);


// 도시 영역 표시

cities.forEach(city=>{

var area = L.circle([city.lat, city.lng],{

radius:40000,
color:"blue",
fillColor:"blue",
fillOpacity:0.12

}).addTo(map);


// 클릭 이벤트

area.on("click",function(){

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

city.price += 2;

city.owner = nick;

area.setStyle({

color:"red",
fillColor:"red",
fillOpacity:0.18

});

area.bindPopup(

city.name+
"<br>Owner: "+nick+
"<br>Next price: "+city.price

).openPopup();

});

});
