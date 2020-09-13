import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container } from './CityPageStyles';

const CityPage = () => {
    let { city } = useParams();

    const getCityData = () => {

        if (localStorage.getItem(city)) {
            return JSON.parse(localStorage.getItem(city))
        } else {
        const apiKey = process.env.REACT_APP_WEATHERSTACK_API_KEY
        axios
        .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}&units=f`)
        .then(res => {
          console.log('Retrieved city data for city page', res.data)
          localStorage.setItem(city, JSON.stringify(res.data))
          return res.data
        })
        .catch( err => {
          console.log(err)
        })
        }
    }

    const [ cityData, setCityData ] = useState(() => {
        const cityDataFunction = getCityData();
        return cityDataFunction;
    });


    return (
        <Container>  
            <div>
                <h1>{city}</h1> 
                <h4>{cityData.location.region}</h4>
            </div>

            <Container>
                <img src={cityData.current.weather_icons[0]} alt="weather icon"/>
            </Container>
            <div>
                <h3>Temperature: {cityData.current.temperature}</h3>
                <h3>Humidity: {cityData.current.humidity}</h3>
                <h3>Current Time: {cityData.current.observation_time}</h3>
                <h3>Precipitation: {cityData.current.precip}</h3>
            </div>
        </Container>
    )
}

export default CityPage;