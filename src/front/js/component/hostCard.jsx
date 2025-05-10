import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";

export const HostCard = ({ viewMode }) => {  // Cambié 'use' por 'viewMode'
    console.log("HostCard viewMode:", viewMode);
    const { store, actions } = useContext(Context);

    const [hostData, setHostData] = useState({
        name: store.host_info?.name || '',
        address: store.host_info?.address || '',
        phone: store.host_info?.phone || '',
        courtType: store.host_info?.courtType || '',
    });

    const handleChange = e => {
        setHostData({
            ...hostData,
            [e.target.name]: e.target.value
        });
    };

    // const handleCancel = e => {
    // };

    const handleSubmit = e => {
        e.preventDefault();

        console.log("Submit data:", hostData, "viewMode:", viewMode);

        viewMode === 'host'
            ? actions.hostPage(hostData)
            : actions.updateHost(hostData);
    };

    return (
        <>
            {viewMode === 'hostPage' ? (
                <div className="card-body">
                    <p>FUNCIONAAA???</p>
                    <p className="card-text"><b>name:</b> {hostData.name || ''} </p>
                    <p className="card-text"><b>address:</b> {hostData.address || ''} </p>
                    <p className="card-text"><b>phone:</b> {hostData.phone || ''} </p>
                    <p className="card-text"><b>courtType:</b> {hostData.name || ''} </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input type="text" className="hostProfile__input" value={hostData.name} onChange={handleChange} placeholder="name" name="name" />
                    <input type="text" className="hostProfile__input" value={hostData.address} onChange={handleChange} placeholder="address" name="address" />
                    <input type="number" className="hostProfile__input" value={hostData.phone} onChange={handleChange} placeholder="phone" name="phone" />
                    <input type="text" className="hostProfile__input" value={hostData.courtType} onChange={handleChange} placeholder="court type" name="courtType" />

                    <input className="btn btn-success" type="submit" value="Enviar" />
                    {/* <input className="btn btn-danger" value="Cancelar" onClick={handleCancel}/> */}
                </form>
            )}
        </>
    );
};