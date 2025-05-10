import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import NavbarLateral from "../component/NavbarLateral.jsx";

const FreelanceDescription = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        service_title: '',
        service_description: '',
        profile_description: '',

    });

    useEffect(() => {
        if (!store.userProfile) {
            actions.getMyProfile(); // Obtiene el perfil si no está disponible
        } else {

            setFormData({
                service_title: store.userProfile.service_title || "",
                service_description: store.userProfile.service_description || "",
                profile_description: store.userProfile.profile_description || "",
            });
        }
    }, [actions, store.userProfile]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
            data.append("service_title" ,formData.service_title);
            data.append("service_description", formData.service_description);
            data.append("profile_description", formData.profile_description);
            
        };
   





    return (
        <div className="d-flex">
            <div>

                <NavbarLateral />
            </div>

            <div className=" flex-grow-1 p-4 align-items-center" >
                <div className="user-card d-flex flex-column p-1 w-50 align-items-center border-rounded">
                    <h3 className="m-3" >¡Estás a pocos pasos de conseguir el trabajo de tus sueños!</h3>
                </div>
                <h5>Completa la siguiente información para comenzar a ofrecer tus servicios.</h5>
                <h5 className="card-title text-left">
                    <span className="badge me-2" style={{ background: "#FF6B6B" }}>1</span>
                    Paso:  Completa tu perfil
                </h5>
                <div className="user-card d-flex my-3 p-3 w-50 border-rounded">

                    <p>Usa un título breve y directo para indicar tu profesión u oficio, y luego cuéntanos más sobre tu experiencia, habilidades, logros o el tipo de servicios que ofreces. Recuerda que este perfil será tu carta de presentación, así que sé auténtico, profesional y enfócate en lo que te hace destacar.</p>

                </div>

                <div className="card w-50 border rounded rounded shadow mb-4 " style={{ background: "aliceblue" }} >

                    <div className="card-header" style={{ background: "#1E266D", color: "#ffffff", fontSize: "1.5rem" }}>
                        Perfil Profesional
                    </div>
                    <div className="card-body">
                        <p>Usa un título claro y directo que describa tu profesión u oficio. Este título será visible para quienes busquen tus servicios, por lo que debe ser específico y representativo.</p>
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating m-3">
                                <textarea className="form-control" placeholder="Profesion u oficio" id="service_title" name="service_title" value={formData.service_title}

                                    onChange={handleChange} ></textarea>
                                <label htmlFor="service_title">Profesión u oficio</label>
                            </div>
                            <p>Redacta una descripción concisa que resuma los servicios que ofreces. Esta descripción ayudará a los usuarios a entender rápidamente en qué consisten tus servicios.</p>
                            <div className="form-floating m-3">
                                <textarea className="form-control" placeholder="Leave a comment here" id="service_description" name="service_description" value={formData.service_description}

                                    onChange={handleChange}></textarea>
                                <label htmlFor="service_description">Descripción</label>
                            </div>
                            <p>Proporciona una descripción detallada de tu experiencia, habilidades y enfoque profesional. Incluye información relevante como años de experiencia, metodologías de trabajo y cualquier otro detalle que consideres importante para destacar tus servicios.</p>
                            <div className="form-floating m-3">
                                <textarea className="form-control" placeholder="Leave a comment here" id="profile_description" name="profile_description" value={formData.profile_description}

                                    onChange={handleChange}></textarea>
                                <label htmlFor="profile_description">Descripción detallada de tu perfil profesional</label>
                            </div>
                            
                        </form>
                    </div>

                </div>
                <Link to="/freeConfig">
                    <button type="button" className="btn ms-2" id="cancelar" style={{ background: "#1e266d", color: "aliceblue" }} >Siguiente</button>
                </Link>
                <Link to="/freelanceDashboard">
                    <button type="button" className="btn ms-2" id="cancelar" style={{ background: "#FF6B6B", color: "aliceblue" }} >Cancelar</button>
                </Link>
            </div>
        </div >
    );
};

export default FreelanceDescription;

