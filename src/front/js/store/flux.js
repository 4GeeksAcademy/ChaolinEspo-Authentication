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
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
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
			signUp: async ({ email, password }) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							email: email,
							password: password
						}),

					});

					if (!response.ok) {
						throw new error("signup fail");
					}

					const data = await response.json();
					console.log("signup sucessful", data);
					return true;
				} catch (error) {
					console.log("error during signup: ", error);
					return false;
				}
			},
			logIn: async ({ email, password }) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							email: email,
							password: password
						}),

					});

					if (response.status === 200) {
						let data = await response.json();
						console.log("login successful ");
						sessionStorage.setItem("token", data.token);
						return true;
					} else if (response.status === 401) {
						console.log("unauthorized, login fail");
						return false;
					} else {
						console.log("unexpected error during login", response.status);
						return false;
					}


				} catch (error) {
					console.log("error during login: ", error);
					return false;
				}
			},
			goPrivate: async () => {
				console.log("it's running");
				if (sessionStorage.getItem("token")) {
					try {
						const response = await fetch(process.env.BACKEND_URL + "/api/protected", {

							headers: {
								Authorization: "Bearer " + sessionStorage.getItem("token")
							}


						});

						if (!response.ok) {
							return false
						} else {
							const data = await response.json();
							console.log(data);
							return true;
						}


					} catch (error) {
						console.log(error);
						return false;
					}
				}





			},
		}
	};
};

export default getState;
