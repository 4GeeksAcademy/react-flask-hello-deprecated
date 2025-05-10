import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import CommentSection from "../component/CommentSection.jsx";


export const FreelancePerfil = () => {
    const { store, actions } = useContext(Context);
    const { freelance_id } = useParams();
    const [data, setData] = useState({});
    const [servicesByCategory, setServicesByCategory] = useState({});
    const navigate = useNavigate();
    const defaultFavoriteStatus = false

    let [isInFavorites, setIsInFavorites] = useState(false)



    const categories = {
        basic: "Básico",
        pro: "Pro",
        enterprise: "Empresarial",
    };

    useEffect(() => {
        actions.getMyFreelanceProfile(freelance_id)
            .then((data) => {

                if (data?.result?.services) {
                    const grouped = {
                        basic: [],
                        pro: [],
                        enterprise: [],
                    };

                    data.result.services.forEach((service) => {
                        if (grouped[service.category]) {
                            grouped[service.category].push(service);
                        }
                    });

                    setData(data.result);
                    setServicesByCategory(grouped);
                }
            })
            .catch((err) => {
                console.error("Error al cargar el perfil freelance:", err);
                alert("Hubo un problema al cargar el perfil. Por favor, inténtalo de nuevo.");
            });

        if (store) {
    
        }
    }, [freelance_id]);

    useEffect(() => {

        actions.checkFavorite({ favorite_id: freelance_id })
            .then((res) => { setIsInFavorites(res.result) }).catch((err) => { console.log(err) })
    }, [])


    const handleFavorite =  () => {

        actions.addOrRemoveFavorite({
            favorite_id: freelance_id,
            favorite_status: isInFavorites
        }).then((res)=>{
            setIsInFavorites(res.result)}).catch((e)=>{console.log("error",e)})
    }
    return (
        <div className="container my-5" style={{ alignItems: "center" }}>
            <div className="card mb-3 shadow-sm" style={{ maxWidth: "800px" }}>
                <div className="row no-gutters g-0 align-items-center">
                    <div className="col-auto p-3">
                        <img
                            src={rigoImageUrl}
                            alt={`Imagen de ${data.name || "freelancer"}`}
                            className="rounded-circle"
                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                        />
                    </div>
                    <div className="col">
                        <div className="card-body">


                            <h2 className="card-title mb-1">{data?.service_title || "Profesión no especificada"}</h2>
                            <h4 className="card-title mb-1">{data?.name}</h4>
                            <p>{data?.profile_description || "Este usuario aún no ha completado su perfil profesional."}</p>
                           
                            
                            {userRole === "user" ? (
                                <div>
                                    {/* <i className="fa-regular fa-heart"></i>
                                    <span> Favorite</span> */}
                                    <button onClick={handleFavorite} className="btn btn-primary">
                                        {
                                            isInFavorites ?
                                                <>
                                                    <i className="fa-solid fa-heart"></i>
                                                    <span> Esta en favoritos</span>
                                                </>
                                                :
                                                <>
                                                    <i className="fa-regular fa-heart"></i>
                                                    <span> No esta en favoritos</span>
                                                </>
                                        }
                                    </button>
                                </div>
                            ) : null}

                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-5">
                <ul className="nav nav-tabs mb-3" id="pricingTab" role="tablist">
                    {Object.entries(categories).map(([key, label], index) => (
                        <li className="nav-item" role="presentation" key={key}>
                            <button
                                className={`nav-link ${index === 0 ? "active" : ""}`}
                                id={`${key}-tab`}
                                data-bs-toggle="tab"
                                data-bs-target={`#${key}`}
                                type="button"
                                role="tab"

                            >
                                {label}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="tab-content" id="pricingTabContent">
                    {Object.entries(categories).map(([key, label], index) => (
                        <div
                            key={key}
                            className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
                            id={key}
                            role="tabpanel"
                        >
                            {servicesByCategory[key]?.length > 0 ? (
                                servicesByCategory[key].map((service) => (
                                    <div key={service.id} className="card p-4 shadow-sm mb-3">
                                        <h5>{service.title}</h5>
                                        <h6>${service.price}</h6>
                                        <p>{service.description}</p>
                                        {service.img_url && (
                                            <img
                                                src={service.img_url}
                                                alt={`Vista de ${service.title}`}
                                                className="img-thumbnail mb-3"
                                                style={{ maxHeight: "150px" }}
                                            />
                                        )}
                                        <button
                                            onClick={() => {
                                                if (service.id) {
                                                    navigate(`/detallado-de-orden?service=${service.id}`);
                                                } else {
                                                    console.error("El ID del servicio no está definido.");
                                                }
                                            }}
                                            type="button"
                                            className="btn btn-sm btn-comprar-paquete"
                                            style={{ background: "#00D1B2", color: "aliceblue", width: "150px" }}
                                        >
                                            Comprar paquete
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted">No hay servicios en esta categoría.</p>
                            )}
                        </div>
                    ))}
                </div>

            </div>
     

            {/* aqui ponlo */}
            <CommentSection freelance_id={freelance_id}/>

        </div>
    );
};

export default FreelancePerfil;