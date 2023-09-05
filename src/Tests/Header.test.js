import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Header from '../components/Header';

describe('Header component', () => {
  it('should render correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <Header className="test-header" onSearch={() => {}} />,
    );

    // Check if the component renders the title
    expect(getByText('CryptoView')).toBeInTheDocument();

    // Check if the component renders the search input field
    const searchInput = getByPlaceholderText('Search by pair...');
    expect(searchInput).toBeInTheDocument();
  });

  it('should call the onSearch prop when the input changes', () => {
    const onSearchMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Header className="test-header" onSearch={onSearchMock} />,
    );

    const searchInput = getByPlaceholderText('Search by pair...');

    // Simulate typing into the input field
    fireEvent.change(searchInput, { target: { value: 'BTC' } });

    // Expect the onSearchMock to be called with the correct value
    expect(onSearchMock).toHaveBeenCalledWith('BTC');
  });
});
