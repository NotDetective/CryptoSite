import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function CryptoWatchlist() {
    const [watchlist, setWatchlist] = useState([])

    useEffect(() => {
        const storedWatchlist = localStorage.getItem('watchlist');
        if (storedWatchlist) {
            setWatchlist(JSON.parse(storedWatchlist));
        }
    }, []);

    return (
        <div>
            <Link to={`/`}>
                <h2
                    className={"text-blue-500 hover:text-blue-700 cursor-pointer text-xl"}
                >Back</h2>
            </Link>
            <h1
                className={"text-2xl font-bold text-center mb-4"}
            >
                Watchlist
            </h1>
            <div
                className={"grid grid-cols-3 gap-4"}
            >
                {
                    watchlist.map((crypto) => (
                        <div className={"border p-4 rounded-md hover:shadow-md cursor-pointer"}>
                            <Link to={`/crypto/${crypto}`}>
                                <h2 className={"text-blue-500 hover:text-blue-700 cursor-pointer text-xl"}>
                                    {crypto}
                                </h2>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default CryptoWatchlist;