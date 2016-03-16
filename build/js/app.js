(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "dd3829f0d8acf46a89662b5aeb791abd"; 

},{}],2:[function(require,module,exports){
exports.pingPong = function(goal) {
  var output = [];
  for (var i = 0; i <= goal; i++) {
    if (i % 15 === 0) {
      output.push("ping-pong");
    } else if (i % 3 === 0) {
      output.push("ping");
    } else if (i % 5 === 0) {
      output.push("pong");
    } else {
      output.push(i);
    }
  }
  return output;
};

},{}],3:[function(require,module,exports){
exports.convertTemperature = function(temp) {
  var convertedTemp = [];
  var f = temp * (9/5) - 456.67;
  convertedTemp.push(Math.floor(f));

  var c = (f - 32) / 1.8;
  convertedTemp.push(Math.floor(c));

  return convertedTemp;
};

},{}],4:[function(require,module,exports){
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

},{"./../.env":1,"./../js/ping-pong.js":2,"./../js/temp-interface.js":3}]},{},[4]);
