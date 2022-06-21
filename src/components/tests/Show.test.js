import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import userEvent from '@testing-library/user-event'

const testShowData = {
    name: 'test name',
    summary: 'test summary',
    seasons: [
        {
        episodes: [],
        name: 'test season 1',
        id: '1'
        },
        {
        episodes: [],
        name: 'test season 2',
        id: '2'
        }
]
}


test('renders without errors', () => {
    render(<Show show={testShowData} selectedSeason={'none'}/>)
 });

test('renders Loading component when prop show is null', () => { 
    render(<Show show={null} selectedSeason={'none'}/>)

    const loading = screen.queryByTestId('loading-container')

    expect(loading).toBeInTheDocument()

});

test('renders same number of options seasons are passed in', () => { 
    render(<Show show={testShowData} selectedSeason={"none"}/>);

    const seasonOptions = screen.queryAllByTestId("season-option");

    expect(seasonOptions).toHaveLength(2);
});

test('handleSelect is called when an season is selected', () => { 
    const mockHandleSelect = jest.fn()

    render(<Show show={testShowData} selectedSeason={'none'} handleSelect={mockHandleSelect}/>)

    const selector = screen.getByText(/select a season/i)
    userEvent.selectOptions(seasons, ['1'])

    expect(mockHandleSelect).toBeCalled()


});

test('component renders when no seasons are selected and when rerenders with a season passed in', async () => { 

    const {rerender} = render(<Show show={testShowData} selectedSeason={'none'} />)

    let episode = screen.queryByTestId('episodes-container')
    expect(episode).not.toBeInTheDocument()

   rerender(<Show show={testShowData} selectedSeason={1} />)
   episode = screen.queryByTestId('episodes-container')
   expect(episode).toBeInTheDocument()

});
