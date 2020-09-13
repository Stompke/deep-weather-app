import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../../utils/MyContext'
import axios from 'axios';
import { Link } from 'react-router-dom';

import {Title, Temp, CardContainer} from './CityCardStyles';

const CityCard = (props) => {

    const data = useContext(UserContext)

    const [cityData, setCityData] = useState({})


    // Possiby change to useReducer
    useEffect(() => {

        const apiKey = process.env.REACT_APP_WEATHERSTACK_API_KEY

        if (localStorage.getItem(props.data.name)) {
          setCityData(JSON.parse(localStorage.getItem(props.data.name)))
        } else {
          axios
          .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${props.data.name}&units=f`)
          .then(res => {
  
            if (!res.data.error){
              setCityData(res.data)
            } else {
              setCityData({current:{city: props.data.name ,temperature:100}})
            }
  
            
          })
          .catch( err => {
            console.log(err)
          })
        }
      },[])
      

      // Does not need to run when local storage is already there
      useEffect(() => {
        localStorage.setItem(props.data.name, JSON.stringify(cityData))
        // console.log('setting city LS: ', cityData)
      },[cityData])



    const deleteTopCity = () => {
      let current = data.topCities
      current = current.filter(city => city.name !== props.data.name)
      data.setTopCities(current)
      // Set to localStorage
      localStorage.setItem('topCities', JSON.stringify(current))
    }

    return (<>
      {cityData.current ?
        <CardContainer>
            <Link to={`/${props.data.name}`} >
              <Title>{props.data.name}</Title> <Temp> {cityData.current.temperature} </Temp> 
            </Link>
            <button onClick={deleteTopCity}>x</button>
        </CardContainer>
        : ""}
        </>
    )
}

export default CityCard