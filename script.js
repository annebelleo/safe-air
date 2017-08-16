// https://airvisual.com/api/documentation

// var APIKey = "3v9tLnFRvW7F9bWGB";
// var userInput = document.getElementById('input').value;
// var endpoint = `http://api.airvisual.com//v2/nearest_city?lat=${latitude}&lon=${longitude}&rad=${radius}&key=${APIKey}`;
var x = document.getElementById("demo");
console.log(x);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

// function results() {
//     fetch(endpoint)
//         .then(
//             function(data) {
//                 return data.json();
//             })

//         .then(function(json) {
//             console.log(json);
//         })
//         .catch(
//             err => {
//                 console.log(err);
//             });
// }
