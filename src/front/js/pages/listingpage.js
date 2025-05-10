import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { SparklineChart } from "./sparklineChart";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";

export const Listing = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [modalAction, setModalAction] = useState(null);

    // Function to show an alert if user is not logged in
    const showAlertIfNotLoggedIn = (action) => {
        if (!store.token) {
            alert("You are not logged in! Please register or sign in.");
            return;
        }
        action();
    };

    // Function to handle opening of the trade modal
    const handleOpenModal = (coin, action) => {
        setSelectedCoin(coin);
        setModalAction(action); 
        setIsModalOpen(true);
    };

    // Function to handle trade action
    const handleTrade = (type, quantity) => {
        console.log(`${type.toUpperCase()} ${quantity} of ${selectedCoin.name}`);
        actions.tradeCoin(selectedCoin.id, type, quantity);
        setIsModalOpen(false); 
    };

    // Function to handle adding/removing coin to/from wallet
    const handleAddToWallet = (coin) => {
        const existingWallet = store.walletIds.find((walletCoin) => walletCoin.coin_id === coin.id);
        if (existingWallet) {
            actions.removeFromWallet(existingWallet.id);
        } else {
            actions.addToWallet(coin);
        }
    };

    // Function to handle toggling the favorite status of a coin
    const handleFavoriteToggle = (coin) => {
        actions.setFavoriteData();
        actions.setFavoritePriceData();
        const existingFav = store.favoriteIds.find((favCoin) => favCoin.coin_id === coin.id);
        if (existingFav) {
            actions.removeFromFavs(existingFav.id);
        } else {
            actions.addToFavs(coin);
        }
    };

    // If loading, show a loading indicator
    if (store.loading) {
        return <div>Loading...</div>;
    }

    // If no coins available, show a message
    if (!store.coins || store.coins.length === 0) {
        return <div>No coins available.</div>;
    }

    return (
        <div className="listing-page">
            <table className="coin-table">
                <thead>
                    <tr>
                        <th className="listRowHeaders">Coin</th>
                        <th className="listRowHeaders">Price</th>
                        <th className="listRowHeaders">Chart (7d)</th>
                        <th className="listRowHeaders">Change (24h)</th>
                        <th className="listRowHeaders">Market Cap</th>
                        <th className="listRowHeaders">Volume</th>
                        <th className="listRowHeaders">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {store.coins.map((coin) => (
                        <tr
                            className="listCoin"
                            key={coin.id}
                            onClick={(e) => {
                                e.stopPropagation();
                                showAlertIfNotLoggedIn(() => {
                                    console.log("Row clicked:", coin.id);
                                    navigate("/moreinfo/" + coin.id);
                                });
                            }}
                        >
                            <td>
                                <div className="coin-info">
                                    <img src={coin.image} alt={coin.name} className="coin-image" />
                                    <div>
                                        <div className="coin-name">{coin.name}</div>
                                        <div className="coin-symbol" style={{ color: "#39ff14" }}>
                                            {coin.symbol.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>${coin.current_price.toLocaleString()}</td>
                            <td>
                                <SparklineChart
                                    data={coin.sparkline_in_7d.price}
                                    width={150}
                                    height={50}
                                />
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
                            <div style={{ display: "flex" }}>
                                <button
                                    type="submit"
                                    className="submitBtn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        showAlertIfNotLoggedIn(() => actions.setShowTradeModal(coin));
                                    }}
                                    style={{
                                        backgroundColor: "#39ff14",
                                        borderRadius: "5px",
                                        height: "38px",
                                        width: "90px",
                                        border: "1px solid black",
                                    }}
                                >
                                    Trade
                                </button>

                                <button
                                    className={`bookmark-button ${
                                        store.favoriteIds.some((favCoin) => favCoin.coin_id === coin.id) ? "favorited" : ""
                                    }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        showAlertIfNotLoggedIn(() => handleFavoriteToggle(coin));
                                    }}
                                    style={{ marginLeft: "20px" }}
                                    >
                                    {store.favoriteIds.some((favCoin) => favCoin.coin_id === coin.id) ? (
                                        <i className="bi bi-bookmark-fill"></i>
                                    ) : (
                                        <i className="bi bi-bookmark"></i>
                                    )}
                                    </button>
                                    </div>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            \
            {isModalOpen && selectedCoin && modalAction === "trade" && (
                <TradeModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onTrade={handleTrade}
                    coinName={selectedCoin.name}
                />
            )}
        </div>
    );
};
