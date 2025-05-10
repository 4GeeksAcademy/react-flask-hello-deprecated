import React, { useState, useEffect } from "react";

export const GeneralBalance = (props) => {
  
  const [showBalance, setShowBalance] = useState(true)
  
      const toggleBalance = () => {
          let toggle = !showBalance
          setShowBalance(toggle);
          console.log(toggle);
  
      }


  return (
    <div className="d-flex ">
      <h1 className="text-2xl font-bold">{showBalance ? props.balance : "****"} euros</h1>
    {showBalance ? <i className="bi bi-eye-fill" onClick={toggleBalance}></i> : <i className="bi bi-eye-slash-fill" onClick={toggleBalance}></i>}
</div>
   
  );
};
