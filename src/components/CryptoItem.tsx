import { Link } from "react-router-dom";

function CryptoItem({ crypto }: { crypto: Crypto }) {
    return (
        <div>
            <Link to={`/crypto/${crypto.id}`}>
                <h2>{crypto.name}</h2>
            </Link>
            <p>${parseFloat(crypto.priceUsd).toFixed(2)}</p>
            <p>{crypto.symbol}</p>
        </div>
    );
}

export default CryptoItem;
