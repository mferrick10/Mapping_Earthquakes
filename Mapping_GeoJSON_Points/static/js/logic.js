// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
	accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps
let baseMaps = {
  Street: streets,
  Dark: dark
};

// Create the map object with a center and zoom level and deafualt layer.
let map = L.map("mapid", {
  center: [
    30, 30
  ],
  zoom: 2,
  layers: [streets]
});

// Pass map layers into the layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);

// Accessing airport GeoJSON URL data from github
let airportData = "https://raw.githubusercontent.com/mferrick10/Mapping_Earthquakes/master/majorAirports.json"

// Grabbing the GeoJSON data
d3.json(airportData).then(function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the pulled data
  L.geoJson(data, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h2> Airport Code: " + feature.properties.faa + "<hr> Airport Name:  " + feature.properties.name + "</h2>");
    }
  }).addTo(map);
});