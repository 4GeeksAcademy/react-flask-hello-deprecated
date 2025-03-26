import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { sendImage, updateUser } from "../apiservices/callToApi";


export const PersonalInfo = ({ imageUrl, setInfoUsers }) => {
    const { store, actions } = useContext(Context);
    const [updateInfo, setUpdateInfo] = useState({});

    const infoUser = store.infoUser

    const handleChange = (e) => {
        setUpdateInfo({ ...updateInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        let imageUpdate = imageUrl || updateInfo.image;
        await updateUser(updateInfo, imageUpdate);
        actions.userIndividual();
        store.edit = false
    };

    useEffect(() => {
        if (updateInfo) {
            setInfoUsers(updateInfo);
        };
    }, [updateInfo])

    useEffect(() => {
        setUpdateInfo(infoUser);
    }, [infoUser]);

    return (
        <>
            <div className="container-fluid">
                <h1 className="personal-zone-title">Zona personal</h1>
                <div className="border-top w-100 div-personal-zone">
                    <div className="w-50 mx-auto personal-info rounded">
                        <div className="personal-form">
                            <form>
                                <div className="mb-3 d-flex">
                                    <div className="labels-personal d-flex align-items-center">
                                        <label htmlFor="name" className="form-label me-2 my-auto">Nombre:</label>
                                    </div>
                                    <input type="text" className="input-personal form-control" name="name" onChange={e => handleChange(e)} aria-describedby="emailHelp" value={updateInfo.name ?? ""} disabled={!store.edit} />
                                </div>
                                <div className="mb-3 d-flex">
                                    <div className="labels-personal d-flex align-items-center">
                                        <label htmlFor="lastname" className="form-label me-2  my-auto">Apellido:</label>
                                    </div>
                                    <input type="text" className="input-personal form-control" name="lastname" onChange={e => handleChange(e)} aria-describedby="emailHelp" value={updateInfo.lastname ?? ""} disabled={!store.edit} />
                                </div>
                                <div className="mb-3 d-flex">
                                    <div className="labels-personal d-flex align-items-center">
                                        <label htmlFor="username" className="form-label me-2  my-auto">Usuario:</label>
                                    </div>
                                    <input type="text" className="input-personal form-control" name="username" onChange={e => handleChange(e)} aria-describedby="emailHelp" value={updateInfo.username ?? ""} disabled={!store.edit} />
                                </div>
                                <div className="mb-3 d-flex">
                                    <div className="labels-personal d-flex align-items-center">
                                        <label htmlFor="email" className="form-label me-2  my-auto">Email:</label>
                                    </div>
                                    <input type="email" className="input-personal form-control" name="email" onChange={e => handleChange(e)} aria-describedby="emailHelp" value={updateInfo.email ?? ""} disabled={!store.edit} />
                                </div>
                                <div className="mb-3 d-flex">
                                    <div className="labels-personal d-flex align-items-center">
                                        <label htmlFor="password" className="form-label me-2  my-auto">Contraseña:</label>
                                    </div>
                                    <input type={store.edit ? "text" : "password"} className="input-personal form-control" name="password" onChange={e => handleChange(e)} aria-describedby="emailHelp" value={updateInfo.password ?? ""} disabled={!store.edit} />
                                </div>
                                <div className="mb-3 d-flex">
                                    <div className="labels-personal d-flex align-items-center">
                                        <label htmlFor="address" className="form-label me-2  my-auto">Dirección:</label>
                                    </div>
                                    <input type="email" className="input-personal form-control" name="address" onChange={e => handleChange(e)} aria-describedby="emailHelp" value={updateInfo.address ?? ""} disabled={!store.edit} />
                                </div>
                                <div className="mb-3 d-flex">
                                    <div className="birth-personal d-flex align-items-center">
                                        <label htmlFor="birthday_date" className="form-label me-2  my-auto">Fecha de nacimiento:</label>
                                    </div>
                                    <input type="date" className="input-personal form-control" name="birthday_date" onChange={e => handleChange(e)} aria-describedby="emailHelp" value={updateInfo.birthday_date ?? ""} disabled={!store.edit} />
                                </div>

                            </form>
                        </div>
                        <div className="personal-button">
                            <button type="submit" className="btn cancel-button me-3" onClick={actions.setEdit} disabled={!store.edit}>Cancelar</button>
                            <button type="submit" className="btn save-button" onClick={handleSubmit} disabled={!store.edit} >Guardar información</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}