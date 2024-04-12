import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect'; // optional but recommended

import CryptoList from './CryptoList';

describe('CryptoList', () => {
    test('renders the list of cryptocurrencies correctly', async () => {
        const mockData = [
            { id: 'bitcoin', name: 'Bitcoin', priceUsd: '60000', symbol: 'BTC' },
            { id: 'ethereum', name: 'Ethereum', priceUsd: '3000', symbol: 'ETH' },
        ];

        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue({ data: mockData }),
        });

        render(<CryptoList />);

        // Wait for the data to be fetched and displayed
        await waitFor(() => {
            expect(screen.getByText('Bitcoin')).toBeInTheDocument();
            expect(screen.getByText('Ethereum')).toBeInTheDocument();
        });
    });

    test('filters the list of cryptocurrencies based on search input', async () => {
        const mockData = [
            { id: 'bitcoin', name: 'Bitcoin', priceUsd: '60000', symbol: 'BTC' },
            { id: 'ethereum', name: 'Ethereum', priceUsd: '3000', symbol: 'ETH' },
        ];

        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue({ data: mockData }),
        });

        render(<CryptoList />);

        // Wait for the data to be fetched and displayed
        await waitFor(() => {
            expect(screen.getByText('Bitcoin')).toBeInTheDocument();
            expect(screen.getByText('Ethereum')).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText('Search cryptocurrencies...');
        userEvent.type(searchInput, 'Bitcoin');

        expect(screen.getByText('Bitcoin')).toBeInTheDocument();
        expect(screen.queryByText('Ethereum')).not.toBeInTheDocument();
    });
});
