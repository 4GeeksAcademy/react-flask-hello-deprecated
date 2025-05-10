import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/editprofile.css";

export const EditProfile = () => {
    const [name, setName] = useState("Matt");
    const [email, setEmail] = useState("mattsmith@gmail.com");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [gender, setGender] = useState("");

    const handleSave = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica para guardar los cambios
        console.log("Profile saved", { name, email, currentPassword, newPassword, gender });
    };

    return (
        <div className="edit-profile-container">
            <main>
                <h1>Edit - Profile</h1>
                <form className="edit-profile-form" onSubmit={handleSave}>
                    <label>
                        Name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        Email
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        Current Password
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </label>
                    <label>
                        New Password
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </label>
                    <button type="submit">Save</button>
                </form>
                <button className="delete-account-button">Delete account</button>
            </main>
            <div className="avatar-section">
                <div className="avatar-container">
                    <img src="path/to/avatar.png" alt="Avatar" />
                    <button>Change Avatar</button>
                </div>
                <h2>Change Avatar</h2>
                <div className="avatar-options">
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={gender === "male"}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === "female"}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        Female
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="other"
                            checked={gender === "other"}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        Other
                    </label>
                </div>
            </div>
        </div>
    );
};
export default EditProfile;