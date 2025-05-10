import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { SparklineChart } from "../pages/sparklineChart";
import { TradeModal } from "./tradeModal";


export const Wallet = () => {
  const { store, actions } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [walletIds, setWalletIds] = useState(store.walletIds)
  const [addFundsModal, setAddFundsModal] = useState(false)
  const [sortCriteria, setSortCriteria] = useState("name"); 
  const [sortOrder, setSortOrder] = useState("asc"); 



  // useEffect(() => {
  //   document.getElementById("wc1").style.backgroundColor= "#39ff14";
  //   document.getElementById("wc1").style.color= "black";
  // }, []);


  useEffect(() => {
    // Fetch wallet price and normal data for each coin
    store.walletIds.forEach((wallet) => {
      actions.getWalletPriceData(wallet.coin_id);
      actions.getWalletNormalData(wallet.coin_id);
    });
  }, []);








  const walletCurrency = (id) => {
    document.querySelectorAll('.walletCurrencyBtns').forEach((button) => {
      button.style.backgroundColor = 'black';
      button.style.color = '#39ff14';
    });
    const pressedButton = document.getElementById(id);
    if (pressedButton) {
      pressedButton.style.backgroundColor = "#39ff14";
      pressedButton.style.color = "black";
    }
  };
  const handleOpenModal = (coin) => {
    setSelectedCoin(coin);
    setIsModalOpen(true);
  };


  const handleTrade = (type, quantity) => {
    console.log(`${type.toUpperCase()} ${quantity} of ${selectedCoin.name}`);
    actions.tradeCoin(selectedCoin.id, type, quantity);
    setIsModalOpen(false);
  };


  const openFundsModal = () => {
    setAddFundsModal(!addFundsModal)
  }


  const addFunds = () => {
    const inputAmount = parseFloat(document.getElementById("dollarAmount").value);
    actions.addFundsToWallet(store.funds + inputAmount)
  }


  // Deduplicate wallet data
  const uniqueWalletData = store.walletNormalData.filter(
    (wallet, index, self) =>
      index === self.findIndex((w) => w.id === wallet.id)

  );


  const sortedWalletData = [...uniqueWalletData].sort((a, b) => {
    if (sortCriteria === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }

    if (sortCriteria === "currentPrice") {
      const aPrice = a.market_data.current_price[store.currency] || 0;
      const bPrice = b.market_data.current_price[store.currency] || 0;
      return sortOrder === "asc" ? aPrice - bPrice : bPrice - aPrice;
    }
    

    if (sortCriteria === "purchasedPrice") {
      const aTotal = store.walletIds.find((elm) => elm.coin_id === a.id)?.quantity_owned * store.walletIds.find((elm) => elm.coin_id === a.id)?.purchase_price || 0;
      const bTotal = store.walletIds.find((elm) => elm.coin_id === b.id)?.quantity_owned * store.walletIds.find((elm) => elm.coin_id === b.id)?.purchase_price || 0;
      return sortOrder === "asc" ? aTotal - bTotal : bTotal - aTotal;
    }

    if (sortCriteria === "quantityOwned") {
      const aTotal = store.walletIds.find((elm) => elm.coin_id === a.id)?.quantity_owned  || 0;
      const bTotal = store.walletIds.find((elm) => elm.coin_id === b.id)?.quantity_owned  || 0;
      return sortOrder === "asc" ? aTotal - bTotal : bTotal - aTotal;
    }
    return 0;
  });
  
  

  const handleSort = (criteria) => {
    if (sortCriteria === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortCriteria(criteria);
      setSortOrder("asc");
    }
  };
  


  
  // if (!Array.isArray(store.walletNormalData) || store.walletNormalData.length === 0) {
  //   return <p>Loading wallet data...</p>;
  // }


  const fundsCurrency =(pref)=> {
    if (pref == "cad") {
      actions.setFundsInCurrency(Number(store.funds * 1.42))}
    else if (pref == "eur") {
      actions.setFundsInCurrency(Number(store.funds / 1.05))}
    else if (pref == "gbp") {
      actions.setFundsInCurrency(Number(store.funds / 1.21))}
    else if (pref == "jpy") {
      actions.setFundsInCurrency(Number(store.funds * 153.73))}
    else if (pref == "usd") {
      actions.setFundsInCurrency(store.funds)
    }
  }


  const validator = () => {
    let cardNumber = document.querySelector("#inputcard");
    let cvcNumber = document.querySelector("#inputCVC");
    let amount = document.querySelector("#dollarAmount");
    let fName = document.querySelector("#firstName");
    let lName = document.querySelector("#lastName");
    let city = document.querySelector("#inputCity");
    let state = document.querySelector("#inputState");
    let zip = document.querySelector("#inputZip");
    let cardType = document.querySelector("#selector");
    let errorList = document.querySelector("#errorList");


    if (cardNumber.value.length < 15 || cardNumber.value.length > 16) {
      let newError = document.createElement("li");
      newError.innerHTML = "Your card number is an invalid length";
      let myList = document.getElementById("errorList");
      myList.appendChild(newError);
      cardNumber.classList.add("bg-danger", "bg-opacity-50");
    }
    if (cvcNumber.value.length != 3) {
      let newError = document.createElement("li");
      newError.innerHTML = "Your CVC number is an invalid length";
      let myList = document.getElementById("errorList");
      myList.appendChild(newError);
      cvcNumber.classList.add("bg-danger", "bg-opacity-50");
    }
    if (amount.value <= 0) {
      let newError = document.createElement("li");
      newError.innerHTML = "Payment amount must be greater than 0";
      let myList = document.getElementById("errorList");
      myList.appendChild(newError);
      amount.classList.add("bg-danger", "bg-opacity-50");
    }
    if (fName.value == "") {
      let newError = document.createElement("li");
      newError.innerHTML = "Please enter your first name";
      let myList = document.getElementById("errorList");
      myList.appendChild(newError);
      fName.classList.add("bg-danger", "bg-opacity-50");
    }
    if (lName.value == "") {
      let newError = document.createElement("li");
      newError.innerHTML = "Please enter your last name";
      let myList = document.getElementById("errorList");
      myList.appendChild(newError);
      lName.classList.add("bg-danger", "bg-opacity-50");
    }
    if (city.value == "") {
      let newError = document.createElement("li");
      newError.innerHTML = "Please enter your city";
      let myList = document.getElementById("errorList");
      myList.appendChild(newError);
      city.classList.add("bg-danger", "bg-opacity-50");
    }
    if (state.value == -1) {
      let newError = document.createElement("li");
      newError.innerHTML = "Please select your state of residence";
      let myList = document.getElementById("errorList");
      myList.appendChild(newError);
      state.classList.add("bg-danger", "bg-opacity-50");
    }
    if (zip.value.length != 5) {
      let newError = document.createElement("li");
      newError.innerHTML = "Your zip code is invalid";
      let myList = document.getElementById("errorList");
      myList.appendChild(newError);
      zip.classList.add("bg-danger", "bg-opacity-50");
    }
    var radios = document.getElementsByName("flexRadioDefault");
    let checked = 0;
    for (let radiobox of radios) {
      if (radiobox.checked) checked += 1;
    }
    if (checked <= 0) {
      let newError = document.createElement("li");
      newError.innerHTML = "Please select your card type";
      let myList = document.getElementById("errorList");
      myList.appendChild(newError);
      cardType.classList.add("bg-danger", "bg-opacity-50");
    }
    if (errorList.childElementCount > 0) {
      errorList.classList.remove("d-none");
    }
  }


  return (
    <div className="wallet-page">
      {addFundsModal ? (
        <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header col-12">
                <legend className="bg-secondary-subtle ps-3">
                  <strong>Enter Payment Method to Add Funds</strong>
                </legend>
              </div>
              <form className="modal-body row g-3 px-3" id="fund-form">
                <div className="mx-1.5">
                  <div>
                    <ul
                      id="errorList"
                      className="col-12 text-danger bg-danger bg-opacity-50 rounded py-2 d-none"
                      style={{ height: "auto" }}
                    ></ul>
                  </div>
                </div>
                <div className="col-5">
                  <label for="inputcard" className="form-label">Card #</label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputcard"
                    placeholder="XXXXXXXXXXXXXXXX"
                  />
                </div>
                <div className="col-3">
                  <label for="inputCVC" className="form-label">CVC #</label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputCVC"
                    placeholder="0000"
                  />
                </div>
                <div className="col-4">
                  <label for="dollarAmount" className="form-label d-block">Amount</label>
                  <div className="input-group mb-3">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      className="form-control"
                      id="dollarAmount"
                      aria-label="Amount (to the nearest dollar)"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <label for="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                  />
                </div>
                <div className="col-6">
                  <label for="lastName" className="form-label">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-6">
                  <label for="inputCity" className="form-label">City</label>
                  <input type="text" className="form-control" id="inputCity" />
                </div>
                <div className="col-3">
                  <label for="inputState" className="form-label">State</label>
                  <select id="inputState" className="form-select">
                    <option value="-1" selected>Pick a state</option>
                    <option>Alabama</option>
                    <option>Alaska</option>
                    <option>Arizona</option>
                    <option>Arkansas</option>
                    <option>California</option>
                    <option>Colorado</option>
                    <option>Connecticut</option>
                    <option>Delaware</option>
                    <option>Florida</option>
                    <option>Georgia</option>
                    <option>Hawaii</option>
                    <option>Idaho</option>
                    <option>Illinois</option>
                    <option>Indiana</option>
                    <option>Iowa</option>
                    <option>Kansas</option>
                    <option>Kentucky</option>
                    <option>Louisiana</option>
                    <option>Maine</option>
                    <option>Maryland</option>
                    <option>Massachusetts</option>
                    <option>Michigan</option>
                    <option>Minnesota</option>
                    <option>Mississippi</option>
                    <option>Missouri</option>
                    <option>Montana</option>
                    <option>Nebraska</option>
                    <option>Nevada</option>
                    <option>New Hampshire</option>
                    <option>New Jersey</option>
                    <option>New Mexico</option>
                    <option>New York</option>
                    <option>North Carolina</option>
                    <option>North Dakota</option>
                    <option>Ohio</option>
                    <option>Oklahoma</option>
                    <option>Oregon</option>
                    <option>Pennsylvania</option>
                    <option>Rhode Island</option>
                    <option>South Carolina</option>
                    <option>South Dakota</option>
                    <option>Tennessee</option>
                    <option>Texas</option>
                    <option>Utah</option>
                    <option>Vermont</option>
                    <option>Virginia</option>
                    <option>Washington</option>
                    <option>West Virginia</option>
                    <option>Wisconsin</option>
                    <option>Wyoming</option>
                  </select>
                </div>
                <div className="col-3">
                  <label for="inputZip" className="form-label">Postal Code</label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputZip"
                  />
                </div>
                <div className="col-3">
                  <label for="cardtype" className="form-label">We Accept</label>
                  <div id="selector" className="bg-secondary rounded p-2">
                    <div className="form-check form-check-inline mx-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="cardtype"
                        value="option1"
                      />
                      <label className="form-check-label" for="inlineCheckbox1">
                        <i className="fab fa-cc-mastercard"></i>
                      </label>
                    </div>
                    <div className="form-check form-check-inline mx-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="cardtype"
                        value="option2"
                      />
                      <label className="form-check-label" for="inlineCheckbox2">
                        <i className="fab fa-cc-visa"></i>
                      </label>
                    </div>
                    <div className="form-check form-check-inline mx-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="cardtype"
                        value="option3"
                      />
                      <label className="form-check-label" for="inlineCheckbox3">
                        <i className="fab fa-cc-discover"></i>
                      </label>
                    </div>
                    <div className="form-check form-check-inline mx-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="cardtype"
                        value="option4"
                      />
                      <label className="form-check-label" for="inlineCheckbox4">
                        <i className="fab fa-cc-amex"></i>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-3"></div>
              </form>
              <div className="modal-footer bg-secondary-subtle p-3 mx-right d-flex justify-content-end">
                <button type="reset" onClick={() => { openFundsModal() }} className="btn btn-secondary mx-2">Cancel</button>
                <button id="submit" type="submit" for="fund-form" onClick={
                  (e)=> {e.preventDefault();
                  const errorList = document.querySelector("#errorList");
                  errorList.innerHTML = "";
                  validator();
                  if (errorList.childElementCount === 0) {
                    addFunds();
                    openFundsModal();
                  }}} className="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <h2>Your Wallet</h2>
      <div className="funds">
        <div style={{ display: "flex" }}>
          <h3 style={{ paddingRight: "3vw" }}>Available Funds: {store.fundsInCurrency > 0 ? Number(store.fundsInCurrency.toFixed(2)).toLocaleString() : store.funds > 0 ? Number(store.funds.toFixed(2)).toLocaleString() : "0"} {store.currency.toUpperCase()}</h3>
          <button onClick={() => openFundsModal()} className="btn trdBtn">Add Funds</button>
        </div>
        <div>
          <h5>Change Currency:</h5>
          <div className="walletCurrency" role="group" >
            <button id="wc1" className="walletCurrencyBtns" onClick={() => { actions.setCurrency("usd"); walletCurrency("wc1"); fundsCurrency("usd") }}>USD</button>
            <button id="wc2" className="walletCurrencyBtns" onClick={() => { actions.setCurrency("cad"); walletCurrency("wc2"); fundsCurrency("cad") }}>CAD</button>
            <button id="wc3" className="walletCurrencyBtns" onClick={() => { actions.setCurrency("eur"); walletCurrency("wc3"); fundsCurrency("eur") }}>EUR</button>
            <button id="wc4" className="walletCurrencyBtns" onClick={() => { actions.setCurrency("gbp"); walletCurrency("wc4"); fundsCurrency("gbp") }}>GBP</button>
            <button id="wc5" className="walletCurrencyBtns" onClick={() => { actions.setCurrency("jpy"); walletCurrency("wc5"); fundsCurrency("jpy") }}>JPY</button>
          </div>
        </div>
      </div>
      <table className="wallet-table" style={{ width: "88vw" }}>
        <thead>
        <tr>
          <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
            Name {sortCriteria === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </th>
          <th onClick={()=> handleSort("currentPrice")} style={{ cursor: "pointer" }}>
            Current Price {sortCriteria === "currentPrice" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
          <th onClick={()=> handleSort("quantityOwned")} style={{ cursor: "pointer" }}>
            Quantity Owned {sortCriteria === "quantityOwned" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
          <th onClick={() => handleSort("purchasedPrice")} style={{ cursor: "pointer" }}>
            Purchased Price {sortCriteria === "purchasedPrice" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </th>
          <th>Current Holdings</th>
          <th>Return Value</th>
          <th>Graph (7d)</th>
          <th>Quick Actions</th>
          <th>Market Details</th>
        </tr>
        </thead>
        <tbody>
          {sortedWalletData.map((walletArray, index) => {
            const walletId = store.walletIds.find((elm) => elm.coin_id === walletArray.id);
            return (
              <tr key={walletArray.id}>
                <td>
                  <div className="wallet-info">
                    <img src={walletArray.image.small} alt={walletArray.name} className="wallet-image"/>
                    <div className="wallet-name">{walletArray.name}</div>
                    <div className="wallet-symbol" style={{ color: "#39ff14" }}>
                      {walletArray.symbol.toUpperCase()}
                    </div>
                  </div>
                </td>
                <td>${walletArray.market_data.current_price[store.currency]?.toLocaleString() || ""}</td>
                <td>{walletId.quantity_owned}</td>
                <td>
                  ${(
                    walletId.quantity_owned * walletId.purchase_price ||
                    0
                  ).toLocaleString()}
                </td>
                <td>
                  ${(
                    walletId.quantity_owned * walletArray.market_data.current_price[store.currency] ||
                    0
                  ).toLocaleString()}
                </td>
                <td>
                  {(
                    (((walletId.quantity_owned * walletArray.market_data.current_price[store.currency]) / (walletId.purchase_price))-1) * 100 || 0
                  ).toLocaleString()}%
                </td>
                <td>
                  <SparklineChart
                    data={walletArray.market_data.sparkline_7d?.price || []}
                    width={150}
                    height={50}
                  />
                </td>
                <td>
                  <button type="submit" id="submitBtn" onClick={() => actions.setShowTradeModal(walletArray)} style={{ backgroundColor: "#39ff14", borderRadius: "5px", height: "38px", width: "90px", border: "1px solid black" }}>Trade</button>
                </td>
                <td>
                  <Link to={`/moreInfo/${walletArray.id}`} className="btn btn-secondary">
                    More Information
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>


     
   
    </div>
  );
};