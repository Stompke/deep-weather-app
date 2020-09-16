import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, Redirect } from 'react-router-dom';
import { Container, BackContainer } from './CityPageStyles';


// COMPONENTS
import CityNotes from './CityNotes/CityNotes';
import { FaChevronLeft } from "react-icons/fa";

const CityPage = () => {
    let { city } = useParams();

    const [ cityData, setCityData ] = useState({});
    const [ noData, setNoData ] = useState(false)


    useEffect(() => {
            const apiKey = process.env.REACT_APP_WEATHERSTACK_API_KEY
            axios
            .get(`https://api.weatherstack.com/current?access_key=${apiKey}&query=${city}&units=f`)
            .then(res => {
                const newCityData = {current: res.data.current, location: res.data.location, request: res.data.request}
                let cityLocalStorage = JSON.parse(localStorage.getItem(city))

                localStorage.setItem(city, JSON.stringify({
                        ...cityLocalStorage,
                        ...newCityData
                    }))

                setCityData(
                        {
                            ...cityLocalStorage,
                            ...newCityData
                        }
                    ) 
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
        <BackContainer>
            <Link to='/'><FaChevronLeft/></Link>
        </BackContainer>

            {cityData.current &&
        <Container>

                <div>
                    
                    <h1 data-testid="cityPageTitle">{city}</h1> <img src={cityData.current.weather_icons[0]} alt="weather icon"/>
        <h4>{cityData.location.region}{cityData.location.region && ","} {cityData.location.country}</h4>
                </div>

                <Container>
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
