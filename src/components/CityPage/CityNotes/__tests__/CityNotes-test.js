import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import { queryByDisplayValue, screen } from '@testing-library/dom';
import CityNotes from '../CityNotes';
import { shallow } from 'enzyme';

let cityData = {"request":{"type":"City","query":"Austin, United States of America","language":"en","unit":"f"},"location":{"name":"Austin","country":"United States of America","region":"Texas","lat":"30.267","lon":"-97.743","timezone_id":"America/Chicago","localtime":"2020-09-15 13:16","localtime_epoch":1600175760,"utc_offset":"-5.0"},"current":{"observation_time":"06:16 PM","temperature":90,"weather_code":116,"weather_icons":["https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png"],"weather_descriptions":["Partly cloudy"],"wind_speed":7,"wind_degree":20,"wind_dir":"NNE","pressure":1019,"precip":0,"humidity":51,"cloudcover":25,"feelslike":106,"uv_index":6,"visibility":10,"is_day":"yes"},"notes":"Test notes"}
afterEach(cleanup);

describe('CityNotes Component', () => {
    test('loads <CityNotes />', () => {
        const { getByLabelText, getByRole,  getByTestId, getByText, toHaveTextContent } = render(<CityNotes cityData={cityData}/>);
        // getByText(/Notes/i);

        expect(getByRole('button')).toHaveTextContent('edit')
    })
})

it('Is a sanity check...', () => {

    expect(true).toBeTruthy();
  });


// it('CheckboxWithLabel changes the text after click', () => {
//     const {queryByLabelText, getByLabelText} = render(
//       <CheckboxWithLabel labelOn="On" labelOff="Off" />,
//     );
  
//     expect(queryByLabelText(/off/i)).toBeTruthy();
  
//     fireEvent.click(getByLabelText(/off/i));
  
//     expect(queryByLabelText(/on/i)).toBeTruthy();
//   });