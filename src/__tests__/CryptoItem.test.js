import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CryptoItem from '../components/CryptoItem';

describe('CryptoItem', () => {
    test('renders crypto item correctly', () => {
        const crypto = {
            id: 'bitcoin',
            name: 'Bitcoin',
            priceUsd: '60000',
            symbol: 'BTC',
        };

        const { getByText } = render(
            <MemoryRouter>
                <CryptoItem crypto={crypto} />
            </MemoryRouter>
        );

        expect(getByText('Bitcoin')).toBeTruthy();
        expect(getByText('$60000.00')).toBeTruthy();
        expect(getByText('BTC')).toBeTruthy();
    });
});
