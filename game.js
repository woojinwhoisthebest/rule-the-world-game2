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


// 실제 세계 주요 도시

const cities = [

{name:"Seoul",lat:37.5665,lng:126.9780},
{name:"Busan",lat:35.1796,lng:129.0756},
{name:"Tokyo",lat:35.6762,lng:139.6503},
{name:"Osaka",lat:34.6937,lng:135.5023},
{name:"Beijing",lat:39.9042,lng:116.4074},
{name:"Shanghai",lat:31.2304,lng:121.4737},
{name:"Hong Kong",lat:22.3193,lng:114.1694},
{name:"Bangkok",lat:13.7563,lng:100.5018},
{name:"Singapore",lat:1.3521,lng:103.8198},
{name:"Delhi",lat:28.7041,lng:77.1025},
{name:"Mumbai",lat:19.0760,lng:72.8777},

{name:"New York",lat:40.7128,lng:-74.0060},
{name:"Los Angeles",lat:34.0522,lng:-118.2437},
{name:"Chicago",lat:41.8781,lng:-87.6298},
{name:"Houston",lat:29.7604,lng:-95.3698},
{name:"Toronto",lat:43.6532,lng:-79.3832},
{name:"Mexico City",lat:19.4326,lng:-99.1332},

{name:"London",lat:51.5072,lng:-0.1276},
{name:"Paris",lat:48.8566,lng:2.3522},
{name:"Berlin",lat:52.52,lng:13.4050},
{name:"Madrid",lat:40.4168,lng:-3.7038},
{name:"Rome",lat:41.9028,lng:12.4964},
{name:"Amsterdam",lat:52.3676,lng:4.9041},
{name:"Vienna",lat:48.2082,lng:16.3738},

{name:"Moscow",lat:55.7558,lng:37.6173},
{name:"Istanbul",lat:41.0082,lng:28.9784},
{name:"Dubai",lat:25.2048,lng:55.2708},

{name:"Sydney",lat:-33.8688,lng:151.2093},
{name:"Melbourne",lat:-37.8136,lng:144.9631},
{name:"Auckland",lat:-36.8485,lng:174.7633},

{name:"Cape Town",lat:-33.9249,lng:18.4241},
{name:"Johannesburg",lat:-26.2041,lng:28.0473},
{name:"Cairo",lat:30.0444,lng:31.2357},

{name:"Rio",lat:-22.9068,lng:-43.1729},
{name:"Sao Paulo",lat:-23.5505,lng:-46.6333},
{name:"Buenos Aires",lat:-34.6037,lng:-58.3816}

];

// 도시 표시

cities.forEach(city=>{

var marker = L.circleMarker([city.lat, city.lng],{
radius:5,
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

marker.setStyle({
color:"blue",
fillColor:"blue"
});

marker.bindPopup(city.name + " - " + nick).openPopup();

});

});
