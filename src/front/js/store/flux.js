const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
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
			user: JSON.parse(localStorage.getItem("userLogged")) || "",  // Cargar el usuario desde localStorage			email: "",
			auth: !!localStorage.getItem("token"), // Verifica si hay un token para mantener la sesión activa
		},
		actions: {
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},

			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo });
			},

			login: async (email, password) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password }),
					});
					const result = await response.json();

					if (response.status === 200) {
						localStorage.setItem("token", result.access_token);
						setStore({ auth: true });
						await getActions().verifyToken();
						await getActions().getPrivate();
						await getActions().getUserLogged();
					} else {
						setStore({ auth: false });
					}
				} catch (error) {
					console.error(error);
					setStore({ auth: false });
				}
			},

			getPrivate: async () => {
				let token = localStorage.getItem("token");
				if (!token) return;
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/protected`, {
						method: "GET",
						headers: { "Authorization": `Bearer ${token}` },
					});
					const result = await response.json();
					setStore({ email: result.logged_in_as })
				} catch (error) {
					console.error(error);
				}
			},

			verifyToken: async () => {
				let token = localStorage.getItem("token");
				if (!token) {
					setStore({ auth: false });
					return;
				}

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/verify-token`, {
						method: "GET",
						headers: { "Authorization": `Bearer ${token}` },
					});
					const isAuthenticated = response.status === 200;

					if (getStore().auth !== isAuthenticated) {
						setStore({ auth: isAuthenticated });
					}
				} catch (error) {
					console.error(error);
					setStore({ auth: false });
				}
			},

			logout: () => {
				localStorage.removeItem("token");
				localStorage.removeItem("userLogged");
				setStore({ auth: false, user: "" });
			},
			getUserLogged: async () => {

				try {
					const userLogged = JSON.parse(localStorage.getItem("userLogged"));
					const store = getStore()
					if (userLogged === null && store.email !== undefined) {
						const response = await fetch(`${process.env.BACKEND_URL}/api/users`);
						const result = await response.json();
						const userLogged = await result.results.find(item => item.email === store.email);
						localStorage.setItem("userLogged", JSON.stringify(userLogged));
						setStore({ user: userLogged });
					} else {
						setStore({ user: userLogged })
					}
				} catch (error) {
					console.error(error);
				}
			},
			initializeStore: () => {
				const userLogged = JSON.parse(localStorage.getItem("userLogged"));
				const token = localStorage.getItem("token");

				if (userLogged) {
					setStore({ user: userLogged });
				}

				if (token) {
					setStore({ auth: true });
					getActions().verifyToken();
					getActions().getPrivate();
				}
			},

			// registro usuario form
			registerUser: async (formData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(formData)
					});
					const result = await response.json();
					console.log(result)

					if (response.status === 201) {
						return { success: true, message: "Successfully registered" };
					} else {
						return { success: false, message: result.msg || "Registration error. Please try again" };
					}
				} catch (error) {
					console.error("Failed to connect to the server", error);
					return { success: false, message: "Error en la conexión con el servidor." };
				}
			},
			// fin registro usuario
		}
	};
};

export default getState;
