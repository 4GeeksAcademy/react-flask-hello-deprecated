import React, { useState } from "react";

export const TournamentForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        inscription_fee: '',
        rating: '',
        schedule: '',
        award: '',
        type: '',
        image: '',
        tournament_winner: ''

    })

    const handleChange = e => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();


        if (!formData.name || !formData.inscription_fee || !formData.rating || !formData.schedule || !formData.award || !formData.type) {
            console.log("Por favor, completa los campos obligatorios.");
            return;
        }

        console.log("Submit data:", formData)
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column">
                <label htmlFor="name">Name</label>
                <input className="mb-2" type="text" name="name" id="name" placeholder="Enter tournament name" onChange={handleChange} required />
                <div className="d-flex flex-column align-items-center mb-2">
                    <label htmlFor="inscription_fee">Inscription Fee</label>
                    <div>
                    <input type="number" name="inscription_fee" id="inscription_fee" placeholder="Enter inscription fee" onChange={handleChange} required />
                    <span style={{ marginLeft: "5px", fontWeight: "bold" }}>€</span>
                    </div>
                </div>
                <label htmlFor="rating">Rating</label>
                <input className="mb-2" type="text" name="rating" id="rating" placeholder="Enter tournament rating" onChange={handleChange} required />
                <label htmlFor="schedule">Schedule</label>
                <input className="mb-2" type="datetime-local" name="schedule" id="schedule" onChange={handleChange} required />
                <label htmlFor="award">Award</label>
                <input className="mb-2" type="text" name="award" id="award" placeholder="Enter tournament award" onChange={handleChange} required />
                <label htmlFor="type">Type</label>
                <input className="mb-2" type="text" name="type" id="type" placeholder="Enter tournament type" onChange={handleChange} required />
                <label htmlFor="tournament_winner">Tournament winner</label>
                <input className="mb-2" type="text" name="tournament_winner" id="tournament_winner" placeholder="Enter tournament winner" onChange={handleChange} />
                <label htmlFor="image">Image</label>
                <input className="mb-2" type="text" name="image" id="image" placeholder="Enter image" onChange={handleChange} />

            </div>
            <div>
                <button className="btn btn-primary mt-2" type="submit"><strong>Create</strong></button>
            </div>
        </form>
    )
}