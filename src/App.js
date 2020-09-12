import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import { UserProvider } from './utils/MyContext';


// Components
import CityCard from './components/CityCard/CityCard';

function App() {

  const largestCities = [
    {name: "New York", temp: 32},
    {name: "Los Angeles", temp: null},
    {name: "Chicago", temp: null},
    {name: "Houston", temp: null},
    {name: "Phoenix", temp: null},
    {name: "Philadelphia", temp: null},
    {name: "San Antonio", temp: null},
    {name: "San Diego", temp: null},
    {name: "Dallas", temp: null},
    {name: "San Jose", temp: null},
    {name: "Austin", temp: 89},
    {name: "Jacksonville", temp: null},
    {name: "Fort Worth", temp: null},
    {name: "Columbus", temp: null},
    {name: "Charlotte", temp: null}
  ]

  largestCities.sort(function(a, b) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if(nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0 

  });

  const [topCities, setTopCities] = useState(largestCities);
  const value = { topCities, setTopCities };


  useEffect(() => {
    const apiKey = process.env.REACT_APP_WEATHERSTACK_API_KEY
    axios
    .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=New York&units=f`)
    .then(res => {
      console.log(res)
    })
    .catch( err => {
      console.log(err)
    })
  },[])

  // updateItem = () => {
  //   setTopCities(topCities => {
  //     const list = 
  //   })
  // }

  return (
    <UserProvider  value={value}>
      <div className="App">
        <header className="App-header">
          <h2>Top Cities</h2>
          {topCities.map(item => <CityCard key={item.name} data={item} />)}
        </header>
      </div>
    </UserProvider>
  );
}

export default App;
