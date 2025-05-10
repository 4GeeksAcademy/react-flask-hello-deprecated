import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { SparklineChart } from "./sparklineChart";
import { TradeModal } from "../component/tradeModal";
import { Wallet } from "../component/Wallet";
import "../../styles/index.css";
import { useNavigate } from "react-router-dom";

export const Listing = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [modalAction, setModalAction] = useState(null);

    // useEffect(() => {
    //     if (!store.coins || store.coins.length === 0) {
    //         console.log("Fetching coins data...");
    //         actions.fetchCoins();
    //     }
    // }, [store.coins, actions]);

    const handleOpenModal = (coin, action) => {
        setSelectedCoin(coin);
        setModalAction(action); 
        setIsModalOpen(true);
    };

    const handleTrade = (type, quantity) => {
        console.log(`${type.toUpperCase()} ${quantity} of ${selectedCoin.name}`);
        actions.tradeCoin(selectedCoin.id, type, quantity);
        setIsModalOpen(false); 
    };

    const handleAddToWallet = (coin) => {
        // actions.setWalletNormalData();
        // actions.setWalletPriceData();
        const existingWallet = store.walletIds.find((walletCoin) => walletCoin.coin_id === coin.id)
        if (existingWallet) {
            actions.removeFromWallet(existingWallet.id);
        } else {
            actions.addToWallet(coin);
        }
    };


    const handleFavoriteToggle = (coin) => {
        actions.setFavoriteData();
        actions.setFavoritePriceData();
        const existingFav = store.favoriteIds.find((favCoin) => favCoin.coin_id === coin.id)
        if (existingFav) {
            actions.removeFromFavs(existingFav.id);
        } else {
            actions.addToFavs(coin);
        }
    };

    if (store.loading) {
        return <div>Loading...</div>;
    }

    if (!store.coins || store.coins.length === 0) {
        return <div>No coins available.</div>;
    }

    return (
        <div className="listing-page">
            <table className="coin-table">
                <thead>
                    <tr>
                        <th className='listRowHeaders'>Coin</th>
                        <th className='listRowHeaders'>Price</th>
                        <th className='listRowHeaders'>Chart (7d)</th>
                        <th className='listRowHeaders'>Change (24h)</th>
                        <th className='listRowHeaders'>Market Cap</th>
                        <th className='listRowHeaders'>Volume</th>
                        <th className='listRowHeaders'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {store.coins.map((coin) => (
                        <tr className="listCoin" key={coin.id} onClick={()=> {
                            console.log("Row clicked:", coin.id);
                            navigate('/moreinfo/' + coin.id)}}
                            >
                            <td>
                                <div className="coin-info">
                                    <img src={coin.image} alt={coin.name} className="coin-image" />
                                    <div>
                                        <div className="coin-name">{coin.name}</div>
                                        <div className="coin-symbol" style={{ color: "#39ff14"}}>{coin.symbol.toUpperCase()}</div>
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
                                <button
                                    type="submit"
                                    className="submitBtn"
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        actions.setShowTradeModal(coin);
                                    }}
                                    style={{
                                        backgroundColor: "#39ff14",
                                        borderRadius: "5px",
                                        height: "38px",
                                        width: "90px",
                                        border: "1px solid black"
                                    }}
                                >
                                    Trade
                                </button>
                                
                                <button
                                    className={`star-button ${
                                        store.favoriteIds.some((favCoin) => favCoin.id === coin.id)
                                            ? "favorited"
                                            : ""
                                    }`}
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        handleFavoriteToggle(coin);
                                    }}
                                >
                                    {store.favoriteIds.some((favCoin) => favCoin.coin_id === coin.id)
                                        ? "★"
                                        : "☆"}
                                </button>
                            </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        {/* {isModalOpen && selectedCoin && modalAction === "trade" && (
                                            <TradeModal
                                                isOpen={isModalOpen}
                                                onClose={() => setIsModalOpen(false)}
                                                onTrade={handleTrade}
                                                coinName={selectedCoin.name}
                                            />
                                        )} */}
                                    </div>
                                );
                            };