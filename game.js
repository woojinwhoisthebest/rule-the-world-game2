// 서버 주소
const socket = io("https://rule-the-world-game2-production.up.railway.app");

// 지도 초기화
var map = L.map('map').setView([20,0],2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  maxZoom:19,
  noWrap:true
}).addTo(map);

let coins = 0;
let countriesData = {};
let players = {};

// 코인 증가 (1초 5개)
setInterval(()=>{
  coins += 5;
  document.getElementById("coins").innerText = coins;
},1000);

// 플레이어 색상
function getColor(name){
  if(!name) return "blue";
  let colors=["red","blue","green","purple","orange"];
  let hash=0;
  for(let i=0;i<name.length;i++){ hash+=name.charCodeAt(i); }
  return colors[hash % colors.length];
}

// GeoJSON 불러오기
fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
.then(res => res.json())
.then(data => {
  L.geoJSON(data, {
    style: {
      color:"blue",
      weight:1,
      fillColor:"blue",
      fillOpacity:0.1
    },
    onEachFeature: function(feature, layer){
      const name = feature.properties.name;
      countriesData[name] = {owner:null, price:50};

      // 클릭 시 점령
      layer.on("click", function(){
        const nick = document.getElementById("nickname").value;
        if(!nick){ alert("닉네임 입력"); return; }

        let c = countriesData[name];
        if(coins < c.price){ alert("코인 부족: "+c.price); return; }

        coins -= c.price;
        document.getElementById("coins").innerText = coins;

        socket.emit("capture",{country:name, player:nick});
      });

      // 서버 업데이트 반영
      socket.on("update", (data)=>{
        if(data.countries[name]){
          countriesData[name] = data.countries[name];
          let owner = data.countries[name].owner;
          if(owner){
            let color = getColor(owner);
            layer.setStyle({fillColor:color, color:color, fillOpacity:0.35});
          } else {
            layer.setStyle({fillColor:"blue", color:"blue", fillOpacity:0.1});
          }
        }

        // 랭킹 표시
        if(data.players){
          players = data.players;
          let rankingHTML = "";
          let sorted = Object.entries(players).sort((a,b)=>b[1]-a[1]);
          sorted.forEach((p,i)=>{
            rankingHTML += `${i+1}. ${p[0]} - ${p[1]} countries<br>`;
          });
          document.getElementById("ranking").innerHTML = rankingHTML;
        }
      });
    }
  }).addTo(map);
});
