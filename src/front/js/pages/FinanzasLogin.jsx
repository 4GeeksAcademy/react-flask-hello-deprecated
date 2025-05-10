import React, { useState, useEffect } from "react";

export function FinanceForm() {
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [financeData, setFinanceData] = useState({
        name: "",
        amount: "",
        date: "",
        description: "",
        id_category: "",
        id_type: "",
    });

    useEffect(() => {
    // APIS

        //ejemplo de datos:
        setCategories([
            { id: 1, category: "Comida" },
            { id: 2, category: "Transporte" },
        ]);
        setTypes([
            { id: 1, type: "Ingresos" },
            { id: 2, type: "Gastos" },
        ]);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(financeData);  
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-body">
                    <h1 className="card-title text-center mb-4">Create Finance</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Nombre de la finanza */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Finance Name</label>
                            <input
                                type="text"
                                id="name"
                                value={financeData.name}
                                onChange={(e) => setFinanceData({ ...financeData, name: e.target.value })}
                                className="form-control"
                                placeholder="Enter finance name"
                                required
                            />
                        </div>

                        {/* Monto */}
                        <div className="mb-3">
                            <label htmlFor="amount" className="form-label">Amount</label>
                            <input
                                type="number"
                                id="amount"
                                value={financeData.amount}
                                onChange={(e) => setFinanceData({ ...financeData, amount: e.target.value })}
                                className="form-control"
                                placeholder="Enter amount"
                                required
                            />
                        </div>

                        {/* Fecha */}
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Date</label>
                            <input
                                type="date"
                                id="date"
                                value={financeData.date}
                                onChange={(e) => setFinanceData({ ...financeData, date: e.target.value })}
                                className="form-control"
                                required
                            />
                        </div>

                        {/* Descripción */}
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description (optional)</label>
                            <textarea
                                id="description"
                                value={financeData.description}
                                onChange={(e) => setFinanceData({ ...financeData, description: e.target.value })}
                                className="form-control"
                                placeholder="Enter description"
                            />
                        </div>

                        {/* Categoría */}
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <select
                                id="category"
                                value={financeData.id_category}
                                onChange={(e) => setFinanceData({ ...financeData, id_category: e.target.value })}
                                className="form-select"
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Tipo */}
                        <div className="mb-3">
                            <label htmlFor="type" className="form-label">Type</label>
                            <select
                                id="type"
                                value={financeData.id_type}
                                onChange={(e) => setFinanceData({ ...financeData, id_type: e.target.value })}
                                className="form-select"
                                required
                            >
                                <option value="">Select Type</option>
                                {types.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Botón de Enviar */}
                        <div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
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
