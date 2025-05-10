import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext"; 
import { SparklineChart } from "./sparklineChart";
import "../../styles/index.css";

export const Listing = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const { store, actions } = useContext(Context); 

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await fetch(
                    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=true"
                );
                const data = await response.json();
                setCoins(data);
            } catch (error) {
                console.error("Error fetching coins:", error);
            }
            setLoading(false);
        };

        fetchCoins();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleFavoriteToggle = (coin) => {
        if (store.favorites.some((favCoin) => favCoin.id === coin.id)) {
            actions.removeFromFavs(coin.id); 
        } else {
            actions.addToFavs(coin.id, coin.name, coin.symbol, coin.current_price);
        }
    };

    return (
        <table className="coin-table">
            <thead>
                <tr>
                    <th>Asset</th>
                    <th>Price</th>
                    <th>Chart</th>
                    <th>Change (24h)</th>
                    <th>Market Cap</th>
                    <th>Volume</th>
                    <th>Actions</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {coins.map((coin) => (
                    <tr key={coin.id}>
                        <td>
                            <div className="coin-info">
                                <img src={coin.image} alt={coin.name} className="coin-image" />
                                <div>
                                    <div className="coin-name">{coin.name}</div>
                                    <div className="coin-symbol">{coin.symbol.toUpperCase()}</div>
                                </div>
                            </div>
                        </td>
                        <td>${coin.current_price.toLocaleString()}</td>
                        <td>
                            <SparklineChart data={coin.sparkline_in_7d.price} width={150} height={50}/>
                        </td>
                        <td>
                            <span
                                style={{
                                    color: coin.price_change_percentage_24h >= 0 ? "green" : "red",
                                }}
                            >
                                {coin.price_change_percentage_24h.toFixed(2)}%
                            </span>
                        </td>
                        <td>${coin.market_cap.toLocaleString()}</td>
                        <td>${coin.total_volume.toLocaleString()}</td>
                        <td>
                            <button className="trade-button">Trade</button>
                        </td>
                        <td>
                            <button
                                className={`star-button ${
                                    store.favorites.some((favCoin) => favCoin.id === coin.id) ? "favorited" : ""
                                }`}
                                onClick={() => handleFavoriteToggle(coin)}
                            >
                                {store.favorites.some((favCoin) => favCoin.id === coin.id) ? "★" : "☆"}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
