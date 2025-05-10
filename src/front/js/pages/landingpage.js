import React from "react";
import "../../styles/landingpage.css";
import { Footer } from "../component/footer";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import logo from "../../img/logo-ampliado.jpg"

const LandingPage = () => {
  return (
    <div className="landing-page">
      <main className="main-section">
        <div className="hero-content">
          <h3 className="logo-title">ONMi</h3>
          <p className="tagline">
          "Organize your life, develop lasting habits, keep track of your purposes and goals"
          </p>
          <Link to="/register">
          <button className="register-button">Register Now</button>
         </Link>
        </div>
        <div className="app-mockup">
          <div className="outer-frame">
            <div className="computer-frame">
              <div className="mockup-device">
                <div className="app-interface">
                  <div className="app-header">
                    <div className="app-logo">
                      <img src={logo} alt="ONMi Logo" />
                      <span>ONMi</span>
                    </div>
                    <div className="app-nav">
                      {['Notas', 'Hábitos - Tracker', 'Proyectos'].map((item, index) => (
                        <span key={index} className={index === 0 ? 'active' : ''}>{item}</span>
                      ))}
                    </div>
                  </div>
                  <div className="app-content">
                    <h2 className="section-title">My Notes</h2>
                    <div className="notes-grid">
                      {Array.from({ length: 6 }, (_, i) => (
                        <div key={i} className="note-card">
                          <div className="note-title">HomeWork#{i + 1}</div>
                          <div className="note-icon">
                            <i className="fas fa-sticky-note"></i>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="add-button">
                      <span>+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;