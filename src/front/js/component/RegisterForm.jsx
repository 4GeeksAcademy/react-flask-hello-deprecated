import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (/^\d+$/.test(formData.name)) {
      newErrors.name = "Name cannot contain only numbers.";
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Email should contain a '@'.";
    } else if (/^\d+$/.test(formData.email)) {
      newErrors.email = "Email cannot contain only numbers";
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "The password must be at least 8 characters long.";
    }

    // Validar confirmación de contraseña
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form sent:", formData);
      alert("Registration completed!");
    } else {
      alert("Please, correct the errors before submitting.");
    }
  };

  return (
    <div className="full-bg-container">
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="card p-4 shadow form-card" style={{ maxWidth: "500px", width: "100%" }}>
          <h1 className="text-center mb-4 title">Create an Account</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label"></label>
              <input
                type="text"
                className="form-control input-gray"
                placeholder="Name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                
              />
              {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label"></label>
              <input
                type="email"
                className="form-control input-gray"
                placeholder="Email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label"></label>
              <input
                type="password"
                className="form-control input-gray"
                placeholder="Password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                
              />
              {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label"></label>
              <input
                type="password"
                className="form-control input-gray"
                placeholder="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                
              />
              {errors.confirmPassword && (
                <p style={{ color: "red" }}>{errors.confirmPassword}</p>
              )}
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <button type="submit" className="btn">Sign Up</button>

            </div>

            <div class="icon-row">
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-facebook"></i>
              <i class="fa-brands fa-linkedin-in"></i>
            </div>
          </form>

          <p className="mt-3 text-center">
            Already have an account? <a href="/login" className="custom-link">Sign in here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;















