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
  "New York",
    "Los Angeles",
    "Chicago",
    // {"Houston"},
    // {"Phoenix"},
    // {"Philadelphia"},
    // {nameSan Antonio"},
    // {nameSan Diego"},
    // {"Dallas"},
    // {nameSan Jose"},
    "Austin",
    // {"Jacksonville"},
    // {nameFort Worth"},
    // {"Columbus"},
    // {"Charlotte"},
  ]

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
    <UserProvider  value={value}>
      <div className="App">
        
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
