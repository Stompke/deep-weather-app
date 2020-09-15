import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../../utils/MyContext'
import axios from 'axios';
import { Link } from 'react-router-dom';

import {Title, Temp, CardContainer, RemoveButton} from '../FavoriteCityCard/FavoriteCityCardStyles';

const FavoriteCityCard = props => {

    const data = useContext(UserContext)

    const [cityData, setCityData] = useState({})
    const [ noData, setNoData ] = useState(false)

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
            setNoData(true)
          })
        }
      },[])
      



    const deleteFavoriteCity = () => {
        const newFavorites = data.favoriteCities.filter(item => item != props.data)
        data.setFavoriteCities(newFavorites)

      // Set to localStorage
      localStorage.setItem('favoriteCities', JSON.stringify(newFavorites))
    }



  

    return (<>
      
        <CardContainer>
            <Link to={`/${props.data}`} >
              <Title>{props.data}</Title> <Temp> {cityData.current ? `${cityData.current.temperature}º` : '.'} </Temp> 
            </Link>

            <RemoveButton onClick={deleteFavoriteCity}><i class="fal fa-ban"></i></RemoveButton>
        </CardContainer>
        </>
    )
}

export default FavoriteCityCard;