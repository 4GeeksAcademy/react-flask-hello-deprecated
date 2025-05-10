import React, { useState, useEffect } from 'react';

const UserList = () => {
  // Estado para almacenar los usuarios
  const [users, setUsers] = useState([]);
  // Estado para manejar el estado de carga
  const [loading, setLoading] = useState(true);
  // Estado para manejar errores
  const [error, setError] = useState(null);

  // useEffect para hacer la solicitud a la API
  useEffect(() => {
    // Realizar la solicitud usando fetch
    fetch('https://effective-space-trout-vgvrqw54744fw95p-3001.app.github.dev/api/users')
      .then(response => {
        // Verificamos si la respuesta fue exitosa
        if (!response.ok) {
          throw new Error('Error al cargar los usuarios');
        }
        return response.json(); // Parseamos la respuesta como JSON
      })
      .then(data => {
        setUsers(data); // Guardar los datos de los usuarios en el estado
        setLoading(false); // Cambiar el estado de carga
      })
      .catch(error => {
        setError(error.message); // Manejar el error
        setLoading(false); // Cambiar el estado de carga
      });
  }, []); // El array vacío significa que esto solo se ejecuta una vez cuando el componente se monta

  // Si estamos cargando los datos
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si hay un error
  if (error) {
    return <div>{error}</div>;
  }

  // Si tenemos los usuarios
  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>ID:</strong> {user.id} - <strong>Email:</strong> {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
