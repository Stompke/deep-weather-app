import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container } from './CityPageStyles';

// COMPONENTS
import CityNotes from './CityNotes/CityNotes';

const CityPage = () => {
    let { city } = useParams();
    const [ cityData, setCityData ] = useState({});
    const [ noData, setNoData ] = useState(false)


    useEffect(() => {
            const apiKey = process.env.REACT_APP_WEATHERSTACK_API_KEY
            axios
            .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}&units=f`)
            .then(res => {
                console.log('Retrieved city data for city page', res.data)
                localStorage.setItem(city, JSON.stringify(res.data))
                setCityData(res.data) 
            })
            .catch( err => {
                console.log(err)    
                if(localStorage.getItem(city)){
                    setCityData(JSON.parse(localStorage.getItem(city))) 
                } else {
                    setNoData(true)
                }
            })

    },[])



    return (
        <>
            {cityData.current &&
        <Container>

                <div>
                    <h1>{city}</h1> 
        <h4>{cityData.location.region}{cityData.location.region && ","} {cityData.location.country}</h4>
                    <p>Data Received at: {cityData.location.localtime}</p>
                </div>

                <Container>
                    <img src={cityData.current.weather_icons[0]} alt="weather icon"/>
                </Container>

                <div>
                    <h3>Temperature: {cityData.current.temperature}</h3>
                    <h3>Humidity: {cityData.current.humidity}</h3>
                    <h3>Precipitation: {cityData.current.precip}</h3>
                </div>

                <Container>
                    <CityNotes cityData={cityData} setCityData={setCityData}/>
                </Container>
        </Container>
            }  
            {noData &&                 <Container>
                    <h1>Need Internet connection to get city data.</h1>
                </Container>}
            </>
    )
}

export default CityPage;