const express = require('express');
const router = express.Router();

router.get('/forecast/:cityname', (req, res) => {
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