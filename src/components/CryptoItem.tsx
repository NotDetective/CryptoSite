import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function CryptoItem({ crypto }: { crypto: Crypto }) {
    const [watchlist, setWatchlist] = useState<string[]>([]);

    useEffect(() => {
        const storedWatchlist = localStorage.getItem('watchlist');
        if (storedWatchlist) {
            setWatchlist(JSON.parse(storedWatchlist));
        }
    }, []);

    const handleToggleWatchlist = () => {
        const updatedWatchlist = [...watchlist];
        const index = updatedWatchlist.indexOf(crypto.id);

        if (index !== -1) {
            // Crypto ID is already in watchlist, so remove it
            updatedWatchlist.splice(index, 1);
        } else {
            // Crypto ID is not in watchlist, so add it
            updatedWatchlist.push(crypto.id);
        }

        setWatchlist(updatedWatchlist);
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    };

    return (
        <div className={"border p-4 rounded-md hover:shadow-md cursor-pointer"}>
            <Link to={`/crypto/${crypto.id}`}>
                <h2 className={"text-blue-500 hover:text-blue-700 cursor-pointer text-xl"}>
                    {crypto.name}
                </h2>
            </Link>
            <p className={"text-gray-500"}>
                ${parseFloat(crypto.priceUsd).toFixed(2)}
            </p>
            <p className={"text-gray-500"}>
                {crypto.symbol}
            </p>

            <button
                className={"bg-blue-500 text-white p-2 rounded-md mt-2"}
                onClick={handleToggleWatchlist}
            >
                {watchlist.includes(crypto.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
        </div>
    );
}

export default CryptoItem;