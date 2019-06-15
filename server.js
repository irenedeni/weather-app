// let request = require('request');
// const argv = require('yargs').argv;

// let apiKey = '6e57108ce81309656d621d26dcc45136';
// let city = argv.c || 'Amsterdam';
// let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

// request(url, function (err, response, body) {
//   if(err){
//     console.log('error:', error);
//   } else {
//     let weather = JSON.parse(body)
//     let celsiusTemp = ((weather.main.temp)-273.15).toFixed(2)
//     let message = `It's ${celsiusTemp} degrees in ${weather.name}!`;
//     console.log(message)
//   }
// });

const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
