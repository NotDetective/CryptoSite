import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route } from 'react-router-dom';
import CryptoDetail from './CryptoDetail';

describe('CryptoDetail Component', () => {
    // Mock data for testing
    const mockCryptoData = {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        priceUsd: '50000', // Mocking a price for testing
    };

    test('renders loading message', () => {
        // render(<CryptoDetail />, { wrapper: MemoryRouter });
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('renders crypto details when data is loaded', async () => {
        // Mock fetch function to return data
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: async () => ({ data: mockCryptoData }),
        });

        render(
            <MemoryRouter initialEntries={['/crypto/bitcoin']}>
                <Route path="/crypto/:id">
                    <CryptoDetail />
                </Route>
            </MemoryRouter>
        );

        // Wait for data to be loaded
        await screen.findByText('Bitcoin');
        expect(screen.getByText('Bitcoin')).toBeInTheDocument();
        expect(screen.getByText('$50000.00')).toBeInTheDocument();
        expect(screen.getByText('BTC')).toBeInTheDocument();
    });

    test('toggles watchlist correctly', async () => {
        // Mock fetch function to return data
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: async () => ({ data: mockCryptoData }),
        });

        // Mock localStorage
        const localStorageMock = {
            getItem: jest.fn(),
            setItem: jest.fn(),
        };
        Object.defineProperty(window, 'localStorage', { value: localStorageMock });

        render(
            <MemoryRouter initialEntries={['/crypto/bitcoin']}>
                <Route path="/crypto/:id">
                    <CryptoDetail />
                </Route>
            </MemoryRouter>
        );

        // Wait for data to be loaded
        await screen.findByText('Bitcoin');

        const addButton = screen.getByText('Add to Watchlist');
        fireEvent.click(addButton);

        expect(localStorageMock.setItem).toHaveBeenCalledWith(
            'watchlist',
            JSON.stringify(['bitcoin'])
        );

        const removeButton = screen.getByText('Remove from Watchlist');
        fireEvent.click(removeButton);

        expect(localStorageMock.setItem).toHaveBeenCalledWith('watchlist', JSON.stringify([]));
    });

    // Add more tests for error handling, navigation, etc.
});
