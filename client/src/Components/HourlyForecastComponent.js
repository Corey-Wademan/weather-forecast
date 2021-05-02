import React from 'react'
import '../Styles/HourlyForecast.css';


const HourlyForecastComponent = ({ weatherData }) => {
    
    
    
    const stampFormatter = (stamp) => {
        let newStamp = stamp * 1000
        let date = new Date(newStamp);
        let formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        return formattedTime
    };

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


    return (
        <div className='hourlyForecastComponent'>
            {weatherData.hourly.map((hour, index) => {
                console.log(hour);
                return (
                <div key={index} className='hour'>
                    <h3>{stampFormatter(hour.dt)}</h3>
                    {/* Icon */}
                    <h3>{Math.round(hour.temp)}°</h3>
                        <div className='bottom-section'>
                            <h4>🌧️<br />{Math.round(hour.pop * 100)}%</h4>
                            <h4>☀️<br />{Math.round(hour.uvi)}</h4>
                            <h4>{Math.round(hour.wind_speed)}mph <br /> {calcWindDirections(hour.wind_deg)} </h4>
                        </div>
                </div>
                )
            })}
        </div>
    )
}

export default HourlyForecastComponent
