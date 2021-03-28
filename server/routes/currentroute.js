const express = require('express');
const router = express.Router();

router.get('/weather/:cityName', (req, res) => {
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