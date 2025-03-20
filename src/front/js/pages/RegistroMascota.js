import React, { useState, useContext } from "react";
import "../../styles/registroMascota.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const RegistroMascota = () => {

    const { actions, store} = useContext (Context)
    const navigate = useNavigate();

    const [newPet, setNewPet] = useState({
        name: "",
        animal_type: "",
        breed:"",
        size: "",
        age: "",
        pathologies: "",
        url:""
    });

    const [photoPet, setPhotoPet] = useState(null);


    //setear datos mascota formulario
  
    const handleChange = (e) => {
        setNewPet({
            ...newPet,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newPet);
    
        try {
            // Llamar función para crear la mascota
            const response = await actions.createPet(newPet);
            console.log(response);
            
            // Verificar si la respuesta indica que la mascota fue creada exitosamente
            if (response.success) {
            // Redirige al perfil de usuario
                navigate('/perfilUsuario');
            } else {
            
                console.error('Error al crear la mascota:', response.message);
                alert('No se pudo crear la mascota. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error en la creación de la mascota:', error);
            alert('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.');
        }
    };




    //cargar foto formulario
    const handleFileChange = (e) => {
        setPhotoPet(e.target.files[0]);
    };
    

    return (
        <div className="container mt-5">
            <h2>Registro de Mascota</h2>
            <div className="d-flex">
                <form onSubmit={handleSubmit} className="flex-grow-1">
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre de la mascota</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            name="name"
                            value={newPet.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="especie" className="form-label">Especie</label>
                        <select
                            className="form-select"
                            id="especie"
                            name="animal_type"
                            value={newPet.animal_type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona una especie</option>
                            <option value="perro">Canina</option>
                            <option value="gato">Felina</option>
                            <option value="exotico">Exótico</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="raza" className="form-label">Raza</label>
                        <input
                            type="text"
                            className="form-control"
                            id="raza"
                            name="breed"
                            value={newPet.breed}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tamaño" className="form-label">Tamaño</label>
                        <select
                            className="form-select"
                            id="tamaño"
                            name="size"
                            value={newPet.size}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="pequeña">Pequeño (0-10kg)</option>
                            <option value="medio">Mediano (10-25kg)</option>
                            <option value="grande">Grande (+25Kg)</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="etapaVital" className="form-label">Etapa Vital</label>
                        <select
                            className="form-select"
                            id="etapaVital"
                            name="age"
                            value={newPet.age}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="cachorro">Cachorro (0-1 año)</option>
                            <option value="adulto">Adulto (1-7 años)</option>
                            <option value="senior">Senior (+7 años)</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="patologia" className="form-label">Patología</label>
                        <select
                            className="form-select"
                            id="patologia"
                            name="pathologies"
                            value={newPet.pathologies}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="ninguna">Sin Patologías</option>
                            <option value="diabetes">Diabetes</option>
                            <option value="renal">Insuficiencia renal</option>
                            <option value="escorbuto">Escorbuto</option>
                            <option value="obesidad">Obesidad</option>
                            <option value="hipoalergenico">Hipoalergénico</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Registrar Mascota</button>
                </form>

                <div className="fotoMascota ms-4">
                    <h4>Sube una foto de tu compañero/a :</h4>
                    {photoPet && (
                        <div className="mt-2" style={{ width: "200px", height: "200px" }}>
                            <img src={URL.createObjectURL(photoPet)} alt="Vista previa" width="100%" />
                            <p>Archivo: {photoPet.name}</p>
                        </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2" />
                </div>
            </div>
        </div>
    );
};
