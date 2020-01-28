import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react';
import StarWarsCharacters from './StarWarsCharacters'
import { getData as mockGetData} from '../api'

jest.mock('../api')

test('renders the stuff',  async () => {
    mockGetData.mockResolvedValueOnce({id: 1})
        const {getByLabelText, getByText} = render (<StarWarsCharacters/>);
        const nameInput = getByLabelText(/character/i);

        const getData = {
            name: 'Test name'
        }
  
        fireEvent.change(nameInput, { target: {value: getData.name }});
  
        const submitButton = getByText(/submit!/i)
        fireEvent.click(submitButton)
        
        expect(mockGetData).toHaveBeenCalledTimes(1)
        expect(mockGetData).toHaveBeenCalledWith(getData)
  
        wait(() => expect(getByText(/Test character/i)))
      })