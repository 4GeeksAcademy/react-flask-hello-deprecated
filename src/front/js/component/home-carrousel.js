import React from "react";
import { Link } from "react-router-dom";


export const Welcome = () => {
    return (<>
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner mt-4">
                <div className="carousel-item active mb-3 " data-bs-interval="4000" >
                    <div className="welcome mt-3">
                        <img src="https://i.postimg.cc/8Cx1Z7KK/imagotipo-naranja-2.pnghttps://i.postimg.cc/8Cx1Z7KK/imagotipo-naranja-2.png" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className=" rounded">
                            <a href="#inicio" className="carrousel-button contenedor-flecha text-white">
                                <span className="flecha primero"></span> 
                            </a>
                        </div>
                    </div>
                </div>
                <div className="carousel-item mb-4" data-bs-interval="4000">
                    <Link to="/laptop-info/15">
                        <div className="carousel-image">
                            <img src="https://i.ibb.co/twzbS1dT/Tendencia-Pixelbook.jpg" className="d-block mx-auto" alt="..." />
                        </div>
                    </Link>
                </div>
                <div className="carousel-item mb-4" data-bs-interval="4000">
                    <Link to="/smartphone-info/2">
                        <div className="carousel-image">
                            <img src="https://i.ibb.co/nHxxJn6/Novedad-iphone.jpg" className="d-block mx-auto" alt="..." />
                        </div>
                    </Link>
                </div>
                <div className="carousel-item mb-4">
                    <Link to="/smartphone-info/1">
                        <div className="carousel-image">
                            <img src="https://i.ibb.co/5h2BB0Cy/Oferta-samsung.jpg" className="d-block mx-auto" />
                        </div>
                    </Link>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div >
    </>)
}
