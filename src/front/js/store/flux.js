import { clean_student_data } from "../functions/clean_parent_data";
const backendURL = process.env.BACKEND_URL || "";



const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			profesores: [],
			estudiantes: [],
			profesorPersonalInfo: {
				docente: {},
				grados: [],
				materias: []
			},
			usuarios: [],
			grados: [],
			materias: [],
			asignaciones: [],
			evaluaciones: [],
			calificaciones: [],
			personalInfo: null,
			contactos: [],
			userAvatar: null,
			mensajes: [],
			unreadCount: 0,
			isChatVisible: false,
			isClosingChat: false,
			successMessage: '',
			errorMessage: '',
		},
		actions: {
			// Use getActions to call a function within a fuction
			fetchRoute: async (endpoint, { method = 'GET', body = '', isPrivate = false, bluePrint = '' } = {}) => {
				if (isPrivate && !getStore().token) getActions().loadSession();

				const headers = {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				}
				const { token } = getStore()


				if (isPrivate && token) {
					headers['Authorization'] = `Bearer ${token}`
				}

				if (isPrivate && (!token || !bluePrint)) {
					throw new Error(`Missing: Token: ${!token}, bluePrint: ${!bluePrint} for private route`)
				}

				const URL = isPrivate ? `${backendURL}/${bluePrint}/${endpoint}` : `${backendURL}/${endpoint}`
				const params = {
					method,
					headers
				}

				if (body) {
					params.body = JSON.stringify(body);
				}

				try {
					const response = await fetch(URL, params)

					if (!response.ok) {
						let error = await response.json()
						if (error?.msg?.includes("Token has expired") || error.msg == "Token has been revoked") {
							localStorage.removeItem("token")
							localStorage.removeItem("role")
							window.location.href = '/'
							return { "msg": "Session Expired" }
						}
						throw new Error(`Error con la solicitud: ${error.msg ?? error.error}`)
					}

					const data = await response.json()
					return data

				} catch (error) {
					console.error(error.message)
					throw error
				}

			}, loadSession: async () => {

				let token = localStorage.getItem('token')
				let role = localStorage.getItem('role')

				if (!token) {
					token = null
					console.info("No token found")
				}

				if (!role) {
					role = null

					console.info("No role found")
				}
				setStore({ 'token': token, 'role': role })

				console.info("Session Loaded")

			}, crudOperation: async (entity, method, { id = '', body = null, bluePrint = '' } = {}) => {
				const validMethods = ['GET', 'POST', 'PUT', 'DELETE']
				if (!validMethods.includes(method)) {
					throw new Error(`Invalid method "${method}". Allowed methods: ${validMethods.join(', ')}`);

				}

				if (['PUT', 'DELETE'].includes(method) && !id) {
					throw new Error(`Missing URL parameters for method "${method}".`);
				}
				try {
					let endpoint = id ? `${entity}/${id}` : entity
					const response = await getActions().fetchRoute(endpoint, {
						method,
						isPrivate: true,
						bluePrint: bluePrint,
						body: method !== 'GET' ? body : null
					})

					return response

				} catch (error) {
					console.error(`Error in CRUD operation for ${entity}: ${error.message}`);
					throw error
				}

			}, userOperations: async (method, body = '', id = '') => {
				return getActions().crudOperation('user/auth', method, { id, body, bluePrint: 'admin' })
			}, allUsersOperations: async (method, body = '', id = '') => {
				return getActions().crudOperation('users', method, { id, body, bluePrint: 'admin' })
			}, setAllUsers: async () => {
				const response = await getActions().allUsersOperations('GET')
				setStore({ usuarios: response })
			}, setUsers: async () => {
				const response = await getActions().userOperations('GET')
				setStore({ usuarios: response })
			}, studentsOperations: async (method, body = '', id = '') => {
				return getActions().crudOperation('students', method, { id, body, bluePrint: 'admin' })
			}, gradeStudentsOperations: async (method, body = null, id = '') => {
				return getActions().crudOperation('estudiantes', method, { id, body, bluePrint: 'teacher' })
			}, setGradeStudents: async (grado_id) => {
				const response = await getActions().gradeStudentsOperations('GET', null, grado_id)
				setStore({ estudiantes: response })
			}, setStudents: async () => {
				const response = await getActions().studentsOperations('GET')
				setStore({ estudiantes: response })
			}, subjectsOperations: async (method, body = '', id = '') => {
				return getActions().crudOperation('materias', method, { id, body, bluePrint: 'admin' })
			}, setSubjects: async () => {
				const response = await getActions().subjectsOperations('GET')
				setStore({ materias: response })
			}, teachersOperations: async (method, body = '', id = '') => {
				return getActions().crudOperation('teachers', method, { id, body, bluePrint: 'admin' })
			}, setTeachers: async () => {
				const response = await getActions().teachersOperations('GET')
				setStore({ profesores: response })
			}, testsOperations: async (method, body = '', id = '') => {
				return getActions().crudOperation('evaluaciones', method, { id, body, bluePrint: 'teacher' })
			}, setTests: async () => {
				const response = await getActions().testsOperations('GET')
				setStore({ evaluaciones: response })
			}, scoreOperations: async (method, body = '', id = '') => {
				return getActions().crudOperation('calificaciones', method, { id, body, bluePrint: 'teacher' })
			}, setScores: async () => {
				const response = await getActions().scoreOperations('GET')
				setStore({ calificaciones: response })
			},

			postCourse: async (grado) => {
				const actions = getActions()
				const data = await actions.fetchRoute("grados", {
					method: "POST",
					body: grado,
					isPrivate: true,
					bluePrint: 'admin'
				});
				actions.getCourses()
			}, deleteCourse: async (id) => {
				const actions = getActions()
				const data = await actions.fetchRoute(`grados/${id}`, {
					method: "DELETE",
					isPrivate: true,
					bluePrint: 'admin'
				});
				await actions.getCourses()
			}, getCourses: async () => {
				const actions = getActions()

				console.log(getActions())
				const data = await actions.fetchRoute("grados", {
					method: "GET",
					isPrivate: true,
					bluePrint: 'admin'
				});
				setStore({ grados: data })

				return data
			}, handleRegister: async (body) => {
				try {
					const actions = getActions()
					const data = await actions.fetchRoute('signup', { method: 'POST', body });
					setStore({ successMessage: "¡Su usuario ha sido creado corectamente! Bienvenido a SchoolHub!" });
					return true;
				} catch (error) {
					console.error("Error en handleRegister:", error);
					setStore({ errorMessage: "Ocurrió un error al intentar registrarse" });
					return 'Ocurrió un error al intentar registrarse';
				}
			}, clearMessages: () => {
				setStore({ successMessage: '', errorMessage: '' });
			},
			handleLogin: async (body) => {
				try {
					const data = await getActions().fetchRoute("login", {
						method: "POST",
						body
					});

					if (data.token && data.role) {
						const rol = data.role.toLowerCase();
						localStorage.setItem("token", data.token);
						localStorage.setItem("role", rol);

						setStore({ token: data.token, role: rol });

						return { success: true, role: rol };
					}
					return { success: false, message: "Respuesta incompleta del backend" };

				} catch (error) {
					console.error("Error en handleLogin:", error.message);
					return { success: false, message: error.message || "Error desconocido" };
				}
			}, isAuthorized: (requiredRoles) => {
				const store = getStore();
				console.log("store.role:", store.role);
				console.log("requiredRoles:", requiredRoles);
				return requiredRoles.includes(store.role);
			}, handleLogout: async () => {
				const { fetchRoute } = getActions();
				try {
					const resp = await fetchRoute("logout", {
						method: "POST",
						isPrivate: true,
						bluePrint: "session"
					});

					if (!resp) {
						console.error("No se pudo cerrar sesión");
						return;
					}

					setStore({ token: null, role: null, userAvatar: null, personalInfo: null });
					localStorage.removeItem("token");
					localStorage.removeItem("role");
					window.location.href = '/'
				} catch (error) {
					console.error("Error al cerrar sesión:", error);
				}
			}, getTeacherInfo: async () => {

				try {
					let teacherData = await getActions().fetchRoute("info", { isPrivate: true, bluePrint: "teacher" })
					console.log('fetched teacher data:', teacherData)
					if (!teacherData) {
						console.log('El profesor no tiene materias asignadas')
						return false
					}
					setStore({ profesorPersonalInfo: teacherData });
				}
				catch (error) {
					console.error(error.message)
					throw error
				}
			},
			getParentInfo: async () => {

				try {
					let parentData = await getActions().fetchRoute("info", { isPrivate: true, bluePrint: "parent" })

					if (parentData["estudiantes"]) {
						parentData["statusResume"] = parentData["estudiantes"].map(clean_student_data)
					}

					setStore({ "personalInfo": parentData })

				}
				catch (error) {
					console.error(error.message)
					throw error
				}
			}, getContacts: async () => {
				try {
					let response = await getActions().fetchRoute("contacts", { isPrivate: true, bluePrint: "messages" })
					if (response && Array.isArray(response)) {
						setStore({ "contactos": response })
					}
				} catch (error) {
					console.error("Error al obtener contactos:", error.message)
					return
				}
			}, getMessages: async () => {
				try {
					let response = await getActions().fetchRoute("get", { isPrivate: true, bluePrint: "messages" })
					if (response && Array.isArray(response)) {
						const unReadMessages = response.filter(msg => !msg.read);

						setStore({
							"mensajes": response,
							"unreadCount": unReadMessages.length
						});
					}
				} catch (error) {
					console.error("Error al obtener mensajes:", error.message)
					return
				}
			}, changePassword: async (newPassword, token = null) => {
				const actions = getActions()

				try {
					if (token) {
						console.log("Se detecto Token")
						setStore({ token: token })
					}



					const response = await actions.fetchRoute("reset", { method: 'PUT', isPrivate: true, bluePrint: "password", body: { "newPassword": newPassword } })

					return response
				} catch (error) {
					console.error(error.message)
					throw error
				} finally {
					if (token) {
						setStore({ token: null })
						console.log("Se eliminó el token del store")
					}
				}
			},
			handleUserAvatarUpdate: (avatarUrl) => {
				setStore({ userAvatar: avatarUrl });
			},
			toggleChat: () => {
				const store = getStore();

				if (store.isChatVisible) {
					setStore({ isClosingChat: true });

					setTimeout(() => {
						setStore({ isChatVisible: false, isClosingChat: false });
					}, 500);
				} else {
					setStore({ isChatVisible: true });
				}
			},
			sendMessage: async (message) => {
				try {
					const response = await getActions().fetchRoute("send", {
						method: "POST",
						body: message, //para enviar el msj al backend
						isPrivate: true,
						bluePrint: "messages"
					});
					if (response) {
						return response
					}
					await getActions().getMessages();
				} catch (error) {
					console.error("Error al enviar mensaje:", error);
				}
			},
			markMessageAsRead: async (messageId) => {
				try {
					console.log("Marcando mensaje como leído con message_id:", messageId);

					let response = await getActions().fetchRoute("read", {
						method: "PUT",
						body: { message_id: messageId },
						isPrivate: true,
						bluePrint: "messages"
					});

					console.log("Respuesta de la API para markMessageAsRead:", response);

					await getActions().getMessages();
				} catch (error) {
					console.error("Error al marcar mensaje como leído:", error.message);
				}
			},
			postPicture: async (file) => {
				const { token } = getStore()
				try {
					let formData = new FormData()
					formData.append("profilePicture", file)

					const response = await fetch(backendURL + "/profile/picture", {
						method: "PUT",
						headers: {
							'Authorization': `Bearer ${token}`
						},
						body: formData
					})

					if (!response.ok) {
						let error = await response.json()
						throw new Error(error.msg || "Error al subir la imagen");
					}
					let data = await response.json()
					let rol = getStore().role
					switch (rol) {
						case "representante":
							await getActions().getParentInfo()
						case "docente":
							await getActions().getTeacherInfo()
						default:
							await getActions().getAdminInfo()

					}
					return data
				} catch (error) {
					console.error("Error al subir la imagen:", error.message);
					return error
				}
			}, updateProfile: async (body) => {
				try {
					const response = await getActions().fetchRoute("update", { method: 'PUT', isPrivate: true, bluePrint: "profile", body: body })
					let rol = getStore().role
					switch (rol) {
						case "representante":
							await getActions().getParentInfo()
						case "docente":
							await getActions().getTeacherInfo()
						default:
							await getActions().getAdminInfo()
							break;
					}

					return response
				} catch (error) {
					console.error(error.message)
					throw error

				}
			}, requestPasswordChange: async (email) => {
				try {
					const response = await getActions().fetchRoute("password/recovery", { method: 'POST', body: { "email": email } })
					return response
				} catch (error) {
					console.error(error.message)
					throw error
				}
			}, getStudentData: (id) => {
				const { personalInfo } = getStore()

				try {
					if (personalInfo) {


						let student = personalInfo.estudiantes.find((estudiante => estudiante.id == id))
						if (!student) {
							throw new Error("Estudiante no encontrado");

						}
						return student
					}

				} catch (error) {
					console.error(error.message)
					throw error
				}


			}, getStudents: () => {
				const { personalInfo } = getStore()

				if (personalInfo) {
					return personalInfo.estudiantes

				}
				return []

			}, getAdminInfo: async () => {

				try {
					let adminData = await getActions().fetchRoute("info", { isPrivate: true, bluePrint: "admin" })
					setStore({ "personalInfo": adminData })
				}
				catch (error) {
					console.error(error.message)
					throw error
				}
			},
		}
	}
};


export default getState;
