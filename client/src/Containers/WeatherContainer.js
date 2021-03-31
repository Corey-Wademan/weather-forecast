// Contains The Apps State - Passes down to Forecast & Current Weather Container
import React, {useState, useEffect} from 'react';
import ForecastContainer from './ForecastContainer';
import CurrentWeatherComponent from '../Components/CurrentWeatherComponent';
import Loader from '../Components/Loader';

import '../Styles/WeatherContainer.css';
import { Icon } from '@iconify/react';
import searchIcon from '@iconify-icons/iwwa/search';



const WeatherContainer = () => {
    const [searchTerm, setsearchTerm] = useState('')
    const [currentWeather, setCurrentWeather] = useState({});
    const [forecastedWeather, setForecastedWeather] = useState({});
    const [loading, setLoading] = useState(true); 
    
    const handleInput = (e) => {
        setsearchTerm(e.target.value);
    }

    const handleSearch = () => {
        fetch(`/weather/${searchTerm}`)
            .then(res => { return res.json() })
            .then(result => {
                setCurrentWeather({...result.data })
                console.log(result)
            })
        setLoading(false)
    };
   

    return (
        <>
            <div className='search-bar'>
                    <input className='text_input' type='text' name='searchTerm' onChange={handleInput} placeholder='Enter city' />
                    <button className='search-button' onClick={handleSearch} type='submit' value='submit' name='button'>
                        <Icon icon={searchIcon} flip="horizontal" />
                    </button>
            </div>
            
            <div className='weather_container'>
                {Object.keys(currentWeather).length > 0
                    ? <h1>{currentWeather.main.temp}</h1>
                    : <Loader />
                }
            </div>
        </>
    )

};

export default WeatherContainer;