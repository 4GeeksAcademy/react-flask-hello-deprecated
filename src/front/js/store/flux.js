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
			//estado julia 
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
					const response = await fetch(process.env.BACKEND_URL+"/api/login", requestOptions);
					const result = await response.json();
					console.log(response);
					
					console.log(result)

					if (!response.ok){
						return false
					}
					localStorage.setItem("token", result.access_token)
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
			const response = await fetch(process.env.BACKEND_URL+"/api/register", requestOptions);
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
				const response = await fetch(process.env.BACKEND_URL+"/api/verify-token", requestOptions);
				const result = await response.json();
				console.log(result)
				if (response.status !== 200) {
					setStore({auth:result.valid})
				}
				setStore({auth:result.valid})
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










		}
	};
};

export default getState;
