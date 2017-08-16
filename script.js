var APIKey = "3v9tLnFRvW7F9bWGB";
var userInput = document.getElementById('input').value;
var endpoint = `http://api.airvisual.com//v2/city?city=los-angeles&key=${APIKey}`;

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
