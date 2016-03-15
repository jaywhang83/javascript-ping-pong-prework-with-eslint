var apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    $('#location').val("");
    //promise; .then() method is called when promise me is in fullfilled state
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {
      $('.showWeather').text("The temperature in " + city + " is " + response.main.temp + "F." +
                              "And current weather condition is " + response.weather[0].description);

    }).fail(function(error) {
      $('.showWeather').text(error.message); //error handling; .fail() method is called when promise enters rejected state
    });
  });
});
