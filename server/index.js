const express = require('express');
const PORT = 5000;
const fetch = require('node-fetch')
const app = express();
const weatherApiKey = '71829ac8843b55f618b23d8003b4944e';
const googleAPIKEY = 'AIzaSyCHrNerHaJkIk2eI0YkLBYibtAY4Thg8Ow'
const cors = require('cors');

app.use(express.static("client"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET Current & Forecast Weather By Search Term
app.get('/weather/:searchTerm', (req, res) => {
    const searchTerm = req.params.searchTerm;
    let lat, long;
    
    let latLong = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchTerm}&key=${googleAPIKEY}`;
    let weatherData = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={part}&appid=${weatherApiKey}`;

    fetch(latLong)
        .then(res => { return res.json() })
        .then(result => {
            lat = result.results[0].geometry.location.lat;
            long = result.results[0].geometry.location.lng;
        });
    
    /*Promise.all([
        fetch(latLong),
        fetch(weatherData)
    ]).then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }).then(function (data) {
        // Log the data to the console
        // You would do something with both sets of data here
        res.send({data})
        //console.log(data);
    }).catch(function (error) {
        // if there's an error, log it
        //console.log(error);
    });*/
}); 


app.listen(PORT); 
console.log(`Server is listening on ${PORT}`);

