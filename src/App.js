import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';
import './App.css';
import { UserProvider } from './utils/MyContext';



// Components
import CityPage from './components/CityPage/CityPage';
import Dashboard from './components/Dashboard/Dashboard';

function App() {

  const largestCities = [
    {name: "New York"},
    {name: "Los Angeles"},
    {name: "Chicago"},
    // {name: "Houston", temp: null},
    // {name: "Phoenix", temp: null},
    // {name: "Philadelphia", temp: null},
    // {name: "San Antonio", temp: null},
    // {name: "San Diego", temp: null},
    // {name: "Dallas", temp: null},
    // {name: "San Jose", temp: null},
    {name: "Austin"},
    // {name: "Jacksonville", temp: null},
    // {name: "Fort Worth", temp: null},
    // {name: "Columbus", temp: null},
    // {name: "Charlotte", temp: null}
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



  const [topCities, setTopCities] = useState( localStorage.getItem('topCities') ? JSON.parse(localStorage.getItem('topCities')) : largestCities );

  // const [topCities, setTopCities] = useState(() => {
  //   if(localStorage.getItem('topCities')){
  //     JSON.parse(localStorage.getItem('topCities'))
  //   } else {
  //     largestCities
  //   }
  // });


  const value = { topCities, setTopCities };


  // useEffect(() => {
  //   const apiKey = process.env.REACT_APP_WEATHERSTACK_API_KEY
  //   axios
  //   .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=New York&units=f`)
  //   .then(res => {
  //     console.log(res)
  //   })
  //   .catch( err => {
  //     console.log(err)
  //   })
  // },[])

  // updateItem = () => {
  //   setTopCities(topCities => {
  //     const list = 
  //   })
  // }

  return (
    <UserProvider  value={value}>
      <div className="App">
        <Link to='/'>Dashboard</Link>
        <header className="App-header">

          <Route exact path='/' component={Dashboard} />
          {/* <Route path='/page' component={CityPage}/> */}
          <Route path='/:city'><CityPage /></Route>
        </header>
      </div>
    </UserProvider>
  );
}

export default App;
