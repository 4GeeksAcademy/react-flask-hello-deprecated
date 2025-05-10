const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null,
			token: null,
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
			dogFood: [],
			catFood: [] ,
			exoticFood: [],
			infoProducto: [],
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
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email, password })
					});

					if (!resp.ok) {
						throw new Error("Error al iniciar sesión");
					}

					const data = await resp.json();
					console.log("Inicio de sesión exitoso:", data);

					const token = data.token;
					if (!token) {
						throw new Error("No se recibió el token");
					}

					localStorage.setItem("token", token);
					setStore({ token });

					const actions = getActions();
					actions.getUser();
					navigate("/");
				} catch (error) {
					console.log("Error al iniciar sesión", error);
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
			
					localStorage.setItem("token", token);
					setStore({ token });
			
					const actions = getActions();
					actions.getUser();
					navigate("/");
				} catch (error) {
				}
			},
			getUser: async () => {
				try {
					const token = localStorage.getItem("token");
					if (!token) throw new Error("No token found");

					const resp = await fetch(`${process.env.BACKEND_URL}/api/user`, {
						headers: {
							"Authorization": `Bearer ${token}`
						}
					});

					if (!resp.ok) throw new Error("Error al obtener el usuario");

					const data = await resp.json();
					setStore({ user: data });
				} catch (error) {
					console.log("Error al obtener usuario", error);
				}
			},
			logout: () => {
				localStorage.removeItem('token');
				setStore({token: null, user: null})
				
			},
			
			//TRAER ALIMENTO POR GRUPO/ESPECIE
			getDogFood: async () => {
				const myHeaders = new Headers();
				myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8Cs4yarcs6pKkdu0hlKHsZs0q_CxPIxRcsYOazLvQz4rP7s5FWFmvGJndFqy0N7fvoY5B6Jou5i4ZPgwsQZsEYGDV4DoaNhJP3xwIvv1aGmoRIVdScF1G2c_hWBWqeCTHFNCvGD1Dy0sm3kBmaNdXiMsSO0myHKUFvlWHCed2AdtyCiC6CHBqk9DHs32cYjJV4GQr4cxW2IXl6QDukWwCPSYuzTnP699Rz_4pCbB8OPOQNBDyDtdks_LUoMZR2Qt6IWKmUnLGt-n3JLFjeQMZiSeKEXKNTcJknrz4p25p9-5rh3BY2FBX_kg6MtH3cLbqOyS6yqrG4cjJPpyZbVfN3iEYSR6lzEGiGZDFPvokcj_PM8fq32HR1_olrhti8nYtDctNR_8YRewW5quhBNW6mtF_-SqGTbCQVH1CiLUF2UKK_H_nGmwvWAce2n4Cdw1BLUCZhlCr3GAKWJWHqLI1K5n9OekmI4zs0TI_60R6urTRxIQx2IgkRPYizg-AUdyr6bORhYr7s3c6oFBrdA4yBShqyJFOo4fuMkQuHflmg717cZeB1MDnWgSm9Xnl4qmOlcta0fCSq15GNUPvXhAwvclIoK9NTrmSSd1wvRhoqz7ypodxTSOafQx0ybhJZwTxDeS_gv-4KjbyFngwj7Bj1TluB2qE5Hijbi4uhZb2KILE9AGYHKWSW-IWoSmEXW71c7HhH8mBEbBxidpsSi_Rip3CdXL2oUO-8TGtLx2HgJtExj_7AyTD1trSanlKgDurPSEfDuXuwtqxawfWf0a1sbp9BGk0pRLOA-tVKrxmMiFAPiNCVC1W2EXb95TKydzKIwtbcC70YyDJ4dFwnHrQmgPYxzIz7PYzICzKqZ-VDpO4lf7C3jf4OBJ9ZMV4JRvPiR2kUwMNX_c5CuMLaKrZNzqCFwZBUa4N4AUyTT83mtzFQGAZjMXDeZNok7mjTYBp121qquiSKX8ft05b1MTsVtRfg3ETiFdOHmYQ2-1EcSwBY-VhjWIlkQiFr1yBWXk-g");
			
				const requestOptions = {
					method: "GET",
					headers: myHeaders,
					redirect: "follow"
				};
			
				try {
					const response = await fetch(process.env.BACKEND_URL +"/api/foods/dog", requestOptions);
					
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
			
					const data = await response.json();
					setStore({ dogFood: data }); // Asegúrate de que data.result sea la estructura correcta
					console.log(data);
				} catch (error) {
					console.error('Error fetching dog food:', error);
				}
			}




			,
			getCatFood: async ()=>{

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
			console.log(data);
		} catch (error) {
			console.error('Error fetching cat food:', error);
		}
	}
		,

		getExoticFood: async ()=>{
			const myHeaders = new Headers();
			myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8Cs4yarcs6pKkdu0hlKHsZuqp5-e7T1vVCCdEQ0C1wStd1vPjajnZKjnPSA5Hq6rqD8KnBNHzrxCrSBqwnlunA0rkm36DsRzpvbpKLHVNklCfX8GBsMZKstrANOENBUzsSi1PBxW5_TibtPeRePzgNe5pBHuYx5F-1zm7-FoplLOZKZUFeRu1ua1DgiPeOiqvYSnKMQISiWoLb64DlQlSfXIGkFzVDFsFNPJ5lN-NHmI9dQ4O8b8EtoLAvXug1GQ5WkthHTcarTf_lXY5fcoEJbvhObGkUw7LC07jfKn2BTk27bZGx_F2kXNKq2N32CJ_46MMiulhV3sVpuuBUenZ-P7eLMcyMYuz6LcVrybPlrmHBiCnIbgcmgn-jnL-P3rcWL49L8RpPU84Ul4CaOZTFZ7eFCUqa1m1YKjX21YEdJlEm8fyYpFYcFp_9mGziKaxChcel7DevH4J4NV-E1mEUnQP-wDBMVq1IH0wdb4_HSnZ8aBhyyb8GvuEuLIhlH4soY8xtKNlaM73kynXCEhJ2OH-eKM6XIkWQHVIENwRoWzjj8G-8jQcJjz1Clyo9lMuFB98AWfsJgqe_PO7PgIw_Ms8_hRKyGG_aej9UuBo8rS-u4vTGaj5v_1vp6_PrZ-qEp8iyGGK_0OERl5OH0S3_mcXOd1wQcpFQ76RR6qtXqju2G8WkN9e3xC9XvP3SWVDIc5195fVj_1gRGLUCC20Uu5uPC0yzuE2X_TrcjKq0-SeWiyVIphc1T7AoJ2PvAu74js-66UPPcjXqoQvGXCzwrwhPdzXAp8n6sVwGcfRthrk2AOD4U8XJz68aBA5aRx77sqsMKKFIbCRXjRfOcAoa214qR5Oz7-nnKj1dII9Rx_g9ZD7SS_Mjm5Sk3M_Mr0zZNDzN7YWd_j3WhN9Gvr1MOeU6aFKssi2wzLgyNAVHNaXxjKms7cV1bDDwVzfYcHa6L-oLvvPk1FRmoRsD4J_3I7TgE1iO2LOtWD4ZLYilAcmmiHh3OPqNpQrKkl5uK2zg");

			const requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow"
			};

			try {
			const response = await fetch(process.env.BACKEND_URL +"/api/foods/exotic", requestOptions);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
	
			const data = await response.json();
			setStore({ exoticFood: data });
			console.log(data);
		} catch (error) {
			console.error('Error fetching cat food:', error);
		}
	}
		,
		//INFORMACIÓN PRODUCTO
		// getInfoProducto: async () =>{
		// 				const myHeaders = new Headers();
		// 		myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8Cs4yarcs6pKkdu0hlKHsZtvWIXPtCHcfOofTKgFiVpi5cJP_XHzOx-8ubIRKD1f7HjzoZxyKcmbs-hQMcNR52nO2bPfFTgqTiXBjzJhq00iMbOFDyo5RmN-4xB04hPvVBevVOJj145zSKuGjjzZQaxA9K1reC5AjwKmsEuUpfGv3LldcPKzyx7Ui09wexpXXXUwqnpN3rGlO1V-7SzBOR4LVH5ySIzzsN0I0IUzvvsyC_l_mbmGUNmn6Vc0uCFa2ufBXAiB44jjuvlRaySxVXfvdNxzywOLsmIyXMjJQvr3JnDe4UCAysdXYgJJqDUFg06XSE8mEmGAtZ4_XHDX4MtpPYdb1UxpgiuvbOHMoHSc4E67HtfjyHvfE0CEeRn-TqBcJHjkU37VkidzRCC-d8Ooxm4pZcc-2qjGYcWRXcn6jSOav4anXv6w0mtnG4NnFCqp7Ccr95wiLySm5fU6cNB1EwgSTbUJeHr15w72Uk8wpveAkprQcUo1yQo4i6qvhniMN27Ze4ijTlaG7eQb_zG0SOH0WQFIU3kcGU04JmaWgkYj8g2TwEyjtL6JvkLQhgNWSY3iVH0VKz6NeH6PMfbfpcOVk2LNP9mJ_eNfU5VwjesRECLY1DQ73JzOSzJXXjRTrJFXLmWxZt0y3JnmZwUW4slzbUrAKs1v4WwMb4c0RjpE9q9vQzIojBFtYyoNWtKL7ibivx0nREGkxbryqbsMW-kre846mJOT61Qtoip-0EzPJjs5UrTQ4791h3y4fCWRbxV96_jCuaau3sChJRdEA81uhLKM65W-J1REQjruyVREbpRw9gTmcoiAnM206ZFu9m99hjP6z7s8bNi2agFaWIRx8EiP-bo0s4O3D7XQprAuw1N2IS7g3h5PnTzlN_f9JbMfLBhIU1mzNtJEdIIY930d9od7Hx28_9Auh41aMWWEmCkHugINY_ut3n6uL5wDqEGMs0uPe-lyTUMLodeubJ2BzvJ7Xgrl2Td462uh");

		// 		const requestOptions = {
		// 		method: "GET",
		// 		headers: myHeaders,
		// 		redirect: "follow"
		// 		};

		// 		try {
		// 		const response = await fetch(`https://psychic-memory-pjgx9gwj66g72wvq-3001.app.github.dev/api/foods/${id}`, requestOptions);
		// 		const data = await response.json();
		// 		setStore({ infoProducto: data })
		// 		console.log(data)
		// 		} catch (error) {
		// 		console.error(error);
		// 		};
		// 	}
		// 	,
				



			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ exoticFood: data })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
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
			}
		}
	};
};

export default getState;