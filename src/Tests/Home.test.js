import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
import configureStore from 'redux-mock-store';
import Home from '../components/Home';

expect.extend({ toBeInTheDocument });

// Define a mock store with the store creator
const mockStore = configureStore([]);
const initialState = {
  crypto: {
    assets: [
      {
        uuid: 'sample-uuid',
        pair: 'BTC/USD',
        exchange: 'Binance',
        price: 40000,
        volume: 1000,
      },
    ],
    status: 'succeeded',
    error: null,
  },
};
const store = mockStore(initialState);

describe('Home', () => {
  test('renders additional element when the component is rendered', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
          <div data-testid="additional-element">Additional Element</div>
        </BrowserRouter>
      </Provider>,
    );

    const additionalElement = screen.getByTestId('additional-element');

    expect(additionalElement).toMatchSnapshot();
  });
});
