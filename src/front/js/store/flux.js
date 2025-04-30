const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
            auth: localStorage.getItem('token') || false,
            user: null,
            token: null,
            player_info: null,
            host_info: null,
            tournaments: [],
            torneo: {}
		},
		actions: {

            /////////////////////////////////////////USER/////////////////////////////////////////

            getUserData: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL +"/api/protected", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });

                    if (!resp.ok) {
                        throw new Error("Error al obtener los datos del usuario");
                    }

                    const data = await resp.json();
                    console.log("Datos del usuario:", data);

                    setStore({ user: data.users});
                } catch (error) {
                    console.error("Error en getUserData:", error);
                }
            },

			register: async (formData) => { //POST USER SIGNUP
                try {
                    console.log("Form data antes de enviar:", formData);
                    const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData)
                    });

                    if (!resp.ok) {
                        const errorData = await resp.json();
                        throw new Error(errorData.message || "Error al registrar el usuario");
                    }

                    const data = await resp.json();
                    console.log("Usuario registrado:", data);
                    localStorage.setItem ('token', data.token)
                    setStore({ auth: true, token: data.token, user: data?.user_info, player_info: data?.player_info, host_info: data?.host_info});
                    localStorage.setItem('player', formData.player);
                    if (formData.player) {
                        return "/player/editProfile";
                    } 
                    return "/host/editProfile";
                } catch (error) {
                    console.error("Error en register:", error);
                }
            },

            login: async (formData) => {    //POST USER LOGIN
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
                    });

                    if (!resp.ok) {
                        throw new Error("Error al iniciar sesión");
                    }

                    const data = await resp.json();
                    console.log("Usuario logeado:", data);
                    localStorage.setItem ('token', data.token)
                    setStore({ auth: true, token: data.token, user: data?.user_info, player_info: data?.player_info, host_info: data?.host_info});
                    localStorage.setItem('player', data.user_info.player);
                    if (data.user_info.player) {
                        return "/player/profile";
                    } 
                    return "/host/profile";
                } catch (error) {
                    console.error("Error en login:", error);
                }
            },
			getMessage: () => {
                console.log("Mensaje inicial cargado");
			},


            /////////////////////////////////////////PLAYER/////////////////////////////////////////

            updatePlayer: async (playerData) => {   //PUT ONE PLAYER
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/getPlayers", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json",
                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                         },
                        body: JSON.stringify(playerData)
                    });

                    if (!resp.ok) {
                        throw new Error("Error al actualizar el perfil");
                    }

                    const data = await resp.json();
                    console.log("Usuario actualizado:", data);

                    setStore({ player_info: data.player});

                } catch (error) {
                    console.error("Error al actualizar el perfil:", error);
                }
            },

            getPlayers: async () => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/getPlayers", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
            
                    if (!response.ok) {
                        if (response.status === 404) {
                            throw new Error("No hay jugadores registrados.");
                        }
                        throw new Error("Error al obtener los jugadores.");
                    }
            
                    const data = await response.json();
                    console.log("Jugadores obtenidos:", data.players);
            
                    // Aquí actualizamos el estado global con los jugadores obtenidos
                    setStore({ players: data.players });
                } catch (error) {
                    console.error("Error al obtener los jugadores:", error.message);
                }
            },

            getPlayer: async () => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/getPlayer", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")} `,
                        },
                    });
            
                    if (!response.ok) {
                        if (response.status === 404) {
                            throw new Error("No hay jugadores registrados.");
                        }
                        throw new Error("Error al obtener los jugadores.");
                    }
            
                    const data = await response.json();
                    console.log("Jugadores obtenidos:", data.players);
            
                    // Aquí actualizamos el estado global con los jugadores obtenidos
                    setStore({ players: data.players });
                } catch (error) {
                    console.error("Error al obtener los jugadores:", error.message);
                }
            },


            /////////////////////////////////////////HOST/////////////////////////////////////////

            updateHost: async (hostData) => {  //PUT ONE HOST
                try {
                    const resp = await fetch(process.env.BACKEND_URL +"/api/getHost/", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        },
                        body: JSON.stringify(hostData)
                    });

                    if (!resp.ok) {
                        throw new Error("Error al obtener los datos del host");
                    }

                    const data = await resp.json();
                    console.log("Datos del host:", data);

                    // 2 Soluciones para actualizar perfil
                    setStore({ host_info: data.host});      //Mas eficiente en rendimiento pero menos robusta.
                    // await actions.getHost();     //Menos optima pero mas segura.
                    
                } catch (error) {
                    console.error("Error en getUserHost:", error);
                }
            },

            getHost: async () => {  //GET HOST
                try {
                    const resp = await fetch(process.env.BACKEND_URL +"/api/getHost", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        },
                    });

                    if (!resp.ok) {
                        if (response.status === 404) {
                            throw new Error("No hay hosts registrados.");
                        }
                        throw new Error("Error al obtener los hots.");
                    }

                    const data = await resp.json();
                    console.log("Datos del host:", data);

                    setStore({ host: data.host });

                } catch (error) {
                    console.error("Error en getUserHost:", error);
                }
            },


            /////////////////////////////////////////TOURNAMENT/////////////////////////////////////////
        
            postTournament: async (tournamentData) => {  //POST TOURNAMENT
                try {
                    const resp = await fetch(process.env.BACKEND_URL +"/api/tournaments", {
                        method: "POST",
                        headers: { 
                            "Content-Type": "application/json", 
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        },
                        body: JSON.stringify(tournamentData)   
                    });

                    if (!resp.ok) {
                        const errorData = await resp.json();
                        throw new Error(errorData.message || "Error al crear el torneo");
                    }

                    const data = await resp.json();
                    console.log("Torneo creado:", data);

                    const store = getStore();
                    setStore({ tournaments: [...(store.tournaments), data] });
                    return data;

                } catch (error) {
                    console.error("Error en postTournament:", error);
                }
            },

            getTournaments: async () => {   //GET TOURNAMENTS
                try {
                    const resp = await fetch(process.env.BACKEND_URL +"/api/tournaments");   

                    if (!resp.ok) {
                        if (response.status === 404) {
                            throw new Error("No hay torneos registrados.");
                        }
                        throw new Error("Error al obtener los torneos.");
                    }

                    const data = await resp.json(); // Obtener la lista de torneos
                    console.log("Torneos obtenidos:", data);

                    setStore({ tournaments: data.tournaments }); // Guardarlos en el estado global
            

                } catch (error) {
                    console.error("Error en getTournaments:", error)
                }
            },

            getOneTournament: async (id) => {   //GET ONE TOURNAMENT
             try {
                const resp = await fetch(`${process.env.BACKEND_URL}/api/tournaments/${id}` ,{
                });   
                
                if (!resp.ok) {
                    if (response.status === 404) {
                        throw new Error("No hay torneo con ese id");
                    }
                    throw new Error("Error al obtener el torneo.");
                }

                const data = await resp.json();
                setStore({torneo: data.torneo})

             } catch (error) {
                console.error("Error en getOneTournament:", error);   
             }
            },
            

            /////////////////////////////////////////CHECK/////////////////////////////////////////
        
            checkUser: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL +"/api/check", {
                        method: "GET",
                        headers: { 
                            "Content-Type": "application/json", 
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        },  
                    });

                    if (!resp.ok) {
                        const errorData = await resp.json();
                        throw new Error(errorData.message || "Error al checkear el usuario");
                    }

                    const data = await resp.json();
                    console.log("user:", data);

                    return data.player;

                } catch (error) {
                    console.error("Error en checkUser:", error)
                }
            },
        },
    };
};



export default getState;





