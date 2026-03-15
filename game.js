mapboxgl.accessToken = "YOUR_MAPBOX_TOKEN"

const map = new mapboxgl.Map({
container: "map",
style: "mapbox://styles/mapbox/satellite-v9",
center: [20,20],
zoom: 1.5
})

let coins = 0

setInterval(()=>{
coins++
document.getElementById("coins").innerText = coins
},10000)

const cities = [
{name:"Seoul",lat:37.5665,lng:126.9780},
{name:"Tokyo",lat:35.6762,lng:139.6503},
{name:"New York",lat:40.7128,lng:-74.0060},
{name:"London",lat:51.5072,lng:-0.1276},
{name:"Paris",lat:48.8566,lng:2.3522}
]

cities.forEach(city=>{

const el = document.createElement("div")
el.style.background = "red"
el.style.width = "10px"
el.style.height = "10px"
el.style.borderRadius = "50%"

new mapboxgl.Marker(el)
.setLngLat([city.lng,city.lat])
.addTo(map)

})
