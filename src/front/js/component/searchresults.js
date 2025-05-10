import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const SearchResults = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate()

    return (
        <div className="search-results-container" >
            <h1 className="search-title">Search Results</h1>
            <div className="search-results-grid">
                {store.filteredCoins && store.filteredCoins.length > 0 ? (
                    store.filteredCoins.map((coin) => (
                        <div key={coin.id} className="search-card" onClick={()=> {
                            console.log("Row clicked:", coin.id);
                            navigate('/moreinfo/' + coin.id)}}>
                            <div className="search-card-body">
                                <h5 className="search-card-title">{coin.name}</h5>
                                <p className="search-card-text">Symbol: {coin.symbol}</p>
                                <p className="search-card-text">Price: ${coin.current_price}</p>
                            
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-results">No results found.</p>
                )}
            </div>
        </div>
    );
};
