import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { privateUser } from "../apiservices/callToApi";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [isVerified, setIsVerified] = useState(null);
	const [search, setSearch] = useState("");

	const navigate = useNavigate();
	const infoUser = store.infoUser;

	let products = [];
	const phones = store.phones;
	const tvs = store.tvs;
	const laptops = store.laptops;
	products = [...phones, ...tvs, ...laptops];
	
	const searcher = (e) => {
		setSearch(e.target.value);
	};

	let results = search.length > 0 && 
		products.filter(({ modelo = "", marca = "" }) => 
			modelo.toLowerCase().includes(search.toLowerCase()) || 
			marca.toLowerCase().includes(search.toLowerCase()));

	const validacionProduct = (product) => {
		let route = "";
		if(product.laptop_id){
			route = `/laptop-info/${product.laptop_id}` 
		}else if(product.smartphone_id){
			route = `/smartphone-info/${product.smartphone_id}`
		}else if(product.tv_id){
			route = `/tv-info/${product.tv_id}`
		};
		navigate(route);
		setSearch("");
	};

	const checkout = async () => {
		const verified = await privateUser();
		setIsVerified(verified);
	};

	useEffect(() => {
		checkout();
	});

	useEffect(()=>{
		if(isVerified){
			actions.userIndividual();
		};
	},[isVerified]);


	const logOut = () => {
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('idUser');
		checkout();
	};

	return (
		<>
			<nav className={`navbar navbar-expand-lg  ${store.negative_colors ? "negative-navbar" : "positive-navbar"}`} style={store.navbar_visibility ? { display: "block" } : { display: "none" }}>
				<div className="container">
					<Link to={'/'}>
						<img className="navbar-brand logo-navbar" src="https://i.postimg.cc/ryxpY9LS/imagotipo-naranja.png" style={{height: "5rem"}} />
					</Link>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="d-flex align-items-center">
						<form className="dropdown-search" role="search">
							<input className={`p-1 me-2 ${search.length != 0 ? 'input-search-focus' : 'input-search'}`} value={search} onChange={(e) => searcher(e)} type="search" placeholder="Buscar" aria-label="Search"></input>
							{search.length != 0 &&
								<div className="dropdown-content-search" style={{display: 'block'}}>
									{
										results.map((product, index)=>{											
											return(
												<p key={index} onClick={()=>validacionProduct(product)}>{product.marca} {product.modelo}</p>
											)
										})
									}
								</div>
							}
						</form>
						<div className="collapse navbar-collapse d-flex align-items-center" id="navbarSupportedContent">
							<ul className="navbar-nav me-auto mb-lg-0">
								<li className="nav-item">
									<Link to="/phones-catalog">
										<p className="nav-link " style={{ color: "white" }} aria-current="page" >Móviles</p>
									</Link>
								</li>
								<li className="nav-item">
									<Link to="/tvs-catalog">
										<p className="nav-link" style={{ color: "white" }} aria-current="page" >Televisores</p>
									</Link>
								</li>
								<li className="nav-item" >
									<Link to="/laptops-catalog" >
										<p className="nav-link" style={{ color: "white" }} aria-current="page" >Pórtatiles</p>
									</Link>
								</li>
								<li className="nav-item">
									<a href="#footer" className="nav-link" style={{ color: "white" }} >Contacto</a>
								</li>
								<li className="nav-item dropdown" >
									<a className="nav-link dropbtn" style={{ color: "white" }} ><i className="fa-solid fa-user"></i></a>
									{!isVerified ?
										<div className={`dropdown-content ${store.negative_colors ? "negative-login" : "positive-login"}`}>
											<br/>
											<Link to={'/login'}><span>Iniciar Sesion</span></Link>
											<hr/>
											<Link to={'/signup'}><span>Crear Usuario</span></Link>
											<br/>
											</div>
										:
										<div className={`dropdown-content ${store.negative_colors ? "negative-login" : "positive-login"}`}>
											<div className="container-photo">
												<img className="photo-navbar-user" src={infoUser.image}/>
												<p>Hola, {infoUser.username}</p>
											</div>
											<Link to={'/personalzone'}><span>Zona Personal</span></Link>
											<hr/>
											<Link to={'/'}><span onClick={logOut}>Cerrar Sesion</span></Link>
											<br/>
										</div>
									}
								</li>
								<li className="nav-item">
									<Link to="/cart" onClick={window.location.reload}>
										<p className="nav-link cart-icon-navbar" style={{ color: "white" }} ><i className="fa-solid fa-cart-shopping"></i></p>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

