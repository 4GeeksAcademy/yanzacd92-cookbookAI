const apiURL = process.env.BACKEND_URL
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			recommendedRecipes: [],
			allRecipes: [],
			myRecipes: [],
			recipeDetail: [],
			userDetail: [],
			userInfo: [],
			favorites: [],
			pictureUrl: null,
			token: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			loadToken: () => {
				let store = getStore();
				store.token = localStorage.getItem("accessToken")
				setStore({accessToken: store.token})
			},
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
			userRecommendedRecipes: async() => {
				const resp = await getActions().apiFetch("/api/showRecommendedRecipes", "GET")
				if(resp.code >= 400) {
					return resp
				}
				setStore({recommendedRecipes: resp.data})
				return resp
			},
			userAllRecipes: async() => {
				const resp = await getActions().apiFetch("/api/showRecipesExceptMyOwn", "GET")
				if(resp.code >= 400) {
					return resp
				}
				setStore({allRecipes: resp.data})
				return resp
			},
			userCallChatGPT: async(messages) => {
				const recipeResp = await getActions().apiFetch("/api/createRecipeChatGPT", "POST", {messages})
				if(recipeResp.code >= 400) {
					return recipeResp
				}
				return recipeResp
			},
			userCallChatGPTImage: async(message) => {
				const imageResp = await getActions().apiFetch("/api/createImageChatGPT", "POST", {message})
				if(imageResp.code >= 400) {
					return imageResp
				}
				return imageResp
			},
			userCreateRecipe: async(name, description, ingredients, elaboration, image) => {
				const resp = await getActions().apiFetch("/api/addRecipe/", "POST", {name, description, ingredients, elaboration, image})
				if(resp.code >= 400) {
					return resp
				}
				console.log("Recipe created")
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
				let new_favorites = []
				let store = getStore();
				let resp = null
				if(store.favorites.some(item => item.recipe_id == recipeId)) {
					resp = await getActions().apiFetch("/api/deleteRecipeFromFavorites/" + recipeId, "DELETE")
					new_favorites = store.favorites.filter(function( favorite ) {
						return (favorite.recipe_id !== recipeId);
					});
				} else {
					resp = await getActions().apiFetch("/api/addRecipeToFavorite/" + recipeId, "POST")
					new_favorites = [...store.favorites, resp.data]
				}
				if(resp.code >= 400) {
					return resp
				}
				setStore({favorites: new_favorites})
			},
			userLogout: async() => {
				const resp = await getActions().apiFetch("/api/logout", "POST")
				if(resp.code >= 400) {
					return resp
				}
				setStore({accessToken: null, pictureUrl: null})
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
				const resp = await getActions().apiFetch("/api/passwordRecovery2", "POST", {email})
				return resp
			},
			changeRecoveryPassword: async(passwordToken, password) => {
				const headers = {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${passwordToken}`
				}
				const resp = await fetch(apiURL + "/api/changePassword", {
					method: "POST",
					body: JSON.stringify({password}),
					headers: headers})
				if(!resp.ok) {
					console.error(`${resp.status}: ${resp.statusText}`)
					return { code: resp.status }
				}

				let data = await resp.json()
				return {code: resp.status, data}
			},
			userShowById: async() => {
				let store = getStore();
				let user_id = localStorage.getItem("id")
				const resp = await getActions().apiFetch("/api/showUser/" + user_id, "GET")
				if(resp.code >= 400) {
					return resp
				}
				store.pictureUrl = resp.data.user.profile_pic
				setStore({pictureUrl: store.pictureUrl})
				setStore({userInfo: resp.data.user})
			},
			userUpdateById: async(first_name, last_name) => {
				let store = getStore();
				let user_id = localStorage.getItem("id")
				const resp = await getActions().apiFetch("/api/updateUser/" + user_id, "PUT", {first_name, last_name})
				if(resp.code >= 400) {
					return resp
				}
				store.pictureUrl = resp.data.profile_pic
				setStore({pictureUrl: store.pictureUrl})
				setStore({userInfo: resp.data})
			},
			uploadProfilePic: async(formData) => {
				const headers = {
					"Access-Control-Allow-Origin": "*",
					"Authorization": `Bearer ${localStorage.getItem('accessToken')}`
				}
				let response = await fetch(apiURL + "/api/profilepic", {
					method: "POST",
					body: formData,
					mode: 'cors',
					headers: headers
				})
				if(!response.ok) {
					console.error(`${response.status}: ${response.statusText}`)
					return { code: response.status }
				}

				let data = await response.json()
				setStore({profilePic: data.userInfo.profile_pic})
				return { code: response.status, data }
			},
			uploadRecipePicture: async(formData, recipeId) => {
				const headers = {
					"Access-Control-Allow-Origin": "*",
					"Authorization": `Bearer ${localStorage.getItem('accessToken')}`
				}
				let response = await fetch(apiURL + "/api/recipePicture/" + recipeId, {
					method: "POST",
					body: formData,
					mode: 'cors',
					headers: headers
				})
				if(!response.ok) {
					console.error(`${response.status}: ${response.statusText}`)
					return { code: response.status }
				}

				let data = await response.json()
				//setStore({profilePic: data.userInfo.profile_pic})
				return { code: response.status, data }
			},
			userEditRecipe: async(recipeId, recomendedname, description, ingredients, instructions, recipePicture) => {
				//let store = getStore();
				//let user_id = localStorage.getItem("id")
				console.log("imagen from flux" + recipePicture)
				const resp = await getActions().apiFetch("/api/updateRecipe/" + recipeId, "PUT", {recomendedname, description, ingredients, instructions, recipePicture})
				if(resp.code >= 400) {
					return resp
				}
				/*store.pictureUrl = resp.data.profile_pic
				setStore({pictureUrl: store.pictureUrl})
				setStore({userInfo: resp.data})*/
			},
			userDeleteRecipe: async (recipeId) => {
				const resp = await getActions().apiFetch("/api/deleteRecipe/" + recipeId, "DELETE")
				if(resp.code >= 400) {
					return resp
				}
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
