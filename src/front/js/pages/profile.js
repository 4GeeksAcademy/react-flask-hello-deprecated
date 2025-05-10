import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import { Link } from "react-router-dom";
import logo from "../../img/logo-sin-fondo.jpg"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';



export const Profile = () => {
  const [selected, setSelected] = useState("");
  const[date,setDate] = useState(new Date());

    return(
      <div className="parent mx-5 ">
        <div className="calendar">
        <h1 className='text-center'>Calendar</h1>
      <div className='calendar-container'>
        <Calendar onChange={setDate} value={date} />
      </div>
      <p className='text-center'>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p>
        </div>
        <div className="container mt-5 " style={{ justifyContent: "center", alignItems: 'center', textAlign:"center", width: "80rem" }}>
          
          <h4> Welcome back </h4>
          <p> here goes the avatar </p>
          <img src={ logo } alt="Logo sin fondo"/>
          
          <h1> <b>How are you feeling today?</b></h1>

          <div className="btn-group mt-3" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" className="btn-check" name="btnradio" id="muybien" autoComplete="off" onChange={() => setSelected("muybien")}/>
          <label className={`btn ${selected === "muybien" ? "btn-primary":"btn-outline-primary"}`} htmlFor="muybien">🤩</label>

          <input type="radio" className="btn-check" name="btnradio" id="bien" autoComplete="off" onChange={() => setSelected("bien")}/>
          <label className={`btn ${selected === "bien" ? "btn-primary":"btn-outline-primary"}`} htmlFor="bien">😄 </label>

          <input type="radio" className="btn-check" name="btnradio" id="enamorado" autoComplete="off" onChange={() => setSelected("enamorado")}/>
          <label className={`btn ${selected==="enamorado" ? "btn-primary" : "btn-outline-primary"}`} htmlFor="enamorado">🥰</label>

          <input type="radio" className="btn-check" name="btnradio" id="regular" autoComplete="off" onChange={() => setSelected("regular")}/>
          <label className={`btn ${selected==="regular" ? "btn-primary" : "btn-outline-primary"}`} htmlFor="regular">😑</label>

          <input type="radio" className="btn-check" name="btnradio" id="mal" autoComplete="off" onChange={() => setSelected("mal")}/>
          <label className={`btn ${selected==="mal" ? "btn-primary" : "btn-outline-primary"}`} htmlFor="mal">😞</label>

          <input type="radio" className="btn-check" name="btnradio" id="enfadado" autoComplete="off" onChange={() => setSelected("enfadado")}/>
          <label className={`btn ${selected==="enfadado" ? "btn-primary" : "btn-outline-primary"}`} htmlFor="enfadado">😡</label>

          <input type="radio" className="btn-check" name="btnradio" id="triste" autoComplete="off" onChange={() => setSelected("triste")}/>
          <label className={`btn ${selected==="triste" ? "btn-primary" : "btn-outline-primary"}`} htmlFor="triste">😭</label>
          </div>
           <div className= "container mt-3" >
              <button> Check my progress </button>
           </div>  

        </div>  

          <div className="pomodoro container">
          <div className="card text-center">
            <div className="card-header">
             <h5 className="card-title"> Pomodoro </h5>
            </div>
            <div className="card-body">
              <h2 className="counter"><b>00:00</b></h2>
              <div className="btn-group-vertical" role="group" aria-label="Vertical radio toggle button group">
              <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio1" autoComplete="off" />
              <label className="btn btn-outline-danger" htmlFor="vbtn-radio1">▷ </label>
              <br></br>
              <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio2" autoComplete="off"/>
              <label className="btn btn-outline-danger" htmlFor="vbtn-radio2">||</label>
              <br></br>
              <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio3" autoComplete="off"/>
              <label className="btn btn-outline-danger" htmlFor="vbtn-radio3">↺</label>
            </div>
              {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a> */}
              
            </div>
            <div className="card-footer text-body-secondary">
              Timer
            </div>
          </div>
       </div>
        </div>
      )

}