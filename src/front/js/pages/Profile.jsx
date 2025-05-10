import React, { useState, useEffect } from "react";
import "../../styles/Profile.css";

export function Profile() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) :null
  });

  const [userData, setUserData] = useState({name:user.name, email:user.email}) 

  const [showEditModal, setShowEditModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");


  const handleEditClick = () => {
    setShowEditModal(true);
  };

  
  const handleSaveChanges = async () => {
    try {
    const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}api/edit_user/${user.id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userData)
});

       
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(prevUser => ({...prevUser, name: user.name, email: user.email}));location.reload()
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      console.log(error);
      alert("An error occurred while updating the profile.");
    } finally {
      setShowEditModal(false);
    }
  };
  

  

  const handleInfoModalClick = (message) => {
    setModalMessage(message);
    setShowInfoModal(true);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Header Section */}
        <div className="profile-header">
          <div className="profile-avatar-container">
            {/* Avatar Placeholder */}
            <img
              className="profile-avatar"
              src={`https://unavatar.io/${user?.firstName || 'placeholder'}`}
              alt="profile"
            />
            <button className="profile-edit-btn" onClick={handleEditClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="edit-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536M9 13h3l8.485-8.485a1.5 1.5 0 00-2.121-2.121L9.879 11H9v3z"
                />
              </svg>
            </button>
          </div>
          <p className="profile-info">{user?.email || "youremail@domain.com"} </p>
          <h2 className="profile-name">{user?.name || "Puerto Rico"}</h2>
        </div>

        {/* Options Section */}
        <div className="profile-options">
          <div 
            className="option-item" 
            title="Show a message"
            onClick={() => handleInfoModalClick("No, no, notifications stay on, grow up!")}
          >
            Notifications <span className="option-status">ON</span>
          </div>
          <div 
            className="option-item"
            onClick={() => handleInfoModalClick("Si no lo entiendes descárgate el Duolingo.")}
          >
            Language <span className="option-status">{user?.language || "English"}</span>
          </div>
        </div>

        {/* Footer Section */}
        <div className="profile-footer">
          <div 
            className="footer-item" 
            onClick={() => handleInfoModalClick("Figure it out, you're on your own.")}
          >
            Help & Support
          </div>
          <div 
            className="footer-item" 
            onClick={() => handleInfoModalClick("Please leave us alone.")}
          >
            Contact us
          </div>
          <div 
            className="footer-item" 
            onClick={() => handleInfoModalClick("We promise to keep your secrets and not sell them to any mafias.")}
          >
            Privacy policy
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSaveChanges}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
              <div className="modal-buttons">
                <button type="button" onClick={() => setShowEditModal(false)}>
                  Close
                </button>
                <button type="button" onClick={handleSaveChanges}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={() => setShowInfoModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

