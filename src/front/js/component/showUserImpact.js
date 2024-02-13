import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const ShowUserImpact = () => {
    const { store, actions } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleUserImpactData = async () => {
            console.log("handleUserImpactData");
            await actions.getUserImpact();
        }

        handleUserImpactData();
    }, []);

    const { total_time, total_liters, total_days, average_time, average_liters } = store;
    console.log(store.total_time)
    return isLoading ?
        (
            <p> Smile.. your impact is upgrading </p>
        ) : (

            <div className="text-start">
            <h3 className="user-impact"> Your &nbsp; <span className="impact"> IMPACT</span> : </h3>
            <div className="user-total-impact-data">
            <p>Collecting frequency: {store.total_days}</p>
            <p>Total collecting time <strong>{store.total_time}</strong> with amount of <strong>{store.total_liters}</strong> liters</p>
            <p>Average time <strong>{store.average_time}</strong> and <strong>{store.average_liters}</strong> liters per session</p>
            </div>
        </div>
        
     );
}; 