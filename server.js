const express = require('express');
const bodyParser = require('body-parser');
let request = require('request');
const app = express()

let apiKey = '6e57108ce81309656d621d26dcc45136';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main === undefined){
        res.render('index', {weather: null, error: 'The city you entered was not found, please try again'});
      } else {
        let humidity = weather.main.humidity
        let celsiusTemp = ((weather.main.temp)-273.15).toFixed(1)
        let minTemp = ((weather.main.temp_min)-273.15).toFixed(1)
        let maxTemp = ((weather.main.temp_max)-273.15).toFixed(1)
        function cloudy() {
          if(weather.clouds.all >= 40) {
           return `☁️`
          } else {
           return `️☀️`
          }
        }
        let text = `It's ${celsiusTemp} degrees in ${weather.name}! 
        There'll be a maximum temperature of ${maxTemp} degrees and a minimum of ${minTemp}, 
        with a humidity of ${humidity} % ${cloudy()}`;

        res.render('index', { weather: text, error: null });
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Weather app listening on port 3000 😎')
})
