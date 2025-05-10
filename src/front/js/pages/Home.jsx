import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import { ChartJSFinancesUser } from "../component/ChartJSFinancesUser.jsx";
import { DonutChart } from "../component/DonutChart.jsx";

export function Home() {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user')
        return savedUser ? JSON.parse(savedUser) : null
    });
    const [expense, setExpense] = useState(0)
    const [incomes, setIncomes] = useState(0)
    const [finance, setFinance] = useState([]);
    const [financeData, setFinanceData] = useState({
        name: "",
        amount: "",
        date: "",
        description: "",
        id_category: "",
        id_user: user?.id,
        id_type: "",
    });
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getFinance = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}api/get_finances_all/${user.id}`);
                const data = await response.json();
                if (response.ok) {
                    setFinance(data);
                } else {
                    console.error('Error getting finance', data);
                }
            } catch (error) {
                console.error('Error getting finance', error);
            }
        };

        const getCategories = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}api/get_categories`);
                const data = await response.json();

                if (response.ok) {
                    setCategories(data);
                } else {
                    console.error('Error getting categories', data);
                }
            } catch (error) {
                console.error('Error getting categories', error);
            }
        }

        const getTypes = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}api/get_types`);
                const data = await response.json();

                if (response.ok) {
                    setTypes(data);
                } else {
                    console.error('Error getting types', data);
                }
            } catch (error) {
                console.error('Error getting types', error);
            }
        }

        getFinance();
        getCategories();
        getTypes();
    }, [user]);

    useEffect(() => {
        const expenseTotal = finance
            .filter(item => item.category === "Expense")  // Filtramos los expense
            .reduce((acc, item) => acc + item.amount, 0); // Sumamos los expense
        setExpense(expenseTotal);

        const incomeTotal = finance
            .filter(item => item.category === "Income")  // Filtramos los incomes
            .reduce((acc, item) => acc + item.amount, 0); // Sumamos los incomes
        setIncomes(incomeTotal);
    }, [finance])

    const postFinance = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}api/create_finance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(financeData)
            });
            const data = await response.json();

            if (response.ok) {
                const category = categories.find(c => c.id === parseInt(financeData.id_category))?.category || "No category";
                const type = types.find(t => t.id === parseInt(financeData.id_type))?.type || null;

                const newFinance = {
                    ...data,
                    category,
                    type,
                };

                setFinance((prevFinance) => [...prevFinance, newFinance]);
                setMessage("Finance added successfully");
                setTimeout(() => { setMessage(null) }, 3000);
            } else {
                console.error('Error adding finance', data);
            }
        } catch (error) {
            console.error('Error adding finance', error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postFinance();
    };

    return (
        <div className="dashboard-container">
            <main className="main-content">
                <header className="header">
                    <h1>Welcome, {user.name.replace(/\b\w/g, (l) => l.toUpperCase())}</h1>
                    <div className="header-right">
                        {/* Checkbox del modo oscuro */}
                        <label className="dark-mode-toggle">
                            <input
                                type="checkbox"
                                disabled
                            />
                            <span className="toggle-slider"></span>
                        </label>
                        {/* Icono del usuario */}
                        <div className="user-icon" title="Account Settings">
                            <img
                                src={`https://unavatar.io/${user.name}`}
                                alt="User Icon"
                                className="profile-picture"
                            />
                        </div>
                    </div>
                </header>


                <div className="section-row">
                    <section className="transactions-list">
                        <h3>Recent Transactions</h3>
                        <ul>
                            {finance.map((item, key) => (
                                <li key={key} className="transaction-item">
                                    <div className="transaction-logo">
                                        <img
                                            src={`https://unavatar.io/${item.name}`}
                                            alt={`${item.name} logo`}
                                        />
                                    </div>
                                    <div className="transaction-info">
                                        <strong>{item.name}</strong>
                                        <p className="description">
                                            {item.description || "No description"} •{" "}
                                            <span className="date">
                                                {new Date(item.date).toLocaleDateString("es-ES", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="transaction-amount">
                                        <span className={`amount ${item.category === "Expense" ? "expense" : "income"}`}>
                                            {item.category === "Expense" ? "-" : "+"} {item.amount} $
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="overview">
                        <div className="balance">
                            <h3>Your Total Balance</h3>
                            <h1>{(incomes - expense).toLocaleString("en-US", { style: "decimal" })} $</h1>
                            <p className="current-date">{new Date().toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}</p>
                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addFinance">Add New Finance</button>
                        </div>
                    </section>
                </div>
                <div className="section-row chart-row">
                    <section className="chart">
                        <h3>Monthly Overview</h3>
                        <div className="chart-container">
                            <ChartJSFinancesUser finance={finance} />  {/* props */}
                        </div>
                    </section>
                    <section>
                        <div className="chart-container">
                            <DonutChart finance={finance}/> {/* props */}
                        </div>
                    </section>
                </div>
            </main>

            <div className="modal fade" id="addFinance" aria-labelledby="addFinanceLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addFinanceLabel">Add New Finance Record</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    {/* Finance Name */}
                                    <div className="col-md-4">
                                        <label htmlFor="name" className="form-label">Finance Name <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={financeData.name}
                                            onChange={(e) => setFinanceData({ ...financeData, name: e.target.value })}
                                            className="form-control"
                                            placeholder="Shopping..."
                                            required
                                        />
                                    </div>
                                    {/* Amount */}
                                    <div className="col-md-4">
                                        <label htmlFor="amount" className="form-label">Amount <span style={{ color: 'red' }}>*</span></label>
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
                                    {/* Date */}
                                    <div className="col-md-4">
                                        <label htmlFor="date" className="form-label">Date <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            type="date"
                                            id="date"
                                            value={financeData.date}
                                            onChange={(e) => setFinanceData({ ...financeData, date: e.target.value })}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        id="description"
                                        value={financeData.description}
                                        onChange={(e) => setFinanceData({ ...financeData, description: e.target.value })}
                                        className="form-control"
                                        placeholder="Optional: Add additional details about this transaction"
                                    />
                                </div>

                                <div className="row">
                                    {/* Category */}
                                    <div className="col-md-6">
                                        <label htmlFor="category" className="form-label">Category <span style={{ color: 'red' }}>*</span></label>
                                        <select
                                            id="category"
                                            value={financeData.id_category}
                                            onChange={(e) => setFinanceData({ ...financeData, id_category: e.target.value })}
                                            className="form-select"
                                            required
                                        >
                                            <option value="" disabled>Select Category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Type */}
                                    <div className="col-md-6">
                                        <label htmlFor="type" className="form-label">Type <span style={{ color: 'red' }}>*</span></label>
                                        <select
                                            id="type"
                                            value={financeData.id_type}
                                            onChange={(e) => setFinanceData({ ...financeData, id_type: financeData.id_category === "1" ? e.target.value : null })}
                                            className="form-select"
                                            required={financeData.id_category === "1"}
                                            disabled={financeData.id_category === "2"}
                                        >
                                            <option value="" disabled>Select Type</option>
                                            {types.map((type) => (
                                                <option key={type.id} value={type.id}>
                                                    {type.type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {message && <div className="alert alert-primary" role="alert">{message}</div>}
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Save Finance</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
