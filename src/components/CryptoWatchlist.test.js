import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // optional but recommended

import CryptoWatchlist from './CryptoWatchlist';

describe('CryptoWatchlist', () => {
    test('renders the watchlist correctly', () => {
        const mockWatchlist = ['Bitcoin', 'Ethereum'];

        // Mock localStorage.getItem to return the mock watchlist
        const localStorageMock = {
            getItem: jest.fn().mockImplementation(() => JSON.stringify(mockWatchlist)),
        };
        global.localStorage = localStorageMock;

        const { getByText } = render(<CryptoWatchlist />);

        expect(getByText('Back')).toBeInTheDocument();
        expect(getByText('Watchlist')).toBeInTheDocument();
        expect(getByText('Bitcoin')).toBeInTheDocument();
        expect(getByText('Ethereum')).toBeInTheDocument();
    });

    test('renders no cryptocurrencies if watchlist is empty', () => {
        // Mock an empty watchlist
        const localStorageMock = {
            getItem: jest.fn().mockImplementation(() => null),
        };
        global.localStorage = localStorageMock;

        const { queryByText } = render(<CryptoWatchlist />);

        expect(queryByText('Bitcoin')).not.toBeInTheDocument();
        expect(queryByText('Ethereum')).not.toBeInTheDocument();
    });
});
