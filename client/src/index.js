const express = require('express');
const PORT = 5000;
const fetch = require('node-fetch')
const app = express();
require('dotenv').config()

const cors = require('cors');

app.use(express.static("client"));
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET Current & Forecast Weather By Search Term
app.get('/weather/:searchTerm', (req, res) => {
    const searchTerm = req.params.searchTerm;
    let lat,long;
    
    let latLong = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchTerm}&key=${process.env.googleAPIKEY}`; 
     
 
    fetch(latLong)
        .then(res => { return res.json() })
        .then(areaData => {
            lat = areaData.results[0].geometry.location.lat;
            long = areaData.results[0].geometry.location.lng;
            return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=imperial&appid=${process.env.weatherApiKey}`)
                .then(response => { return response.json() })
                .then(weatherData => {
                    res.send({weatherData, areaData})
                })
        });
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }


app.listen(process.env.PORT || PORT); 
console.log(`Server is listening on ${PORT}`); 

