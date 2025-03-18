import { BackendURL } from "../component/backendURL";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			phones: [],
			tvs: [],
			laptops: [],
			navbar_visibility: true,
			edit: false,
			infoUser: {},
			negative_colors: false,
			cart: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			getPhones: async () => {
				const urlBackend = process.env.BACKEND_URL
				try {
					const response = await fetch(urlBackend + 'phones')
					const data = await response.json()
					setStore({ phones: data })

				} catch (error) {
					console.error("Error getting phones from API:");
				}
			},

			getTvs: async () => {
				const urlBackend = process.env.BACKEND_URL
				try {
					const response = await fetch(urlBackend + 'tvs')
					const data = await response.json()
					setStore({ tvs: data })
				} catch (error) {
					console.error("Error getting TVs from API:");
				}
			},

			getLaptops: async () => {
				const urlBackend = process.env.BACKEND_URL
				try {
					const response = await fetch(urlBackend + 'laptops')
					const data = await response.json()
					setStore({ laptops: data })

				} catch (error) {
					console.error("Error getting Laptops from API:");
				}
			},
			setNavbarVisibility: () => {
				setStore({ navbar_visibility: true })
			},
			setNoneNavbarVisibility: () => {
				setStore({ navbar_visibility: false })
			},
			setEdit: () => {
				if (getStore().edit == true) {
					setStore({ edit: false })
				}
				else if (getStore().edit == false) {
					setStore({ edit: true })

				};
			},
			userIndividual: async () => {
				const urlBackend = process.env.BACKEND_URL;
				const idUser = sessionStorage.getItem('idUser')

				const response = await fetch(`${urlBackend}user/${idUser}`);
				const data = await response.json();
				setStore({ infoUser: data });
			},

			setPositiveColors: () => {
				setStore({ negative_colors: false })

			},
			setNegativeColors: () => {
				setStore({ negative_colors: true })

			},

			getCart: async (user_id) => {

				try {
					const urlBackend = process.env.BACKEND_URL;

					const response = await fetch(urlBackend + 'cart/' + user_id)
					
					const data = await response.json()
					const cart = data[0]
					const smartphones = cart["cart_smartphones"]
					const laptops = cart["cart_laptops"]
					const tvs = cart["cart_tvs"]
					const full_cart = []
					
					console.log(data)

					full_cart.push(smartphones, laptops, tvs)
					console.log(smartphones, laptops, tvs)
					console.log(full_cart)

					const done_cart = []
					full_cart.forEach((cart_list) => {
						cart_list.forEach((item) => {
							done_cart.push({modelo: item.modelo, descripcion: item.descripcion, precio: item.precio, cantidad: item.quantity, image: "hola"})
						})
					})

					console.log(done_cart)


					setStore({ cart: done_cart })
					
				} catch (error) {


				}
			}



		}
	};
};

export default getState;
