const express = require('express');
const PORT = 5000;
const fetch = require('node-fetch')
const app = express();
const weatherApiKey;
const googleAPIKEY;
const cors = require('cors');

app.use(express.static("client"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET Current & Forecast Weather By Search Term
app.get('/weather/:searchTerm', (req, res) => {
    const searchTerm = req.params.searchTerm;
    
    let latLong = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchTerm}&key=${googleAPIKEY}`;
    

    fetch(latLong)
        .then(res => { return res.json() })
        .then(result => {
            lat = result.results[0].geometry.location.lat;
            long = result.results[0].geometry.location.lng;
            return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=imperial&appid=${weatherApiKey}`)
                .then(response => { return response.json() })
                .then(data => {
                    res.send({data, result})
                })
        });
}); 


app.listen(PORT); 
console.log(`Server is listening on ${PORT}`);

