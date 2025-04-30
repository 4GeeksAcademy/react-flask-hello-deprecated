import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

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
        image: '',
        participants_amount: ''

    })

    const handleChange = e => {
        setTournamentData({
            ...tournamentData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!tournamentData.name || !tournamentData.inscription_fee || !tournamentData.rating || !tournamentData.schedule || !tournamentData.award || !tournamentData.type || !tournamentData.participants_amount) {
            console.log("Por favor, completa los campos obligatorios.");
            return;
        }

        console.log("Submit data:", tournamentData)

        await actions.postTournament(tournamentData);
        await actions.getTournaments()

        

        setTournamentData({
            name: '',
            inscription_fee: '',
            rating: '',
            schedule: '',
            award: '',
            type: '',
            image: '',
            participants_amount: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column">
                <label htmlFor="name">Name</label>
                <input className="mb-2" type="text" name="name" id="name" placeholder="Enter tournament name" value={tournamentData.name} onChange={handleChange} required />
                <div className="d-flex flex-column align-items-center mb-2">
                    <label htmlFor="inscription_fee">Inscription Fee</label>
                    <div>
                    <input type="number" name="inscription_fee" id="inscription_fee" placeholder="Enter inscription fee" value={tournamentData.inscription_fee} onChange={handleChange} required />
                    <span style={{ marginLeft: "5px", fontWeight: "bold" }}>€</span>
                    </div>
                </div>
                <label htmlFor="rating">Rating</label>
                <input className="mb-2" type="number" name="rating" id="rating" placeholder="Enter tournament rating" value={tournamentData.rating} onChange={handleChange} required />
                <label htmlFor="schedule">Schedule</label>
                <input className="mb-2" type="datetime-local" name="schedule" id="schedule" value={tournamentData.schedule} onChange={handleChange} required />
                <label htmlFor="award">Award</label>
                <input className="mb-2" type="text" name="award" id="award" placeholder="Enter tournament award" value={tournamentData.award} onChange={handleChange} required />
                <label htmlFor="type">Type</label>
                <input className="mb-2" type="text" name="type" id="type" placeholder="Enter tournament type" value={tournamentData.type} onChange={handleChange} required />
                <label htmlFor="participants_amount">Participants amount</label>
                <input className="mb-2" type="number" name="participants_amount" id="participants_amount" placeholder="Enter participants amount" value={tournamentData.participants_amount} onChange={handleChange} required />
                <label htmlFor="image">Image</label>
                <input className="mb-2" type="text" name="image" id="image" placeholder="Enter image" value={tournamentData.image} onChange={handleChange} />

            </div>
            <div>
                <button className="btn btn-primary mt-2" type="submit"><strong>Create</strong></button>
            </div>
        </form>
    )
}