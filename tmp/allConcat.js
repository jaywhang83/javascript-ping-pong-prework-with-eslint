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

var apiKey = require('./../.env').apiKey;
var convertTemperature = require('./../js/temp-interface.js').convertTemperature;

$(document).ready(function() {
  $('#forecast').click(function() {
    var city = $('#location').val();
    $('#location').val("");
    //promise; .then() method is called when promise me is in fullfilled state
    $.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey).then(function(response) {
      $('.showForecast').append("<h2>5 day forcast for: " + city + "</br>");
      console.log(JSON.stringify(response));
      var temps;
      for (var i = 0; i < response.list.length; i+=8) {
        temps = convertTemperature(response.list[i].main.temp);
        $('.showForecast').append("<h3> Date: " + response.list[i].dt_txt + " Temperature: " + temps[0]+ "F" + " Weather condition: " + response.list[i].weather[0].description + "</h2>");
      }
    }).fail(function(error) {
      $('.showForecast').text(error.responseJSON.message); //error handling; .fail() method is called when promise enters rejected state
    });
  });
});

$(document).ready(function() {
  $('#time').text(moment()); 
  $('#signup').submit(function(event) {
    event.preventDefault();
    var email = $('#email').val();
    $('#signup').hide();
    $('#solution').prepend('<p>Thank you, ' + email + ' has been added to our list</p>');
  });
});

exports.convertTemperature = function(temp) {
  var convertedTemp = [];
  var f = temp * (9/5) - 456.67;
  convertedTemp.push(Math.floor(f));

  var c = (f - 32) / 1.8;
  convertedTemp.push(Math.floor(c));

  return convertedTemp;
};

var apiKey = require('./../.env').apiKey;
var convertTemperature = require('./../js/temp-interface.js').convertTemperature;

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    $('#location').val("");
    //promise; .then() method is called when promise me is in fullfilled state
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {
      var temps = convertTemperature(response.main.temp);
        $('.showWeather').html("<h2>The temperature in " + city + " is " + temps[0] + "F / " + temps[1] + "C. " + "</br>" + "Current weather condition is " + response.weather[0].description + "</h2>");
    }).fail(function(error) {
      $('.showWeather').text(error.message); //error handling; .fail() method is called when promise enters rejected state
    });
  });
});
