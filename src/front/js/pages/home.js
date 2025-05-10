import React from 'react';
import Login from '../component/Login';
import Clima from '../component/Clima';
import Formulario from '../component/Formulario';
import Footer from '../component/Footer';

const Home = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
        <Login />
        <Clima />
        <Formulario />
      </div>
      <Footer />
    </div>
  );
};

export default Home;

