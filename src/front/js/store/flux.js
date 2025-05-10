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
			petData:[
      			{ id: 1, name: "Max", type: "perro", color: "negro", size: "grande", image: "data:image/jpeg;base64,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" },
				{ id: 2, name: "Bella", type: "gato", color: "blanco", size: "pequeño", image: "/img/bella.jpg" },
				{ id: 3, name: "Rocky", type: "conejo", color: "marrón", size: "mediano", image: "/img/rocky.jpg" },
				{ id: 4, name: "Spike", type: "reptil", color: "verde", size: "pequeño", image: "/img/spike.jpg" },
				{ id: 5, name: "Luna", type: "otro", color: "gris", size: "grande", image: "/img/luna.jpg" },
				{ id: 6, name: "Bella", type: "gato", color: "blanco", size: "pequeño", image: "/img/bella.jpg" },
				{ id: 7, name: "Bella", type: "gato", color: "blanco", size: "pequeño", image: "/img/bella.jpg" },
				{ id: 8, name: "Bella", type: "gato", color: "blanco", size: "pequeño", image: "/img/bella.jpg" },
				{ id: 9, name: "Bella", type: "gato", color: "blanco", size: "pequeño", image: "/img/bella.jpg" },
				
			],
		},
		actions: {

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			// Función para establecer el mensaje en el estado global
			setMessage: (msg) => {
				const store = getStore(); // Accede al estado global
				setStore({
					...store, // Mantén el estado previo
					message: msg // Actualiza el mensaje
				});
			},
		
			addNewPet: (newPet) => {
				const token = sessionStorage.getItem('token');
				console.log(token)
				fetch("https://literate-spoon-qx67x69j55jh67rj-3001.app.github.dev/create_pet", {
					method: 'POST',
					body: JSON.stringify(newPet),
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
					},
				})
					.then((response) => {
						console.log(response);
						return response.json()
					})
					.then((data) => {
						console.log(data);
						console.log("mascota y post creado");

					})
					.catch((error) => { console.log(error) })
			},


		}
	};

};
export default getState;
