// Here tile layer & styles merged with Leaflet
const here = {
  apiKey: API_KEY
}
let dayStyle = 'normal.day';
let nightStyle = 'normal.night';

let day = L.tileLayer(`https://2.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/${dayStyle}/{z}/{x}/{y}/512/png8?apiKey=${here.apiKey}&ppi=320`);
let night = L.tileLayer(`https://2.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/${nightStyle}/{z}/{x}/{y}/512/png8?apiKey=${here.apiKey}&ppi=320`);


// Create a base layer that holds both maps
let baseMaps = {
  Day: day,
  Night: night
};



// Create the map object with a center and zoom level and deafualt layer.
let map = L.map("mapid", {
  center: [
    40.4637, -3.7492
  ],
  zoom: 2,
  layers: [day]
});

// Pass map layers into the layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);

// Adds a marker for the starting point of all lines
let torontoMarker = L.marker([43.677, -79.6248])
  .bindPopup("<h2>Pearson International Airport </h2> <hr> <h2> Toronto </h2>")
  .addTo(map);

// Accessing airport GeoJSON URL data from github
let torontoData = "https://raw.githubusercontent.com/mferrick10/Mapping_Earthquakes/master/torontoRoutes.json"

// Custome styles for lines
let myStyle = {
  color: "#ffffa1",
  weight: 1
}

// Grabbing the GeoJSON data
d3.json(torontoData).then(function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the pulled data
  L.geoJson(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h2> Airport Code: " + feature.properties.airline + "<hr> Destination:  " + feature.properties.dst + "</h2>");
    }
  }).addTo(map);
});
