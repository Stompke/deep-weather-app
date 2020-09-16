import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../../utils/MyContext'
import axios from 'axios';
import { Link } from 'react-router-dom';

import {Title, Temp, CardContainer, RemoveButton, FavoriteButton} from '../FavoriteCityCard/FavoriteCityCardStyles';
import { FaBan, FaHeart } from "react-icons/fa";

const TopCityCard = (props) => {

    const data = useContext(UserContext)

    const [cityData, setCityData] = useState({})
    const [ noData, setNoData ] = useState(false)




    useEffect(() => {
      const apiKey = process.env.REACT_APP_WEATHERSTACK_API_KEY

      axios
      .get(`https://api.weatherstack.com/current?access_key=${apiKey}&query=${props.data}&units=f`)
      .then(res => {
          setCityData(res.data)
          localStorage.setItem(props.data, JSON.stringify(res.data))
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
              <Title>{props.data}</Title> <Temp> {cityData.current ? `${cityData.current.temperature}º` : '.'}  </Temp> 
            </Link>
            {!data.favoriteCities.includes(props.data) && <FavoriteButton onClick={addFavorite} ><FaHeart /></FavoriteButton>}
             
            {props.canRemove && <RemoveButton onClick={deleteTopCity}><FaBan/></RemoveButton>}
        </CardContainer>
        : ""}
        </>
    )
}

export default TopCityCard;