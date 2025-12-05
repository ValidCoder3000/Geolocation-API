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

function getLocation(position) {
    let { altitude, latitude, longitude } = position.coords;
    console.log(`Longitude: ${longitude} | Latitude: ${latitude} | Altitude: ${altitude}`)
    map.setCenter([longitude, latitude]);
    marker.setLngLat([longitude, latitude]).addTo(map);
}

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


const button = document.querySelector('button');
const paragraph = document.getElementById('disclaimers');

let visibility = false;
let activity;
let watchId;

// function showDisclaimer() {
//     const space = document.createElement("p");
//     space.classList.add("disclaimer");
//     space.innerHTML = `We know where you are now :D`;
//     paragraph.appendChild(space);
// }

button.addEventListener('click', () => {
    if (!visibility) {
        watchId = displayPosition();

        if (!activity) {
            activity = document.createElement("p");
            activity.classList.add("disclaimer");
            activity.innerHTML = `We know where you are now :D`;
            paragraph.appendChild(activity);
        } else {
            activity.style.display = "block";
        }
    } else {
        if (watchId) navigator.gorlocation.clearWatch(watchId);
        if (activity) activity.style.display = "none";
    }
    
    visibility = !visibility;
});