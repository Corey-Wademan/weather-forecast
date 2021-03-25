const { response } = require('express');
const express = require('express');
const PORT = 5001;
const fetch = require('node-fetch')
const app = express();
const server = require('http').createServer(app);

const weatherApiKey = '71829ac8843b55f618b23d8003b4944e' 

app.use(express.static('public'));

// Test to make sure server is firing "Localhost::5001"
app.get('/', (req, res) => {
    const d = new Date();
    res.json({The_time_is: d.toTimeString()});
    console.log('I have recieved the current time')
});

// Fetch Current Weather By City Name
app.get('/weather/:cityName', (req, res) => {
    let {cityName} = req.params;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApiKey}`

    fetch(url)
    .then(response => {return response.json()})
    .then(data => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.send(data)
    })
    .catch(err => { console.log(err); });  
});

//Fetch Current Weather By Zip
app.get('/weather/:zipcode', (req, res) => {
    let {zipcode, countrycode} = req.params;
    let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},${countrycode}&appid=${weatherApiKey}`;

    fetch(url)
    .then(response => {return response.json()})
    .then(data => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.send(data)
    })
    .catch(err => { console.log(err); });  
});

// Fetch 5 Day Forecasts By Name
app.get('/forecast/:cityname', (req, res) => {
    let {cityname} = req.params;
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${weatherApiKey}`;

    fetch(url)
    .then(response => {return response.json()})
    .then(data => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.send(data)
    })
    .catch(err => { console.log(err); });  
});

//Fetch 5 Day Forecasts By Zip
app.get('/forecast/:zipcode', (req, res) => {
    let {zipcode, countrycode} = req.params;
    let url = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},${countrycode}&appid=${weatherApiKey}`;

    fetch(url)
    .then(response => {return response.json()})
    .then(data => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.send(data)
    })
    .catch(err => { console.log(err); });  

});

server.listen(PORT); 
console.log(`Server is listening on ${PORT}`);

