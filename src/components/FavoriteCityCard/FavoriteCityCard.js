import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../../utils/MyContext'
import axios from 'axios';
import { Link } from 'react-router-dom';

import {Title, Temp, CardContainer, RemoveButton} from '../FavoriteCityCard/FavoriteCityCardStyles';
import { FaBan } from "react-icons/fa";


const FavoriteCityCard = props => {

    const data = useContext(UserContext)

    const [cityData, setCityData] = useState({})
    const [ noData, setNoData ] = useState(false)


    useEffect(() => {
          const apiKey = process.env.REACT_APP_WEATHERSTACK_API_KEY

          axios
          .get(`https://api.weatherstack.com/current?access_key=${apiKey}&query=${props.data}&units=f`)
          .then(res => {
            const newCityData = {current: res.data.current, location: res.data.location, request: res.data.request}
            let cityLocalStorage = JSON.parse(localStorage.getItem(props.data))

                localStorage.setItem(props.data, JSON.stringify({
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
            if (localStorage.getItem(props.data) &&  localStorage.getItem(props.data) != "{}") {
              setCityData(JSON.parse(localStorage.getItem(props.data)))
              console.log('grabbed from local storage')
            } else {
              setNoData(true)
            }
          })
        
      },[])
      



    const deleteFavoriteCity = () => {
        const newFavorites = data.favoriteCities.filter(item => item != props.data)
        data.setFavoriteCities(newFavorites)

      // Set to localStorage
      localStorage.setItem('favoriteCities', JSON.stringify(newFavorites))
    }



  

    return (<>
      
        <CardContainer data-testid="favoriteCityCard">
            <Link to={`/${props.data}`}  >
              <Title data-testid="favoriteCityCardLink">{props.data}</Title> <Temp> {cityData.current ? `${cityData.current.temperature}º` : '.'} </Temp> 
            </Link>

    <RemoveButton onClick={deleteFavoriteCity}><FaBan/></RemoveButton>
        </CardContainer>
        </>
    )
}

export default FavoriteCityCard;