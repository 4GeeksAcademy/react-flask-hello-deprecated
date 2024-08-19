import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import { Context } from "../store/appContext";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";


export const Login = () => {

	const { store, actions } = useContext(Context)
	const navigate = useNavigate();

	const clientID = "715425283913-rjqjvf4uv4d78qc39hip0pdctti1mcja.apps.googleusercontent.com"

	useEffect(() => {
		const start = () => {
			gapi.auth2.init({
				clientId: clientID
			})
		}
		gapi.load("client:auth2", start)
	}, [])
	const onSuccess = (response) => {
		console.log(response)
		//conectar con los actions de flux para hacer el login y luego con la base de datos.
	}
	const onFailure = () => {
		console.log('Algo salió mal')
	}

	const formik = useFormik({
		initialValues: {
			correo: '',
			clave: ''
		},
		validationSchema: Yup.object({
			correo: Yup.string().email("Debes introducir un email válido").required('Email requerido'),
			clave: Yup.string().min(6, '6 characters').required('Contraseña requerida'),

		}),

		onSubmit: async (values) => {
			const isLogged = await actions.iniciarSesion(values.correo, values.clave)
			if (isLogged) {
				Swal.fire({
					title: 'Bienvenido!',
					text: 'Ingresaste satisfactoriamente!',
					icon: 'success',
					timer: 4000
				})
				navigate("/perfil")
			} else {
				Swal.fire({
					title: 'Lo sentimos!',
					text: 'Ha habido un error en su correo o contraseña, intente nuevamente!',
					icon: 'error',
					timer: 4000
				})
				navigate("/vista-login")
			}
		},
	});

	// Función para "Olvidé mi contraseña"
	const handleForgotPassword = async () => {
		if (!formik.values.correo) {
			Swal.fire({
				title: 'Error',
				text: 'Por favor, ingresa tu correo electrónico antes de solicitar la recuperación.',
				icon: 'error',
				confirmButtonText: 'Aceptar'
			});
			return;
		}

		const { success, message } = await actions.solicitarRecuperacion(formik.values.correo);

		if (success) {
			Swal.fire({
				title: 'Correo enviado',
				text: message,
				icon: 'success',
				confirmButtonText: 'Aceptar'
			});
		} else {
			Swal.fire({
				title: 'Error',
				text: message,
				icon: 'error',
				confirmButtonText: 'Aceptar'
			});
		}
	};



	return (
		<div className="form-container2 text-center mb-3 border border-3 rounded">
			<form action="#" id="login-form" onSubmit={formik.handleSubmit}>
				<h2 className="title fw-semibold text-secondary">Iniciar sesión</h2>

				<div className="left">
					<div className="d-flex justify-content-center">
						<input type="email" className="form-control m-2" name="correo" placeholder="Email:"
							if='correo'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.correo} />
						{formik.touched.correo && formik.errors.correo ? (
							<div className="text-danger">{formik.errors.correo}</div>
						) : null}
					</div>

					<div className="d-flex justify-content-center">
						<input type="password" className="form-control m-2" name="clave" placeholder="Password:"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.clave} />
						{formik.touched.clave && formik.errors.clave ? (
							<div className="text-danger">{formik.errors.clave}</div>
						) : null}
					</div>
					<div>
						<button type="submit" className="btn btn-login-registro  btn-primary mt-2">Iniciar sesión</button>
					</div>
				</div>
				<div className="right">
					<div className="buttons-container mt-2 d-flex justify-content-center">
						<GoogleLogin className="btn-login-registro d-flex justify-content-center" clientId={clientID} onSuccess={onSuccess} onFailure={onFailure} cookiePolicy="single_host_policy" />
					</div>
					<div className="p-2">
						<Link to="#" onClick={handleForgotPassword} className="login__forgot m-3">Olvidé mi contraseña</Link>
					</div>
					<div className="linea-divisoria">
						<span className="linea"></span>
						<span className="circulo"></span>
						<span className="linea"></span>
					</div>
					<div className="p-2">
						<p className="sign-up-label">
							No tienes una cuenta?<Link to="/vista-register" className="login__forgot m-3">Regístrate</Link>
						</p>
					</div>
				</div>
			</form>
		</div>
	);
};