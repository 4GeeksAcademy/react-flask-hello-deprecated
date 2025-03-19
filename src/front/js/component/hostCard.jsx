import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from 'react-router-dom';
import { LogoutButton } from './logout.jsx';

export const HostCard = ({ viewMode }) => {  // Cambié 'use' por 'viewMode'
    console.log("HostCard viewMode:", viewMode);
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [hostData, setHostData] = useState({
        name: store.host_info?.name || '',
        address: store.host_info?.address || '',
        phone: store.host_info?.phone || '',
        court_type: store.host_info?.court_type || '',
        image: store.host_info?.image || '',
    });

    const handleChange = e => {
        setHostData({
            ...hostData,
            [e.target.name]: e.target.value
        });
    };

    // Función para ejecutar la entrada del acrhivo
    const handleFileChange = e => {
        const file = e.target.files[0];
        if (file) {
            uploadImageToCloudinary(file);
        }
    };

    // Función para cargar la imagen a Cloudinary
    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'my_upload_preset');

        const response = await fetch("https://api.cloudinary.com/v1_1/dpo6yzyaz/image/upload", {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (data.secure_url) {
            setHostData({
                ...hostData,
                image: data.secure_url,  // Aquí guardamos la URL de la imagen
            });
            console.log("Imagen cargada correctamente:", data.secure_url);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submit data:", hostData, "viewMode:", viewMode);

        if (viewMode === 'host') {
            await actions.hostPage(hostData);
        } else {
            await actions.updateHost(hostData);
        }

        navigate('/host/profile');
    };

    const handleCancel = () => {
        navigate('/host/profile');
    };

    return (
        <>
            {viewMode === 'hostPage' ? (

                <div className="d-flex justify-content-center bg-light">
                    <div className="card shadow-lg border-0 rounded-4 w-50 h-50 overflow-auto p-4 m-5">
                        <div className="card-body text-center">
                            <div className="mb-3">
                                <img
                                    src={hostData.image}
                                    alt="Profile-img"
                                    className="rounded-circle border border-3"
                                    style={{ width: "200px", height: "200px", objectFit: "cover" }}
                                />
                            </div>
                            <h4 className="card-title text-uppercase fw-bold">{hostData.name || 'Nombre del Club'}</h4>
                            <p className="card-text"><b>Dirección Postal:</b> {hostData.address || 'No especificada'}</p>
                            <p className="card-text"><b>Teléfono:</b> {hostData.phone || 'No disponible'}</p>
                            <p className="card-text"><b>Tipo de Club:</b> {hostData.court_type || 'No definido'}</p>
                            <div className="text-center d-flex justify-content-evenly">
                                <Link to="/host/edit-profile">
                                    <button type="button" className="btn btn-primary rounded-pill shadow-sm">Editar Perfil</button>
                                </Link>
                                <LogoutButton />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center bg-light">
                    <div
                        className="card mt-5 shadow-lg border-0 rounded-4 w-50 h-50 overflow-auto"
                    >
                        <div className="card-body">
                            <h4 className="card-title text-center text-uppercase fw-bold mb-4">Editar Perfil</h4>

                            <form onSubmit={handleSubmit}>
                                {/* Nombre */}
                                <div className="m-3">
                                    <label className="mb-1" htmlFor="name">
                                        <b>Nombre</b>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Nombre"
                                        value={hostData.name}
                                        onChange={handleChange}
                                        required
                                        className="form-control shadow-sm border-0 rounded-3"
                                    />
                                </div>

                                {/* Dirección */}
                                <div className="m-3">
                                    <label className="mb-1" htmlFor="address">
                                        <b>Dirección</b>
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        placeholder="Dirección"
                                        value={hostData.address}
                                        onChange={handleChange}
                                        required
                                        className="form-control shadow-sm border-0 rounded-3"
                                    />
                                </div>

                                {/* Teléfono */}
                                <div className="m-3">
                                    <label className="mb-1" htmlFor="phone">
                                        <b>Teléfono</b>
                                    </label>
                                    <input
                                        type="number"
                                        id="phone"
                                        name="phone"
                                        placeholder="Teléfono"
                                        value={hostData.phone}
                                        onChange={handleChange}
                                        required
                                        className="form-control shadow-sm border-0 rounded-3"
                                    />
                                </div>

                                {/* Tipo de cancha */}
                                <div className="m-3">
                                    <label className="mb-1" htmlFor="court_type">
                                        <b>Tipo de cancha</b>
                                    </label>
                                    <select
                                        id="court_type"
                                        name="court_type"
                                        value={hostData.court_type}
                                        onChange={handleChange}
                                        required
                                        className="form-control shadow-sm border-0 rounded-3"
                                    >
                                        <option value="">Selecciona un tipo de cancha</option>
                                        <option value="Indoor">Indoor</option>
                                        <option value="Outdoor">Outdoor</option>
                                    </select>
                                </div>

                                {/* Image */}
                                <div className="m-3">
                                    <label className="mb-1" htmlFor="court_type">Imagen JPG</label>
                                    <div className="form-control shadow-sm border-0 rounded-3">
                                        <input type="file" className="form-control" id="image" name="image" placeholder="Enter image JPG format" onChange={handleFileChange} />
                                    </div>
                                </div>

                                {/* Botones */}
                                <div className="d-flex justify-content-center mt-4">
                                    <input
                                        type="submit"
                                        value="Guardar Cambios"
                                        className="btn btn-primary m-2 px-4 py-2 rounded-3 shadow-sm transition-all hover:scale-105"
                                    />
                                    <button
                                        className="btn btn-danger m-2 px-4 py-2 rounded-3 shadow-sm transition-all hover:scale-105"
                                        value="Cancelar"
                                        onClick={handleCancel}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


            )}
        </>
    );
};




