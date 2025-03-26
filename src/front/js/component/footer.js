import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Footer = () => {

	const { store } = useContext(Context)

	return (
		<>
			<div className="container-fluid" id="footer" style={store.negative_colors ? { backgroundColor: "rgb(47, 65, 79)" } : { backgroundColor: "rgb(56, 148, 163)" }}>
				<div className={`container ${store.negative_colors ? "negative-background" : "positive-background"}`} >
					<div className="row pb-5 pt-3 justify-content-center" style={store.negative_colors ? { backgroundColor: "rgb(47, 65, 79)" } : { backgroundColor: "rgb(56, 148, 163)" }}>
						<div className="col-3 text-center">
							<h5><img className="mt-2 ms-1" src="https://i.postimg.cc/50vfTfDx/isotipo.png" style={{height: "50px"}} /></h5>
							<ul className="ps-0">
								<li className="mt-3 insta-icon text-white"><i className="fa-brands fa-instagram" style={{fontSize: "35px"}}></i></li>
							</ul>
						</div>
						<div className="col-3 text-center">
							<h5 className="sub-titulo mt-1 text-white">Contacta con nosotros</h5>
							<ul className="ps-0">
								<li className="mt-3 mb-2 sub-titulo text-white ms-1"><i className="fa-solid fa-phone"></i> +34 665 885 885</li>
								<li className="mt-3 mb-3 sub-titulo text-white ms-1"><i className="fa-regular fa-envelope"></i> raf@org.com</li>
							</ul>
						</div>
						<div className="col-3 text-center">
							<h5 className="sub-titulo mt-1 text-white">Guía de compra</h5>
							<ul className="ps-0">
								<Link to={'/signup'}>
									<li className=" mt-3 mb-1 text-black sub-titulo footer-create-user text-white" style={{marginLeft: "1px"}}>Crear usuario</li>
								</Link>
								<li className="my-2 text-black sub-titulo text-white" style={{marginLeft: "1px"}}>Pago</li>
								<li className="mt-1 mb-3 text-black sub-titulo text-white" style={{marginLeft: "1px"}}>Envío</li>
							</ul>
						</div>
						<div className="col-3 text-center">
							<h5 className="sub-titulo mt-1 text-white">Pagar con</h5>
							<ul className="ps-0">
								<li className="mt-3"><i className="fa-brands fa-cc-visa text-white" style={{fontSize: "25px", marginLeft: "1px"}}></i></li>
								<li className="mt-2"><i className="fa-brands fa-cc-mastercard text-white" style={{fontSize: "25px", marginLeft: "1px"}}></i></li>
								<li className="mt-2"><i className="fa-brands fa-cc-paypal text-white" style={{fontSize: "25px", marginLeft: "1px"}}></i></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	)
};
