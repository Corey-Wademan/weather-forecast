// Contains all data for current weather
import React, {useEffect} from 'react';
import '../Styles/CurrentWeatherComponent.css';
import { Icon } from '@iconify/react';
import sunIcon from '@iconify-icons/emojione/sun';
import cloudWithRain from '@iconify-icons/emojione/cloud-with-rain';



const CurrentWeatherComponent = ({ currentWeather, location }) => {
    
    let timestamp = currentWeather.current.dt
    let sunriseStamp = currentWeather.current.sunrise
    let sunsetStamp = currentWeather.current.sunset
    
// ADD IN ADDITION FOR SELECTED TIMEZONE
    const stampFormatter = (stamp) => {
        let date = new Date(stamp * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let formattedTime;
        // let timezone = currentWeather.timezone
        if (hours >= 12) {
            return formattedTime = hours - 12 + ':' + minutes.substr(-2) + ' p.m.';
        } else {
            return formattedTime = hours + ':' + minutes.substr(-2) + ' a.m.';
        }
        
    };
   console.log(currentWeather.current.wind_deg)
    const calcWindDirections = (wind) => {
        if (wind >= 349 || wind <= 11) { return 'N' }
        else if (wind >= 12 && wind <= 33) { return 'NNE' }
        else if (wind >= 34 && wind <= 56) { return 'NE' }
        else if (wind >= 57 && wind <= 78) { return 'ENE' }
        else if (wind >= 79 && wind <= 101) { return 'E' }
        else if (wind >= 102 && wind <= 123) { return 'ESE' }
        else if (wind >= 124 && wind <=  146) { return 'SE' }
        else if (wind >= 147 && wind <= 168) { return 'SSE' }
        else if (wind >= 169 && wind <= 191) { return 'S' }
        else if (wind >= 192 && wind <= 213) { return 'SSW' }
        else if (wind >= 214 && wind <= 236) { return 'SW' }
        else if (wind >= 237 && wind <= 258) { return 'WSW' }
        else if (wind >= 259 && wind <= 281) { return 'W' }
        else if (wind >= 282 && wind <= 303) { return 'WNW' }
        else if (wind >= 304 && wind <= 326) { return 'NW' }
        else if (wind >= 327 && wind <= 348)  { return 'NNW' }
    } 

    const compassDirection = (degrees) => {
        let x, y, r, ctx, radians;
        ctx = window.compass.getContext("2d");
        // add 90 so that north is up then convert to radians so arrow points in correct direction
        radians = 0.0174533 * (degrees + 90);
        // calc compass centre 
        x = ctx.canvas.width / 2;
        y = ctx.canvas.height / 2;
        r = x * 0.37;
        // clear 
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        // optional styling
        ctx.strokeStyle = "rgba(255,0,0,0.5)";
        ctx.fillStyle = "rgba(255,0,0,0.5)";
        ctx.lineCap = 'round';
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        // draw compass needle
        ctx.lineWidth = 7;
        ctx.moveTo(x, y);
        ctx.lineTo(x + r * Math.cos(radians), y + r * Math.sin(radians));
        ctx.stroke();
        // arrow 
    }; 

    useEffect(() => {
        compassDirection(currentWeather.current.wind_deg);
    })

    return (
        <div>
            <div className='location-info'>
                <h2>{location} <span>|</span> {stampFormatter(timestamp)}</h2>

                <div className='sun-settings'>
                    <h2>Sunrise: {stampFormatter(sunriseStamp)} | Sunset: {stampFormatter(sunsetStamp)}</h2>
                </div>
            </div>
            <div className='row'>
                <div className='main'>
                    <h2>{Math.round(currentWeather.current.temp)} <span>℉</span></h2>
                    <h4>Feels Like: {currentWeather.current.feels_like} <span>℉</span></h4>
                    <h4>{currentWeather.current.weather[0].main}</h4>
                </div>

                <div className='main' style={{alignItems: 'flex-start'}}>
                    <h3><Icon style={{ fontSize: '2.5rem', verticalAlign: 'middle' }} icon={sunIcon} /> UV Index: {Math.round(currentWeather.current.uvi)}</h3>
                    <h3><Icon style={{ fontSize: '2.5rem', verticalAlign: 'middle' }} icon={cloudWithRain} /> { currentWeather.current.clouds }%</h3>
                </div>
    
                <div className='main'>
                    <h3>Wind: {Math.round(currentWeather.current.wind_speed)}mph</h3>
                    <h3>Humidity: {currentWeather.current.humidity}%</h3>
                </div>
                <div className='main'>

                    <h3>Wind Direction</h3>
                    {<h4>{calcWindDirections(currentWeather.current.wind_deg)}</h4>}
                    <canvas id="compass" height='110' width='220' />
                </div>
            </div>
        </div>
    )
}

export default CurrentWeatherComponent
