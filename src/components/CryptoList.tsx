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
        <div
            className={"p-4"}
        >
            <h1
                className={"text-2xl font-bold text-center mb-4"}
            >
                Cryptocurrencies
            </h1>
            <div
                className={"grid grid-cols-3 gap-4"}
            >
                {
                    cryptoList.map((crypto) => (
                        CryptoItem({crypto})
                    ))
                }
            </div>
        </div>
    );
}

export default cryptoList;