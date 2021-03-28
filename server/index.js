const express = require('express');
const PORT = 5001;
const fetch = require('node-fetch')
const app = express();
const server = require('http').createServer(app);
const weatherApiKey = '71829ac8843b55f618b23d8003b4944e';
const cors = require('cors');

app.use(express.static("client"));
app.use(cors());
app.use(express.json());

// Fetch Current Weather By City Name
app.get('/weather/:cityName', (req, res) => {
    let {cityName} = req.params;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${weatherApiKey}`;
    console.log('Api is working');

    fetch(url)
    .then(response => {return response.json()})
    .then(data => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200)
        res.send(data)
    })
    .catch(err => { 
        res.status(err.response ? err.response.status : 500)
        res.send(err.message || 'Something went wrong! Please try again later.')
    });  
});

// Fetch 5 Day Forecasts By Name
app.get('/forecast/:cityname', (req, res) => {
    let {cityname} = req.params;
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityname}&units=imperial&appid=${weatherApiKey}`;

    fetch(url)
    .then(response => {return response.json()})
    .then(data => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.send(data)
    })
    .catch(err => { 
        res.status(err.response ? err.response.status : 500)
        res.send(err.message || 'Something went wrong! Please try again later.')    });  
}); 

server.listen(PORT); 
console.log(`Server is listening on ${PORT}`);

