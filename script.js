// https://airvisual.com/api/documentation

var APIKey = "3v9tLnFRvW7F9bWGB";
var x = document.getElementById("demo");
var latitude;
var longitude;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoordinates);
    }
    else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function getCoordinates(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    results(latitude, longitude, APIKey);
}

function results(latitude, longitude, APIKey) {
    var endpoint = `http://api.airvisual.com//v2/nearest_city?lat=${latitude}&lon=${longitude}&rad=5&key=${APIKey}`;
    fetch(endpoint)
        .then(
            function(data) {
                return data.json();
            })

        .then(function(json) {
            console.log(json);
            var aqiIndex = json.data.current.pollution.aqius;
            x.innerHTML = `AQI Index: ${json.data.current.pollution.aqius}`;
            if (aqiIndex <= 50) {
                console.log("things look good fam");
            }
        })
        .catch(
            err => {
                console.log(err);
            });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred.";
            break;
    }
}
