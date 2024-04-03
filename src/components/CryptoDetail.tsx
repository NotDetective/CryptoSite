import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function CryptoDetail() {
    const {id} = useParams();
    const [crypto, setCrypto] = useState(null);

    useEffect(() => {
        fetch(`https://api.coincap.io/v2/assets/${id}`)
            .then(res => res.json())
            .then(data => {
                setCrypto(data.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

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
        </div>
    )
}

export default CryptoDetail;