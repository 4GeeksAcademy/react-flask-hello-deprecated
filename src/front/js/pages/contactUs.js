import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const ContactUs = props => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const navigate = useNavigate()

    return (
        <div id="modal" className="contact modal" style={{ display: store.showContactModal ? "block" : "none" }}>
            <div className="abc modal-dialog">

                <div className="modal-content" style={{backgroundColor:"silver", border:"none"}}>
                    <span type="submit" className="close" id="closeModal" onClick={() => actions.setShowContactModal()} style={{height:"5px"}}>&times;</span>
                    <h2 style={{ margin: "auto", marginTop:"0px", color:"#39ff14", backgroundColor:"silver" }}>Contact Us</h2>
                    <form id="contactForm" >
                        <label for="email" style={{}}>Email:</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required style={{marginBottom:"10px", height: "40px", width: "100%", borderRadius: "10px", border:"none" }} />

                        <label for="message">Message:</label>
                        <textarea className="text" id="message" name="message" placeholder="Enter your message" rows="5" required></textarea>

                        <button type="submit" id="submitBtn" style={{backgroundColor:"#39ff14", borderRadius:"5px", height:"38px", width:"90px", border:"1px solid black"}}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
};


