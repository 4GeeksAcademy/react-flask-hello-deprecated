import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { toastFallo } from "../component/Toaster/toasterIndex.jsx";
import "../../styles/home.css";


export const Home = () => {
	const navigate = useNavigate()
	const { store, actions } = useContext(Context);
	const [terminoBusqueda, setTerminoBusqueda] = useState(store.terminoBusqueda)
	const handleChange = (e) => {
		setTerminoBusqueda(e.target.value)
	}

	const handleKeyDown = (e) => {

		if (e.key === "Enter") {
			actions.changeSearchTerm(terminoBusqueda)
			setTerminoBusqueda("")
			navigate("/busqueda")
		}
	};


	return (
		<div className="text-center">
			<div>
			<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
					<ol className="carousel-indicators">
						<li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
						<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
						<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
					</ol>
					<div className="carousel-inner">
						<div className="carousel-item active">
							<img className="d-block w-100" src="https://placehold.co/500x200" alt="First slide" />
						</div>
						<div className="carousel-item">
							<img className="d-block w-100" src="https://placehold.co/500x200" alt="Second slide" />
						</div>
						<div className="carousel-item">
							<img className="d-block w-100" src="https://placehold.co/500x200" alt="Third slide" />
						</div>
					</div>
					<div className="input-group mb-3 w-50 position-absolute top-50 start-50 translate-middle">
						<input
							onChange={handleChange}
							onKeyDown={handleKeyDown}
							value={terminoBusqueda}
							type="text"
							className="form-control"
							placeholder="Search"
							aria-label="Recipient's username"
							aria-describedby="button-addon2"
						/>
						<button
							onClick={() => {
								actions.changeSearchTerm(terminoBusqueda);
								setTerminoBusqueda("");
								navigate("/busqueda");
							}}
							className="btn btn-outline-secondary"
							type="button"
							id="button-addon2"
						>
							<i className="fa-solid fa-magnifying-glass"></i>
						</button>
					</div>

					<a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="sr-only">Previous</span>
					</a>
					<a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="sr-only">Next</span>
					</a>
				</div>
				<div className="row align-items-center">
					<div className="col">
					Conexión rápida
					</div>
					<div className="col">
					Gestión integral
					</div>
					<div className="col">
						One of three columns
					</div>
				</div>
				<div className="d-flex flex-column justify-content-center align-items-center">
					<div className="w-75">
						{/* Card */}
						<div className="card mb-3 ">
							<div className="row g-0 ">
								<div className="col-md-5 d-flex flex-column justify-content-center align-items-center p-4">
									<img src="https://placehold.co/500x200" className="img-fluid rounded-start object-fit-contain" alt="..." />
								</div>
								<div className="col-md-7 d-flex align-items-center ">
									<div className="card-body d-flex flex-column p-4">
										<h5 className="card-title justify-content-start w-25  fs-3">Card title</h5>
										<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non mauris vehicula, laoreet dolor sed, fermentum ante. Proin eleifend molestie neque, pulvinar euismod sem. Pellentesque vel malesuada orci. Donec ornare convallis tincidunt. Curabitur vitae lobortis purus, et scelerisque ligula. Suspendisse et pretium ante. Pellentesque eget libero eget ex efficitur ultricies. Sed feugiat consequat tincidunt. Mauris elementum laoreet molestie. </p>
										{/* <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p> */}
									</div>
								</div>
							</div>
						</div>

						{/* Card */}
						<div className="card mb-3">
							<div className="row g-0 ">
								<div className="col-md-7 d-flex align-items-center ">
									<div className="card-body d-flex flex-column p-4">
										<h5 className="card-title justify-content-start w-25  fs-3">Card title</h5>
										<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non mauris vehicula, laoreet dolor sed, fermentum ante. Proin eleifend molestie neque, pulvinar euismod sem. Pellentesque vel malesuada orci. Donec ornare convallis tincidunt. Curabitur vitae lobortis purus, et scelerisque ligula. Suspendisse et pretium ante. Pellentesque eget libero eget ex efficitur ultricies. Sed feugiat consequat tincidunt. Mauris elementum laoreet molestie. </p>
										{/* <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p> */}
									</div>
								</div>
								<div className="col-md-5 d-flex flex-column justify-content-center align-items-center p-4">
									<img src="https://placehold.co/500x200" className="img-fluid rounded-start object-fit-contain" alt="..." />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
