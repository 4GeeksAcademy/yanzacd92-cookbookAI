const apiURL = process.env.BACKEND_URL
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			allRecipes: [],
			myRecipes: [],
			recipeDetail: [],
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
			userCreateRecipes: async(name, description, prompt) => {
				const image = await getActions().apiFetch("/api/createImageChatGPT", "GET", {prompt})
				const elaboration = await getActions().apiFetch("/api/createRecipeChatGPT", "GET", {prompt})
				const resp = await getActions().apiFetch("/api/addRecipe", "POST", {name, description, image, elaboration})
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
			addOrRemoveFavorites: async (recipeId) => {
				console.log("RECIPEID --------->" + recipeId)
				let new_favorites = []
				let store = getStore();
				console.log("local id --------->" + localStorage.getItem("id"))
				if(store.favorites.some(f => f.recipe_id == recipeId) && store.favorites.some(f => f.user_id == localStorage.getItem("id"))){
					const resp = await getActions().apiFetch("/api/deleteRecipeFromFavorites/" + recipeId, "DELETE")
					if(resp.code >= 400) {
						return resp
					}
					new_favorites = store.favorites.filter(function( favorite ) {
						return favorite.recipe_id !== recipeId && favorite.user_id !== localStorage.getItem("id");
					});
					console.log("DELETE SPLICE --------->" + new_favorites)
				} else {
					console.log("ADD --------->" + recipeId)
					const resp = await getActions().apiFetch("/api/addRecipeToFavorite/" + recipeId, "POST")
					if(resp.code >= 400) {
						return resp
					}
					new_favorites = [...store.favorites, resp.data]
				}
				setStore({favorites: new_favorites})
			},
			userLogout: async() => {
				const resp = await getActions().apiFetch("/api/logout", "POST")
				if(resp.code >= 400) {
					return resp
				}
				setStore({accessToken: null})
				localStorage.removeItem("accessToken")
				return resp;
			},
			getDetailRecipe: async(recipeId) => {
				let store = getStore();
				const resp = await getActions().apiFetch("/api/showRecipe/" + recipeId, "GET")
				if(resp.code >= 400) {
					return resp
				}
				store.recipeDetail = resp.data
				setStore({recipeDetail: store.recipeDetail})
			},
			recoveryPassword: async(email) => {
				const resp = await getActions().apiFetch("/api/passwordRecovery2/" + email, "POST")
				return resp
			},
			changeRecoveryPassword: async(passwordToken, password) => {
				const headers = {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					"Authorization": `Bearer ${passwordToken}`
				}
				const resp = await fetch(apiURL + "/api/changePassword/", {
					method: "POST",
					body: JSON.stringify(password),
					headers: headers})
				return resp
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
