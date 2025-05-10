import React, { useState, useEffect } from "react";
import { FaEuroSign, FaCalendarAlt, FaTag, FaInfoCircle, FaTags } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/FinanceForm.css";

// Componente de campo de entrada reutilizable
const InputField = ({ label, id, type, value, onChange, placeholder, required, icon }) => (
    <div className="mb-4 position-relative">
        <label htmlFor={id} className="form-label fw-bold" style={{ color: "var(--label-color)" }}>
            {label}{required && <span style={{ color: "red" }}> *</span>}
        </label>
        <div className="input-group">
            {icon && (
                <div className="input-group-text" style={{ backgroundColor: "var(--primary-color)", color: "white" }}>
                    {icon}
                </div>
            )}
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                className="form-control border-bottom border-primary shadow-none"
                placeholder={placeholder}
                required={required}
                style={{
                    backgroundColor: "var(--input-background-color)",
                    color: "var(--text-color)",
                    borderRadius: "5px",
                }}
                aria-label={label}
            />
        </div>
    </div>
);

// Componente SelectField reutilizable
const SelectField = ({ label, id, value, onChange, options, required, icon }) => (
    <div className="mb-4 position-relative">
        <label htmlFor={id} className="form-label fw-bold" style={{ color: "var(--label-color)" }}>
            {label}{required && <span style={{ color: "red" }}> *</span>}
        </label>
        <div className="input-group">
            {icon && (
                <div className="input-group-text" style={{ backgroundColor: "var(--primary-color)", color: "white" }}>
                    {icon}
                </div>
            )}
            <select
                id={id}
                value={value}
                onChange={onChange}
                className="form-select border-bottom border-primary shadow-none"
                required={required}
                style={{
                    backgroundColor: "var(--input-background-color)",
                    color: "var(--text-color)",
                    borderRadius: "5px",
                }}
                aria-label={label}
            >
                <option value="">Select {label}</option>
                {options.length > 0 ? (
                    options.map((option) => (
                        <option key={option.id} value={option.id} className="text-secondary">
                            {option.label}
                        </option>
                    ))
                ) : (
                    <option disabled>No options available</option>
                )}
            </select>
        </div>
    </div>
);

export function FinanceForm() {
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [message, setMessage] = useState("");
    const [financeData, setFinanceData] = useState({
        name: "",
        amount: "",
        date: "",
        description: "",
        id_category: "",
        id_type: "",
    });

    const navigate = useNavigate();

    // Fetch Categories and Types from API
    useEffect(() => {
        const fetchOptions = async (endpoint, setter, fallbackData) => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}api/${endpoint}`);
                if (response.ok) {
                    const data = await response.json();
                    setter(data);
                } else {
                    console.warn(`Using default ${endpoint} due to fetch error.`);
                    setter(fallbackData);
                }
            } catch (error) {
                console.error(`Error fetching ${endpoint}:`, error);
                setter(fallbackData);
            }
        };

        fetchOptions("categories", setCategories, [
            { id: "1", label: "Comida" },
            { id: "2", label: "Transporte" },
        ]);

        fetchOptions("types", setTypes, [
            { id: "1", label: "Ingresos" },
            { id: "2", label: "Gastos" },
        ]);
    }, []);

    // Manejo de cambios de entrada
    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === "amount" && value < 0) return; 
        setFinanceData((prev) => ({ ...prev, [id]: value }));
    };

    // Envío de formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!financeData.name || financeData.amount <= 0 || !financeData.date || !financeData.id_category || !financeData.id_type) {
            setMessage("Please fill in all required fields with valid data.");
            return;
        }

        try {
            const response = await fetch(`${process.env.BACKEND_URL || 'https://studious-goldfish-6p59gv66ggqfxqx6-3001.app.github.dev/'}api/finances`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(financeData),
            });

            if (response.ok) {
                const result = await response.json();
                setMessage("Finance created successfully!");
                console.log(result);
                navigate('/finances');
            } else {
                const error = await response.json();
                setMessage(error.message || "An error occurred while creating the finance.");
            }
        } catch (error) {
            setMessage("Error occurred while creating finance.");
            console.error(error);
        }
    };

    return (
        <div className="container mt-5" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
            <div className="card shadow-lg border-primary">
                <div className="card-body">
                    <h1 className="card-title text-center mb-4" style={{ color: "var(--primary-color)" }}>Create Finance</h1>
                    {message && (
                        <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
                            {message}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <InputField
                                    label="Finance Name"
                                    id="name"
                                    type="text"
                                    value={financeData.name}
                                    onChange={handleChange}
                                    placeholder="Enter finance name"
                                    required
                                    icon={<FaTag />}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <InputField
                                    label="Amount"
                                    id="amount"
                                    type="number"
                                    value={financeData.amount}
                                    onChange={handleChange}
                                    placeholder="Enter amount"
                                    required
                                    icon={<FaEuroSign />}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-md-6">
                                <InputField
                                    label="Date"
                                    id="date"
                                    type="date"
                                    value={financeData.date}
                                    onChange={handleChange}
                                    required
                                    icon={<FaCalendarAlt />}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <SelectField
                                    label="Category"
                                    id="id_category"
                                    value={financeData.id_category}
                                    onChange={handleChange}
                                    options={categories}
                                    required
                                    icon={<FaTag />}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <SelectField
                                    label="Type"
                                    id="id_type"
                                    value={financeData.id_type}
                                    onChange={handleChange}
                                    options={types}
                                    required
                                    icon={<FaTags />}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <InputField
                                    label="Description (optional)"
                                    id="description"
                                    type="text"
                                    value={financeData.description}
                                    onChange={handleChange}
                                    placeholder="Enter description"
                                    icon={<FaInfoCircle />}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="btn w-100 shadow-sm"
                                style={{
                                    backgroundColor: "var(--button-color)",
                                    color: "white",
                                    transition: "background-color 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "var(--button-hover-color)";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = "var(--button-color)";
                                }}
                            >
                                Create Finance
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}