import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Wallet = () => {
    const { store, actions } = useContext(Context);

    return( 
        <div>wallet</div>
    )

}