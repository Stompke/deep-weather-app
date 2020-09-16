import React from 'react';
import { configure, mount,  shallow } from 'enzyme';
import {cleanup, fireEvent, render} from '@testing-library/react';
import { queryByDisplayValue, screen } from '@testing-library/dom';
import Adapter from 'enzyme-adapter-react-16';


// COMPONENTS
import CityNotes from './CityNotes';

configure({ adapter: new Adapter() });

let cityData = {"request":{"type":"City","query":"Austin, United States of America","language":"en","unit":"f"},"location":{"name":"Austin","country":"United States of America","region":"Texas","lat":"30.267","lon":"-97.743","timezone_id":"America/Chicago","localtime":"2020-09-16 13:57","localtime_epoch":1600264620,"utc_offset":"-5.0"},"current":{"observation_time":"06:57 PM","temperature":90,"weather_code":116,"weather_icons":["https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png"],"weather_descriptions":["Partly cloudy"],"wind_speed":0,"wind_degree":45,"wind_dir":"NE","pressure":1016,"precip":0,"humidity":51,"cloudcover":50,"feelslike":100,"uv_index":7,"visibility":10,"is_day":"yes"},"notes":"Notes on austin"};

const testSetCityData = () => {
    console.log('setCityData')
}

describe('City Notes Testing', () => {
    it('renders the <CityNotes /> component', () => {
        const wrapper = shallow(<CityNotes cityData={cityData} />);
    })
})

describe('CityNotes Component', () => {
    test('loads <CityNotes />', () => {
        const { getByLabelText, getByRole,  getByTestId, getByText, toHaveTextContent } = render(<CityNotes cityData={cityData}/>);
        // getByText(/Notes/i);
        expect(screen.getByTestId('notes-title')).toHaveTextContent('Notes')
    })

    test('Tests for Notes p tag', () => {
        const { getByLabelText, getByRole,  getByTestId, getByText, toHaveTextContent } = render(<CityNotes cityData={cityData}/>);
        // getByText(/Notes/i);
        expect(screen.getByTestId('notes-paragraph')).toHaveTextContent('Notes on austin')
    })

    
    test('Edit Button Turns into Check Button & Delete Button', () => {
        const { getByLabelText, getByRole,  getByTestId, getByText, toHaveTextContent } = render(<CityNotes setCityData={testSetCityData} cityData={cityData}/>);
        
        fireEvent.click(screen.getByTestId('editButton'));

        expect(screen.getByTestId('checkButton'));
        expect(screen.getByTestId('deleteButton'));
        
    })

    test('Text can be edited', () => {
        const { getByLabelText, getByRole,  getByTestId, getByText, toHaveTextContent } = render(<CityNotes setCityData={testSetCityData} cityData={cityData}/>);
        
        fireEvent.click(screen.getByTestId('editButton'));

        expect(screen.getByTestId('notesInput')).toHaveValue('Notes on austin')
        
        fireEvent.change(screen.getByTestId('notesInput'), { target: { value: 'Test text input' } })
        expect(screen.getByTestId('notesInput')).toHaveValue('Test text input')

        
        
    })


    
})