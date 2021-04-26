import React from 'react'
import '../Styles/DayForecast.css';

const DayForecastComponent = ({ weatherData }) => {
    
    
    const stampFormatter = (stamp) => {
        let newStamp = stamp * 1000
        let date = new Date(newStamp);
        let formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        return formattedTime
    };

    
    const dayFormatter = (day) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var date = new Date();
        date.setTime(day*1000);
        return day = days[date.getDay()];
    }

    const iconHandler = (icon) => {
        let url;
        //Day Icons
        if (Object.keys(weatherData).length > 0) {
            if (icon === '01d') {
                return url = 'http://openweathermap.org/img/wn/01d@2x.png'
            } else if (icon === '02d') {
                return url = 'http://openweathermap.org/img/wn/02d@2x.png'
            } else if (icon === '04d') {
                return url = 'http://openweathermap.org/img/wn/04d@2x.png'
            } else if (icon === '03d') {
                return url = 'http://openweathermap.org/img/wn/03d@2x.png'
            } else if (icon === '09d') {
                return url = 'http://openweathermap.org/img/wn/09d@2x.png'
            } else if (icon === '10d') {
                return url = 'http://openweathermap.org/img/wn/10d@2x.png'
            } else if (icon === '11d') {
                return url = 'http://openweathermap.org/img/wn/11d@2x.png'
            } else if (icon === '13d') {
                return url = 'http://openweathermap.org/img/wn/13d@2x.png'
            } else if (icon === '50d') {
                return url = 'http://openweathermap.org/img/wn/50d@2x.png'
            }
            // Night Icons 
            else if (icon === '01n') {
                return url = 'http://openweathermap.org/img/wn/01n@2x.png'
            } else if (icon === '02n') {
                return url = 'http://openweathermap.org/img/wn/02n@2x.png'
            } else if (icon === '04n') {
                return url = 'http://openweathermap.org/img/wn/04n@2x.png'
            } else if (icon === '03n') {
                return url = 'http://openweathermap.org/img/wn/03n@2x.png'
            } else if (icon === '09n') {
                return url = 'http://openweathermap.org/img/wn/09n@2x.png'
            } else if (icon === '10n') {
                return url = 'http://openweathermap.org/img/wn/10n@2x.png'
            } else if (icon === '11n') {
                return url = 'http://openweathermap.org/img/wn/11n@2x.png'
            } else if (icon === '13n') {
                return url = 'http://openweathermap.org/img/wn/13n@2x.png'
            } else if (icon === '50n') {
                return url = 'http://openweathermap.org/img/wn/50n@2x.png'
            }
        }
    }

    return ( 
        <div className='dayForecastComponent'>
            {weatherData.daily.map((day, index) => {
                console.log(day);
                return (
                <div key={index} className='day'>
                    <h3>{dayFormatter(day.dt)}</h3>
                    <img src={iconHandler(day.weather[0].icon)} />
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
