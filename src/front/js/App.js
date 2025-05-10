import React from "react";
import { PasswordResetProvider } from "./PasswordResetContext"; // Importamos el proveedor
import ResetPassword from "./ResetPassword"; // Importamos el componente de recuperación de contraseña
import PetsView from "./PetsView"; // Vista de mascotas

function App() {
  return (
    <PasswordResetProvider>
      <div className="App">
        <h1>Aplicación de Recuperación de Contraseña y Mascotas</h1>
        <ResetPassword /> {/* Componente de recuperación de contraseña */}
        <PetsView /> {/* Componente de vista de mascotas */}
      </div>
    </PasswordResetProvider>
  );
}

export default App;
