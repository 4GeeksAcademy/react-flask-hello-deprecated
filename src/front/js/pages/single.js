import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [groupId, setGroupId] = useState(params.theid);
	const [email, setEmail] = useState(params.theemail.replaceAll("DOT", "."));
	const [message, setMessage] = useState(null);
	const [groupName, setGroupName] = useState("");
	const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

	console.log("params", groupId, email);

	useEffect(() => {
		const addUserToGroup = async () => {
			const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}/api/add_user_to_group/${user?.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					//Authorization: `Bearer ${localStorage.getItem("token")}`
				},
				body: JSON.stringify({ 'id_group': groupId })
			})

			const data = await response.json()
			if (!response.ok){
				setMessage(data.error)
			}
		}

		const getGroupName = async () => {
			const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}/api/get_group_name/${groupId}`)
			const data = await response.json()
			if (response.ok){
				setGroupName(data.name)
			}
		}

		addUserToGroup()
		getGroupName()
	}, [params]);

	return (
		<div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="bg-white p-4 rounded shadow-lg text-center w-75">
        {!message && <div>
					<h2 className="fw-bold">¡Invitación Aceptada!</h2>
					<p className="text-secondary mt-2">
						El usuario con email <span className="fw-bold text-primary">{email}</span>  
						ha sido añadido al grupo <span className="fw-bold text-success">{groupName}</span>.
					</p>	
				</div>}
        {message && <div className="alert alert-danger"><h2>Error</h2>{message}</div>}
        <div className="mt-4">
          <Link to="/groups" className="btn btn-primary">Volver a Mis Grupos</Link>
        </div>
      </div>
    </div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
