import React, { useEffect, useState, useContext } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Container, Background } from './PasswordRecovery.jsx'
import Swal from 'sweetalert2'
import { Context } from '../store/appContext.js'

const PasswordReset = () => {
    const navigate = useNavigate()
    const { actions } = useContext(Context)
    const [newPassword, setNewPassword] = useState("")
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get("token")) {
            console.log(searchParams.get("token"))
        }

    }, [searchParams])

    const handleSubmit = async (e) => {
        e.preventDefault()

        let token = searchParams.get("token")

        try {
            const response = await actions.changePassword(newPassword, token)
            Swal.fire({ title: "Contraseña Actualizada correctamente", icon: "success", text: response.msg })
            setTimeout(() => {
                navigate("/login")
            }, 1000)
        } catch (error) {
            Swal.fire({ title: "Ha ocurrido un error al registrar la nueva contraseña", text: error.message, icon: "error" })

        }
    }


    return (
        <Background>
            <Container>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="container-fluid">
                        <div className="row mb-3">
                            <h4 className="m-3 text-center">Olvide mi contraseña    </h4>
                            <p className="text-light fs-6 fw-light text-center">
                                Ingresa tu nueva contraseña para acceder al sistema
                            </p>
                        </div>
                        <div className="row mt-2">
                            <div className="col-12 d-flex flex-column align-items-center">
                                <label htmlFor="password" className="form-label">
                                    Nueva contraseña:
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    className="form-control rounded-pill w-75"
                                    placeholder="YourPassword"
                                    required
                                    minLength={8}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12 text-center">
                                <button className="btn btn-outline-register">Establecer</button>
                            </div>
                        </div>
                    </div>
                </form>
            </Container>
        </Background>
    )
}

export default PasswordReset