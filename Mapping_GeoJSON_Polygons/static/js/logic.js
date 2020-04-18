  
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
	accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps
let baseMaps = {
  Street: streets,
  Satellite: satelliteStreets
};

// Create the map object with a center and zoom level and deafualt layer.
let map = L.map("mapid", {
  center: [
    43.7, -79.3
  ],
  zoom: 10,
  layers: [streets]
});

// Pass map layers into the layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);

// Accessing toronto neighborhood coordinates GeoJSON URL from github
let torontoHoods = "https://raw.githubusercontent.com/mferrick10/Mapping_Earthquakes/master/torontoNeighborhoods.json"

// Grabbing the GeoJSON data
d3.json(torontoHoods).then(function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the pulled data
  L.geoJSON(data, {
    weight: 1,
    fillColor: "#ffffa1",
    onEachFeature: function(feature, layer){
      layer.bindPopup("<h2>Neighborhood: " + feature.properties.AREA_NAME +"</h2>");
    }
  }).addTo(map);
});