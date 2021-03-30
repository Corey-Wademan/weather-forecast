const express = require('express');
const PORT = 5000;
const fetch = require('node-fetch')
const app = express();
const weatherApiKey = '*********************';
const cors = require('cors');

app.use(express.static("client"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET Current & Forecast Weather By Search Term
app.get('/weather/:searchTerm', (req, res) => {
    console.log(req.params)
    const searchTerm = req.params.searchTerm;
    console.log(searchTerm)
    
    let currentUrl = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=${weatherApiKey}`;
    let forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&units=imperial&appid=${weatherApiKey}`
    
    Promise.all([
        fetch(currentUrl),
        fetch(forecastUrl)
    ]).then((responses) => {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }).then((data) => {
        // Log the data to the console
        // You would do something with both sets of data here
        res.send({data})
    }).catch((error) => {
        // if there's an error, log it
        console.log(error);
    });
}); 


app.listen(PORT); 
console.log(`Server is listening on ${PORT}`);

