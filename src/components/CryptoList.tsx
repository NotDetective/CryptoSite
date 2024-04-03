import {useEffect, useState} from "react";
import CryptoItem from "./CryptoItem.tsx";

function cryptoList() {
    const [cryptoList, setCryptoList] = useState([]);

    useEffect(() => {
        fetch('https://api.coincap.io/v2/assets')
            .then(res => res.json())
            .then(data => {
                // Extract the array of cryptocurrencies from the fetched data
                const cryptocurrencies = data.data; // Assuming data is structured like { data: [...] }
                setCryptoList(cryptocurrencies);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div>
            <h1>Cryptocurrency Prices</h1>
            {
                cryptoList.map((crypto) => (
                    CryptoItem({crypto})
                ))
            }
        </div>
    );
}

export default cryptoList;