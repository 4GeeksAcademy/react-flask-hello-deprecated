import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
export const SubmitButton = () => {

    const { store, actions } = useContext(Context)
    const [active, setActive] = useState(true)
    const [pending, setPending] = useState(false);
  

    const handleSubmit = async () => {

        try {
            setPending(true);
            if (store.start_time && store.finish_time &&  store.location && store.liters){
                actions.submit_manual_data();
            } else { 
                await actions.submitData();
            }
            
           
        } catch (error) {
            console.error("An error occurred while submitting data: ", error);
        } finally {
            setPending(false);
        }
    };

    return (
        <button type="button" className="counter-submit-button btn btn-info btn-sm me-2" disabled={!active} onClick={handleSubmit}>
            Submit tracking
        </button>
    );
   
}; 
