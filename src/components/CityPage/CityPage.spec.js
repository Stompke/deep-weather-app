import React from 'react';
import axios from 'axios';
import { configure, mount,  shallow } from 'enzyme';
import {cleanup, fireEvent, render, getByTestId} from '@testing-library/react';
import { queryByDisplayValue, screen } from '@testing-library/dom';
import Adapter from 'enzyme-adapter-react-16';

import { useParams } from 'react-router-dom';

// COMPONENTS
import CityPage from './CityPage';
import Dashboard from '../Dashboard/Dashboard';
import App from '../../App';


configure({ adapter: new Adapter() });


let cityData = {"request":{"type":"City","query":"Austin, United States of America","language":"en","unit":"f"},"location":{"name":"Austin","country":"United States of America","region":"Texas","lat":"30.267","lon":"-97.743","timezone_id":"America/Chicago","localtime":"2020-09-16 13:57","localtime_epoch":1600264620,"utc_offset":"-5.0"},"current":{"observation_time":"06:57 PM","temperature":90,"weather_code":116,"weather_icons":["https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png"],"weather_descriptions":["Partly cloudy"],"wind_speed":0,"wind_degree":45,"wind_dir":"NE","pressure":1016,"precip":0,"humidity":51,"cloudcover":50,"feelslike":100,"uv_index":7,"visibility":10,"is_day":"yes"},"notes":"Notes on austin"};

// const testSetCityData = () => {
//     console.log('setCityData')
// }

describe('CityPage Testing', () => {
    it('renders the <Citypage /> component', () => {
        const { getByLabelText, getByRole,  getByTestId, getByText, toHaveTextContent } = render(<App>
            <Dashboard>
                <CityPage   cityData={cityData} />
            </Dashboard>
        </App>);


expect(screen.getByTestId('favoriteCityCardLink'))

    })
})

