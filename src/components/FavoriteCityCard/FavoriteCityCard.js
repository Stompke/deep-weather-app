import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../../utils/MyContext'
import axios from 'axios';
import { Link } from 'react-router-dom';

import {Title, Temp, CardContainer} from '../FavoriteCityCard/FavoriteCityCardStyles';

const FavoriteCityCard = props => {

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
              setCityData({current:{city: props.data ,temperature:100, isFake: true}})
            }
  
            
          })
          .catch( err => {
            console.log(err)
          })
        }
      },[])
      



    const deleteFavoriteCity = () => {
        const newFavorites = data.favoriteCities.filter(item => item != props.data)
        data.setFavoriteCities(newFavorites)

      // Set to localStorage
      localStorage.setItem('favoriteCities', JSON.stringify(newFavorites))
    }
    const addFavorite = () => {
        data.setFavoriteCities([...data.favoriteCities, props.data.name])
        localStorage.setItem('favoriteCities', JSON.stringify([...data.favoriteCities, props.data.name]))
      }


  

    return (<>
      {cityData.current ?
        <CardContainer>
            <Link to={`/${props.data}`} >
              <Title>{props.data}</Title> <Temp> {cityData.current.temperature} </Temp> 
            </Link>

            <button onClick={deleteFavoriteCity}>x</button>
        </CardContainer>
        : ""}
        </>
    )
}

export default FavoriteCityCard;