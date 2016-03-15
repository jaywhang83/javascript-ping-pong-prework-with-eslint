var pingPong = require('./../js/ping-pong.js').pingPong;

$(document).ready(function() {
  $('#ping-pong').submit(function(event) {
    event.preventDefault();
    var goal = $('#goal').val();
    var output = pingPong(goal);
    output.forEach(function(element) {
      $('#solution').append("<li>" + element + "</li>");
    });
  });
});

$(document).ready(function() {
  $('#signup').submit(function(event) {
    event.preventDefault();
    var email = $('#email').val();
    $('#signup').hide();
    $('#solution').prepend('<p>Thank you, ' + email + ' has been added to our list</p>');
  });
});

$(document).ready(function() {
  $('#time').text(moment()); 
});

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
