import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { ProductColors } from "../component/product-colors";
import { useParams } from "react-router-dom";
import { postProduct } from "../apiservices/callToApi";

export const ProductInfoLaptop = ({ }) => {

    const [activeColor, setActiveColor] = useState(0)
    const [laptop, setLaptop] = useState([]);
    const { laptop_id } = useParams();
    const [userId, setUserId] = useState(sessionStorage.getItem("idUser"))

    let image
    const precio = parseInt(laptop.precio);

    const totalPrecioEur = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(precio);

    const getLaptopById = async () => {
        const urlBackend = process.env.BACKEND_URL
        try {
            const response = await fetch(urlBackend + "laptop/" + laptop_id);

            const data = await response.json();

            setLaptop(data);
        } catch (error) {
            console.error("Error getting ID TVs from API");
        }
    };

    const imageValidation = (number) => {

        const color = (laptop.colores?.[number].toLowerCase())?.replace(/ /g, "_")

        image = laptop.imagen?.[color]
    }

    imageValidation(activeColor)

    useEffect(() => {

        getLaptopById()

    }, []);

    return (
        <div className="container">
            <div className="row col-md-12">
                <div id="phoneCarousel" className="carousel slide col-md-6 card-individual-laptop-image" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="d-flex justify-content-center mb-5">
                                <img className="col-md-12" src={image?.[0]} alt="Slide 1" />
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="d-flex justify-content-center mb-5">
                                <img className="col-md-12" src={image?.[1]} alt="Slide 2" />
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#phoneCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#phoneCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div className="col-md-6 text-black mb-5">
                    <div className="card-body-individual">
                        <h5 className="card-title titulo mb-3">{laptop?.modelo}</h5>
                        <p className="card-text-score"></p>
                        <p className="card-text-price titulo">
                            <small className="text-black">{totalPrecioEur}</small>
                        </p>
                        <p className="card-text">
                            <button className="btn-add-cart texto" onClick={()=>postProduct(laptop.laptop_id,userId,"laptop")}>
                                <i className="fa-solid fa-cart-plus mb-1"></i> Añadir al carrito
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
                                        <p className="texto">{laptop?.descripcion}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                        <strong className="texto">Colores</strong>
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="row ms-2">
                                            {laptop.colores?.map((color, index) => {

                                                let litImage = ""
                                                const getProductPhoto = () => {
                                                    const color = (laptop.colores?.[index].toLowerCase())?.replace(/ /g, "_")

                                                    litImage = laptop.imagen?.[color]
                                                }

                                                getProductPhoto()

                                                return (
                                                    <div onClick={() => imageValidation(index)} className="col-md-4 d-flex flex-column align-items-center">
                                                        <h6 className="title-color ms-4 texto">{color}</h6>
                                                        <ProductColors src={litImage[0]} />
                                                    </div>

                                                )

                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwelve" aria-expanded="false" aria-controls="collapseTwelve">
                                        <strong className="texto">Marca</strong>
                                    </button>
                                </h2>
                                <div id="collapseTwelve" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p className="texto">{laptop?.marca}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        <strong className="texto">Cámara</strong>
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p className="texto">{laptop?.camara}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        <strong className="texto">Almacenamiento</strong>
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p className="texto">{laptop?.almacenamiento}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                        <strong className="texto">Memoria RAM</strong>
                                    </button>
                                </h2>
                                <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p className="texto">{laptop?.memoria_ram}</p>
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
                                        <p className="texto">{laptop?.pantalla}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                        <strong className="texto">Batería</strong>
                                    </button>
                                </h2>
                                <div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p className="texto">{laptop?.bateria}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                        <strong className="texto">Procesador</strong>
                                    </button>
                                </h2>
                                <div id="collapseSeven" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p className="texto">{laptop?.procesador}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                                        <strong className="texto">Descripción Tarjeta Gráfica</strong>
                                    </button>
                                </h2>
                                <div id="collapseEight" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p className="texto">{laptop?.descripcion_tarjeta_grafica}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                                        <strong className="texto">Sistema Operativo</strong>
                                    </button>
                                </h2>
                                <div id="collapseNine" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p className="texto">{laptop?.sistema_operativo}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                                        <strong className="texto">Modelo CPU</strong>
                                    </button>
                                </h2>
                                <div id="collapseTen" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p className="texto">{laptop?.modelo_cpu}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven">
                                        <strong className="texto">Tecnología</strong>
                                    </button>
                                </h2>
                                <div id="collapseEleven" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p className="texto">{laptop?.tecnologia}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThirteen" aria-expanded="false" aria-controls="collapseThirteen">
                                        <strong className="texto">Función Especial</strong>
                                    </button>
                                </h2>
                                <div id="collapseThirteen" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p className="texto">{laptop?.funcion_especial}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="text-center text-black texto related-products">Productos relacionados (Portátiles)</h1>
        </div>
    );
};
