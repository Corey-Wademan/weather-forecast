import React from 'react'
import '../Styles/HourlyForecast.css';


const HourlyForecastComponent = ({ weatherData }) => {
    
    
    // ADD IN ADDITION FOR SELECTED TIMEZONE
    const stampFormatter = (stamp) => {
        let newStamp = stamp * 1000
        let date = new Date(newStamp);
        let formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        return formattedTime
    };


    return (
        <div className='hourlyForecastComponent'>
            {weatherData.hourly.map((hour, index) => {
                console.log(hour);
                return (
                <div key={index} className='hour'>
                    <h2>{stampFormatter(hour.dt)}</h2>
                    {/* Icon */}
                    <h3>{Math.round(hour.temp)}°</h3>
                        {/* % of rain*/}
                        {/* UV */}
                        {/* Wind Speed */}
                        {/* Wind Direction*/}
                </div>
                )
            })}
        </div>
    )
}

export default HourlyForecastComponent
