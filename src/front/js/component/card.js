import React, { useState } from "react";

export const Card = (props) => {
    const [showBalance, setShowBalance] = useState(true)

    const toggleBalance = () => {
        let toggle = !showBalance
        setShowBalance(toggle);
        console.log(toggle);

    }



    return (

        <div className="card mb-3 row">
            <div className="card-body d-flex justify-content-around col-4 align-items-center ">
                <h5 className="card-title ">{props.name}</h5>
            </div>
            <div className="card-body d-flex justify-content-around col-4 align-items-center">
                <div className="justify-content-center">
                    <div className="d-flex ">
                        <p className="card-text justify-content-around" >{showBalance ? props.balance : "****"}</p>
                        {showBalance ? <i className="bi bi-eye-fill" onClick={toggleBalance}></i> : <i className="bi bi-eye-slash-fill" onClick={toggleBalance}></i>}
                    </div>
                    <p className="card-text ">{props.coin}</p>
                </div>
            </div>
            <div className="card-body d-flex justify-content-around col-4 align-items-center ">
                <a href="#" className="btn btn-primary  ">Ver Mas</a>
            </div>
        </div>
    )
}
