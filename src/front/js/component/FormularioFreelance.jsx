import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';


const DEFAULT_IMAGE_URL = "https://res.cloudinary.com/dph121s7p/image/upload/v1746471079/image_profile_placceholder_dfzbln.jpg";
const FormularioFreelance = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [user, setUser]= useState(store.userProfile);
     const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
   
    if (!user) return <p>Cargando datos del usuario...</p>;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value }); 
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file){
            setPhotoFile(file); 
            setPhotoPreview(URL.createObjectURL(file));

        }
 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("name", user.name);
        formData.append("last_name", user.last_name);
        formData.append("phone", user.phone);
        formData.append("address", user.address);
        formData.append("email", user.email);
        
        if (photoFile) {
            formData.append("photo_profile", photoFile);
   
        }
        await actions.updateFreelanceProfile(formData);
        navigate(-1);
    };

    return (
        <div className=" d-flex flex-column align-items-center vh-100 m-5">
            <div className="w-50 p-4 border rounded shadow" style={{ background: "aliceblue" }} >
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center mb-4">Edita los datos de tu Perfil</h2>
                    <div className="mb-3">
                        <img src={photoPreview || user.img_url || DEFAULT_IMAGE_URL} 
                        alt="Imagen de perfil" 
                        className="rounded-circle mb-3" 
                        style={{ width: "100px", height: "100px", objectFit: "cover" }} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPhoto" className="form-label">Foto de perfil</label>
                        <input
                            id="inputPhoto"
                            name="photo"
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <small className="form-text text-muted">Sube una imagen de perfil (opcional)</small>
                    </div>


                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            value={user.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputLastName" className="form-label">Apellido</label>
                        <input
                            id="inputLastName"
                            name="last_name"
                            type="text"
                            className="form-control"
                            placeholder="Apellido"
                            value={user.last_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPhone" className="form-label">Teléfono</label>
                        <input
                            id="inputPhone"
                            name="phone"
                            type="number"
                            className="form-control"
                            placeholder="Ingresa tu teléfono"
                            value={user.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputAddress" className="form-label">Dirección</label>
                        <input
                            id="inputAddress"
                            name="address"
                            type="text"
                            className="form-control"
                            placeholder="Ingresa tu dirección"
                            value={user.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Correo electrónico</label>
                        <input
                            id="inputEmail"
                            name="email"
                            type="email"
                            className="form-control"
                            aria-describedby="emailHelp"
                            placeholder="Email"
                            value={user.email}
                            onChange={handleChange}
                        />
                        
                    </div>
                    <button type="submit" className="btn" id="registro" style={{ background: "#00D1B2", color: "aliceblue" }}>
                        Guardar
                    </button>
                    
                        <button type="button" className="btn ms-2" id="cancelar" style={{ background: "#FF3860", color: "aliceblue" }} onClick={() => navigate(-1)}>
                            Cancelar
                        </button>
                    
                </form>
            </div>
        </div>
    );
};

export default FormularioFreelance