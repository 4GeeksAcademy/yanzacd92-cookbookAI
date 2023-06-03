const apiURL = process.env.BACKEND_URL
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			favorites: [
				{
					id: "if_1",
					name: "white",
					description: "white",
					elaboration: "white",
					image: "white",
					is_active: "white",
					category: "Italian Food"

				},
				{
					id: "cf_1",
					name: "white",
					description: "white",
					elaboration: "white",
					image: "white",
					category: "China Food"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			userLogin: async(email, password) => {
				const resp = await getActions().apiFetch("/api/login", "POST", {email, password})
				if(resp.code >= 400) {
					return resp
				}
				setStore({accessToken: resp.data.accessToken})
				localStorage.setItem("accessToken", resp.data.accessToken)
				localStorage.setItem("id", resp.data.id)
				return resp
			},
			userSignup: async(email, password, first_name, last_name, security_question, security_answer, is_admin) => {
				const resp = await getActions().apiFetch("/api/signup", "POST", {email, password, first_name, last_name, security_question, security_answer, is_admin})
				if(resp.code >= 400) {
					return resp
				}
				//setStore({accessToken: resp.data.accessToken})
				localStorage.setItem("accessToken", resp.data.accessToken)
				return resp
			},
			apiFetch: async(endpoint, method="GET", body={}) => {
				let response = await fetch(apiURL + endpoint, method == "GET" ? undefined: {
					method,
					body: JSON.stringify(body),
					mode: 'cors',
					headers: {
						"Content-Type": "application/json",
						'Access-Control-Allow-Origin': '*'
					}
				})
				if(!response.ok) {
					console.error(`${response.status}: ${response.statusText}`)
					return { code: response.status }
				}

				let data = await response.json()
				return { code: response.status, data }
			}
		}
	};
};

export default getState;
