const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null,
			user: null,
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
			notes: [],
			//estado julia 

			//maldit pomodoro estado:
			pomodoroTime: 1500, // 25 min en segundos
			started: false,
			completedCycles: Number (localStorage.getItem("cycles")) || 0,

//estado compañero




			
		},
		actions: {

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},


			login: async (email, password) => {

				//console.log(email, password);
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				const raw = JSON.stringify({
					"email": email,
					"password": password
				});

				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw
				};

				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", requestOptions);
					const result = await response.json();
					console.log(response);

					console.log(result)

					if (!response.ok) {
						return false
					}
					localStorage.setItem("token", result.access_token)
					setStore({ auth: true })

					return true
				} catch (error) {
					console.error(error);
				};
			},


			
			register: async (name, email, password) => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				const raw = JSON.stringify({
					"name": name,
					"email": email,
					"password": password
				});

				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/register", requestOptions);
					const result = await response.json();
					console.log(result)
					// Guardar el token solo si el backend lo envió
					if (result.access_token) {
						localStorage.setItem("token", result.access_token);
						return true
					} else {
						console.warn("El servidor no devolvió un token.");
					}

					return false;

				} catch (error) {
					console.error(error);
				};
			},

			verifyToken: async () => {
				let token = localStorage.getItem("token")
				const myHeaders = new Headers();
				myHeaders.append("Authorization", `Bearer ${token}`);

				const requestOptions = {
					method: "GET",
					headers: myHeaders,
					redirect: "follow"
				};

				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/verify-token", requestOptions);
					const result = await response.json();
					//console.log(result)
					if (response.status !== 200) {
						setStore({ auth: result.valid })
					}
					setStore({ auth: result.valid })
				} catch (error) {
					console.error(error);
				};
			},

			notes: async () => {
				let token = localStorage.getItem("token")
				try {
					const requestOptions = {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${token}`
						}
					};

					const response = await fetch(process.env.BACKEND_URL + "/api/notes", requestOptions);
					const result = await response.json();
					console.log(response);

					console.log(result)
					//setStore({ message: data.message })
				} catch (error) {
					console.error(error);
				};

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

			//pomodoro: guardar ciclo completado
			addCompletedCycle: () => {
				const store = getStore();
				const newCycle = store.completedCycles + 1;
				setStore({completedCycles: newCycle});
				localStorage.setItem("cycles", newCycle);
				console.log("Nuevo ciclo guardado:", newCycle);

			},

			//pom: reinicia estadística
			resetCycleCount: () =>{
				setStore({ completedCycles: 0});
				localStorage.setItem("cycles", 0);
			},

			//nos muestra la cuenta de ciclos (estadística)
			getCycleCount: () => {
				const store = getStore();
				console.log(`Completed sessions: ${store.completedCycles}`);

			},























































			PostHabits: async (name, description, category,ready,user_id,golds_id ) => {

				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
				
				const raw = JSON.stringify({
				  "name": name,
				  "description": description,
				  "category": category,
				  "user_id" : user_id,
				  "golds_id": golds_id,
				  "ready": ready
				});
				
				const requestOptions = {
				  method: "POST",
				  headers: myHeaders,
				  body: raw,
				  redirect: "follow"
				};
				
				try {
				  const response = await fetch(process.env.BACKEND_URL + "/api/habits", requestOptions);
				  const result = await response.json();
				  console.log(result)
				} catch (error) {
				  console.error(error);
				};






			},

			getHabits: async () => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
			
				const requestOptions = {
					method: "GET",
					headers: myHeaders,
					redirect: "follow" 
				};
			
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/habits", requestOptions);
					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					const result = await response.json();
					console.log(result);
				} catch (error) {
					console.error("Error fetching habits:", error); // Manejo de errores si falla la solicitud
				}
			},

			DeleteHabits: async () => {
				const myHeaders = new Headers();
				const raw = "";

				const requestOptions = {
				method: "DELETE",
				headers: myHeaders,
				body: raw,
				redirect: "follow"
				};

				try {
				const response = await fetch(process.env.BACKEND_URL + "/api/habits/<int:id>", requestOptions);
				const result = await response.json();
				console.log(result)
				} catch (error) {
				console.error(error);
				};
			},	



































































































































			getProfile: async () => {
				let token = localStorage.getItem("token")
				try {
					const requestOptions = {
						mode: 'cors',
						credentials: 'include',
						method: "GET",
						headers: {
							"Authorization": `Bearer ${token}`
						}
					};

					const response = await fetch(process.env.BACKEND_URL + "/api/profile", requestOptions);
					const result = await response.json();
					console.log(response);
					
					console.log(result)
				setStore({ user: result })
				} catch (error) {
					console.error(error);
				};

			},
		}
	
	}
};

export default getState;
