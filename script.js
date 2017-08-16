// https://airvisual.com/api/documentation

var APIKey = "3v9tLnFRvW7F9bWGB";
// var userInput = document.getElementById('input').value;

var x = document.createElement("p");
var latitude;
var longitude;

function getLocation() {
    console.log("function ran")
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    console.log("function ran");
    latitude = position.coords.latitude
    longitude = position.coords.longitude
    return latitude;
    return longitude;
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    // console.log(x.innerHTML)
}

var endpoint = `http://api.airvisual.com//v2/nearest_city?lat=${latitude}&lon=${longitude}&rad=5&key=${APIKey}`;
console.log(endpoint);

function results() {
    fetch(endpoint)
        .then(
            function(data) {
                return data.json();
            })

        .then(function(json) {
            console.log(json);
        })
        .catch(
            err => {
                console.log(err);
            });
}
