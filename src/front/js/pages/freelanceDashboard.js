import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import NavbarLateral from "../component/NavbarLateral.jsx";

const FreelanceDashboard = () => {
    const { store, actions } = useContext(Context);

   

    const user = store.userProfile || {};
    if (!user.name) return <p>Cargando datos del usuario...</p>;

    return (
        <div className="d-flex">
            <div>

                <NavbarLateral />
            </div>
            <div className=" flex-grow-1 p-4">

                <h1 className="text-start m-5">¡Buen día  <strong className="text-capitalize" > {user.name} {user.last_name}</strong>!</h1>
                <div className="user-card d-flex my-3 p-3 w-50 border-rounded">

                    <p>
                        En nuestra plataforma, tú eliges <strong>cómo</strong>, <strong>cuándo</strong> y <strong>cuánto</strong> trabajar. Aquí puedes ofrecer tus servicios y conectar con personas que valoran lo que haces. Nuestro compromiso es ayudarte a construir el trabajo de tus sueños, donde tú tienes el control, y tu talento encuentra las oportunidades que merece.</p>

                </div>

                

            </div>
        </div>
    );
};

export default FreelanceDashboard;

