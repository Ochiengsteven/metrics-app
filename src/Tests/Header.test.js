import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Header from '../components/Header';

// Mock the debounce function
jest.mock('lodash.debounce', () => jest.fn((fn) => fn));

const mockStore = configureStore([]);

describe('Header Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      assets: {
        status: 'succeeded',
        error: null,
      },
    });
  });

  it('renders loading state', () => {
    store = mockStore({
      assets: {
        status: 'loading',
        error: null,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <Header className="test-class" onSearch={() => {}} />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders error state', () => {
    store = mockStore({
      assets: {
        status: 'failed',
        error: 'Error message',
      },
    });

    const { container } = render(
      <Provider store={store}>
        <Header className="test-class" onSearch={() => {}} />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
