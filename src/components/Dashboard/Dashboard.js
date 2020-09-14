import React ,{ useContext, useState } from 'react';
import UserContext from '../../utils/MyContext';
import axios from 'axios';

// COMPONENTS
import TopCityCard from '../TopCityCard/TopCityCard';
import FavoriteCityCard from '../FavoriteCityCard/FavoriteCityCard';

const Dashboard = () => {

    const [ searchQuery, setSearchQuery ] = useState('')
    const [ searchCity, setSearchCity ] = useState({})

    const {topCities, favoriteCities} = useContext(UserContext)

    const onChangeHandler = e => {
        setSearchQuery(e.target.value)
    }

    const onSubmitHandler = () => {
        const apiKey = process.env.REACT_APP_WEATHERSTACK_API_KEY
        axios
        .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${searchQuery}&units=f`)
        .then(res => {
            // console.log(res)
            setSearchCity(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }


    return (
        <>

            <h2>Search:</h2>

            { window.navigator.onLine ? <>
                <input value={searchQuery} onChange={onChangeHandler} onSubmit={onSubmitHandler} />
                <button onClick={onSubmitHandler}>Go</button>
                </>
            :
                <h4>Must be online to search cities</h4>
            }

            {searchCity.location && <TopCityCard key={searchCity.location.name} data={searchCity.location.name} />}
            

            <h2>Favorite Cities</h2>
            {favoriteCities.map(item => <FavoriteCityCard key={item} data={item} />)}

            <h2>Top Cities</h2>
            {topCities.map(item => <TopCityCard key={item.name} data={item} />)}
        </>
    )
}

export default Dashboard;