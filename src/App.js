import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import './App.css';
import { UserProvider } from './utils/MyContext';



// Components
import CityPage from './components/CityPage/CityPage';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  console.log(process.env.NODE_ENV)
  let largestCities
  if(process.env.NODE_ENV == 'production') {
     largestCities = [
    "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Phoenix",
      "Philadelphia",
      "San Antonio",
      "San Diego",
      "Dallas",
      "San Jose",
      "Austin",
      "Jacksonville",
      "Fort Worth",
      "Columbus",
      "Charlotte",
    ]

  } else {
     largestCities = [
      "Chicago",
      "Austin",
    ]
  }

  const favoriteCitiesInit = [
    "Chandler"
  ]

  largestCities.sort()



  const [topCities, setTopCities] = useState( localStorage.getItem('topCities') ? JSON.parse(localStorage.getItem('topCities')) : largestCities );
  const [favoriteCities, setFavoriteCities] = useState( localStorage.getItem('favoriteCities') ? JSON.parse(localStorage.getItem('favoriteCities')) : favoriteCitiesInit );
  const sortThenSetFavorite = (data) => {
    
    setFavoriteCities(data.sort())
  }


  const value = { topCities, setTopCities, favoriteCities, setFavoriteCities, sortThenSetFavorite };



  return (
    <Router>
    <UserProvider  value={value}>

      <div className="App">
        
        <header className="App-header">

          <Route exact path='/' component={Dashboard} />
          {/* <Route path='/page' component={CityPage}/> */}
          <Route path='/:city'><CityPage /></Route>
        </header>
      </div>
    </UserProvider>
    </Router>
  );
}

export default App;
