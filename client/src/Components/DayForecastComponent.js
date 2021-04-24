import React, {isValidElement, useState} from 'react'
import '../Styles/DayForecast.css';

const DayForecastComponent = ({ weatherData }) => {
    
    let sunriseStamp = weatherData.sunrise
    let sunsetStamp = weatherData.sunset
    
    // ADD IN ADDITION FOR SELECTED TIMEZONE
    const stampFormatter = (stamp) => {
        let date = new Date(stamp * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let formattedTime;
        // let timezone = currentWeather.timezone
        if (hours > 12) {
            return formattedTime = hours - 12 + ':' + minutes.substr(-2) + ' p.m.';
        } else {
            return formattedTime = hours + ':' + minutes.substr(-2) + ' a.m.';
        }
        
    };

    
    const dayFormatter = (day) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var date = new Date();
        date.setTime(day*1000); // javascript timestamps are in milliseconds
        return day = days[date.getDay()];
    }

    /*const iconHandler = (icon) => {
        let url;
        //Day Icons
        if (Object.keys(weatherData).length > 0) {
            if (weatherData.daily.weather[0].icon === '01d') {
                return url = 'http://openweathermap.org/img/wn/01d@2x.png'
            } else if (weatherData.weather[0].icon === '02d') {
                return url = 'http://openweathermap.org/img/wn/02d@2x.png'
            } else if (weatherData.daily.weather[0].icon === '04d') {
                return url = 'http://openweathermap.org/img/wn/04d@2x.png'
            } else if (weatherData.daily.weather[0].icon === '03d') {
                return url = 'http://openweathermap.org/img/wn/03d@2x.png'
            } else if (weatherData.daily.weather[0].icon === '09d') {
                return url = 'http://openweathermap.org/img/wn/09d@2x.png'
            } else if (weatherData.daily.weather[0].icon === '10d') {
                return url = 'http://openweathermap.org/img/wn/10d@2x.png'
            } else if (weatherData.daily.weather[0].icon === '11d') {
                return url = 'http://openweathermap.org/img/wn/11d@2x.png'
            } else if (weatherData.daily.weather[0].icon === '13d') {
                return url = 'http://openweathermap.org/img/wn/13d@2x.png'
            } else if (weatherData.daily.weather[0].icon === '50d') {
                return url = 'http://openweathermap.org/img/wn/50d@2x.png'
            }
            // Night Icons 
            else if (weatherData.daily.weather[0].icon === '01n') {
                return url = 'http://openweathermap.org/img/wn/01n@2x.png'
            } else if (weatherData.daily.weather[0].icon === '02n') {
                return url = 'http://openweathermap.org/img/wn/02n@2x.png'
            } else if (weatherData.daily.weather[0].icon === '04n') {
                return url = 'http://openweathermap.org/img/wn/04n@2x.png'
            } else if (weatherData.daily.weather[0].icon === '03n') {
                return url = 'http://openweathermap.org/img/wn/03n@2x.png'
            } else if (weatherData.daily.weather[0].icon === '09n') {
                return url = 'http://openweathermap.org/img/wn/09n@2x.png'
            } else if (weatherData.daily.weather[0].icon === '10n') {
                return url = 'http://openweathermap.org/img/wn/10n@2x.png'
            } else if (weatherData.daily.weather[0].icon === '11n') {
                return url = 'http://openweathermap.org/img/wn/11n@2x.png'
            } else if (weatherData.daily.weather[0].icon === '13n') {
                return url = 'http://openweathermap.org/img/wn/13n@2x.png'
            } else if (weatherData.daily.weather[0].icon === '50n') {
                return url = 'http://openweathermap.org/img/wn/50n@2x.png'
            }
        }
    }*/

    return ( 
        <div className='dayForecastComponent'>
            {weatherData.daily.map((day, index) => {
                console.log(day);
                return (
                <div key={index} className='day'>
                    <h3>{dayFormatter(day.dt)}</h3>
                    {}
                    <div className='dayHighLow'>
                        <h4>{Math.round(day.temp.max)}°</h4>
                        <h4>{Math.round(day.temp.min)}°</h4>
                    </div>
                    <div className='sun-settings'>
                        <h4>☀️{ stampFormatter(day.sunrise) }</h4>
                        <h4>🌙{ stampFormatter(day.sunset) }</h4>
                    </div>
                </div>
                )
            })}
        </div>
    )
}
export default DayForecastComponent
