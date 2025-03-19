import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { FaEuroSign, FaStar, FaTrophy } from "react-icons/fa";

export const TournamentForm = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [tournamentData, setTournamentData] = useState({
        name: '',
        inscription_fee: '',
        rating: '',
        schedule: '',
        award: '',
        type: '',
        image: '', // Aquí se guardará la URL de la imagen
        participants_amount: ''
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

        if (!tournamentData.name || !tournamentData.inscription_fee || !tournamentData.rating || !tournamentData.schedule || !tournamentData.award || !tournamentData.participants_amount) {
            console.log("Por favor, completa todos los campos obligatorios.");
            return;
        }

        const info = await actions.postTournament(tournamentData);
        await actions.getTournaments();
        navigate('/tournament/view/' + info.tournament.id);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-light shadow rounded" style={{ maxWidth: "500px", margin: "auto" }}>
            <h3 className="text-center mb-4">Crear Torneo</h3>

            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre del Torneo</label>
                <input type="text" className="form-control" id="name" name="name" placeholder="Enter tournament name" value={tournamentData.name} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label htmlFor="inscription_fee" className="form-label">Inscripción</label>
                <div className="input-group">
                    <input type="number" className="form-control" id="inscription_fee" name="inscription_fee" placeholder="Enter fee" value={tournamentData.inscription_fee} onChange={handleChange} required />
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
                    <input type="datetime-local" className="form-control" id="schedule" name="schedule" value={tournamentData.schedule} min={new Date().toISOString().slice(0, 16)} onChange={handleChange} required />
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="award" className="form-label">Premio</label>
                <div className="input-group">
                    <input type="text" className="form-control" id="award" name="award" placeholder="Enter award" value={tournamentData.award} onChange={handleChange} required />
                    <span className="input-group-text"><FaTrophy /></span>
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="participants_amount" className="form-label">Participantes</label>
                <select className="form-select" id="participants_amount" name="participants_amount" value={tournamentData.participants_amount} onChange={handleChange} required>
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
                <button className="btn btn-primary w-100" type="submit"><strong>Crear</strong></button>
            </div>
        </form>
    )
}