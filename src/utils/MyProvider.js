import MyContext from './MyContext';
import React from 'react';

const MyProvider = () => {

    const largestCities = [
        {name: "New York", temp: null},
        {name: "Los Angeles", temp: null},
        {name: "Chicago", temp: null},
        {name: "Houston", temp: null},
        {name: "Phoenix", temp: null},
        {name: "Philadelphia", temp: null},
        {name: "San Antonio", temp: null},
        {name: "San Diego", temp: null},
        {name: "Dallas", temp: null},
        {name: "San Jose", temp: null},
        {name: "Austin", temp: null},
        {name: "Jacksonville", temp: null},
        {name: "Fort Worth", temp: null},
        {name: "Columbus", temp: null},
        {name: "Charlotte", temp: null}
      ]

        return (
            <MyContext.Provider
                value={largestCities}
            >
            </MyContext.Provider>
        );
}

export default MyProvider