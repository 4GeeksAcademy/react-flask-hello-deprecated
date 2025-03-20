import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import { FaEuroSign, FaStar, FaTrophy } from "react-icons/fa";

export const EditTournamentForm = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();

    const [tournamentData, setTournamentData] = useState({
        name: store.torneo?.name || '',
        inscription_fee: store.torneo?.inscription_fee || '',
        rating: store.torneo?.rating || '',
        schedule: store.torneo?.schedule || '',
        award: store.torneo?.award || '',
        type: store.torneo?.type || '',
        image: store.torneo?.image || '', // Aquí se guardará la URL de la imagen
        participants_amount: store.torneo?.participants_amount || ''
    });


    const handleChange = e => {
        setTournamentData({
            ...tournamentData,
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
            setTournamentData({
                ...tournamentData,
                image: data.secure_url,  // Aquí guardamos la URL de la imagen
            });
            console.log("Imagen cargada correctamente:", data.secure_url);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await actions.updateTournament(tournamentData, id);
        navigate('/tournament/view/' + id);

    };

    const handleCancel = () => {
        navigate('/tournament/view/' + id);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-light shadow rounded" style={{ maxWidth: "500px", margin: "auto" }}>
            <h3 className="text-center mb-4">Editar Torneo</h3>

            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre del Torneo</label>
                <input type="text" className="form-control" id="name" name="name" placeholder="Enter tournament name" value={tournamentData.name} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="inscription_fee" className="form-label">Inscripción</label>
                <div className="input-group">
                    <input type="number" className="form-control" id="inscription_fee" name="inscription_fee" placeholder="Enter fee" value={tournamentData.inscription_fee} onChange={handleChange} />
                    <span className="input-group-text"><FaEuroSign /></span>
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="rating" className="form-label">Categoría</label>
                <div className="input-group">
                    <select type="number" className="form-control" id="rating" name="rating" placeholder="Enter rating" value={tournamentData.rating} onChange={handleChange} min="1" max="5" required >
                        <option value="Semifinales">Selecciona Categoría</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <span className="input-group-text"><FaStar /></span>
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="schedule" className="form-label">Fecha del Torneo</label>
                <div className="input-group">
                    <input type="datetime-local" className="form-control" id="schedule" name="schedule" value={tournamentData.schedule} min={new Date().toISOString().slice(0, 16)} onChange={handleChange} />
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="award" className="form-label">Premio</label>
                <div className="input-group">
                    <input type="text" className="form-control" id="award" name="award" placeholder="Enter award" value={tournamentData.award} onChange={handleChange} />
                    <span className="input-group-text"><FaTrophy /></span>
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="type" className="form-label">Fases eliminatorias</label>
                <select className="form-select" id="type" name="type" value={tournamentData.type} onChange={handleChange}  >
                    <option value="Selecciona tipo de torneo">Selecciona tipo de torneo</option>
                    <option value="Semifinales">Semifinales</option>
                    <option value="Cuartos de final">Cuartos de final</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="participants_amount" className="form-label">Participantes</label>
                <select className="form-select" id="participants_amount" name="participants_amount" value={tournamentData.participants_amount} onChange={handleChange}  >
                    <option value="Selecciona numero de participantes">Selecciona numero de participantes</option>
                    <option value="8">8</option>
                    <option value="16">16</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="image" className="form-label">Cartel</label>
                <div className="input-group">
                    <input type="file" className="form-control" id="image" name="image" onChange={handleFileChange} />
                </div>
            </div>

            <div className="text-center">
                <button className="btn btn-primary w-100" type="submit"><strong>Guardar datos</strong></button>
            </div>
            <div className="text-center">
                <button className="btn btn-danger w-100" value="cancelar" onClick={handleCancel}><strong>Cancelar</strong></button>
            </div>
        </form>
    )
}