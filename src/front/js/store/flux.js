import toast from "react-hot-toast";
import { toastExito, toastFallo } from "../component/Toaster/toasterIndex.jsx";
import { useSearchParams } from 'react-router-dom';
// Funcion que traduce los campos que faltan en sign-up si es que faltan
function extraerCamposFaltantes(mensaje) {
    if (!mensaje.includes("Faltan campos necesarios:")) {
        return [];
    }
    const partes = mensaje.split("Faltan campos necesarios:");
    if (partes.length === 1) {
        return [];
    }
    const campos = partes[1].trim();

    if (campos) {
        const c = campos.split(",").map(campo => campo.trim());
        const camposTraduidos = c.map((elem) => {
            if (elem == "name") {
                return "Nombre"
            }
            if (elem == "last_name") {
                return "Apellido"
            }
            if (elem == "phone") {
                return "Teléfono"
            }
            if (elem == "address") {
                return "Dirección"
            }
            if (elem == "email") {
                return "Correo Electronico"
            }
            if (elem == "password") {
                return "Contraseña"
            }
            if (elem == "rol") {
                return "Rol"
            }
        }).join(",").trim()

        return `Faltan campos nesarios: ${camposTraduidos}`
    }
    return [];
}

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            resutadosBusqueda: [],
            userProfile: {},
            terminoBusqueda: "",
            sidebarOpen:false
        },
        actions: {
            signup: async (body) => {

                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/sign-up", {
                        method: "POST",
                        body: body
                    });
                    const data = await response.json();
                    if (response.ok) {
                        toastExito(data.msj)
                        return data;
                    } else {
                        // Chequeo de tipo de error
                        if (data.msj.includes("Faltan campos necesarios:")) {
                            toastFallo(extraerCamposFaltantes(data.msj))
                            return
                        }

                        if (data.msj.includes("Correo ya registrado")) {
                            toastFallo(data.msj)
                            return
                        }
                        toastFallo("Algo salio mal.")
                        console.error("Error en la respuesta del servidor:", data);

                    }
                } catch (error) {

                    console.error("Error en el registro:", error);
                    // alert("Ocurrió un error al intentar registrarse");
                    toastFallo("Error al registrar el usuario")
                }
            },
            login: async ({ email, password }) => {
                try {
                    // console.log("Entramos a la funcion login...")
                    const response = await fetch(process.env.BACKEND_URL + "/api/log-in", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });

                    const data = await response.json();

                    if (response.ok) {

                        const store = getStore()
                        localStorage.setItem("user_token", data.token);
                        localStorage.setItem("userProfile", JSON.stringify(data.user_info));
                        setStore({ ...store, userProfile: data.user_info })
                        toastExito(data.msj)

                        return data;
                    } else {
                        // toastFallo("Error al intentar iniciar sesion")
                        if (data.msj.includes("Faltan campos necesarios:")) {
                            toastFallo(extraerCamposFaltantes(data.msj))
                            return
                        }
                        if (data.msj.includes("Contraseña equivocada")) {
                            toastFallo(data.msj)
                            return
                        }
                        if (data.msj.includes("Correo no esta registardo")) {
                            toastFallo(data.msj)
                            return
                        }
                    }
                } catch (e) {
                    console.error("Error en el registro:", error);
                    toastFallo("Error al registrar el usuario")
                    return null
                }
            },
            getMyProfile: async () => {
                try {
                    const token = localStorage.getItem("user_token");


                    const response = await fetch(process.env.BACKEND_URL + "/api/user", {
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-Type": "application/json"
                        }
                    });

                    const data = await response.json();

                    if (response.ok) {

                        setStore({ ...getStore(), userProfile: data });
                        return data;
                    } else {

                        // console.error("Error al obtener los datos del usuario", data);
                        alert(data.error || "Error al obtner el perfil de usuario");
                        return null;

                    }
                } catch (e) {
                    // console.error("Error en la solicitus para obtener el perfil de usuario", error);
                    alert("Ocurrio un error al obtener los datos del perfil freelance");
                    return null;
                }
            },
            checkLogInUser: () => {
                let token = localStorage.getItem("user_token");

                if (token == null) {
                    return false
                } else {
                    return true
                }
            },
            logOut: () => {
                localStorage.removeItem("user_token");
                setStore({ ...getStore(), userProfile: {} })
                toastExito("Cerraste exitosamente la sesion.")

            },
            busquedaFreelancers: async (busqueda) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/search`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(busqueda)
                    });

                    const data = await response.json()

                    if (response.ok) {
                        setStore({ ...getStore(), resutadosBusqueda: data.result })
                    } else {
                        toastFallo(data.msj)
                    }

                } catch (error) {
                    console.log(error)
                }
            },
            changeSearchTerm: (term) => {
                if (term !== false) {
                    setStore({ ...getStore(), terminoBusqueda: term })
                }
                if (term == false) {
                    setStore({ ...getStore(), terminoBusqueda: "" })
                }
            },

            
            updateFreelanceProfile: async (formData) => {

                const token = localStorage.getItem("user_token");

                try {

                    const response = await fetch(process.env.BACKEND_URL + "/api/freelance", {
                        method: "PUT",


                        headers: {
                          
                            "Authorization": "Bearer " + token
                        },
                        body: formData
                    });

                    const data = await response.json();

                    if (response.ok) {

                        toastExito("Perfil actualizado correctamente ✅");
                        setStore({ userProfile: data.result });
                        return data.result;
                    } else {
                        console.error("Error al actualizar perfil freelance:", data);
                        alert(data.error || data.msg || "Error al actualizar perfil freelance");

                       
                    }
                } catch (error) {
                    console.error("Error de red al actualizar perfil freelance:", error);
                    alert("Error de conexión con el servidor");
                }
            },
            createProduct: async (productData) => {
                const token = localStorage.getItem("user_token");
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/service", {
                        method: "POST",
                        headers: {
                        
                            "Authorization": "Bearer " + token
                        },
                        body: productData
                    });

                    const data = await response.json();

                    if (response.ok) {
                        alert("Producto agregado correctamente ✅");
                        return data;
                    } else {
                        
                        alert(data.error || "Error al agregar producto");
                    }
                } catch (error) {
                    console.error("Error al agregar producto:", error);
                    alert("Ocurrió un error al intentar añadir producto");
                }
            },

            getMyFreelanceProfile: async (freelance_id) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/freelance/${freelance_id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            // Incluye el token si es necesario
                            "Authorization": "Bearer " + localStorage.getItem("user_token")
                        }
                    });

                    const data = await response.json();

                    if (response.ok) {
                        // Almacena los datos en el estado global
                        const store = getStore();
                        setStore({ ...store, freelancerProfile: data });

                        return data; // Devuelve los datos si es necesario
                    } else {
                        // console.error("Error al obtener los datos del usuario:", data);
                        alert(data.error || "Error al obtener el perfil de usuario");
                        return null;
                    }
                } catch (e) {
                    console.error("Error en la solicitud para obtener el perfil de usuario:", e);
                    alert("Ocurrió un error al obtener los datos del perfil freelance");
                    return null;
                }
            },

            getSingleService: async (serviceId) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/service/${serviceId}`);

                    const data = await response.json();

                    if (response.ok) {
                        return data;
                    } else {
                        console.error("Error en la respuesta del servidor:", data);
                    }
                } catch (error) {
                    console.error("Error al agregar producto:", error);
                }
            },
            createOrder: async (body) => {
                const token = localStorage.getItem("user_token");
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/create-order`, {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(body)
                    });
                    const data = await response.json();


                    if (response.ok) {
                        return data;
                    } else {
                        console.error("Error en la respuesta del servidor:", data);
                    }
                } catch (error) {
                    console.error("Error al agregar producto:", error);
                }
            },
            getOrders: async () => {
                const token = localStorage.getItem("user_token");
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/order`, {
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer " + token,
                        },
                    });
                    const data = await response.json();


                    if (response.ok) {
                        return data;
                    } else {
                        console.error("Error en la respuesta del servidor:", data);
                    }
                } catch (error) {
                    console.error("Error al agregar producto:", error);
                }
            },


 

            checkFavorite: async (body) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/favorite/check`, {

                        method: "POST",
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(body)
                    })

                    const data = await response.json()
                    

                    if (response.ok) {
                        return data
                    }



                } catch (e) {
                    console.log("error", e)
                }
            },
            addOrRemoveFavorite: async (body) => {
                const token = localStorage.getItem("user_token");
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/favorite/change`, {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(body)
                    })

                    const data = await response.json()


                    if (response.ok) {
                        return data
                    }

                } catch (e) {
                    console.log("err9or", e)
                }
            },
            getAllFavorites: async () => {
                const token = localStorage.getItem("user_token");
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/favorites/all`, {
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer " + token,
                        },
                    });
                    const data = await response.json();


                    if (response.ok) {
                        return data;
                    } else {
                        console.error("Error en la respuesta del servidor:", data);
                    }
                } catch (error) {
                    console.error("Error al agregar producto:", error);
                }
            },
            getAllComments: async (freelance_id) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/comment/freelance/${freelance_id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })

                    if (response.ok) {
                        const data = await response.json()

                        return data
                    }
                } catch (e) {
                    console.log(e)
                }

            },
            getAllCommentsMade: async () => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/comment/user`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("user_token")
                        },
                    })
                    const data = await response.json()
                    if (response.ok) {
                        return data
                    } else {
                        return (data)
                    }
                } catch (e) {
                    console.log(e)
                }

            },
            postComment: async (body) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/comment/add`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("user_token"),
                        },
                        body: JSON.stringify(body)
                    });

                    const data = await response.json()

                    if (response.ok) {

                        return data
                    } else {
                        return data
                    }
                } catch (e) {
                    console.log(e)
                }

            },
            deleteComment: async (body) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/comment/delete`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("user_token"),
                        },
                        body: JSON.stringify(body)
                    });

                    const data = await response.json()

                    if (response.ok) {

                        return data
                    } else {
                        return data
                    }
                } catch (e) {
                    console.log(e)
                }

            },
            toggleSideBar:()=>{
                const value=getStore().sidebarOpen
                setStore({...getStore(),sidebarOpen:!value})
            }
        },
    };
};

export default getState;
