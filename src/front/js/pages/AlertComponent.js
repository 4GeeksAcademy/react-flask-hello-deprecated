import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const AlertComponent = () => {
    const [showAlert, setShowAlert] = useState(false);

    const handleShowAlert = () => {
        setShowAlert(true);
    };

   useEffect(() => {
    handleShowAlert()
      }, []);



    return (
        <div className="container mt-4">
          
            {showAlert && (
                <div className="alert alert-success mt-3" role="alert">
                    <h4 className="alert-heading text-center mt-2"><strong>¡Pedido confirmado!</strong></h4>
                    <p className='mt-3'>Aww yeah..! Tu pedido se ha realizado correctamente. En unos minutos recibirás la confirmación en tu correo electrónico.</p>
                    <p className="mb-0">Si necesitas cancelar algún producto o realizar cualquier modificación, ponte en contacto con nosotros a través del formulario de contacto.</p>
                    <hr/>
                    <Link className="text-center" to="/">
                    <p><strong>Volver a la página principal</strong></p>
                    </Link>
                </div>
            )}
          
        </div>
    );
};

export default AlertComponent;