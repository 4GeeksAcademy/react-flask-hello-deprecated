import jose from "../../img/jose.jpg"
import david from "../../img/david.jpg"
import einar from "../../img/einar.webp"
import dorian from "../../img/dorian.png"
import React from "react";

export const AboutUs = () => {
  return (
    <div className="card-container">
      <h1 className="developer">DEVELOPER TEAM</h1>
      <div className="card">
        <img className="card-img" src={dorian} alt="Placeholder" />
        <div className="card-content">
          <h3 className="card-title">Dorian Z.</h3>
          <p>Software Developer</p>
          <p className="card-description">
          "A veces desorganizado, a veces un desatre! Pero eso no me quita lo guapo"
          </p>
          <a href="https://linkedin.com/in/dorian-zuluaga-08132075">
          <button className="card-button">About me</button> 
          </a>
        </div>
      </div>

      <div className="card">
        <img className="card-img" src={einar} alt="Placeholder" />
        <div className="card-content">
          <h3 className="card-title">Einar F.</h3>
          <p>Software Developer</p>
          <p className="card-description">
          "A veces el rey de la concentración, y otras veces el emperador de la distracción"
          </p>
          <a href="https://www.linkedin.com/in/dorian-zuluaga-14873b251/">
          <button className="card-button">About me</button> 
          </a>
        </div>
      </div>

      <div className="card">
        <img className="card-img" src={david} alt="Placeholder" />
        <div className="card-content">
          <h3 className="card-title">David G.</h3>
          <p>Software Developer</p>
          <p className="card-description">
          "A veces la persona más puntual del mundo, y otras veces el rey del "llego en 5 minutos!"
          </p>
          <a href="https://www.linkedin.com/in/dorian-zuluaga-14873b251/">
          <button className="card-button">About me</button> 
          </a>
        </div>
      </div>

      <div className="card">
        <img className="card-img" src={jose} alt="Placeholder" />
        <div className="card-content">
          <h3 className="card-title">Jose </h3>
          <p>Software Developer</p>
          <p className="card-description">
          "A veces soy un ninja de la programación, y otras veces un atleta de la procrastinación!"
          </p>
          <a href="https://www.linkedin.com/in/jose-martin-perez-29b188139">
          <button className="card-button">About me</button> 
          </a>
        </div>
      </div>
    </div>

    
  );
}