// https://airvisual.com/api/documentation

var APIKey = "3v9tLnFRvW7F9bWGB";
var x = document.getElementById("index");
var y = document.getElementById("quality")
var z = document.getElementById("results");
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
            var progress = document.createElement("div");
            var bar = document.createElement("div");
            progress.setAttribute("id", "myProgress");
            bar.setAttribute("id", "myBar");
            document.getElementById("progressBar").appendChild(progress);
            progress.appendChild(bar);
            move(aqiIndex);
            if (aqiIndex <= 50) {
                bar.style.backgroundColor = "green";
                y.innerHTML = "Conditions: Good";
                z.innerHTML = "Air quality is considered satisfactory, and air pollution poses little or no risk."
            }
            else if (aqiIndex <= 100) {
                bar.style.backgroundColor = "yellow";
                bar.style.color = "black";
                y.innerHTML = "Conditions: Moderate";
                z.innerHTML = "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people. For example, people who are unusually sensitive to ozone may experience respiratory symptoms."
            }
            else if (aqiIndex <= 150) {
                bar.style.backgroundColor = "orange";
                y.innerHTML = "Conditions: Unhealthy for Sensitive Groups";
                z.innerHTML = "Although general public is not likely to be affected at this AQI range, people with lung disease, older adults and children are at a greater risk from exposure to ozone, whereas persons with heart and lung disease, older adults and children are at greater risk from the presence of particles in the air."
            }
            else if (aqiIndex <= 200) {
                bar.style.backgroundColor = "red";
                y.innerHTML = "Conditions: Unhealthy";
                z.innerHTML = "Everyone may begin to experience some adverse health effects, and members of the sensitive groups may experience more serious effects."
            }
            else if (aqiIndex <= 300) {
                bar.style.backgroundColor = "purple";
                y.innerHTML = "Conditions: Very Unhealthy";
                z.innerHTML = "This would trigger a health alert signifying that everyone may experience more serious health effects."
            }
            else if (aqiIndex <= 500) {
                bar.style.backgroundColor = "maroon";
                y.innerHTML = "Conditions: Hazardous";
                z.innerHTML = "This would trigger a health warnings of emergency conditions. The entire population is more likely to be affected."
            }
            else {
                z.innerHTML = "We are unable to retrieve results at this time."
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

function move(index) {
  var elem = document.getElementById("myBar");   
  var width = 1
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= index / 5) {
      clearInterval(id);
    } 
    else {
      width++; 
      elem.style.width = width + '%';
      elem.innerHTML = index;
    }
  }
}

