import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<div>
				<div>
					<h1>Workland</h1>
					<h4>¡El trabajo de tus suenos, te espera!</h4>
					<div class="input-group mb-3">
						<input type="text" class="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2" />
						<button class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
					</div>
				</div>
			</div>
		</div>
	);
};
