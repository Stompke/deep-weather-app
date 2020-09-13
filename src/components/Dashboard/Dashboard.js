import React ,{ useContext } from 'react';
import UserContext from '../../utils/MyContext';
import { Link } from 'react-router-dom';

// COMPONENTS
import CityCard from '../CityCard/CityCard';

const Dashboard = () => {

    const {topCities, setTopCities} = useContext(UserContext)


    return (
        <>
            <h2>Top Cities</h2>
            {topCities.map(item => <Link to={`/${item.name}`} ><CityCard key={item.name} data={item} /></Link>)}
        </>
    )
}

export default Dashboard;