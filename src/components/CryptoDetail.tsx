import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function CryptoDetail() {
    const {id} = useParams();
    const [crypto, setCrypto] = useState(null);
    const [watchlist, setWatchlist] = useState<string[]>([]);


    useEffect(() => {
        const storedWatchlist = localStorage.getItem('watchlist');
        if (storedWatchlist) {
            setWatchlist(JSON.parse(storedWatchlist));
        }
        fetch(`https://api.coincap.io/v2/assets/${id}`)
            .then(res => res.json())
            .then(data => {
                setCrypto(data.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleToggleWatchlist = () => {
        const updatedWatchlist = [...watchlist];

        if (!crypto || !crypto.id) {
            console.error('Crypto object is null or has no ID.');
            return;
        }

        if (updatedWatchlist.includes(crypto.id)) {
            // Crypto ID is already in watchlist, so remove it
            const index = updatedWatchlist.indexOf(crypto.id);
            updatedWatchlist.splice(index, 1);
        } else {
            // Crypto ID is not in watchlist, so add it
            updatedWatchlist.push(crypto.id);
        }

        setWatchlist(updatedWatchlist);
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    };


    return (
        <div>
            <Link to={`/`}>
                <h2
                    className={"text-blue-500 hover:text-blue-700 cursor-pointer text-xl"}
                >Back</h2>
            </Link>
            <h1
                className={"text-2xl font-bold"}
            >{crypto ? crypto.name : 'Loading...'}</h1>
            <p
                className={"text-gray-500"}
            >{crypto ? `$${parseFloat(crypto.priceUsd).toFixed(2)}` : 'Loading...'}</p>
            <p
                className={"text-gray-500"}
            >{crypto ? crypto.symbol : 'Loading...'}</p>


            <div>
                {crypto && (
                    <button
                        className={"bg-blue-500 text-white p-2 rounded-md mt-2"}
                        onClick={handleToggleWatchlist}
                    >
                        {watchlist.includes(crypto.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                    </button>
                )}
            </div>


        </div>
    )
}

export default CryptoDetail;