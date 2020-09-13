import React ,{ useContext } from 'react';
import UserContext from '../../utils/MyContext';

// COMPONENTS
import CityCard from '../CityCard/CityCard';

const Dashboard = () => {

    const {topCities} = useContext(UserContext)


    return (
        <>
            <h2>Top Cities</h2>
            {topCities.map(item => <CityCard key={item.name} data={item} />)}
        </>
    )
}

export default Dashboard;