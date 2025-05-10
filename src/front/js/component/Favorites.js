import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { LineChart, Line, YAxis, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export const Favorites = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        store.favoriteIds.forEach((favorite) => {
            actions.getFavPriceData(favorite.coin_id);
            actions.getFavoriteData(favorite.coin_id);
        });
    }, [store.favoriteIds]);

    const handleFavoriteToggle = (coin) => {
        // Ask for confirmation before removing a favorite
        const confirmRemoval = window.confirm(`Are you sure you want to remove ${coin.name} from your favorites?`);
        
        if (confirmRemoval) {
            const existingFav = store.favoriteIds.find((favCoin) => favCoin.coin_id === coin.id);
            if (existingFav) {
                actions.removeFromFavs(existingFav.id);
            }
        }
    };

    const hasFavorites = store.favoriteIds.length > 0 && store.favoriteData.length > 0;

    return (
        <div className="row" id="favoriteScreen">
            {!hasFavorites ? (
                <div className="col-12 d-flex flex-column justify-content-center align-items-center" style={{ height: "60vh" }}>
                    <h3 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center" }}>
                        You don't have any coin on your watchlist yet! Start adding your favorite coins.
                    </h3>
                </div>
            ) : (
                store.favoriteData.map((favorite, index) => {
                    const chartdata = store.favoritePriceData.filter((array) => array[0].id === favorite.id);
                    return (
                        <div key={favorite.id} className="favCardOut card col-4">
                            <div className="favCardIn">
                                <div className="favCardTop card-img-top">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={chartdata[0]}>
                                            <YAxis type="number" domain={['dataMin', 'dataMax']} width={0} />
                                            <Line type="monotone" dataKey="price" stroke="#39ff14" strokeWidth={2} dot={false} />
                                            <XAxis dataKey="date" height={0} />
                                            <Tooltip />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="favCardBody card-body">
                                    <h5 className="card-title">{favorite.name}</h5>
                                    <p className="card-text">Symbol: {favorite.symbol}</p>
                                    <p className="card-text"><strong>Current Price:</strong> ${favorite.market_data.current_price[store.currency]}</p>
                                    <Link to={"/moreInfo/" + favorite.id}>
                                        <span className="btn trdBtn">More Information</span>
                                    </Link>
                                    <button
                                        className="btn btn-danger ms-2"
                                        onClick={() => handleFavoriteToggle(favorite)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};
