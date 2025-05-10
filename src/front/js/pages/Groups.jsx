import React, { useCallback, useEffect, useState } from 'react'
import "../../styles/Groups.css";
import { FaUsers } from "react-icons/fa";
import { CgOptions } from "react-icons/cg";
import { TbBusinessplan } from "react-icons/tb";

export function Groups() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState()
  const [floatingMessage, setFloatingMessage] = useState()
  const [usersGroup, setUsersGroup] = useState([])
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [group, setGroup] = useState(() => {
    const savedGroup = localStorage.getItem('group')
    return savedGroup ? JSON.parse(savedGroup) : null
  })
  const [nameGroup, setNameGroup] = useState(group ? group.name : '')
  const [finances, setFinances] = useState([]);
  const [selectedFinance, setSelectedFinance] = useState(null);
  const [financeUser, setFinanceUser] = useState([]);
  const [financeAdded, setFinanceAdded] = useState(false);

  console.log('User:', user);
  console.log('Group:', group);

  useEffect(() => {
    if (!group && user.id_group) {
      getGroup();
    } else if (group) {
      setMessage(`You already belong to a group named: ${group.name}`);
    } else {
      setMessage('You don`t belong to any group; you can create a new one.');
    }
  }, [group, user])

  useEffect(() => {
    if (!group || !user) return;

    // Obtener usuarios del grupo
    const getUserGroup = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}api/get_users_group/${group?.id}`)
        const data = await response.json()
        if (response.ok) {
          setUsersGroup(data)
        }
      } catch (error) {
        console.log('Error getting user group', error)
      }
    }

    // Obtener finanzas
    const getFinancesUsers = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}api/get_finances/${user.id}`);
        const data = await response.json();

        if (response.status === 200) {
          setFinanceUser(data);
        }
      } catch (error) {
        console.error('Error al obtener las finanzas:', error);
      }
    };

    getUserGroup()
    fetchFinances();
    getFinancesUsers();
  }, [group, user])

  useEffect(() => {
    // Verificar si el grupo existe cada 30 segundos
    const intervalId = setInterval(async () => {
      if (!group) return; // Si no hay grupo, salir

      try {
        const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}api/get_group/${group.id}`);
        if (response.status !== 200) { // Si el grupo no existe
          localStorage.removeItem('group');
          setGroup(null);
          setFloatingMessage('The group has been deleted');
        }
      } catch (error) {
        console.error('Error al verificar el estado del grupo:', error);
      } finally {
        setTimeout(() => {
          setFloatingMessage(null);
        }, 3000);
      }
    }, 30000); // 30 segundos

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar
  }, [group]);


  //Obetener el Grupo del usuario
  const getGroup = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}api/get_user_group/${user.id}`)
      const data = await response.json()

      if (response.status === 200) {
        setGroup(data);
        localStorage.setItem('group', JSON.stringify(data));
      } else {
        console.log(data)
      }
    } catch (error) {
      console.log('Error al cargar el grupo', error)
    }
  }

  // Añadir usuario al grupo pasandole el id del grupo almadenado en el estado
  const addUserToGroup = async ({ id_group }) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}api/add_user_to_group/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'id_group': id_group }),
      })
      const data = await response.json()

      if (response.status === 200) {
        setUser(prevUser => ({
          ...prevUser,
          id_group: id_group
        }))
        await changeRol({ id_rol: 1 })
      } else {
        console.log(data)
      }
    } catch (error) {
      console.log('Error al añadir usuario al grupo', error)
    }
  }

  // Crear grupo pasandole el nombre y la descripción
  const createGroup = async ({ name, description }) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}api/create_groups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
      })
      const data = await response.json()

      if (response.status === 200) {
        localStorage.setItem('group', JSON.stringify(data))
        setGroup(data)
        await addUserToGroup({ id_group: data.id })
        location.reload()
      } else {
        console.log('Error al crear grupo', response)
      }
    } catch (error) {
      console.log('Error al crear grupo', error)
    }
  };

  // Cambiar el rol del usuario que crea el grupo a administrador
  const changeRol = async ({ id_rol }) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}api/change_rol/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "id_rol": id_rol }) // 1 es el id del rol de administrador y 2 el invitado
      })
      const data = await response.json()

      if (response.status === 200) {
        setUser(prevUser => ({
          ...prevUser,
          id_rol: id_rol
        }))
        localStorage.setItem('user', JSON.stringify({
          ...user,
          id_rol: id_rol
        }));
      } else {
        console.log(data)
      }
    } catch (error) {
      console.log('Error al cambiar rol', error)
    }
  }

  // Borrar Grupo
  const deleteGroup = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}api/delete_group/${group.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "id_group": group.id }),
      })
      const data = await response.json()

      if (response.status === 200) {
        localStorage.removeItem('group')
        setGroup(null)
        await changeRol({ id_rol: 2 })
        setInterval(() => { location.reload() }, 1000)
      } else {
        console.log(data)
      }
    } catch (error) {
      console.log('Error al cambiar rol', error)
    }
  }

  // Cambiar nombre del grupo
  const renameGroup = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}api/rename_group/${group.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "name": nameGroup })
      })
      const data = await response.json()

      if (response.status === 200) {
        setGroup(prevGroup => ({
          ...prevGroup,
          name: nameGroup
        }))
        setFloatingMessage('Group name changed successfully')
        await getGroup()
      } else {
        console.log(data)
      }
    } catch (error) {
      console.log('Error al cambiar rol', error)
    } finally {
      setTimeout(() => {
        setFloatingMessage(null)
      }, 3000)
    }
  }

  // Enviar invitación a un usuario
  const sendInvitation = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}api/send_invitation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 'email': email, 'id_group': group.id })
      })
      const data = await response.json()

      if (response.status === 200) {
        setFloatingMessage('Invitation sent successfully')
      } else {
        console.log(data)
      }
    } catch (error) {
      console.log('Error al enviar invitación', error)
    } finally {
      setTimeout(() => {
        setFloatingMessage(null)
      }, 3000)
    }
  }

  // Obtener finanzas
  const fetchFinances = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}api/get_finances_group/${group?.id}`);
      const data = await response.json();
      console.log("Ver finanzas del grupo", data); // Verifica los datos recibidos del backend

      if (response.status === 200) {
        setFinances(data);
      }
    } catch (error) {
      console.error('Error al obtener las finanzas:', error);
    }
  }, []);

  // Añadir finanza al grupo
  const addGroupFinance = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}api/add_group_finance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "id_group": group.id,
          "id_finance": selectedFinance.id,
          "id_user": user.id,
          "date": new Date().toISOString().split("T")[0],
        }),
      });
      const responseData = await response.json();

      if (response.ok) {
        setFloatingMessage("Finance added successfully");
        fetchFinances(); // Recargar la lista de finanzas
        setFinanceAdded(true); // Marcar que ya se añadió una finanza
      } else {
        console.error("Error en la respuesta del backend:", responseData);
      }
    } catch (error) {
      console.error("Error al añadir la finanza:", error);
    } finally {
      setTimeout(() => {
        setFloatingMessage(null);
      }, 3000);
    }
  };

  // Formulario para añadir finanza
  const handleAddFinanceSubmit = (e) => {
    e.preventDefault(); // Prevenir la acción por defecto
    if (selectedFinance) {
      addGroupFinance();
    }
  };

  // Manejar el evento de submit del formulario de creación de grupo y llamar a la función de creación de grupo
  const handleSubmit = (e) => {
    e.preventDefault()
    createGroup({ name, description })
  }

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="encabezado" role="alert">{message}</h2>

          {!group && (
            <div>
              <button type="button" className="btn create-group-btn" data-bs-toggle="modal" data-bs-target="#createGroup">
                Create Group
              </button>

              {/* Create Group */}
              <div className="modal fade" id="createGroup" aria-labelledby="createGroupLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="createGroupLabel">New Group</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">Name for Group</label>
                          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="description" className="form-label">Description</label>
                          <textarea className="form-control" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="submit" className="btn create-button">Create Group</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {group && (
            <div className="d-flex gap-2">
              {/* Botón Add Finance */}
              <button type="button" className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#addFinanceModal">
                <TbBusinessplan /> Add Finance
              </button>

              {/* Botón Users */}
              <div>
                <button type="button" className="position-relative btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <FaUsers /> Users
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {usersGroup.map(user => (
                    <li key={user.id} className="dropdown-item">{user.email}</li>
                  ))}
                </ul>
              </div>

              {/* Botón Options (solo para admin) */}
              {user?.id_rol === 1 && (
                <div>
                  <button type="button" className="position-relative btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <CgOptions /> Options
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><button className="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#renameGroup">Rename Group</button></li>
                    <li><button className="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#addUser">Add User</button></li>
                    <li className='delete-btn'><button className="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#deleteGroup">Delete Group</button></li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Transactions Section */}
        {group && (
          <section className="transactions-list">
            <h3>Recent Transactions</h3>
            <ul>
              {finances.map((item, key) => (
                <li key={key} className="transaction-item">
                  <div className="transaction-logo">
                    <img src={`https://unavatar.io/${item.name}`} alt={`${item.name} logo`} />
                  </div>
                  <div className="transaction-info">
                    <strong>{item.name}</strong>
                    <p className="description">
                      {item.description || "No description"} •
                      <span className="date">{new Date(item.date).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</span>
                    </p>
                  </div>
                  <div className="transaction-amount">
                    <span className={`amount ${item.category === "Expense" ? "expense" : "income"}`}>
                      {item.category === "Expense" ? "-" : "+"} {item.amount} $
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Rename Group */}
      <div className="modal fade" id="renameGroup" aria-labelledby="renameGroupLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="renameGroupLabel">Rename Group</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={renameGroup}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">New Name</label>
                  <input type="text" className="form-control" id="name" value={nameGroup} onChange={(e) => setNameGroup(e.target.value)} />
                </div>
              </form>
              {floatingMessage && <div className="alert alert-success" role="alert">{floatingMessage}</div>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn rename-button" onClick={renameGroup}>Rename Group</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para añadir finanza */}
      <div className="modal fade" id="addFinanceModal" aria-labelledby="addFinanceModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addFinanceModalLabel">Añadir Finanza al Grupo</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddFinanceSubmit}>
                <div className="mb-3">
                  <label htmlFor="selectFinance" className="form-label">Seleccionar Finanza</label>
                  <select
                    id="selectFinance"
                    className="form-select"
                    value={selectedFinance?.id || ""}
                    onChange={(e) => {
                      const selected = financeUser.find(finance => finance.id === parseInt(e.target.value));
                      setSelectedFinance(selected);
                    }}
                  >
                    <option value="">Selecciona una opción</option>
                    {financeUser.map((finance) => (
                      <option key={finance.id} value={finance.id}>
                        {finance.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={financeAdded} // Deshabilitar el botón si ya se añadió una finanza
                  >
                    Añadir Finanza
                  </button>
                </div>
                {floatingMessage && <div className="alert alert-success" role="alert">{floatingMessage}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Add User */}
      <div className="modal fade" id="addUser" aria-labelledby="addUserLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addUserLabel">Add User</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={sendInvitation}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Send Invitation to User</label>
                  <input type="text" className="form-control" id="name" placeholder='example@gamil.com' onChange={(e) => setEmail(e.target.value)} />
                </div>
              </form>
              {floatingMessage && <div className="alert alert-success" role="alert">{floatingMessage}</div>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn rename-button" onClick={sendInvitation}>Send Invitation</button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Group */}
      <div className="modal fade" id="deleteGroup" aria-labelledby="deleteGroupLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteGroupLabel">Surely you want to delete the group</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn delete-button" onClick={deleteGroup}>Delete Group</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
