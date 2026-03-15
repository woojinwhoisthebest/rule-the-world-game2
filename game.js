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


// 세계 여러 지역 기준 좌표

const regions = [

[40,-100], // 북미
[50,10], // 유럽
[30,100], // 중국
[20,78], // 인도
[-10,-55], // 브라질
[-25,135], // 호주
[0,20], // 아프리카
[35,140], // 일본
[37,127], // 한국
[25,45], // 중동
[60,90], // 러시아
[-34,-58], // 아르헨티나
[15,-90], // 중앙아메리카
[52,-110], // 캐나다
[-1,120] // 인도네시아

];

let cities = [];

// 지역마다 도시 생성

regions.forEach(region=>{

for(let i=0;i<70;i++){

let lat = region[0] + (Math.random()*12-6);
let lng = region[1] + (Math.random()*12-6);

cities.push({

lat:lat,
lng:lng,
owner:null,
price:50

});

}

});

// 최대 1000개

cities = cities.slice(0,1000);


// 도시 영역 생성

cities.forEach(city=>{

var marker = L.circle([city.lat, city.lng],{

radius:60000, // 영역 크기
color:"blue",
fillColor:"blue",
fillOpacity:0.15, // 투명도

}).addTo(map);


// 클릭 범위 크게

marker.on("click",function(){

const nick = document.getElementById("nickname").value;

if(!nick){
alert("닉네임 입력하세요");
return;
}

if(coins < city.price){

alert("코인이 부족합니다. 필요: "+city.price);
return;

}

coins -= city.price;

document.getElementById("coins").innerText = coins;


// 가격 상승

city.price += 2;

city.owner = nick;


// 색상 변경

marker.setStyle({

color:"red",
fillColor:"red",
fillOpacity:0.2

});

marker.bindPopup(

"Owner: "+nick+
"<br>Next Price: "+city.price

).openPopup();

});

});
