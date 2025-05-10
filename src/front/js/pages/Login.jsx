import React, { useContext, useState, useEffect } from "react"
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"


const Login = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()



    const onSubmit = async (data) => {
      
        try {
            const res = await actions.login({
                email:data.email,
                password:data.password
            });
    
            if (!res) return; // si login falló, no sigas
    
            if (res?.msj === "Inicio de sesion exitosa") {
                setFormData({
                    email: '',
                    password: ''
                })}
    
                const rol = res.user_info.rol;
                console.log("ROL del usuario:", rol);
    
                if (rol === "freelance") {
                    navigate("/freeDash");
                } else if (rol === "user") {
                    navigate("/dashboard-usuario");
                } else {
                    navigate("/")}

        // await actions.login({ email: data.email, password: data.password })
        //     .then((res) => {
        //         if (res?.msj == "Inicio de sesion exitosa") {
        //             setFormData({
        //                 email: '',
        //                 password: ''
        //             })
        //             navigate("/")

        //         }
        //     })

        }catch (err) {
            console.error("Error inesperado en login:", err);
        }
    
    }
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // const { actions } = useContext(Context);
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" >
            <div className="w-50 p-4">
                <form noValidate className="" onSubmit={handleSubmit(onSubmit)}>
                    <h5 className="text-center mb-4">Ingresa los siguientes datos para iniciar sesion</h5>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Correo electrónico</label>
                        <input
                            {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                            id="inputEmail" name="email" type="email" className="form-control" aria-describedby="emailHelp" placeholder="Correo electrónico" value={formData.email}
                            onChange={handleChange} />
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
                            id="inputPassword" name="password" type="password" className="form-control" placeholder="Contraseña" value={formData.password}
                            onChange={handleChange} />
                        <div style={{ height: "20px" }}>
                            {errors.password && errors.password.type === "required" && (
                                <span className="text-white bg-danger" role="alert">Campo requerido.</span>
                            )}

                        </div>
                    </div>
                    <button type="submit" className="btn" id="registro" style={{ background: "#00D1B2", color: "aliceblue" }} >Iniciar sesion</button>
                    <Link to="/">
                        <button type="button" className="btn ms-2" id="cancelar" style={{ background: "#FF3860", color: "aliceblue" }} >Cancelar</button>

                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login