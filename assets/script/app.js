'use strict';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VybGlua2F1ciIsImEiOiJjbHExYjM4cHUwNzE3MnBud25qNDlmc2VjIn0.Jeu9BD0h1vILAwXce8dQqw';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [0,0],
    zoom: 17,
    pitch: 40
})

const marker = new mapboxgl.Marker({color: '#ff7342'});


// The success callback function
function getLocation(position) {
    let { altitude, latitude, longitude } = position.coords;
    console.log(`Longitude: ${longitude} | Latitude: ${latitude} | Altitude: ${altitude}`)
    map.setCenter([longitude, latitude]);
    marker.setLngLat([longitude, latitude]).addTo(map);
}

// The 'failure 'callback function
function errorHandler() {
    console.log('Sorry, Unable to retrieve your location!')
}

const options = {
    enableHighAccuracy: true
}

function disabledOptions() {
    map.scrollZoom.disable();
    map.doubleClickZoom.disable();
    map.touchZoomRotate.disable();
    map.keyboard.disable();
    map.dragPan.disable();
}

function displayPosition() {
    if ('geolocation' in navigator) {
    navigator.geolocation.watchPosition(getLocation, errorHandler, options);
} else {
    console.log('Geolocation is not supported by the browser')
}
}

displayPosition();
// disabledOptions();