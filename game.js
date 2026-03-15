function getPlayerColor(name){

let colors = [
"red",
"blue",
"green",
"purple",
"orange",
"yellow",
"cyan",
"pink"
];

let hash = 0;

for(let i=0;i<name.length;i++){
hash += name.charCodeAt(i);
}

return colors[hash % colors.length];

}
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


// 🌍 나라 경계 불러오기

fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
.then(res => res.json())
.then(data => {

L.geoJSON(data,{

style:function(){

return{
color:"blue",
weight:1,
fillColor:"blue",
fillOpacity:0.15
};

},

onEachFeature:function(feature,layer){

let country = {
owner:null,
price:50
};

layer.on("click",function(){

const nick = document.getElementById("nickname").value;

if(!nick){
alert("닉네임 입력하세요");
return;
}

if(coins < country.price){
alert("필요 코인: "+country.price);
return;
}

coins -= country.price;

document.getElementById("coins").innerText = coins;

country.price += 2;

country.owner = nick;

let color = getPlayerColor(nick);

layer.setStyle({
fillColor:color,
color:color,
fillOpacity:0.35
});
  
layer.bindPopup(
feature.properties.name +
"<br>Owner: "+nick+
"<br>Next price: "+country.price
).openPopup();

});

}

}).addTo(map);

});
const socket = io("https://rule-the-world-game2-production.up.railway.app")
