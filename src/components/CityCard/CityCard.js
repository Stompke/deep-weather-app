import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../../utils/MyContext'
import axios from 'axios';
import styled from 'styled-components';
import {Title, Temp, CardContainer} from './CityCardStyles';

const CityCard = (props) => {

    const data = useContext(UserContext)

    const [cityData, setCityData] = useState({})

    useEffect(() => {
        const apiKey = process.env.REACT_APP_WEATHERSTACK_API_KEY
        axios
        .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${props.data.name}&units=f`)
        .then(res => {

          if (res.data.error.code !== 104){
            setCityData(res.data)
          } else {
            setCityData({current:{city: props.data.name ,temperature:100}})
          }

          
        })
        .catch( err => {
          console.log(err)
        })
      },[])

    useEffect(() => {
      localStorage.setItem(props.data.name, JSON.stringify(cityData))
    },[cityData])

    const deleteTopCity = () => {
      let current = data.topCities
      current = current.filter(city => city.name !== props.data.name)
      data.setTopCities(current)
    }

    return (<>
      {cityData.current ?
        <CardContainer>
            <Title>{props.data.name}</Title> <Temp> {cityData.current.temperature} </Temp> 
            <button onClick={deleteTopCity}>x</button>
        </CardContainer>
        : ""}
        </>
    )
}

export default CityCard