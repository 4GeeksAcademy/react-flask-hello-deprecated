import React, { useState } from 'react';
import Navbar from '../component/navbar';
import Carousel from '../component/Carousel';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Footer from '../component/footer';

const Home = () => {
    const [formToShow, setFormToShow] = useState(null);

    return (
        <div>
            <Navbar onShowForm={setFormToShow} />
            <div className="container mt-4">
                <Carousel />
                <div className="mt-5">
                    {formToShow === 'login' && <LoginForm />}
                    {formToShow === 'signup' && <SignupForm />}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;