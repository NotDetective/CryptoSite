import {useEffect, useState} from "react";
import CryptoItem from "./CryptoItem.tsx";
import {Link} from "react-router-dom";

function CryptoList() {
    const [apiData, setApiData] = useState([]); // Assuming data is structured like { data: [...] }
    const [cryptoList, setCryptoList] = useState<Crypto[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch('https://api.coincap.io/v2/assets')
            .then(res => res.json())
            .then(data => {
                // Extract the array of cryptocurrencies from the fetched data
                const cryptocurrencies = data.data; // Assuming data is structured like { data: [...] }
                setApiData(cryptocurrencies);
                setCryptoList(cryptocurrencies);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {

        // Filter the cryptocurrencies based on the search query
        const filteredCryptos = apiData.filter((crypto) => {
            return crypto.name.toLowerCase().includes(search.toLowerCase());
        });

        setCryptoList(filteredCryptos);
    }, [apiData, search]);

    return (
        <div
            className={"p-4"}
        >
            <h1
                className={"text-2xl font-bold text-center mb-4"}
            >
                Cryptocurrencies
            </h1>
            <Link to={`/watchlist`}>
                <h2
                    className={"text-blue-500 hover:text-blue-700 cursor-pointer text-xl"}
                >Watchlist</h2>
            </Link>
            <input
                className={"w-full p-2 rounded-md border border-gray-300 mb-4"}
                type="text"
                placeholder="Search cryptocurrencies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div
                className={"grid grid-cols-3 gap-4"}
            >
                {
                    cryptoList.map((crypto) => (
                        <CryptoItem crypto={crypto}/>
                    ))
                }
            </div>
        </div>
    );
}

export default CryptoList;