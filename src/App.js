import React from 'react';
import './front/styles/home.css';
import NavBar from './front/js/component/Navbar';
import Dashboard from './front/js/component/Dashboard';

const App = () => {
  return (
    <div>
      <NavBar />
      <Dashboard />
      <main className="content">
        {/* Contenido de la landing page */}
        <section id="home">
          <h1>Bienvenidos a SchoolHub</h1>
          <p>Explora las características de nuestra plataforma.</p>
        </section>
      </main>
    </div>
  );
}

export default App;
