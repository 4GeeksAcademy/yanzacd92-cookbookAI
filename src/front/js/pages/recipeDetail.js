import React, { useContext , useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlFood, faPepperHot, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { useNavigate, useParams } from "react-router-dom";

export const RecipeDetail = () => {
    const {recipeId} = useParams()
    const navigate = useNavigate()
    const { store, actions } = useContext(Context);
    const recipeDetail = store.recipeDetail
    const [ingredient, setIngredient] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [instructions, setInstructions] = useState("");
    const [recomendedname, setRecommendedName] = useState("");
    const [recipePicture, setRecipePicture] = useState("");

    useEffect( () => {
        if(!localStorage.getItem("accessToken")) navigate("/")
        actions.getDetailRecipe(recipeId)
    }, [localStorage.getItem("accessToken")])

    function checkFavorites(recipeId) {
        if(store.favorites.some(favorite => favorite.recipe_id == recipeId) && 
        store.favorites.some(favorite => favorite.user_id == localStorage.getItem("id"))) return faHeart
        return farHeartRegular
    }

    /*function ingredientText() {
        let new_text = (recipeDetail.ingredients).split("Ingredient")
        for(line in new_text) {
            if(line !== "0") c += "Ingredient" + new_text[i] + "\n"
        }
        return new_text
    }*/
    function showIdForm() {
        document.getElementById("ctn-detail-recipe").style.display = "none"
        document.getElementById("ctn-edit-recipe").style.display = "block"
        setIngredient(recipeDetail.ingredients)
        setDescription(recipeDetail.description)
        setInstructions(recipeDetail.elaboration)
        setRecommendedName(recipeDetail.name)
        setRecipePicture(recipeDetail.image)
    }

    function editRecipe(recipeId) {
        return recipeId
    }

    function editRecipe(e) {
        e.preventDefault()
    }

    return (
        <div>
            <Navbar />
            <div className="container mt-4 mb-4">
                <h1 className="text-center mt-4 re-title">{recipeDetail.name}</h1>
                <div className="container mt-4 mb-4" id="ctn-detail-recipe">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card">
                                <img src={recipeDetail.image} className="card-img-top" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="icon-favorite card-body">
                                    <button className="add-favorite-detail-btn btn btn-primary" type="submit" onClick={() => actions.addOrRemoveFavorites(recipeId)}><FontAwesomeIcon className="add-favorite-detail" icon={checkFavorites(recipeDetail.id)} /></button>
                                    <button className="edit-recipe-detail-btn btn btn-primary" type="submit" onClick={() => showIdForm()}><FontAwesomeIcon className="edit-recipe-detail" icon={faPencil} /></button>
                                    <button className="delete-recipe-detail-btn btn btn-primary" type="submit" onClick={() => actions.deleteRecipe(recipeId)}><FontAwesomeIcon className="delete-recipe-detail" icon={faTrashCan} /></button>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{recipeDetail.name}</h5>
                                    <p className="card-text">{recipeDetail.description}</p>
                                </div>
                                <div className="ctn-details">
                                    <div className="ingredients-details">
                                        <button className="ingredient-detail-btn btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseIngredients" aria-expanded="false" aria-controls="collapseExample">
                                            <FontAwesomeIcon icon={faPepperHot} className="mx-2" /> Ingredients
                                        </button>
                                        <div className="collapse mb-3" id="collapseIngredients">
                                            <p className="card-text">{recipeDetail.ingredients}</p>
                                        </div>
                                    </div>
                                    <div className="steps-details">
                                        <button className="step-detail-btn btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSteps" aria-expanded="false" aria-controls="collapseExample2">
                                            <FontAwesomeIcon icon={faBowlFood} className="mx-2" /> Steps
                                        </button>
                                        <div className="collapse mb-5" id="collapseSteps">
                                            <p className="card-text">{recipeDetail.elaboration}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mt-4 mb-4" id="ctn-edit-recipe">
                    <form className="row" onSubmit={editRecipe}>
                        <div className="col-sm-6">
                            <div className="card">
                                <img src={recipeDetail.image} className="card-img-top" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                <input
                                    className="form-control"
                                    id="exampleFormControlDescription"
                                    name="recomendedname"
                                    rows="1"
                                    value={recomendedname || ""}
                                    onChange={(e) => setRecommendedName(e.target.value)}
                                    ></input>
                                    <input className="form-control" id="exampleFormControlDescription" name="description" rows="4" 
                                        value={recipeDetail.description || "Not Description"}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></input>
                                </div>
                                <div className="ctn-details">
                                    <div className="ingredients-details">
                                        <button className="ingredient-detail-btn btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseIngredients" aria-expanded="false" aria-controls="collapseExample">
                                            <FontAwesomeIcon icon={faPepperHot} className="mx-2" /> Ingredients
                                        </button>
                                        <div className="collapse mb-3" id="collapseIngredients">
                                            <p className="card-text">{recipeDetail.ingredients}</p>
                                        </div>
                                    </div>
                                    <div className="steps-details">
                                        <button className="step-detail-btn btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSteps" aria-expanded="false" aria-controls="collapseExample2">
                                            <FontAwesomeIcon icon={faBowlFood} className="mx-2" /> Steps
                                        </button>
                                        <div className="collapse mb-5" id="collapseSteps">
                                            <p className="card-text">{recipeDetail.elaboration}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
