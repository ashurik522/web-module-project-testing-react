import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import userEvent from '@testing-library/user-event';
import fetchShow  from '../../api/fetchShow'
jest.mock('../../api/fetchShow');

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

test('renders without errors with no props', () => { 
    render(<Display />)
});

test('renders Show component when the button is clicked ', async () => {
    render(<Display />)
    
    fetchShow.mockResolvedValueOnce(testShowData)

    const button = screen.getByRole('button')
    userEvent.click(button)

    const show = await screen.findByTestId('show-container')
    expect(show).toBeInTheDocument()
 });

test('renders show season options matching your data when the button is clicked', async () => { 
    render(<Display />)

    fetchShow.mockResolvedValueOnce(testShowData)

    const button = screen.getByRole('button')
    userEvent.click(button)

    const options = await screen.findAllByTestId('season-option')
    expect(options).toHaveLength(2)
    
});

test('displayFunc is called when the fetch button is pressed', async () => { 
    fetchShow.mockResolvedValueOnce(testShowData);
    const displayFunc = jest.fn();

    render(<Display displayFunc={displayFunc}/>);
    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(()=>{
        expect(displayFunc).toHaveBeenCalled();
    });
});
