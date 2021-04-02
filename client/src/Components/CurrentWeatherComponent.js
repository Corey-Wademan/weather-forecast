// Contains all data for current weather
import React, {useEffect} from 'react';
import '../Styles/CurrentWeatherComponent.css';

const CurrentWeatherComponent = ({ currentWeather }) => {
    
    let timestamp = currentWeather.dt
    let sunriseStamp = currentWeather.sys.sunrise
    let sunsetStamp = currentWeather.sys.sunset
    

    const stampFormatter = (stamp) => {
        let date = new Date(stamp * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let formattedTime;
        if (hours > 12) {
            return formattedTime = hours - 12 + ':' + minutes.substr(-2)
        } else 
        return formattedTime = hours + ':' + minutes.substr(-2);
    }

    const compassDirection = (degrees) => {
        let x, y, r, ctx, radians;
        ctx = window.compass.getContext("2d");
        // subtract 90 so that north is up then convert to radians
        radians = 0.0174533 * (degrees + 90);
        // calc compass centre 
        x = ctx.canvas.width / 2;
        y = ctx.canvas.height / 2;
        r = x * 0.3;
        // clear 
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        // optional styling
        ctx.strokeStyle = "rgba(255,0,0,0.5)";
        ctx.fillStyle = "rgba(255,0,0,0.5)";
        ctx.lineCap = 'round';
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 5;
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        // draw compass needle
        ctx.lineWidth = 7;
        ctx.moveTo(x, y);
        ctx.lineTo(x + r * Math.cos(radians), y + r * Math.sin(radians));
        ctx.stroke();
    };
      

    useEffect(() => {
        compassDirection(currentWeather.wind.deg);
    })





    return (
        <div>
            <div className='location-info'>
        

            </div>
            <div className='row'>
                <div className='main'>
                    <h2>{Math.round(currentWeather.main.temp)} ℉</h2>
                    <h4>Feels Like: {currentWeather.main.feels_like} ℉</h4>
                    <h4>{currentWeather.weather[0].description}</h4>
                </div>
                <div className='sun-settings'>
                    <h2>Sunrise: {stampFormatter(sunriseStamp)}<span>a.m.</span> | Sunset: {stampFormatter(sunsetStamp)}<span>p.m.</span></h2>
                </div>
                <div className='sub-main'>
                    <h3>Humidity: {currentWeather.main.humidity}%</h3>
                    <h3>Wind: {Math.round(currentWeather.wind.speed)}mph</h3>
                    <canvas id="compass" height='120' width='200' />
                </div>
            </div>
        </div>
    )
}

export default CurrentWeatherComponent
