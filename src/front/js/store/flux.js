import { symbol } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            alerts: [], // Array to store alerts { id: coinId, name: coinName, targetPrice: number }
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
            coins: [],
            currentCoinId: null,
            currency: "usd",
            currentCoinPriceData: [],
            currentCoinData: [],
            favorites: [],
            favoriteIds: [],
            favoriteData: [],
            favoritePriceData: [],
            wallet: [],
            walletIds: [],
            walletPriceData: [],
            walletNormalData: [],
            walletReturnsData: [],
            combinedReturns: [],
            funds: 0,
            fundsInCurrency: 0,
            fundsCurrency: "usd",
            currencyMultiplier: 1,
            loadingCoins: true,
            searchSuggestions: [], // Initialize as an empty array
            showContactModal: false,
            showTradeModal: false,
            showModal: false,
            showOverallHoldings: false,
            showWallet: false,
            showFavorites: false,
            token: null,
            timeFrame: "7",
            tradeCoin: [],
            username: null, // Initially no user is logged in
            userID: null,
            userProfile: {}
        },
        actions: {
            setCurrencyMultiplier: (num) => {
                setStore({ currencyMultiplier: Number(num)})
            },
            setFundsInCurrency: (money) => {
                setStore({ fundsInCurrency: money })
            },
            setFavoritePriceData: () => {
                setStore({ favoritePriceData: [] })
            },
            setFavoriteData: () => {
                setStore({ favoriteData: [] })
            },
            setWalletPriceData: () => {
                setStore({ walletPriceData: [] })
            },
            setWalletNormalData: () => {
                setStore({ walletNormalData: [] })
            },
            setUserId: (id) => {
                setStore({ userID: id })
            },

            setUserName: (username) => {
                setStore({ username: username })
            },
            setCurrentCoinId: (id) => {
                setStore({ currentCoinId: id })
            },
            setCurrency: (currency) => {
                setStore({ currency: currency })
            },
            setTimeFrame: (days) => {
                setStore({ timeFrame: days })
            },
            setShowContactModal: () => {
                setStore({ showContactModal: !getStore().showContactModal })
            },
            setShowTradeModal: (coin) => {
                setStore({ showTradeModal: !getStore().showTradeModal })
                setStore({ tradeCoin: coin })
            },
            setShowOverallHoldings: () => {
                setStore({ showOverallHoldings: true })
                setStore({ showWallet: false })
                setStore({ showFavorites: false })
            },
            setShowWallet: () => {
                setStore({ showWallet: true })
                setStore({ showOverallHoldings: false })
                setStore({ showFavorites: false })
            },
            setShowFavorites: () => {
                setStore({ showFavorites: true })
                setStore({ showWallet: false })
                setStore({ showOverallHoldings: false })
            },
            addToFunds: (money) => {
                setStore({ funds: getStore().funds + Number(money) })
            },
            fetchCoins: async () => {
                setStore({ loading: true });
                try {
                    const options = {
                        method: 'GET',
                        headers: {
                            accept: 'application/json',
                            'x-cg-pro-api-key': process.env.COINGECKO_KEY
                        }
                    };
                    const response = await fetch(
                        "https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=30&page=1&sparkline=true", options
                    );
                    const data = await response.json();

                    setStore({
                        coins: data, // Populate coins
                        filteredCoins: data, // Initialize filteredCoins with all coins
                        loading: false
                    });
                } catch (error) {
                    console.error("Error fetching coins:", error);
                    setStore({ loading: false });
                }
            },

            fetchWalletData: async (userId) => {
                try {
                    const response = await fetch(`/api/wallet/${userId}`);
                    if (!response.ok) throw new Error("Failed to fetch wallet data");

                    const walletData = await response.json();
                    setStore({ ...store, wallet: walletData });
                } catch (error) {
                    console.error("Error fetching wallet data:", error);
                }
            },

            setToken: () => {
                setStore({ token: localStorage.token })
            },



            getCurrentCoinPriceData: () => {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        'x-cg-pro-api-key': process.env.COINGECKO_KEY
                    }
                };
                console.log("I ran");

                fetch(`https://pro-api.coingecko.com/api/v3/coins/${getStore().currentCoinId}/market_chart?vs_currency=${getStore().currency}&days=${getStore().timeFrame}`, options)
                    .then((res) => res.json())
                    .then((response) => {
                        setStore({
                            currentCoinPriceData:
                                response.prices.map((price) => {
                                    const formattedPrice = Number(price[1] > 1 ? price[1].toFixed(2) : price[1])
                                    return ({ date: new Date(price[0]), price: formattedPrice })
                                })
                        })
                    })
                    .catch((err) => console.log(err))
            },

            getCurrentCoinData: () => {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        'x-cg-pro-api-key': process.env.COINGECKO_KEY
                    }
                };
                fetch(`https://pro-api.coingecko.com/api/v3/coins/${getStore().currentCoinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`, options)
                    .then((res) => res.json())
                    .then((response) => setStore({ currentCoinData: response }))
                    .catch((err) => console.log(err))
            },




            getWalletPriceData: (id) => {
                const currentData = getStore().walletPriceData; // Get current wallet price data from the store
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        'x-cg-pro-api-key': process.env.COINGECKO_KEY
                    }
                };

                fetch(`https://pro-api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`, options)
                    .then((res) => res.json())
                    .then((response) => {
                        // Fix: Use 'id' instead of 'coin_id'
                        if (!currentData.some((entry) => entry[0]?.id === id)) {
                            setStore({
                                walletPriceData: [
                                    ...getStore().walletPriceData,
                                    response.prices.map((price) => {
                                        return {
                                            id: id,
                                            date: new Date(price[0]),
                                            price: price[1]
                                        };
                                    })
                                ]
                            });
                        }
                    })
                    .catch((err) => console.log(err));
            },

            // getWalletReturnsData: (coin_id, purchase_date, current_date) => {
            //     const options = {
            //         method: 'GET',
            //         headers: {
            //             accept: 'application/json',
            //             'x-cg-pro-api-key': process.env.COINGECKO_KEY
            //         }
            //     };

            //     fetch(
            //         `https://pro-api.coingecko.com/api/v3/coins/${coin_id}/market_chart/range?vs_currency=usd&from=${purchase_date}&to=${current_date}`,
            //         options
            //     )
            //         .then((res) => res.json())
            //         .then((response) => {
            //             if (!response.prices || response.prices.length === 0) {
            //                 console.log("No prices returned from API.");
            //                 return;
            //             }

            //             // Create a map to aggregate prices by date
            //             const aggregatedMap = {};

            //             response.prices.forEach(([timestamp, price]) => {
            //                 // Convert timestamp to date string (e.g., "2023-01-01")
            //                 const date = new Date(timestamp).toISOString().split("T")[0];

            //                 // If the date already exists in the map, sum up the prices
            //                 if (aggregatedMap[date]) {
            //                     aggregatedMap[date] += price;
            //                 } else {
            //                     // Otherwise, initialize it with the current price
            //                     aggregatedMap[date] = price;
            //                 }
            //             });

            //             // Convert the aggregated map back into an array
            //             const aggregatedData = Object.entries(aggregatedMap).map(([date, price]) => ({
            //                 date,
            //                 price
            //             }));

            //             // Update the store with the aggregated data
            //             setStore({
            //                 walletReturnsData: [...getStore().walletReturnsData, ...aggregatedData]
            //             });
            //         })
            //         .catch((err) => console.log(err));
            // },

            getWalletReturnsData: (coin_id, purchase_date, current_date) => {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        'x-cg-pro-api-key': process.env.COINGECKO_KEY
                    }
                };

                fetch(
                    `https://pro-api.coingecko.com/api/v3/coins/${coin_id}/market_chart/range?vs_currency=usd&from=${purchase_date}&to=${current_date}`,
                    options
                )
                    .then((res) => res.json())
                    .then((response) => {
                        const resultArray = getStore().walletReturnsData;
                        response.prices.forEach((entry) => {
                            if (resultArray.length < 1) resultArray.push({
                                date: entry[0],
                                Holdings: entry[1]
                            });
                            else {
                                let exists = resultArray.find((elem, ind) => elem.date == entry[0]);
                                if (!exists) {
                                    resultArray.push({
                                        date: entry[0],
                                        Holdings: entry[1]
                                    });
                                } else {
                                    exists.Holdings += entry[1]
                                }
                            }
                        });
                        setStore({ walletReturnsData: resultArray })
                    })
                    .catch((err) => console.log(err));
            },


            // const resultArray = []
            //             response.prices.forEach((entry) => {
            //                 if (resultArray < 1) resultArray.push(entry);
            //                 else {
            //                     let exists = resultArray.find((elem, ind) => elem.date == entry[0]);
            //                     if (!exists) {
            //                         resultArray.push({
            //                             date: price[0],
            //                             price: price[1]
            //                         });
            //                     } else {
            //                         exists.price += entry[1]
            //                     }
            //                 }
            //             });

            // fetch(`https://pro-api.coingecko.com/api/v3/coins/${coin_id}/market_chart/range?vs_currency=usd&from=${purchase_date}&to=${current_date}`, options)
            //     .then((res) => res.json())
            //     .then((response) => {
            //         let returnsWallet = getStore().walletReturnsData;

            //         if (returnsWallet.length < 1) {
            //             let mapping = response.prices.map((price) => {
            //                 return {
            //                     date: price[0],
            //                     price: price[1]
            //                 };
            //             })
            //             setStore({
            //                 walletReturnsData: [...getStore().walletReturnsData, ...mapping
            //                 ]
            //             })
            //         } else if (returnsWallet.length > 0) {
            //             response.prices.forEach((day_price) => {
            //                 returnsWallet.forEach((elem, ind) => {
            //                     if (elem.date == day_price[0]) returnsWallet[ind] += day_price[1];
            //                     else returnsWallet.push(day_price);
            //                 })
            //             })
            //             setStore({ walletReturnsData: returnsWallet })
            //         }




            //             let mapping = response.prices.map((price) => {
            //                 return {
            //                     date: price[0],
            //                     price: price[1]
            //                 };
            //             })
            //             setStore({

            //          walletReturnsData: [...getStore().walletReturnsData, ...mapping
            //                 ]
            //             })

            //         })
            //         .catch((err) => console.log(err));
            // },
            handleSignUp: async (e) => {
                e.preventDefault();
                const { username, email, confirmEmail, password, confirmPassword } = e.target.elements;

                // Validation checks
                if (email.value !== confirmEmail.value) {
                    setError("Emails do not match.");
                    return;
                }
                if (password.value !== confirmPassword.value) {
                    setError("Passwords do not match.");
                    return;
                }

                try {
                    const payload = {
                        email: email.value,
                        password: password.value,
                        username: username.value
                    };

                    const response = await fetch(process.env.BACKEND_URL + "api/users", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload), // Send email and password as JSON
                    });

                    const responseData = await response.json();

                    if (!response.ok) {
                        setError(responseData.error || "Sign-up failed"); // Handle backend errors
                        return;
                    }

                    alert("Registration successful! You can now log in."); // Notify success
                    setIsLogin(true); // Switch to login view
                } catch (err) {
                    console.error("Sign-up error:", err);
                    setError("An error occurred while signing up."); // Catch unexpected errors
                }
            },

            signUp: (username, password) => {
                console.log(`Sign-up request for: ${username}`);
                // Implement API call or logic for user registration
            },

            // Function to restore the session on app load

            login: (email, password) => {
                fetch(process.env.BACKEND_URL + "api/login", {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            "email": email,
                            "password": password
                        }
                    ),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                    .then(res => {
                        if (!res.ok) throw Error("There was a problem in the login request")

                        if (res.status === 401) {
                            throw ("Invalid credentials")
                        }
                        if (res.status === 400) {
                            throw ("Invalid email or password format")
                        }
                        return res.json()
                    })
                    .then(response => {
                        console.log("response", response);
                        localStorage.setItem('token', response.access_token);
                        localStorage.setItem('username', response.username);
                        localStorage.setItem('userID', response.userID);
                        localStorage.setItem('userProfile', JSON.stringify(response.user));

                        // localStorage.setItem('userToken', response.access_token);

                        setStore({ token: response.access_token, userProfile: response.user, userEmail: response.user.email, userID: response.userID, username: response.username, funds: Number(response.user.funds) });
                        getActions().getFavoriteIds(response.userID)
                        getActions().getWalletIds(response.userID)
                    })
                    .catch(error => console.error(error));
            },


            initSession: () => {
                const token = localStorage.getItem("jwt-token");

                if (token) {
                    // Decode or validate the token if needed
                    setStore({ token });
                    console.log("Session restored");
                } else {
                    console.log("No token found");
                }
            },

            // Logout action to clear token and user data
            logout: () => {
                localStorage.removeItem("token"); // Clear the token
                localStorage.removeItem('username');
                localStorage.removeItem('userID');
                localStorage.removeItem('userProfile');
                setStore({ username: "", userID: "", token: "", funds: 0, userProfile: {} }); // Clear store data
                console.log("User logged out");
            },
            search: (query) => {
                console.log("Search query:", query); // Implement actual search logic
            },
            searchCoins: (query) => {
                const store = getStore();

                // Update the search query in the store
                setStore({ searchQuery: query });

                // Filter the coins based on the query
                const filtered = store.coins.filter((coin) =>
                    coin.name.toLowerCase().includes(query.toLowerCase()) ||
                    coin.symbol.toLowerCase().includes(query.toLowerCase())

                );

                // Filter the coins based on the query
                const suggestions = store.coins
                    .filter((coin) =>
                        coin.name.toLowerCase().includes(query.toLowerCase()) ||
                        coin.symbol.toLowerCase().includes(query.toLowerCase()) ||
                        coin.id.toLowerCase().includes(query.toLowerCase())
                    )
                    .slice(0, 5); // Limit the results to 5 items




                // Update filteredCoins in the store
                setStore({ filteredCoins: filtered, searchSuggestions: suggestions });
            },
            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            },

            addToFavs: (coin) => {
                fetch(process.env.BACKEND_URL + `favorites/${coin.id}`, {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            "name": coin.name,
                            "user_id": getStore().userID,
                            "coin_id": coin.id
                        }
                    ),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                    .then(res => {
                        if (!res.ok) throw Error(res.statusText);
                        return res.json();
                    })
                    .then(response => setStore({ favoriteIds: response }))
                    .catch(error => console.error(error));
            },

            removeFromFavs: (fav_id) => {
                fetch(process.env.BACKEND_URL + `favorites/${getStore().userID}/${fav_id}`, {
                    method: 'DELETE'
                })
                    .then(res => {
                        if (!res.ok) throw Error(res.statusText);
                        return res.json();
                    })
                    .then(response => {
                        setStore({ favoriteIds: response });
                        getActions().clearFavoriteData()
                        getActions().clearFavPriceData()

                    })
                    .then(response => { setStore({ favoriteIds: response }) })
                    .catch(error => console.error(error));
            },

            getFavoriteIds: (id) => {
                fetch(process.env.BACKEND_URL + `users/${id}/favorites`)
                    .then((res) => res.json())
                    .then((response) => {
                        setStore({ favoriteIds: response });
                    })
                    .catch((err) => console.log(err))
            },
            clearFavoriteData: () => {
                setStore({ favoriteData: [] })
            },

            clearFavoritePriceData: () => {
                setStore({ favoritePriceData: [] })
            },


            getFavPriceData: (id) => {
                const currentData = getStore().favoritePriceData
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        'x-cg-pro-api-key': process.env.COINGECKO_KEY
                    }
                };
                fetch(`https://pro-api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`, options)
                    .then((res) => res.json())
                    .then((response) => {
                        if (!currentData.some((entry) => entry[0]?.id === id)) {
                            setStore({
                                favoritePriceData: [...getStore().favoritePriceData,
                                response.prices.map((price) => {
                                    return ({ id: id, date: new Date(price[0]), price: price[1] })
                                })]
                            })
                        }
                    })
                    .catch((err) => console.log(err))
            },

            getFavoriteData: (coin_id) => {
                const currentData = getStore().favoriteData
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        'x-cg-pro-api-key': process.env.COINGECKO_KEY
                    }
                };
                fetch(`https://pro-api.coingecko.com/api/v3/coins/${coin_id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`, options)
                    .then((res) => res.json())
                    .then((response) => {
                        if (!currentData.some((fav) => fav.id === coin_id)) {
                            setStore({ favoriteData: [...getStore().favoriteData, response] })
                        }
                    })
                    .catch((err) => console.log(err))
            },

            getWalletNormalData: (coin_id) => {
                const currentData = getStore().walletNormalData; // Get current wallet data from the store
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        'x-cg-pro-api-key': process.env.COINGECKO_KEY
                    }
                };

                fetch(`https://pro-api.coingecko.com/api/v3/coins/${coin_id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`, options)
                    .then((res) => res.json())
                    .then((response) => {
                        // Fix: check if currentData already contains the coin with the same id as response.id
                        if (!currentData.some((wallet) => wallet.id === response.id)) {
                            setStore({
                                walletNormalData: [...getStore().walletNormalData, response] // Add the new coin data
                            });
                        }
                    })
                    .catch((err) => console.log(err));
            },



            addToWallet: (coin) => {
                fetch(process.env.BACKEND_URL + `wallet/${coin.id}`, {
                    method: 'POST',
                    body: JSON.stringify({
                        "name": coin.name,
                        "user_id": getStore().userID,
                        "coin_id": coin.id
                    }),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                    .then(res => {
                        if (!res.ok) throw Error(res.statusText);
                        return res.json();
                    })
                    .then(response => setStore({ walletIds: response }))
                    .catch(error => console.error(error));
            },

            // removeFromWallet: (wallet_id) => {
            //     fetch(process.env.BACKEND_URL + `wallet/${getStore().userID}/${wallet_id}`, {
            //         method: 'DELETE'
            //     })
            //         .then(res => {
            //             if (!res.ok) throw Error(res.statusText);
            //             return res.json();
            //         })
            //         .then(response => {
            //             setStore({ walletIds: response });
            //             response.forEach(element => {
            //                 getActions().getWalletNormalData(element.coin_id);
            //                 getActions().getWalletPriceData(element.coin_id);
            //             });
            //         })
            //         .catch(error => console.error(error));
            // },

            getWalletIds: (id) => {
                fetch(process.env.BACKEND_URL + `users/${id}/wallet`)
                    .then((res) => res.json())
                    .then((response) => {
                        setStore({ walletIds: response });
                        response.map((coin) => getActions().getWalletReturnsData(coin.coin_id, coin.purchase_date, Date.now()))
                    })
                    .catch((err) => console.log(err));
            },

            getWalletData: (coin_id) => {
                const currentData = getStore().walletData;
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        'x-cg-pro-api-key': process.env.COINGECKO_KEY
                    }
                };
                fetch(`https://pro-api.coingecko.com/api/v3/coins/${coin_id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`, options)
                    .then((res) => res.json())
                    .then((response) => {
                        if (!currentData.some((wallet) => wallet.id === response.id)) {
                            setStore({ walletData: [...getStore().walletData, response] });
                        }
                    })
                    .catch((err) => console.log(err));
            },

            loadAlerts: async () => {
                const userId = localStorage.getItem("userID"); // Get user ID
                try {
                    const response = await fetch(process.env.BACKEND_URL + `alerts/${userId}`);
                    if (response.ok) {
                        const alerts = await response.json(); // Fetch alerts from backend
                        setStore({ alerts }); // Update the store with fetched alerts
                    } else {
                        console.error("Failed to load alerts:", await response.text());
                    }
                } catch (error) {
                    console.error("Error loading alerts:", error);
                }
            },

            addAlert: async (coinId, coinName, targetPrice, above_below) => {
                const userId = localStorage.getItem("userID"); // Get user ID from localStorage
                const newAlert = {
                    user_id: userId,
                    coin_id: coinId,
                    coin_name: coinName,
                    target_price: targetPrice,
                    above_below: above_below
                };

                try {
                    const response = await fetch(process.env.BACKEND_URL + `alerts`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newAlert),
                    });

                    if (response.ok) {
                        const resp = await response.json(); // Get saved alert from backend response
                        const store = getStore();
                        setStore({ alerts: resp.alerts_array }); // Update the store
                    } else {
                        console.error("Failed to add alert:", await response.text());
                    }
                } catch (error) {
                    console.error("Error adding alert:", error);
                }
            },

            removeAlert: async (alertId) => {
                const userId = localStorage.getItem("userID");
                try {
                    const response = await fetch(process.env.BACKEND_URL + `alerts/${userId}/${alertId}`, {
                        method: "DELETE",
                    });
                    if (response.ok) {
                        const resp = await response.json();
                        setStore({ alerts: resp.alerts_array })
                    } else {
                        console.error("Failed to remove alert:", await response.text());
                    }
                } catch (error) {
                    console.error("Error removing alert:", error);
                }
            },

            checkAlerts: () => {
                const store = getStore();
                const triggeredAlerts = [];

                // Check all alerts
                store.alerts.forEach((alert) => {
                    const coin = store.coins.find((coin) => coin.id === alert.coin_id);
                    if (alert.above_below === "above") {
                        if (coin && coin.current_price >= alert.target_price) {
                            triggeredAlerts.push(alert);
                        }
                    } else if (alert.above_below === "below") {
                        if (coin && coin.current_price <= alert.target_price) {
                            triggeredAlerts.push(alert);
                        }
                    }
                });

                if (triggeredAlerts.length > 0) {
                    triggeredAlerts.forEach((triggeredAlert) => {
                        window.alert(
                            `Price Alert! ${triggeredAlert.coin_name} has reached $${triggeredAlert.target_price}`
                        );
                    });



                }
            },

            updateProfile: async (profile) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "profile/" + getStore().userID, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${getStore().token}`,
                        },
                        body: JSON.stringify(profile),
                    });

                    if (!response.ok) throw new Error("Update failed.");

                    const data = await response.json();
                    console.log("Profile: ", data);

                    setStore({ userProfile: data.profile })
                    localStorage.setItem('userProfile', JSON.stringify(data.profile));

                    setSuccess("Profile updated successfully!");
                    setShowModal(false);
                } catch (err) {
                    setError(err.message);
                }
            },

            addFundsToWallet: (funds) => {
                fetch(process.env.BACKEND_URL + `users/funds`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        "user_id": getStore().userID,
                        "funds": funds
                    }),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                    .then(res => {
                        if (!res.ok) throw Error(res.statusText);
                        return res.json();
                    })
                    .then(response => setStore({ funds: Number(response) }))
                    .catch(error => console.error(error));
            },

            removeFundsFromWallet: (funds) => {
                fetch(process.env.BACKEND_URL + `users/funds`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        "user_id": getStore().userID,
                        "funds": funds
                    }),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                    .then(res => {
                        if (!res.ok) throw Error(res.statusText);
                        return res.json();
                    })
                    .then(response => setStore({ funds: Number(response) }))
                    .catch(error => console.error(error));
            },

            getFunds: (id) => {
                fetch(process.env.BACKEND_URL + `users/${id}/funds`)
                    .then((res) => res.json())
                    .then((response) => {
                        setStore({ funds: Number(response) });
                    })
                    .catch((err) => console.log(err));
            },

            buyCoin: (coin, price, quantity, date) => {
                fetch(process.env.BACKEND_URL + `wallet/${coin.id}`, {
                    method: 'POST',
                    body: JSON.stringify({
                        "name": coin.name,
                        "user_id": getStore().userID,
                        "coin_id": coin.id,
                        "purchase_price": price,
                        "purchase_quantity": quantity,
                        "purchase_date": date
                    }),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                    .then(res => {
                        if (!res.ok) throw Error(res.statusText);
                        return res.json();
                    })
                    .then(response => {
                        setStore({ walletIds: response });
                        response.forEach(element => {
                            getActions().getWalletNormalData(element.coin_id);
                            getActions().getWalletPriceData(element.coin_id);
                            getActions().getWalletReturnsData(element.coin_id, element.purchase_date, Date.now())
                        })
                    })
                    .catch(error => console.error(error));
            },

            sellSomeCoin: (coin, quantity) => {
                fetch(process.env.BACKEND_URL + `wallet/${coin.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        "name": coin.name,
                        "user_id": getStore().userID,
                        "coin_id": coin.id,
                        "remaining_quantity": quantity
                    }),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                    .then(res => {
                        if (!res.ok) throw Error(res.statusText);
                        return res.json();
                    })
                    .then(response => {
                        setStore({ walletIds: response });
                        response.forEach(element => {
                            getActions().getWalletNormalData(element.coin_id);
                            getActions().getWalletPriceData(element.coin_id);
                            getActions().getWalletReturnsData(element.coin_id, element.purchase_date, Date.now())
                        });
                    })
                    .catch(error => console.error(error));
            },

            sellAllCoin: (coin) => {
                fetch(process.env.BACKEND_URL + `wallet/${getStore().userID}/${coin.id}`, {
                    method: 'DELETE',
                })
                    .then(res => {
                        if (!res.ok) throw Error(res.statusText);
                        return res.json();
                    })
                    .then(response => {
                        setStore({ walletIds: response });
                        response.forEach(element => {
                            getActions().getWalletNormalData(element.coin_id);
                            getActions().getWalletPriceData(element.coin_id);
                            getActions().getWalletReturnsData(element.coin_id, element.purchase_date, Date.now())
                        });
                    })
                    .catch(error => console.error(error));
            },

        },
    };
};

export default getState;
