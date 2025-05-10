const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userData: {}
		},
		actions: {
			adduserData: (data) => {
				setStore({ userData: data });
			},
		}
	};
};

export default getState;
