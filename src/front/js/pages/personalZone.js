import React, { useEffect, useContext, useState } from 'react';
import { PersonalNavbar } from '../component/personalNavbar';
import { PersonalInfo } from '../component/personalInfo';
import { privateUser } from '../apiservices/callToApi';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

export const PersonalZone = () => {
    const { actions } = useContext(Context);
    const [imageUrl, setImageUrl] = useState('');
    const [infoUsers, setInfoUsers] = useState({});
    const navigate = useNavigate();

    const checkout = async () => {
        const verified = await privateUser();
        if (!verified) {
            navigate('/');
        };
    };

    useEffect(() => {
        checkout();
    });

    useEffect(() => {
        actions.setPositiveColors();
        actions.setNavbarVisibility();
    }, []);

    return (
        <div className="container-fluid dark-background text-white ">
            <PersonalNavbar setImageUrl={setImageUrl} infoUsers={infoUsers} />
            <PersonalInfo imageUrl={imageUrl} setInfoUsers={setInfoUsers} />
        </div>
    )
}