import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { sendImage, updateUser } from '../apiservices/callToApi'

export const PersonalNavbar = ({ setImageUrl, infoUsers }) => {
    const { store, actions } = useContext(Context);
    const infoUser = store.infoUser;
    const [file, setFile] = useState("");

    const changeUploadImage = async (e) => {
        setFile(e.target.files[0]);
    };

    const handleClickImage = async () => {
        let dataUser = infoUsers || infoUser;
        const data = await sendImage(file);
        setImageUrl(data);
        await updateUser(dataUser, data);
        actions.userIndividual();
        setFile('');
    };

    return (
        <>
            <div className="d-flex mb-4 pt-4 ms-5">
                <div className="profile-photo pe-3">
                    <div className="position-relative" style={{ width: "10em", height: "10em" }}>
                        <div className="upload-image ">
                            <img className="photo-personal-zone" src={infoUser.image ? infoUser.image : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} />
                            <div className='round'>
                                <input type='file' accept='image/*' onChange={changeUploadImage} />
                                <i className="p-2 icon-pen fa-solid fa-pen"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text my-auto fs-3">
                    <div className="mb-0 pb-0">
                        <p className="mb-0 message-personal">Hola, <b>{infoUser.username}</b>!</p>
                    </div>
                    <div className="mt-0">
                        <button onClick={() =>
                            actions.setEdit()
                        } type="button" className="btn edit-button"><i className="fa-solid fa-pen-to-square"></i> Editar información</button>
                    </div>
                    {file &&
                        <button className='btn edit-button' onClick={handleClickImage}>Confirmar foto <i class="fa-solid fa-circle-check"></i></button>
                    }
                </div>
            </div>
        </>
    )
}