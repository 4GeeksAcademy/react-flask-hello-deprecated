import React from 'react';

const Formulario = () => {
  return (
    <div className="formulario-container" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Formulario</h3>
      <input type="text" placeholder="Nombre de actividad" style={{ margin: '10px 0', padding: '10px', width: '100%' }} />
      <input type="date" style={{ margin: '10px 0', padding: '10px', width: '100%' }} />
      <button style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
        Guardar
      </button>
    </div>
  );
};

export default Formulario;
