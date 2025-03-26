import React, { useEffect, useState } from 'react';

export const OnFireItem = ({ item, itemName }) => {
  const [imageNumber, setImageNumber] = useState(0);
  const [fade, setFade] = useState(true);

  let image = "";
  const validacionLista = () => {
    if (itemName == "phones" || itemName == "laptops") {
      const color = (item.colores?.[0].toLowerCase())?.replace(/ /g, "_");
      image = item.imagen?.[color];
    } else {
      image = item.imagen;
    }
  }

  validacionLista();

  useEffect(()=>{
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setImageNumber((prev) => (prev === 0 ? 1 : 0));
        setFade(true); 
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  },[])
  

  return (<>
    <div className="content-tendencia">
      <div className="container-image-tendencia">
        <img src={image?.[imageNumber]} className={`card-img ${fade ? "fade-in" : "fade-out"}`} alt="..." />
      </div>
      <span className="ribbon position-absolute top-0 start-0 rounded text-bg-danger">TENDENCIA<span className="visually-hidden">unread messages</span></span>
      <div className="fire-container text-bg-dark text-end p-4">
        <h5 className="card-title">{item.modelo}</h5>
        <p className="card-text"> {item.descripcion}</p>
      </div>
    </div>
  </>)
}