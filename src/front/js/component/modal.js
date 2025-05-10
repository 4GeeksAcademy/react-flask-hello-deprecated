import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useLocation, useParams } from "react-router-dom";

import "../../styles/modal.css";

export const Modal = (props) => {
	const { store, actions } = useContext(Context)
	const params = useParams()
	const path = useLocation()
	console.log("params", params);
	console.log("path", path);

	const [inputValue, setInputValue] = useState({
		name: "",
		balance: 0,
		coin: "",
		type: ""
	});
	async function createAccount(params) {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify({
			"name": params.name,
			"balance": params.balance,
			"coin": params.coin,
			"type": params.type
		});

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		try {
			const response = await fetch(`${process.env.BACKEND_URL}/api/${store.user.id}/new-account`, requestOptions);
			const result = await response.text();
			console.log(result)
		} catch (error) {
			console.error(error);
		};

	}
	const addItem = () => {
		if (inputValue.name.length != 0 && inputValue.type != "") {
			// props.setList([...props.list, inputValue]);
			createAccount(inputValue)
			setInputValue({
				name: "",
				balance: 0,
				coin: "",
				type: ""
			});
			alert("Se ingresó todo correctamente")
		} else {
			alert(
				"------------------------INFORMACIÓN INCOMPLETA-------------------- RECUERDA ESCRIBIR UN NOMBRE, ESCOGER UN TIPO E INTRODUCIR UNA CANTIDAD DE MAXIMO 10 UNIDADES"
			);
		}
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputValue({ ...inputValue, [name]: value });
	};

	return (
		<>
			<button type="button" className="add-item btn btn-secondary btn-modal" data-bs-toggle="modal" data-bs-target="#exampleModal">
				<i className="bi bi-plus-lg"></i>
			</button>
			{path.pathname === "/cuentas" ?
				<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5" id="exampleModalLabel">
									Crear Nuevo Espacio
								</h1>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body d-flex gap-5">
								<input
									type="text"
									className="form-control"
									placeholder="Nombre"
									value={inputValue.name}
									aria-label="Nombre"
									name="name"
									required
									onChange={handleChange}
								/>
								<input
									type="text"
									className="form-control w-25"
									placeholder="Balance"
									value={inputValue.balance}
									aria-label="Balance"
									name="balance"
									required
									onChange={handleChange}
								/>
							</div>
							<div className="px-5 pb-3">
								<select
									className="form-select mr-5 "
									aria-label="Default select example"
									name="coin"
									required
									value={inputValue.coin}
									onChange={handleChange}>
									<option value="">Moneda</option>
									<option value="EUR">EUR</option>
									<option value="USD">USD</option>
									<option value="COP">COP</option>
									<option value="PER">PER</option>
								</select>
							</div>
							<div className="px-5 pb-3">
								<select
									className="form-select mr-5 "
									aria-label="Default select example"
									name="type"
									required
									value={inputValue.type}
									onChange={handleChange}>
									<option value="">Tipo de Espacio</option>
									<option value="Cuenta Ahorros">Cuenta Ahorros</option>
									<option value="Cuenta Corriente">Cuenta Corriente</option>
									<option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
									<option value="Efectivo">Efectivo</option>
									<option value="Otros">Otros</option>
								</select>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={addItem}>
									Agregar
								</button>
								<button type="button" className="btn btn-danger" data-bs-dismiss="modal">
									Cancelar
								</button>
							</div>
						</div>
					</div>
				</div>
				: <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5" id="exampleModalLabel">
									Añadir Movimiento
								</h1>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body d-flex gap-5">
								<input
									type="text"
									className="form-control"
									placeholder="Nombre"
									value={inputValue.name}
									aria-label="Nombre"
									name="name"
									required
									onChange={handleChange}
								/>
								<input
									type="text"
									className="form-control w-25"
									placeholder="Balance"
									value={inputValue.balance}
									aria-label="Balance"
									name="balance"
									required
									onChange={handleChange}
								/>
							</div>
							<div className="px-5 pb-3">
								<select
									className="form-select mr-5 "
									aria-label="Default select example"
									name="coin"
									required
									value={inputValue.coin}
									onChange={handleChange}>
									<option value="">Moneda</option>
									<option value="EUR">EUR</option>
									<option value="USD">USD</option>
									<option value="COP">COP</option>
									<option value="PER">PER</option>
								</select>
							</div>
							<div className="px-5 pb-3">
								<select
									className="form-select mr-5 "
									aria-label="Default select example"
									name="type"
									required
									value={inputValue.type}
									onChange={handleChange}>
									<option value="">Tipo de Espacio</option>
									<option value="Cuenta Ahorros">Cuenta Ahorros</option>
									<option value="Cuenta Corriente">Cuenta Corriente</option>
									<option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
									<option value="Efectivo">Efectivo</option>
									<option value="Otros">Otros</option>
								</select>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={addItem}>
									Agregar
								</button>
								<button type="button" className="btn btn-danger" data-bs-dismiss="modal">
									Cancelar
								</button>
							</div>
						</div>
					</div>
				</div>}
		</>
	);
}