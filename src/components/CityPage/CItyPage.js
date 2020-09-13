import React from 'react';
import { useParams } from 'react-router-dom';
import { container } from './CityPageStyles';

const CityPage = () => {
    let { city } = useParams();

    return (
        <>  
        <h1>{city}</h1>
        </>
    )
}

export default CityPage;