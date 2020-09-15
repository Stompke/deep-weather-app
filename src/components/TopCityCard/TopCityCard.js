import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../../utils/MyContext'
import axios from 'axios';
import { Link } from 'react-router-dom';

import {Title, Temp, CardContainer} from './TopCityCardStyles';

const TopCityCard = (props) => {

    const data = useContext(UserContext)

    const [cityData, setCityData] = useState({})


    // Possiby change to useReducer
    useEffect(() => {

        const apiKey = process.env.REACT_APP_WEATHERSTACK_API_KEY

        if (localStorage.getItem(props.data) &&  localStorage.getItem(props.data) != "{}") {
          setCityData(JSON.parse(localStorage.getItem(props.data)))
        } else {
          axios
          .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${props.data}&units=f`)
          .then(res => {
  
            if (!res.data.error){
              setCityData(res.data)
              localStorage.setItem(props.data, JSON.stringify(res.data))

            } else {
              // ran out of API calls had to use fake data
              setCityData({current:{city: props.data ,temperature:100}})
            }
  
            
          })
          .catch( err => {
            console.log(err)
          })
        }
      },[])


    const deleteTopCity = () => {
      let current = data.topCities
      current = current.filter(city => city !== props.data)
      data.setTopCities(current)
      // Set to localStorage
      localStorage.setItem('topCities', JSON.stringify(current))
    }

    const addFavorite = () => {
      // data.setFavoriteCities([...data.favoriteCities, props.data])
      data.sortThenSetFavorite([...data.favoriteCities, props.data])
      localStorage.setItem('favoriteCities', JSON.stringify([...data.favoriteCities, props.data].sort()))
    }


    return (<>
      {cityData.current ?
        <CardContainer>
            <Link to={`/${props.data}`} >
              <Title>{props.data}</Title> <Temp> {cityData.current.temperature} </Temp> 
            </Link>
            {!data.favoriteCities.includes(props.data) && <button onClick={addFavorite} >♥️</button>}
             
            {props.canRemove && <button onClick={deleteTopCity}>x</button>}
        </CardContainer>
        : ""}
        </>
    )
}

export default TopCityCard;