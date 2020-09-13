import React ,{ useContext, useState } from 'react';
import UserContext from '../../utils/MyContext';
import axios from 'axios';

// COMPONENTS
import CityCard from '../CityCard/CityCard';

const Dashboard = () => {

    const [ searchQuery, setSearchQuery ] = useState('')
    const [ searchCity, setSearchCity ] = useState({})

    const {topCities} = useContext(UserContext)

    const onChangeHandler = e => {
        setSearchQuery(e.target.value)
    }

    const onSubmitHandler = () => {
        const apiKey = process.env.REACT_APP_WEATHERSTACK_API_KEY
        axios
        .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${searchQuery}&units=f`)
        .then(res => {
            console.log(res)
            setSearchCity(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }


    return (
        <>
            <h2>Search:</h2>
            <input value={searchQuery} onChange={onChangeHandler} onSubmit={onSubmitHandler} />
            <button onClick={onSubmitHandler}>Go</button>
            {searchCity.location && <CityCard key={searchCity.location.name} data={searchCity.location} />}
            <h2>Top Cities</h2>
            {topCities.map(item => <CityCard key={item.name} data={item} />)}
        </>
    )
}

export default Dashboard;