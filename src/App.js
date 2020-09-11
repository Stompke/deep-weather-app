import React, {useEffect, useState} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {

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

    return a.name - b.name;
  });

  const [topCities, setTopCities] = useState(largestCities)


  useEffect(() => {
    const apiKey = process.env.REACT_APP_WEATHERSTACK_API_KEY
    axios
    .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=New York`)
    .then(res => {
      console.log(res)
    })
    .catch( err => {
      console.log(err)
    })
  },[])


  return (
    <div className="App">
      <header className="App-header">
        <h2>Top Cities</h2>
        {topCities.map(item => <div>{item.name}</div>)}
      </header>
    </div>
  );
}

export default App;
