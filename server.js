const express = require('express');
const bodyParser = require('body-parser');
const app = express()
let request = require('request');
let apiKey = '6e57108ce81309656d621d26dcc45136';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index');
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
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let celsiusTemp = ((weather.main.temp)-273.15).toFixed(2)
        let message = `It's ${celsiusTemp} degrees in ${weather.name}!`;
        res.render('index', {weather: message, error: null});
    }}
  });
  console.log(req.body.city);
})

app.listen(3000, function () {
  console.log('Weather app listening on port 3000!')
})
