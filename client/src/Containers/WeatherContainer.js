import React, {useState, useEffect} from 'react';
import CurrentWeatherComponent from '../Components/CurrentWeatherComponent';
import DayForecastComponent from '../Components/DayForecastComponent';
import HourlyForecastComponent from '../Components/HourlyForecastComponent';
import Loader from '../Components/Loader';
 
import '../Styles/WeatherContainer.css';
import { Icon } from '@iconify/react';
import Spinner from '../Photos/Spinner.png'
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
    const [searchTerm, setsearchTerm] = useState('')
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState({});
    const [loading, setLoading] = useState(false);
    const [background, setBackground] = useState('')

    // Dynamically changes background depending on current weather
    const backgroundHandler = () => {
        // Day Backgrounds
        if (Object.keys(weatherData).length > 0) {
            const weatherIcon = weatherData.current.weather[0].icon

            if (weatherIcon === '01d') {
                setBackground(clear)
            } else if (weatherIcon === '02d' || weatherIcon === '04d' ) {
                setBackground(partlyCloudy)
            } else if (weatherIcon === '03d') {
                setBackground(cloudy)
            } else if (weatherIcon === '09d' || weatherIcon === '10d') {
                setBackground(rain)
            } else if (weatherIcon === '11d') {
                setBackground(thunder)
            } else if (weatherIcon === '13d') {
                setBackground(snow)
            } else if (weatherIcon === '50d') {
                setBackground(fog)
            }
            // Night Backgrounds 
            else if (weatherIcon === '01n') {
                setBackground(clearNight)
            } else if (weatherIcon === '02n' || weatherIcon === '04n' ) {
                setBackground(partlyCloudyNight)
            } else if (weatherIcon === '03n') {
                setBackground(partlyCloudyNight)
            } else if (weatherIcon === '09n' || weatherIcon === '10n') {
                setBackground(rainNight)
            } else if (weatherIcon === '11n') {
                setBackground(thunderNight)
            } else if (weatherIcon === '13n') {
                setBackground(snowNight)
            } else if (weatherIcon === '50n') {
                setBackground(fogNight)
            }
        }
    };
    
    const handleSearch = () => {
        setLoading(true)
        setTimeout(async () => {
            const res = await fetch(`/weather/${searchTerm}`)
            const data = await res.json()            
            setLoading(false)
            setWeatherData(data.weatherData)
            setLocation(data.areaData.results[0].formatted_address)
            setsearchTerm('')
        }, 2000)
    };
    
    useEffect(() => {
        backgroundHandler()
    })

    return (
        <div id='container'>
            <div className='bar'>
                    <input 
                        className='searchbar' 
                        type='text' 
                        name='searchTerm'
                        value={searchTerm} 
                        onChange={(e) => setsearchTerm(e.target.value)} 
                        placeholder='Enter City & State' 
                        autoComplete='off' 
                        required
                    />
                    <button className='search-btn' onClick={handleSearch} type='submit' name='button'>
                        <Icon icon={searchIcon} flip="horizontal" />
                    </button>
            </div>
                {loading 
                    ? <img src={Spinner} />
                : Object.keys(weatherData).length > 0 && !loading
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