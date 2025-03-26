import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { postProduct } from "../apiservices/callToApi";

export const ProductInfoTv = () => {

    const [tv, setTv] = useState([]);
    const { tv_id } = useParams();
    const [userId, setUserId] = useState(sessionStorage.getItem("idUser"));
    const [buttonText, setButtonText] = useState("Añadir al carrito");
    const [buttonClass, setButtonClass] = useState("btn-add-cart texto");

    const precio = parseInt(tv.precio);
    const totalPrecioEur = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(precio);

    const getTvById = async () => {
        const urlBackend = process.env.BACKEND_URL;
        try {
            const response = await fetch(urlBackend + "tv/" + tv_id);
            const data = await response.json();
            setTv(data);
        } catch (error) {
            console.error("Error getting ID TVs from API");
        }
    };

    const imagenTv1 = tv?.imagen?.[0];
    const imagenTv2 = tv?.imagen?.[1];

    useEffect(() => {
        getTvById();
    }, [tv_id]);

    const handleAddToCart = async () => {

        await postProduct(userId,{"modelo": tv.modelo, "descripcion": tv.descripcion, "cantidad" : 1, "precio": tv.precio, "imagen": imagenTv1, "color": "no"})
        
        setButtonText("✓ Producto añadido!");
        setButtonClass("btn-add-cart texto added shake");

        setTimeout(() => {
            setButtonText("Añadir al carrito");
            setButtonClass("btn-add-cart texto");
        }, 1500);
    };

    return (
        <div className="container">
            <div className="row col-md-12">
                <div id="phoneCarousel" className="carousel slide col-md-6 container-individual-card" data-bs-ride="carousel">
                    <div className="carousel-inner w-100 h-100">
                        <div className="carousel-item active w-100 h-100">
                            <div className="container-img-individual">
                                <img src={imagenTv1} alt="Cargando Fotografía..." />
                            </div>
                        </div>
                        <div className="carousel-item w-100 h-100">
                            <div className="container-img-individual">
                                <img src={imagenTv2} alt="Cargando Fotografía..." />
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#phoneCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon bg-dark rounded-circle me-5" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#phoneCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon bg-dark rounded-circle ms-5" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div className="col-md-6 text-black mb-5">
                    <div className="card-body-individual">
                        <h5 className="card-title titulo mb-3">{tv?.modelo}</h5>
                        <p className="card-text-score"></p>
                        <p className="card-text-price titulo">
                            <small className="text-black">{totalPrecioEur}</small>
                        </p>
                        <p className="card-text">
                            {/* <button className="btn-add-cart texto" onClick={() => postProduct(tv.tv_id, userId, "tv")}>
                                <i className="fa-solid fa-cart-plus mb-1"></i> Añadir al carrito
                            </button> */}
                            <button className={`${buttonClass}`} onClick={handleAddToCart}>
                                <i className="fa-solid fa-cart-plus mb-1"></i> {buttonText}
                            </button>
                        </p>
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTop" aria-expanded="false" aria-controls="collapseTop">
                                        <strong className="texto">Descripción</strong>
                                    </button>
                                </h2>
                                <div id="collapseTop" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p className="texto">{tv?.descripcion}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        <strong className="texto">Marca</strong>
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p className="texto">{tv?.marca}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                        <strong className="texto">Pantalla</strong>
                                    </button>
                                </h2>
                                <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p className="texto">{tv?.pantalla}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        <strong className="texto">Medidas</strong>
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p className="texto">{tv?.medidas}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                        <strong className="texto">Usos Recomendados</strong>
                                    </button>
                                </h2>
                                <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p className="texto">{tv?.usos_recomendados}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                        <strong className="texto">Año Modelo</strong>
                                    </button>
                                </h2>
                                <div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p className="texto">{tv?.año_modelo}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                        <strong className="texto">Conectividad</strong>
                                    </button>
                                </h2>
                                <div id="collapseSeven" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p className="texto">{tv?.conectividad}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                                        <strong className="texto">Contenido De La Caja</strong>
                                    </button>
                                </h2>
                                <div id="collapseEight" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p className="texto">{tv?.contenido_de_la_caja}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                                        <strong className="texto">Usos Recomendados</strong>
                                    </button>
                                </h2>
                                <div id="collapseNine" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p className="texto">{tv?.usos_recomendados}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                                        <strong className="texto">Fabricante</strong>
                                    </button>
                                </h2>
                                <div id="collapseTen" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p className="texto">{tv?.fabricante}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="text-center text-black texto related-products ">Productos relacionados (TVs)</h1>
        </div>
    );
};
