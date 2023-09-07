import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
import configureStore from 'redux-mock-store';
import CryptoDetails from '../components/CryptoDetails';

expect.extend({ toBeInTheDocument });

// Create a mock store
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

describe('CryptoDetails', () => {
  test('renders additional element when the component is rendered', () => {
    const sampleUuid = 'sample-uuid';

    const { getByTestId } = render(
      <Provider store={store}>
        <CryptoDetails uuid={sampleUuid} />
        <div data-testid="additional-element">Additional Element</div>
      </Provider>,
    );

    // Use getByTestId to check if the "Additional Element" is present
    const additionalElement = getByTestId('additional-element');

    // Assert that the additional element is present in the rendered component
    expect(additionalElement).toMatchSnapshot();
  });
});
