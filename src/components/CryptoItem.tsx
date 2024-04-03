import { Link } from "react-router-dom";

function CryptoItem({ crypto }: { crypto: Crypto }) {
    return (
        <div
            className={"border p-4 rounded-md hover:shadow-md cursor-pointer"}
        >
            <Link to={`/crypto/${crypto.id}`}>
                <h2
                    className={"text-blue-500 hover:text-blue-700 cursor-pointer text-xl"}
                >{crypto.name}</h2>
            </Link>
            <p
                className={"text-gray-500"}
            >${parseFloat(crypto.priceUsd).toFixed(2)}</p>
            <p
                className={"text-gray-500"}
            >{crypto.symbol}</p>
        </div>
    );
}

export default CryptoItem;
