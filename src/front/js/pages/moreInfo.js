import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { LineChart, Line, YAxis, Tooltip, XAxis, ResponsiveContainer, AreaChart, Area, lineargradient, defs } from "recharts";
import { TradeModal } from "../component/tradeModal";
import { useParams, useNavigate } from "react-router-dom";

export const MoreInfo = () => {
    const { store, actions } = useContext(Context);
    const [timeFrame, setTimeFrame] = useState("left");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [news, setNews] = useState([]);
    const [loadingNews, setLoadingNews] = useState(true);
    const [alertPrice, setAlertPrice] = useState("");
    const [above_below, setAbove_Below] = useState("");

    const params = useParams();
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (event, newAlignment) => {
        setTimeFrame(newAlignment);
    };

    // Fetch price and coin data on component mount
    useEffect(() => {
        actions.setCurrentCoinId(params.id);
        actions.setCurrency("usd");
        actions.setTimeFrame("7");
        actions.getCurrentCoinPriceData();
        actions.getCurrentCoinData();
    }, []);

    // Load alerts on component mount (ensures alerts are fetched from backend)
    useEffect(() => {
        actions.loadAlerts();
    }, []);

    // Fetch news data from The Guardian API
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(
                    `https://content.guardianapis.com/search?api-key=611e5bde-dc1e-455b-9137-5f6caf90eda7&q=${params.id}`
                );
                if (response.ok) {
                    const data = await response.json();
                    if (data.response && data.response.results) {
                        setNews(data.response.results); // Populate the news state
                    }
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoadingNews(false); // Stop the loading spinner
            }
        };

        fetchNews();
    }, [params.id]);

    useEffect(() => {
        actions.getCurrentCoinPriceData();
    }, [store.currency, store.timeFrame]);

    useEffect(() => {
        document.getElementById("gb2").style.backgroundColor = "black";
        document.getElementById("gb2").style.color = "#39ff14";
        document.getElementById("gb11").style.backgroundColor = "black";
        document.getElementById("gb11").style.color = "#39ff14";
    }, []);

    const handleTrade = () => {
        setIsModalOpen(true);
    };

    const graphOptions = (id) => {
        document.querySelectorAll('.graphButtons').forEach((button) => {
            button.style.backgroundColor = '#39ff14';
            button.style.color = 'black';
        });
        const pressedButton = document.getElementById(id);
        if (pressedButton) {
            pressedButton.style.backgroundColor = "black";
            pressedButton.style.color = "#39ff14";
        }
    };

    const graphOptions2 = (id) => {
        document.querySelectorAll('.graphButtons2').forEach((button) => {
            button.style.backgroundColor = '#39ff14';
            button.style.color = 'black';
        });
        const pressedButton = document.getElementById(id);
        if (pressedButton) {
            pressedButton.style.backgroundColor = "black";
            pressedButton.style.color = "#39ff14";
        }
    };

    // Handle setting the price alert
    const handleSetAlert = () => {
        const price = parseFloat(alertPrice);
        if (!price || isNaN(price)) {
            alert("Please enter a valid price.");
            return;
        }

        actions.addAlert(store.currentCoinData.id, store.currentCoinData.name, price, above_below);
        alert(`Alert set for ${store.currentCoinData.name} at $${price}`);
        setAlertPrice(""); // Reset input field
    };

    useEffect(() => {
        // Set up an interval to fetch the latest price data periodically
        // const intervalId = setInterval(() => {
        setInterval(() => {
            actions.getCurrentCoinData();
            actions.checkAlerts();
            // actions.getCurrentCoinPriceData();

        }, 30000); // fetch new data every 30 seconds

        // Clean up the interval when the component unmounts
        // return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="moreInfo">
            {/* Main Info Section */}
            <div className="mainInfo">
                {/* Coin Name */}
                <div className="coinName" style={{ fontSize: "25px", marginLeft: "80px", color: "white" }}>
                    {store.currentCoinData.name}
                </div>

                {/* Graph Box */}
                <div className="topHalf">
                    <div className="graphBox">
                        <div className="graphButtonsBox">
                            <div className="timeFrame" role="group" >
                                <button id="gb1" className="graphButtons" onClick={() => { actions.setTimeFrame("1"); graphOptions("gb1") }}>1D</button>
                                <button id="gb2" className="graphButtons" onClick={() => { actions.setTimeFrame("7"); graphOptions("gb2") }}>7D</button>
                                <button id="gb3" className="graphButtons" onClick={() => { actions.setTimeFrame("30"); graphOptions("gb3") }}>30D</button>
                                <button id="gb4" className="graphButtons" onClick={() => { actions.setTimeFrame("365"); graphOptions("gb4") }}>1Y</button>
                            </div>
                            <div className="currency" role="group" >
                                <button id="gb11" className="graphButtons2" onClick={() => { actions.setCurrency("usd"); graphOptions2("gb11") }}>USD</button>
                                <button id="gb12" className="graphButtons2" onClick={() => { actions.setCurrency("cad"); graphOptions2("gb12") }}>CAD</button>
                                <button id="gb13" className="graphButtons2" onClick={() => { actions.setCurrency("eur"); graphOptions2("gb13") }}>EUR</button>
                                <button id="gb14" className="graphButtons2" onClick={() => { actions.setCurrency("gbp"); graphOptions2("gb14") }}>GBP</button>
                                <button id="gb15" className="graphButtons2" onClick={() => { actions.setCurrency("jpy"); graphOptions2("gb15") }}>JPY</button>
                            </div>
                        </div>
                        <div className="bigGraph">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={store.currentCoinPriceData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="65%" stopColor="#39ff14" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#39ff14" stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <YAxis type="number" domain={['dataMin', 'dataMax']} width={0} />
                                    <Area type="monotone" dataKey="price" stroke="#39ff14" strokeWidth={2} dot={false} fill="url(#colorUv)" />
                                    <XAxis dataKey="date" height={0} />
                                    <Tooltip />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div id="morInfMktDta">
                        <div id="marketData">
                            <h3 style={{ paddingLeft: "5vw", color: "#39ff14", paddingBottom: "2vh" }}>Market Data:</h3>
                            <h4>Current Price: {store.currency.toUpperCase()} {store.currentCoinData.market_data ? store.currentCoinData.market_data.current_price[store.currency].toLocaleString() : null}</h4>
                            <h4>24H High: {store.currency.toUpperCase()} {store.currentCoinData.market_data ? store.currentCoinData.market_data.high_24h[store.currency].toLocaleString() : null}</h4>
                            <h4>24H Low: {store.currency.toUpperCase()} {store.currentCoinData.market_data ? store.currentCoinData.market_data.low_24h[store.currency].toLocaleString() : null}</h4>
                            <h4 style={{ display: "flex" }}>24H Change: <div style={{
                                marginLeft: '8px',
                                color: store.currentCoinData.market_data?.price_change_percentage_24h < 0 ? 'red' : 'green',
                            }}> {store.currentCoinData.market_data ? store.currentCoinData.market_data.price_change_percentage_24h.toFixed(2) : null}%</div></h4>
                            <h4 style={{ display: "flex" }}>30D Change: <div style={{
                                marginLeft: '8px',
                                color: store.currentCoinData.market_data?.price_change_percentage_30d < 0 ? 'red' : '#39ff14',
                            }}> {store.currentCoinData.market_data ? store.currentCoinData.market_data.price_change_percentage_30d.toFixed(2) : null}%</div></h4>
                            <h4 style={{ display: "flex" }}>1Y Change: <div style={{
                                marginLeft: '8px',
                                color: store.currentCoinData.market_data?.price_change_percentage_1y < 0 ? 'red' : '#39ff14',
                            }}> {store.currentCoinData.market_data ? store.currentCoinData.market_data.price_change_percentage_1y.toFixed(2) : null}%</div></h4>
                            <h4>Market Cap rank: {store.currentCoinData.market_data ? store.currentCoinData.market_data.market_cap_rank : null}</h4>
                        </div>
                        <div id="moreInfTrdBtnBox">
                            <button
                                type="btn"
                                className="btn"
                                id="moreInfTrdBtn"
                                onClick={() => actions.setShowTradeModal(store.currentCoinData)}
                            >Trade
                            </button>
                        </div>
                    </div>
                </div>

                {/* Alert Configuration Section */}
                <div className="alert-configuration">
                    <h4>Set Price Alert</h4>
                    <input
                        id="alert_price"
                        type="number"
                        value={alertPrice}
                        onChange={(e) => setAlertPrice(e.target.value)}
                        placeholder="Enter target price"
                    />
                    <label>
                        <input type="radio" name="aboveBelow" onClick={() => setAbove_Below("above")} /> Above
                    </label>
                    <label>
                        <input type="radio" name="aboveBelow" onClick={() => setAbove_Below("below")} /> Below
                    </label>
                    <button onClick={handleSetAlert}>Set Alert</button>
                </div>

                {/* Alerts List Section */}
                <div className="alerts-list">
                    <h4>Your Alerts</h4>
                    {store.alerts && store.alerts.length > 0 ? (
                        <ul>
                            {store.alerts.map((alert) => (
                                <li key={alert.id}>
                                    <span>
                                        {alert.coin_name} - Target: ${alert.target_price.toFixed(2)} or {alert.above_below}
                                    </span>
                                    <button
                                        onClick={() => {
                                            const confirmRemoval = window.confirm("Are you sure you want to remove this alert?");
                                            if (confirmRemoval) {
                                                actions.removeAlert(alert.id);
                                            }
                                        }}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No alerts set.</p>
                    )}
                </div>


                {/* News Feed Section */}
                <div className="news">
                    <h1>News feed for {store.currentCoinData.name}</h1>
                    {loadingNews ? (
                        <p>Loading news...</p>
                    ) : news.length > 0 ? (
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {news.map((article, index) => (
                                <li key={index} style={{ marginBottom: "20px" }}>
                                    <a
                                        href={article.webUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: "#39ff14", textDecoration: "none" }}
                                    >
                                        <h2>{article.webTitle}</h2>
                                    </a>
                                    <p>Published: {new Date(article.webPublicationDate).toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No news articles found for {store.currentCoinData.name}.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
