import React from 'react'
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
        if (hours >= 12) {
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

    return ( 
        <div className='dayForecastComponent'>
            {weatherData.daily.map((day, index) => {
                console.log(day);
                return (
                <div key={index} className='day'>
                    <h3>{dayFormatter(day.dt)}</h3>
                    {/* Icon */}
                    <div className='dayHighLow'>
                        <h4>{Math.round(day.temp.max)}°</h4>
                        <h4>{Math.round(day.temp.min)}°</h4>
                    </div>
                    <div className='sun-settings'>
                        <h5>☀️{ stampFormatter(day.sunrise) }</h5>
                        <h5>🌙{ stampFormatter(day.sunset) }</h5>
                    </div>
                    <h5>🌧️ {day.pop * 100} %</h5>
                </div>
                )
            })}
        </div>
    )
}
export default DayForecastComponent
