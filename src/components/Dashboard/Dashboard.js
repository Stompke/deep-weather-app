import React ,{ useEffect, useContext, useState } from 'react';
import UserContext from '../../utils/MyContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";



// COMPONENTS
import TopCityCard from '../TopCityCard/TopCityCard';
import FavoriteCityCard from '../FavoriteCityCard/FavoriteCityCard';
import { SearchTitle, SearchContainer, SearchInput } from './DashboardStyles';

const Dashboard = () => {
    let history = useHistory();
    const [ currentCity, setCurrentCity ] = useState('')
    const [ searchQuery, setSearchQuery ] = useState('')
    const [ searchCity, setSearchCity ] = useState({})
    const [ isSearching, setIsSearching ] = useState(false)

    const {topCities, favoriteCities} = useContext(UserContext)

    const onChangeHandler = e => {

        setSearchQuery(e.target.value)
    }

    const onSubmitHandler = e => {
        e.preventDefault()
        setSearchCity('')
        const apiKey = process.env.REACT_APP_WEATHERSTACK_API_KEY
        setIsSearching(true)
        axios
        .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${searchQuery}&units=f`)
        .then(res => {
            setSearchCity(res.data, setIsSearching(false))
            
        })
        .catch(err => {
            console.log(err)
            setIsSearching(false)
        })
    }

    useEffect(() => {
        let city = localStorage.getItem('currentCity')
        if (!city) {
            navigator.geolocation.getCurrentPosition(
                 function(position) {
                  console.log(position);
                  let lat =  position.coords.latitude
                  let lon =  position.coords.longitude
                  axios
                  .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${process.env.REACT_APP_GOOGLEMAPS_API}`)
                  .then(res => {
                      console.log(res)
                       city = res.data.results[0].address_components[2].short_name
                      //   Save current currentCity to local storage
                      localStorage.setItem('currentCity', city);
                      // route to currentCity Weather Page after data is received from location
                      history.push(`/${city}`);
                  })
                  .catch(err => {
                      console.log(err)
                  })
                },
                function(error) {
                  console.error("Error Code = " + error.code + " - " + error.message);
                }
              );
        } else {
            setCurrentCity(city);
        }
        

    },[])
console.log(currentCity)
    return (
        <>
            <SearchContainer>
                <SearchTitle><FaSearch /></SearchTitle>
            { window.navigator.onLine ? <>
                <form onSubmit={onSubmitHandler}>
                    <SearchInput  value={searchQuery} onChange={onChangeHandler} onSubmit={onSubmitHandler} />

                </form>
                </>
            :
            <h4>Must be online to search cities</h4>
        }

            </SearchContainer>

            {isSearching && <p>searching...</p>}
            {searchCity.location && <TopCityCard canRemove={false} key={searchCity.location.name} data={searchCity.location.name} />}
            
            {currentCity && <p>Current City: <TopCityCard canRemove={false} key={currentCity} data={currentCity} /></p>}

            <h2>Favorite Cities</h2>
            {favoriteCities.map(item => <FavoriteCityCard key={item} data={item} />)}

            <h2>Top Cities</h2>
            {topCities.map(item => <TopCityCard canRemove={true} key={item.name} data={item} />)}
        </>
    )
}

export default Dashboard;