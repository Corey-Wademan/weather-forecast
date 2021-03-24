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
})

server.listen(PORT); 
console.log(`Server is listening on ${PORT}`);

