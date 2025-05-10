import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const ForgoPassword = () => {
  // const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid mx-auto w-50 marginlogintop justify-content-center">

      <form>
        <div className="mb-3">
          <div className="d-flex justify-content-center mb-4 fs-1 textcolors">Reset Password</div>
          <div className="mb-3 border border-3 bordercolor rounded p-3 w-75 marginresetleft">
            <label for="exampleInputEmail1" className="form-label mb-2 mt-2 ">Email</label>
            <input type="email" placeholder="Enter your email to find your account" className="form-control bordercolor border border-2 mb-3" aria-describedby="emailHelp" /> 
            <div className="d-flex justify-content-center">          
              <button type="button" className="btn btn-light mb-5 w-30 border border rounded p-1 mb-1">Cancel</button>
              <button type="submit" className="backbutton border border rounded p-1 h-100 ms-3 text-white">Reset Password</button>
              </div> 
          </div>
        </div>
      </form >

    </div>
  );
};
