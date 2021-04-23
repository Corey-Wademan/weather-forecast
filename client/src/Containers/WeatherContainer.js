// Contains The Apps State - Passes down to Forecast & Current Weather Container
import React, {useState, useEffect} from 'react';
import CurrentWeatherComponent from '../Components/CurrentWeatherComponent';
import DayForecastComponent from '../Components/DayForecastComponent';
import HourlyForecastComponent from '../Components/HourlyForecastComponent';


import '../Styles/WeatherContainer.css';
import { Icon } from '@iconify/react';
import searchIcon from '@iconify-icons/iwwa/search';
// Day Backgrounds
import partlyCloudy from '../Photos/party-cloudy-bg.jpg';
import clear from '../Photos/clear-bg.jpg'
import cloudy from '../Photos/cloudy-bg.jpg'
import rain from '../Photos/rain-bg.jpg'
import snow from '../Photos/snow-bg.jpg'
import thunder from '../Photos/thunder-bg.jpg'
import fog from '../Photos/fog-bg.jpg'
// Night Backgrounds
import clearNight from '../Photos/clear-bg-night.jpg';
import partlyCloudyNight from '../Photos/party-cloudy-bg-night.jpg';
import rainNight from '../Photos/rain-bg-night.jpg';
import snowNight from '../Photos/snow-bg-night.jpg';
import thunderNight from '../Photos/thunder-bg-night.jpg';
import fogNight from '../Photos/fog-bg-night.jpg';



const WeatherContainer = () => {
    const [searchTerm, setsearchTerm] = useState()
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState({});
    const [loading, setLoading] = useState(false);
    const [background, setBackground] = useState('')
    
    const handleInput = (e) => {
        setsearchTerm(e.target.value);
    }

    // Dynamically changes background depending on current weather
    const backgroundHandler = () => {
        // Day Backgrounds
        if (Object.keys(weatherData).length > 0) {
            if (weatherData.current.weather[0].icon === '01d') {
                setBackground(clear)
            } else if (weatherData.current.weather[0].icon === '02d' || weatherData.current.weather[0].icon === '04d' ) {
                setBackground(partlyCloudy)
            } else if (weatherData.current.weather[0].icon === '03d') {
                setBackground(cloudy)
            } else if (weatherData.current.weather[0].icon === '09d' || weatherData.current.weather[0].icon === '10d') {
                setBackground(rain)
            } else if (weatherData.current.weather[0].icon === '11d') {
                setBackground(thunder)
            } else if (weatherData.current.weather[0].icon === '13d') {
                setBackground(snow)
            } else if (weatherData.current.weather[0].icon === '50d') {
                setBackground(fog)
            }
            // Night Backgrounds 
            else if (weatherData.current.weather[0].icon === '01n') {
                setBackground(clearNight)
            } else if (weatherData.current.weather[0].icon === '02n' || weatherData.current.weather[0].icon === '04n' ) {
                setBackground(partlyCloudyNight)
            } else if (weatherData.current.weather[0].icon === '03n') {
                setBackground(partlyCloudyNight)
            } else if (weatherData.current.weather[0].icon === '09n' || weatherData.current.weather[0].icon === '10n') {
                setBackground(rainNight)
            } else if (weatherData.current.weather[0].icon === '11n') {
                setBackground(thunderNight)
            } else if (weatherData.current.weather[0].icon === '13n') {
                setBackground(snowNight)
            } else if (weatherData.current.weather[0].icon === '50n') {
                setBackground(fogNight)
            }
        }
    };
    
    const handleSearch = () => {
        fetch(`/weather/${searchTerm}`)
            .then(res => { return res.json() })
            .then(result => {
                setWeatherData(result.weatherData)
                setLocation(result.areaData.results[0].formatted_address)
            })
       backgroundHandler();
    };

    useEffect(() => {
        backgroundHandler();
    }, [handleSearch]);

    return (
        <div id='container'>
            <div className='bar'>
                    <input className='searchbar' type='text' name='searchTerm' onChange={handleInput} placeholder='Enter City & State' autoComplete='off' required/>
                    <button className='search-btn' onClick={handleSearch} type='submit' value='submit' name='button'>
                        <Icon icon={searchIcon} flip="horizontal" />
                    </button>
            </div>
            
            
                {Object.keys(weatherData).length > 0
                    ? <div className='weather-container' style={{backgroundImage: `url(${background})`}}>
                            <CurrentWeatherComponent
                                location={location}
                                currentWeather={weatherData}/>
                            <HourlyForecastComponent weatherData={weatherData} />
                            <DayForecastComponent weatherData={weatherData} />
                        </div> 
                    : <></>
                }
             
        </div>
    )

};

export default WeatherContainer;