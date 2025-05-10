import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"


export const Registro = () => {
    const navigate = useNavigate()
    const { actions } = useContext(Context);
    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        phone: '',
        address: '',
        email: '',
        password: '',
        rol: ''
    });
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const [photo, setPhoto] = useState([])

    useEffect(() => {
        document.body.style.backgroundColor = '#CCD6F6';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const onSubmit = async (data) => {
        // e.preventDefault();
        

        const formDatatoSubmit = new FormData();
        formDatatoSubmit.append('name', data.name);
        formDatatoSubmit.append('last_name', data.last_name);
        formDatatoSubmit.append('phone', data.phone);
        formDatatoSubmit.append('address', data.address);
        formDatatoSubmit.append('email', data.email);
        formDatatoSubmit.append('password', data.password);
        formDatatoSubmit.append('rol', data.rol);
        formDatatoSubmit.append('photo', data.photo[0]);

        // console.log(data.photo)

        for (let [key, value] of formDatatoSubmit.entries()) {
            console.log(`${key}: ${value}`);
        }


        await actions.signup(formDatatoSubmit)
            .then((res) => {
                if (res.msj == "Usuario creado correctamente") {
                    setFormData({
                        name: '',
                        last_name: '',
                        phone: '',
                        address: '',
                        email: '',
                        password: '',
                        rol: ''
                    })
                    navigate("/iniciar-sesion")
                }
            })
            .catch((err) => {
                console.log(err)

            })



    };
    return (
        <div className=" d-flex flex-column align-items-center vh-100" >
            <h1 className="text-center m-5">¡Bienvenido a Workland!</h1>
            <div className="w-50 p-4 border rounded shadow" style={{ background: "aliceblue" }} >

                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <h5 className="text-center mb-4">Ingresa los siguientes datos para crear tu cuenta</h5>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre </label>
                        <input
                            {...register("name", { required: true, maxLength: 10 })}
                            id="name" name="name" type="text" className="form-control" placeholder="Nombre" value={formData.name}

                            onChange={handleChange} />
                        <div style={{ height: "20px" }}>
                            {errors.name && errors.name.type === "required" && (
                                <span className="text-white bg-danger" role="alert">Campo requerido.</span>
                            )}
                            {errors.name && errors.name.type === "maxLength" && (
                                <span className="text-white bg-danger" role="alert">Maximo 10 caracteres.</span>
                            )}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputLastName" className="form-label">Apellido </label>
                        <input
                            {...register("last_name", { required: true, maxLength: 10 })}
                            id="inputLastName" name="last_name" type="text" className="form-control" placeholder="Apellido" value={formData.last_name}
                            onChange={handleChange} />
                        <div style={{ height: "20px" }}>
                            {errors.last_name && errors.last_name.type === "required" && (
                                <span className="text-white bg-danger" role="alert">Campo requerido.</span>
                            )}
                            {errors.last_name && errors.last_name.type === "maxLength" && (
                                <span className="text-white bg-danger" role="alert">Maximo 10 caracteres.</span>
                            )}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPhoto" className="form-label">Subir Imagen </label>
                        <input 
                        {...register("photo")}
                        id="inputPhoto" name="photo" type="file" accept="image/*" className="form-control"
                            // value={photo}
                            onChange={(e) => setPhoto(e.target.files[0])} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPhone" className="form-label">Teléfono</label>
                        <input

                            {...register("phone", { required: true, maxLength: 10, minLength: 10, pattern: /^\d+$/ })}
                            id="inputPhone" name="phone" type="text" className="form-control" placeholder="Ingresa tu teléfono" value={formData.phone}
                            onChange={handleChange} />
                        <div style={{ height: "20px" }}>
                            {errors.phone && errors.phone.type === "pattern" && (
                                <span className="text-white bg-danger" role="alert">Solo numeros</span>
                            )}

                            {errors.phone && errors.phone.type === "maxLength" && (
                                <span className="text-white bg-danger" role="alert">Maximo 10 caracteres.</span>
                            )}
                            {errors.phone && errors.phone.type === "minLength" && (
                                <span className="text-white bg-danger" role="alert">Minimo 10 caracteres.</span>
                            )}
                            {errors.phone && errors.phone.type === "required" && (
                                <span className="text-white bg-danger" role="alert">Campo requerido.</span>
                            )}

                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputAddress" className="form-label">Dirección</label>
                        <input
                            {...register("address", { required: true, maxLength: 30 })}
                            id="inputAddress" name="address" type="text" className="form-control" placeholder="Ingresa tu dirección" value={formData.address}
                            onChange={handleChange} />
                        <div style={{ height: "20px" }}>
                            {errors.address && errors.address.type === "maxLength" && (
                                <span className="text-white bg-danger" role="alert">Maximo 30 caracteres.</span>
                            )}
                            {errors.address && errors.address.type === "required" && (
                                <span className="text-white bg-danger" role="alert">Campo requerido.</span>
                            )}

                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Correo electrónico</label>
                        <input
                            {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                            id="inputEmail" name="email" type="email" className="form-control" aria-describedby="emailHelp" placeholder="Email" value={formData.email}
                            onChange={handleChange} />
                        <div id="emailHelp" className="form-text">Tu correo está seguro con nosotros, no lo compartiremos con nadie.</div>
                        <div style={{ height: "20px" }}>
                            {errors.email && errors.email.type === "pattern" && (
                                <span className="text-white bg-danger" role="alert">Por favor ingresa un correo electrónico válido.</span>
                            )}
                            {errors.email && errors.email.type === "required" && (
                                <span className="text-white bg-danger" role="alert">Campo requerido.</span>
                            )}

                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="form-label">Contraseña</label>
                        <input
                            {...register("password", { required: true })}
                            id="inputPassword" name="password" type="password" className="form-control" placeholder="Password" value={formData.password}
                            onChange={handleChange} />
                        <div style={{ height: "20px" }}>
                            {errors.password && errors.password.type === "required" && (
                                <span className="text-white bg-danger" role="alert">Campo requerido.</span>
                            )}

                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="disabledSelect" className="form-label">Selecciona el modo de perfil</label>
                        <select 
                        {...register("rol", { required: true })}
                        id="disabledSelect" name="rol" className="form-select" value={formData.rol}
                            onChange={handleChange}>
                            <option value="">Selecciona una opción</option>
                            <option value="user">Usuario</option>
                            <option value="freelance">Freelance</option>
                        </select>
                        <div style={{ height: "20px" }}>
                            {errors.rol && errors.rol.type === "required" && (
                                <span className="text-white bg-danger" role="alert">Campo requerido.</span>
                            )}

                        </div>
                    </div>
                    <button type="submit" className="btn" id="registro" style={{ background: "#00D1B2", color: "aliceblue" }}>Registrar</button>
                    <Link to="/">
                        <button type="button" className="btn ms-2" id="cancelar" style={{ background: "#FF3860", color: "aliceblue" }} >Cancelar</button>
                    </Link>
                </form>

            </div>
        </div>

    );
};

export default Registro;

