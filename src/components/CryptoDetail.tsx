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
                <h2>Back</h2>
            </Link>
            <h1>{crypto ? crypto.name : 'Loading...'}</h1>
            <p>{crypto ? `$${parseFloat(crypto.priceUsd).toFixed(2)}` : 'Loading...'}</p>
            <p>{crypto ? crypto.symbol : 'Loading...'}</p>
        </div>
    )
}

export default CryptoDetail;