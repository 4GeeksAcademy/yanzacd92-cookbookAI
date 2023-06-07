const apiURL = process.env.BACKEND_URL
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			allRecipes: [],
			myRecipes: [],
			favorites: []
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
			userMyRecipes: async() => {
				const resp = await getActions().apiFetch("/api/showRecipesByUserId", "GET")
				if(resp.code >= 400) {
					return resp
				}
				setStore({myRecipes: resp.data})
				return resp
			},
			userAllRecipes: async() => {
				const resp = await getActions().apiFetch("/api/showRecipes", "GET")
				if(resp.code >= 400) {
					return resp
				}
				setStore({allRecipes: resp.data})
				return resp
			},
			userCreateRecipes: async(name, description, user_id, prompt) => {
				const image = await getActions().apiFetch("/api/createImageChatGPT", "GET", {prompt})
				const elaboration = await getActions().apiFetch("/api/createRecipeChatGPT", "GET", {prompt})
				const resp = await getActions().apiFetch("/api/addRecipe", "POST", {name, description, image, elaboration, user_id})
				if(resp.code >= 400) {
					return resp
				}
				return resp
			},
			showRecipesInFavoritesByUser: async() => {
				let store = getStore();
				const resp = await getActions().apiFetch("/api/showRecipesFavoritesbyUserId/", "GET")
				if(resp.code >= 400) {
					return resp
				}
				store.favorites = resp.data
				setStore({favorites: resp.data})
			},
			addRecipeToFavorites: async(recipeId) => {
				let store = getStore();
				const resp = await getActions().apiFetch("/api/addRecipeToFavorite/" + recipeId, "POST")
				if(resp.code >= 400) {
					return resp
				}
				store.favorites = [...store.favorites, resp.data]
				setStore({favorites: store.favorites})
			},
			removeRecipeFromFavorites: async(recipeId) => {
				let store = getStore();
				const resp = await getActions().apiFetch("/api/deleteRecipeFromFavorites/" + recipeId, "DELETE")
				if(resp.code >= 400) {
					return resp
				}
				const index = store.favorites.indexOf(recipeId)
				delete store.favorites[index];
				setStore({favorites: store.favorites})
			},
			userLogout: async() => {
				const resp = await getActions().apiFetch("/api/logout", "POST")
				if(resp.code >= 400) {
					return resp
				}

				return resp;
			},
			apiFetch: async(endpoint, method="GET", body={}) => {
				const headers = {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					"Authorization": `Bearer ${localStorage.getItem('accessToken')}`
				}
				let response = await fetch(apiURL + endpoint, method == "GET" ? {
					headers: headers
				} : {
					method,
					body: JSON.stringify(body),
					mode: 'cors',
					headers: headers
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
