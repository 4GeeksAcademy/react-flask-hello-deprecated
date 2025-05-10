import { jwtDecode } from "jwt-decode";
const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            user: null,
            token: null,
            message: null,
            refreshTimer: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
            dogFood: [],
            catFood: [],
            exoticFood: [],
            accessories: [],
            productos: [],
            cart: [],
            pets: []
        },
        actions: {
            // Use getActions to call a function within a fuction
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            login: async (email, password, navigate) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password })
                    });
            
                    if (!resp.ok) throw new Error("Error al iniciar sesión");
            
                    const data = await resp.json();
                    const token = data.token;
                    if (!token) throw new Error("No se recibió el token");
            
                    sessionStorage.setItem("token", token); // 🔹 Guardar en sessionStorage
                    sessionStorage.setItem("user", JSON.stringify(data.user));
            
                    setStore({ token:data.token, user: data.user });
                    navigate("/");
                } catch (error) {
                    console.error("Error al iniciar sesión", error);
                    alert("Error al iniciar sesión");
                }
            },
            


            signup: async (dataUser, navigate) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(dataUser)
                    });

                    if (!resp.ok) {
                        throw new Error("Error en el registro");
                    }

                    const data = await resp.json();
                    console.log("Usuario registrado exitosamente", data);

                    const token = data.token;
                    if (!token) {
                        throw new Error("No se recibió el token");
                    }

                    sessionStorage.setItem("token", token);
                    setStore({ token });

                    const actions = getActions();
                    actions.getUser();
                    navigate("/");
                } catch (error) {
                }
            },
            getUser: async () => {
                try {
                    const token = sessionStorage.getItem("token");
                    if (!token) throw new Error("No token found");

                    const resp = await fetch(`${process.env.BACKEND_URL}/api/user`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    if (!resp.ok) {
                        throw new Error("Error al obtener el usuario");
                    }

                    const data = await resp.json();
                    setStore({ user: data });

                    // Obtener las mascotas del usuario
                    getActions().getPets(data.id);

                } catch (error) {
                    console.error("Error al obtener usuario:", error);
                    getActions().logout(); // 🔹 Si hay un error, cerrar sesión automáticamente
                }
            },

            // Cerrar sesión si el usuario está inactivo
            logout: () => {
                console.log("Cerrando sesión por inactividad o token expirado...");
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("user");
                clearTimeout(getStore().refreshTimer);
                setStore({ token: null, user: null, refreshTimer: null });
                window.location.href = "/";
            },



            loadUserFromStorage: async () => {
                const token = sessionStorage.getItem("token"); // 🔹 Recuperar desde sessionStorage
                const user = sessionStorage.getItem("user");

                if (token && user) {
                    try {
                        // Validar si el token sigue siendo válido
                        const resp = await fetch(`${process.env.BACKEND_URL}/api/user`, {
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        });

                        if (!resp.ok) {
                            throw new Error("Token inválido o expirado");
                        }

                        setStore({ token, user: JSON.parse(user) });
                    } catch (error) {
                        console.error("Error validando el token:", error);
                        getActions().logout(); // Si el token no es válido, cerrar sesión
                    }
                } else {
                    console.log("No hay usuario autenticado, pero no redirigimos aún.");
                }
            },


            // Programar la renovación del token
            scheduleTokenRefresh: (timeUntilRefresh) => {
                if (timeUntilRefresh > 0) {
                    console.log(`Renovación del token programada en ${timeUntilRefresh / 1000} segundos`);
                    const refreshTimer = setTimeout(() => {
                        console.log("Intentando renovar el token...");
                        getActions().refreshToken();
                    }, timeUntilRefresh);

                    setStore({ refreshTimer });
                }
            },

            // Simular renovación del token
            refreshToken: async () => {
                const token = sessionStorage.getItem("token");
                if (!token) return getActions().logout();

                try {
                    // Aquí podrías hacer una solicitud al backend para renovar el token
                    // Pero en este caso, simplemente estamos extendiendo su validez en el frontend.
                    const newToken = token; // 🔹 Aquí normalmente pedirías uno nuevo al backend.

                    sessionStorage.setItem("token", newToken);
                    setStore({ token: newToken });

                    // Volver a programar la renovación
                    const decoded = jwtDecode(newToken);
                    const expirationTime = decoded.exp * 1000;
                    const currentTime = Date.now();
                    getActions().scheduleTokenRefresh(expirationTime - currentTime - 60000);

                } catch (error) {
                    console.error("Error renovando el token:", error);
                    getActions().logout();
                }
            },


            //TRAER ALIMENTO POR GRUPOS
            getDogFood: async () => {
                const myHeaders = new Headers();
                myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8Cs4yarcs6pKkdu0hlKHsZs0q_CxPIxRcsYOazLvQz4rP7s5FWFmvGJndFqy0N7fvoY5B6Jou5i4ZPgwsQZsEYGDV4DoaNhJP3xwIvv1aGmoRIVdScF1G2c_hWBWqeCTHFNCvGD1Dy0sm3kBmaNdXiMsSO0myHKUFvlWHCed2AdtyCiC6CHBqk9DHs32cYjJV4GQr4cxW2IXl6QDukWwCPSYuzTnP699Rz_4pCbB8OPOQNBDyDtdks_LUoMZR2Qt6IWKmUnLGt-n3JLFjeQMZiSeKEXKNTcJknrz4p25p9-5rh3BY2FBX_kg6MtH3cLbqOyS6yqrG4cjJPpyZbVfN3iEYSR6lzEGiGZDFPvokcj_PM8fq32HR1_olrhti8nYtDctNR_8YRewW5quhBNW6mtF_-SqGTbCQVH1CiLUF2UKK_H_nGmwvWAce2n4Cdw1BLUCZhlCr3GAKWJWHqLI1K5n9OekmI4zs0TI_60R6urTRxIQx2IgkRPYizg-AUdyr6bORhYr7s3c6oFBrdA4yBShqyJFOo4fuMkQuHflmg717cZeB1MDnWgSm9Xnl4qmOlcta0fCSq15GNUPvXhAwvclIoK9NTrmSSd1wvRhoqz7ypodxTSOafQx0ybhJZwTxDeS_gv-4KjbyFngwj7Bj1TluB2qE5Hijbi4uhZb2KILE9AGYHKWSW-IWoSmEXW71c7HhH8mBEbBxidpsSi_Rip3CdXL2oUO-8TGtLx2HgJtExj_7AyTD1trSanlKgDurPSEfDuXuwtqxawfWf0a1sbp9BGk0pRLOA-tVKrxmMiFAPiNCVC1W2EXb95TKydzKIwtbcC70YyDJ4dFwnHrQmgPYxzIz7PYzICzKqZ-VDpO4lf7C3jf4OBJ9ZMV4JRvPiR2kUwMNX_c5CuMLaKrZNzqCFwZBUa4N4AUyTT83mtzFQGAZjMXDeZNok7mjTYBp121qquiSKX8ft05b1MTsVtRfg3ETiFdOHmYQ2-1EcSwBY-VhjWIlkQiFr1yBWXk-g");

                const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                };

                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/foods/dog", requestOptions);

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setStore({ dogFood: data });
                } catch (error) {
                    console.error('Error fetching dog food:', error);
                }
            }




            ,
            getCatFood: async () => {

                const myHeaders = new Headers();
                myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8Cs4yarcs6pKkdu0hlKHsZsFuWJUB8pT978IgBH2YtuNtjrSfloWcBx8Cb4ny9waQSc6YIxDXdFsnq7Re1iGbqt37RMJ8vfb6ibKLFqvloDFsbiBuxDcqwi_MvYRhr2Z463usLkj3RbhHXQfm0TDnuAtNaE3deMSqRX9yv4T0Ui6indSlqpCNa-EX0tvUPEUYniNtvBPGilr_PC-U4inRAN5RaUZvcfD9vs4fenjYjUAaDpz49MnUZT8uGDozBeAZynLSYkXtpY9Rb2GuG-eOvk-8noe3tIekVKBOTjnaeis5QUJJpYcv73D6GOrYSIpavdb29mY6QWEsir-s4vxW2wE0dCb8n5g4MldUigDSxrKnndHoBleQih8VqWGo5AZKTYLT3Y735A7ZsmFGvFjRGrrGCPQ6YU28RddH4ieKxoVlTt2PG2uD17_QI5FmUNuvz3Z8YDAK878jEXK-_jXm5SIi4oLvfCr9sezmoc8NgcvJBAH0lVlJCf3kz9Z7_y_5wwU9a4Nk6-rH2p__Jb49iHxfOuRu0EzOLdNHiPfznR8iEp41VsK7ie7ECmM5Q6SANKFM9AtYkbXqCmn5tAdmrCFaGKNAu8w7gZ_r97mDMzcHVOwUktErNC1y2j6yUPv6SAU9hVk4_xFev-2wI7h5PEaPCY3khPgI6Z1UPNC_SkodFGHbEdRUSMc8ICYoAv4llTD8xtfOqzMDms4HG1xcbJrE1NTWh4rpfv7KiEIi6iqE6uizX7_CmWJkcA9SGig9hk9A9abtYb2Pg8Z8GG2cEan7FFpl7kbvTobFfSGn_N9ukSCqYuuoldgSno8yyH5P3E7oqqVnO1eT3kpRGZ9EdtmL5zXv8Fs-x3GDrQ2z1_V6sqMxy6LlXHXJ7m6MYUy4sET4nISyUJ1H2eBbC-Ttk7_7om7ByATu_oEZjPFefBf7sXaCZ2ng9ZBYYOOZHtbUEs2rrFAiL6dmrgjKVaXUyz3KiiP73Dy5OR7g9ccYBD5t74jdyVYPLmgoasQocdBEA");

                const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                };

                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/foods/cat", requestOptions);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    setStore({ catFood: data });
                } catch (error) {
                    console.error('Error fetching cat food:', error);
                }
            }
            ,

            getExoticFood: async () => {
                const myHeaders = new Headers();
                myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8Cs4yarcs6pKkdu0hlKHsZuqp5-e7T1vVCCdEQ0C1wStd1vPjajnZKjnPSA5Hq6rqD8KnBNHzrxCrSBqwnlunA0rkm36DsRzpvbpKLHVNklCfX8GBsMZKstrANOENBUzsSi1PBxW5_TibtPeRePzgNe5pBHuYx5F-1zm7-FoplLOZKZUFeRu1ua1DgiPeOiqvYSnKMQISiWoLb64DlQlSfXIGkFzVDFsFNPJ5lN-NHmI9dQ4O8b8EtoLAvXug1GQ5WkthHTcarTf_lXY5fcoEJbvhObGkUw7LC07jfKn2BTk27bZGx_F2kXNKq2N32CJ_46MMiulhV3sVpuuBUenZ-P7eLMcyMYuz6LcVrybPlrmHBiCnIbgcmgn-jnL-P3rcWL49L8RpPU84Ul4CaOZTFZ7eFCUqa1m1YKjX21YEdJlEm8fyYpFYcFp_9mGziKaxChcel7DevH4J4NV-E1mEUnQP-wDBMVq1IH0wdb4_HSnZ8aBhyyb8GvuEuLIhlH4soY8xtKNlaM73kynXCEhJ2OH-eKM6XIkWQHVIENwRoWzjj8G-8jQcJjz1Clyo9lMuFB98AWfsJgqe_PO7PgIw_Ms8_hRKyGG_aej9UuBo8rS-u4vTGaj5v_1vp6_PrZ-qEp8iyGGK_0OERl5OH0S3_mcXOd1wQcpFQ76RR6qtXqju2G8WkN9e3xC9XvP3SWVDIc5195fVj_1gRGLUCC20Uu5uPC0yzuE2X_TrcjKq0-SeWiyVIphc1T7AoJ2PvAu74js-66UPPcjXqoQvGXCzwrwhPdzXAp8n6sVwGcfRthrk2AOD4U8XJz68aBA5aRx77sqsMKKFIbCRXjRfOcAoa214qR5Oz7-nnKj1dII9Rx_g9ZD7SS_Mjm5Sk3M_Mr0zZNDzN7YWd_j3WhN9Gvr1MOeU6aFKssi2wzLgyNAVHNaXxjKms7cV1bDDwVzfYcHa6L-oLvvPk1FRmoRsD4J_3I7TgE1iO2LOtWD4ZLYilAcmmiHh3OPqNpQrKkl5uK2zg");

                const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                };

                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/foods/exotic", requestOptions);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    setStore({ exoticFood: data });
                } catch (error) {
                    console.error('Error fetching cat food:', error);
                }
            }
            ,

            getAccessories: async () => {
                const myHeaders = new Headers();
                myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8Cs4yarcs6pKkdu0hlKHsZuqp5-e7T1vVCCdEQ0C1wStd1vPjajnZKjnPSA5Hq6rqD8KnBNHzrxCrSBqwnlunA0rkm36DsRzpvbpKLHVNklCfX8GBsMZKstrANOENBUzsSi1PBxW5_TibtPeRePzgNe5pBHuYx5F-1zm7-FoplLOZKZUFeRu1ua1DgiPeOiqvYSnKMQISiWoLb64DlQlSfXIGkFzVDFsFNPJ5lN-NHmI9dQ4O8b8EtoLAvXug1GQ5WkthHTcarTf_lXY5fcoEJbvhObGkUw7LC07jfKn2BTk27bZGx_F2kXNKq2N32CJ_46MMiulhV3sVpuuBUenZ-P7eLMcyMYuz6LcVrybPlrmHBiCnIbgcmgn-jnL-P3rcWL49L8RpPU84Ul4CaOZTFZ7eFCUqa1m1YKjX21YEdJlEm8fyYpFYcFp_9mGziKaxChcel7DevH4J4NV-E1mEUnQP-wDBMVq1IH0wdb4_HSnZ8aBhyyb8GvuEuLIhlH4soY8xtKNlaM73kynXCEhJ2OH-eKM6XIkWQHVIENwRoWzjj8G-8jQcJjz1Clyo9lMuFB98AWfsJgqe_PO7PgIw_Ms8_hRKyGG_aej9UuBo8rS-u4vTGaj5v_1vp6_PrZ-qEp8iyGGK_0OERl5OH0S3_mcXOd1wQcpFQ76RR6qtXqju2G8WkN9e3xC9XvP3SWVDIc5195fVj_1gRGLUCC20Uu5uPC0yzuE2X_TrcjKq0-SeWiyVIphc1T7AoJ2PvAu74js-66UPPcjXqoQvGXCzwrwhPdzXAp8n6sVwGcfRthrk2AOD4U8XJz68aBA5aRx77sqsMKKFIbCRXjRfOcAoa214qR5Oz7-nnKj1dII9Rx_g9ZD7SS_Mjm5Sk3M_Mr0zZNDzN7YWd_j3WhN9Gvr1MOeU6aFKssi2wzLgyNAVHNaXxjKms7cV1bDDwVzfYcHa6L-oLvvPk1FRmoRsD4J_3I7TgE1iO2LOtWD4ZLYilAcmmiHh3OPqNpQrKkl5uK2zg");

                const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                };

                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/accessories", requestOptions);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    setStore({ accessories: data });
                } catch (error) {
                    console.error('Error fetching accessories:', error);
                }
            }
            ,


            getUser: async () => {
                try {
                    const token = sessionStorage.getItem("token");
                    if (!token) throw new Error("No token found");

                    const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    if (!response.ok) throw new Error("Error al obtener el usuario");

                    const data = await response.json();
                    setStore({ user: data });

                    // Una vez que tenemos el usuario, obtenemos sus mascotas
                    getActions().getPets(data.id);

                } catch (error) {
                    console.log("Error al obtener usuario", error);
                }
            },

            getPets: async (userId) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/pets`);
                    if (!resp.ok) throw new Error("Error obteniendo mascotas");

                    const allPets = await resp.json();

                    // Filtrar mascotas solo del usuario autenticado
                    const userPets = allPets.filter(pet => pet.user_id === userId);
                    setStore({ pets: userPets });

                } catch (error) {
                    console.log("Error al obtener mascotas", error);
                }
            },





            getMessage: async () => {
                try {
                    // fetching data from the backend
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
                    const data = await resp.json()
                    setStore({ message: data.message })
                    // don't forget to return something, that is how the async resolves
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error)
                }
            },
            // Modificación de la función createOrder en getState
            // createOrder: async (orderData) => {
            // 	const myHeaders = new Headers();
            // 	myHeaders.append("Content-Type", "application/json");
            // 	myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem("token")}`);

            // 	const raw = JSON.stringify(orderData);

            // 	const requestOptions = {
            // 		method: "POST",
            // 		headers: myHeaders,
            // 		body: raw,
            // 		redirect: "follow",
            // 	};

            // 	try {
            // 		const id = JSON.parse(sessionStorage.getItem("user")).id;
            // 		const response = await fetch(`${process.env.BACKEND_URL}/api/order/${id}`, requestOptions);
            // 		const result = await response.json();
            // 		console.log(result);
            // 		// Manejar respuesta de éxito o error

            // 		return result;

            // 	} catch (error) {
            // 		console.error(error);
            // 	}
            // }

            createOrder: async (orderData) => {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem("token")}`);

                const raw = JSON.stringify(orderData);

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow",
                };

                try {
                    const id = JSON.parse(sessionStorage.getItem("user")).id;
                    const response = await fetch(`${process.env.BACKEND_URL}/api/order/${id}`, requestOptions);

                    if (!response.ok) {
                        throw new Error("Error al crear la orden");
                    }

                    const result = await response.json();
                    console.log("Orden creada exitosamente:", result);

                    // Asegúrate de que el backend devuelva un objeto con `success: true`
                    return { success: true, ...result };
                } catch (error) {
                    console.error("Error al enviar la orden:", error);
                    return { success: false, error: error.message };
                }
            }
            ,

            createPet: async (newPet) => {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem("token")}`)
                const raw = JSON.stringify(newPet);

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw
                };

                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/pets`, requestOptions);
                    if (!response.ok) {
                        throw new Error(`Error al añadir mascota: ${response.statusText}`);
                    }
                    const result = await response.json();
                    console.log(result);
                    return ({ success: true })
                } catch (error) {
                    console.error(error);
                }
            }
            ,


            addToCart: (item) => {
                const store = getStore(); // Obtiene el estado actual

                if (item) { // Verifica que el item no sea null o undefined
                    const productoExistente = store.cart.find(producto => producto.id === item.id);

                    if (productoExistente) {
                        // Si el producto ya está en el carrito, incrementa su cantidad
                        const nuevoCarrito = store.cart.map(producto =>
                            producto.id === item.id ? { ...producto, cantidad: (producto.cantidad || 1) + 1 } : producto
                        );
                        setStore({ cart: nuevoCarrito });
                    } else {
                        // Si el producto no está en el carrito, lo añade con cantidad 1
                        setStore({ cart: [...store.cart, { ...item, cantidad: 1 }] });
                    }
                } else {
                    console.error("No se puede añadir el producto: el item es inválido.");
                }
            }
            ,

            deletePet: async (id) => {
                const token = sessionStorage.getItem("token");
                const resp = await fetch(`${process.env.BACKEND_URL}/api/pet/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!resp.ok) {
                    throw new Error("Error al eliminar mascota");
                }

                // Actualiza el store: filtra la mascota eliminada
                const store = getStore(); // Obtén el estado actual
                setStore({
                    ...store,
                    pets: store.pets.filter(pet => pet.id !== id)
                });

                alert("Mascota eliminada exitosamente");
                return true;
            },

            editPet: async (id, petData) => {
                const token = sessionStorage.getItem("token");
                const resp = await fetch(`${process.env.BACKEND_URL}/api/pet/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(petData)
                });

                if (!resp.ok) {
                    throw new Error("Error al editar mascota");
                }

                // Se asume que el endpoint retorna un JSON con la mascota actualizada en la propiedad "pet"
                const data = await resp.json();

                // Actualiza el store: reemplaza la mascota actualizada en el array de mascotas
                const store = getStore();
                setStore({
                    ...store,
                    pets: store.pets.map(pet => pet.id === id ? data.pet : pet)
                });

                alert("Mascota editada exitosamente");
                return true;
            },


            // Función para eliminar un favorito directamente por su `uid`
            //   removeFavorite: (id) => {
            //  const store = getStore(); // Obtiene el estado actual
            //  setStore({
            //    cart: store.cart.filter((fav) => fav.id !== id), // Filtra y excluye el favorito con el UID dado
            //  });
            //   }
            //   ,


            changeColor: (index, color) => {
                //get the store
                const store = getStore();

                //we have to loop the entire demo array to look for the respective index
                //and change its color
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                //reset the global store
                setStore({ demo: demo });
            },

            updateUser: async (userData) => {
                try {
                    const token = sessionStorage.getItem("token");
                    if (!token) throw new Error("No token found");

                    const response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(userData)
                    });

                    if (!response.ok) {
                        throw new Error("Error al actualizar el usuario");
                    }

                    const updatedUser = await response.json();
                    setStore({ user: updatedUser }); // Actualiza el usuario en el estado global
                    alert("Perfil actualizado con éxito");

                } catch (error) {
                    console.error("Error al actualizar usuario:", error);
                    alert("Hubo un error al actualizar el perfil.");
                }
            },

            deleteUser: async () => {
                try {
                    const token = sessionStorage.getItem("token");
                    if (!token) throw new Error("No token found");

                    const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error("Error al eliminar la cuenta");
                    }

                    sessionStorage.removeItem("token"); // Elimina el token de autenticación
                    setStore({ user: null, token: null }); // Borra el usuario del estado global
                    alert("Cuenta eliminada correctamente");

                    window.location.href = "/"; // Redirige a la página de inicio o login

                } catch (error) {
                    console.error("Error al eliminar usuario:", error);
                    alert("Hubo un error al eliminar la cuenta.");
                }
            },

            getFoodSuggestions: async (pet_id) => {
				try {
				  const resp = await fetch(`${process.env.BACKEND_URL}/api/foods/suggestions/${pet_id}`, {
					method: "GET",
					headers: {
					  "Content-Type": "application/json",
					  "Authorization": "Bearer " + sessionStorage.getItem("token")
					}
				  });
				  if (!resp.ok) {
					console.error("Error al obtener sugerencias de comida, status:", resp.status);
					return [];
				  }
				  const data = await resp.json();
				  return data;
				} catch (error) {
				  console.error("Error al obtener sugerencias de comida:", error);
				  return [];
				}
			  },		

            removeFromCart: (productoId) => {
                setStore({
                    cart: getStore.cart.filter(item => item.id !== productoId),
                });
            }
            ,

            //Seteo para eliminar producto del carrito
            setCart: (newCart) => {
                setStore({
                    ...getStore,
                    cart: newCart, // Actualiza el carrito en el estado global
                });
            },

            loadCartFromStorage: () => {
                const cart = sessionStorage.getItem("cart");
                if (cart) {
                    setStore({ cart: JSON.parse(cart) });
                }
            },


        }
    };
};

export default getState;