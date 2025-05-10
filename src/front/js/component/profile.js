import React, { useEffect, useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Context } from "../store/appContext";
import { Login } from "./Login";


export const Profile = () => {
    const { store, actions } = useContext(Context);
    const [profile, setProfile] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showModal, setShowModal] = useState(false); // Control modal visibility

    // Fetch user profile on mount
    useEffect(() => {
        // if (!store.token) {
        //     setError("Please log in to access your profile.");
        //     return;
        // }

        let userProfile = JSON.parse(localStorage.getItem('userProfile'));

        console.log("userProfile", userProfile);
        if (userProfile) {
            setProfile({
                email: userProfile.email || "",
                username: userProfile.username || "",
                first_name: userProfile.first_name || "",
                last_name: userProfile.last_name || "",
                address: userProfile.address || "",
                city: userProfile.city || "",
                state: userProfile.state || "",
                zip: userProfile.zip || "",
            });
        } else {
            error && <div className="alert alert-danger">{error}</div>
        }
        // Assume store.userProfile is populated when logged in

    }, [store.userID]);

    // Open and close modal handlers
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    // Handle form submission for profile update
    const handleUpdate = async (e) => {
        e.preventDefault();

        actions.updateProfile(profile);
        setError(null);
        setSuccess(null);
        closeModal();
    };

    // Update local state for input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };


    return (
        <div className="container mt-5" style={{ border: "" }}>
            <h2 className="text-center" style={{ backgroundColor: "#39ff14" }}>My Profile</h2>

            {
                store.userID ? (
                    <>
                        {success && <div className="alert alert-success">{success}</div>}
                        <div className="mb-3">
                            <h5 style={{color:"#39ff14"}}>Email: <span className="" style={{color:"white"}}>{profile.email}</span></h5>
                        </div>
                        <div className="mb-3">
                            <h5 style={{color:"#39ff14"}}>Username: <span className="" style={{color:"white"}}>{profile.username}</span></h5>
                        </div>
                        <div className="mb-3">
                            <h5 style={{color:"#39ff14"}}>First Name: <span className="" style={{color:"white"}}>{profile.first_name}</span></h5>
                        </div>
                        <div className="mb-3">
                            <h5 style={{color:"#39ff14"}}>Last Name: <span className="" style={{color:"white"}}>{profile.last_name}</span></h5>
                        </div>
                        <div className="mb-3">
                            <h5 style={{color:"#39ff14"}}>Address:
                                <span className="" style={{color:"white"}}> {profile.address} </span>
                                <span className=""style={{color:"white"}}> {profile.city} </span>
                                <span className=""style={{color:"white"}}> {profile.state} </span>
                                <span className=""style={{color:"white"}}> {profile.zip}</span>
                            </h5>
                        </div>

                        <button onClick={openModal} className="btn trdBtn">Update Profile</button>

                        <Modal show={showModal} onHide={closeModal} style={{ border: "rgba(0, 0, 0, 0.5)" }}>
                            <div style={{ border: "rgba(0, 0, 0, 0.5)" }}>
                                <Modal.Header closeButton >
                                    <Modal.Title style={{ color: "#39ff14" }}>Edit Profile</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={handleUpdate}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="username"
                                                value={profile.username}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="first_name"
                                                value={profile.first_name}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="last_name"
                                                value={profile.last_name}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="address"
                                                value={profile.address}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="city"
                                                value={profile.city}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>State</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="state"
                                                value={profile.state}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>ZIP Code</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="zip"
                                                value={profile.zip}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Button variant="primary" className="btn trdBtn" type="submit">
                                            Save Changes
                                        </Button>
                                    </Form>
                                </Modal.Body>
                            </div>
                        </Modal>
                    </>
                ) : (
                    <>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <h2 style={{color:"white"}}>Please Log In</h2>
                    </>
                )
            }




        </div>
    );
};
