import React, { useContext , useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBowlFood, faPepperHot, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { useNavigate, useParams } from "react-router-dom";
import cookbookAI from "./../../img/cookbookAI.jpg"
import swal from 'sweetalert';

export const RecipeDetail = () => {
    const {recipeId} = useParams()
    const navigate = useNavigate()
    const { store, actions } = useContext(Context);
    const recipeDetail = store.recipeDetail
    const [ingredients, setIngredients] = useState("");
    const [description, setDescription] = useState("");
    const [instructions, setInstructions] = useState("");
    const [recomendedname, setRecommendedName] = useState("");
    const [recipePicture, setRecipePicture] = useState("");

    useEffect( () => {
        if(!localStorage.getItem("accessToken")) navigate("/")
        actions.getDetailRecipe(recipeId)
    }, [localStorage.getItem("accessToken")])

    function checkFavorites(recipeId, userId) {
        checkEditDeleteButton(userId)
        if(store.favorites.some(item => item.recipe_id == recipeId)) return faHeart
        return farHeartRegular
    }

    function checkRecipePicture(image) {
        if(image != "" && image != undefined && image != null) return recipeDetail.image
        return cookbookAI
    }

    function checkEditDeleteButton(userId) {
        const current_userId = localStorage.getItem("id")
        let editRecipe = document.getElementById("edit-recipe-btn-show")
        let deleteRecipe = document.getElementById("delete-recipe-btn-show")
        if(current_userId != userId) {
           if(editRecipe) editRecipe.style.display = "none"
           if(deleteRecipe) deleteRecipe.style.display = "none"
        } else {
            if(editRecipe) editRecipe.style.display = "block"
            if(deleteRecipe) deleteRecipe.style.display = "block"
        }
    }

    function showIdForm() {
        document.getElementById("ctn-detail-recipe").style.display = "none"
        document.getElementById("ctn-edit-recipe").style.display = "block"
        setIngredients(recipeDetail.ingredients)
        setDescription(recipeDetail.description)
        setInstructions(recipeDetail.elaboration)
        setRecommendedName(recipeDetail.name)
        setRecipePicture(recipeDetail.image)
    }

    async function editRecipe(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const formFields = document.getElementById('form-edit-recipe-id').elements;

        // show spinner loading and hide recipe editin container
        document.getElementById("spinner-update").style.display = "block"
        document.getElementById("ctn-edit-recipe").style.display = "none"
        document.getElementById("ctn-detail-recipe").style.display = "none"

        // call firebase to save image tha the user is uploading
        let resp_firebase = {}
        let resp_imagen = recipeDetail.image_firebase

        // validate if user uploaded an image
        if (formFields['recipePicture'].files.length > 0) {
            resp_firebase = await actions.uploadRecipePicture(formData, recipeDetail.id)
            Object.keys(resp_firebase).map((key) => {
                if(key == "data") resp_imagen = (resp_firebase[key].filename)
            })
        }
        // call to action to update he information in a recipe
        await actions.userEditRecipe(recipeDetail.id, recomendedname, description, ingredients, instructions, resp_imagen)
        setRecipePicture(resp_imagen)

        // hide the sppiner and show the recipe container
        document.getElementById("spinner-update").style.display = "none"
        document.getElementById("ctn-edit-recipe").style.display = "none"
        document.getElementById("ctn-detail-recipe").style.display = "block"
        navigate("/recipeDetail/" + recipeDetail.id)
        window.location.reload(false);
    }

    async function deleteRecipe() {
        await actions.userDeleteRecipe(recipeId)
        swal("Deleted!", "Your recipe has been deleted!", "success");
        navigate("/myrecipes")
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
                                <img src={checkRecipePicture(recipeDetail.image_firebase)} className="card-img-top" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="icon-favorite card-body">
                                    <button className="add-favorite-detail-btn btn btn-primary" type="submit" onClick={() => actions.addOrRemoveFavorites(recipeId)}><FontAwesomeIcon className="add-favorite-detail" icon={checkFavorites(recipeDetail.id, recipeDetail.user_id)} /></button>
                                    <button className="edit-recipe-detail-btn btn btn-primary" id="edit-recipe-btn-show" type="submit" onClick={() => showIdForm()}><FontAwesomeIcon className="edit-recipe-detail" icon={faPencil} /></button>
                                    <button className="delete-recipe-detail-btn btn btn-primary" id="delete-recipe-btn-show" type="submit" onClick={deleteRecipe}><FontAwesomeIcon className="delete-recipe-detail" icon={faTrashCan} /></button>
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
                <div className="container-fluid bg-3" id="spinner-update">
                    <div className="ctn-snipper container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="loader">Loading...</div>
                            </div>
                        </div>
                        <h3 className="title-snipper h3 text-white">Updating recipe ...</h3>
                    </div>
                </div>
                <div className="container mt-4 mb-4" id="ctn-edit-recipe">
                    <form className="row" onSubmit={editRecipe} id="form-edit-recipe-id">
                        <div className="col-sm-6">
                            <div className="card-edit card">
                                <div className="edit-picture-recipe">
                                    <img className="recipe-picture card-img-edit-recipe-top" src={cookbookAI} />
                                    <div className="mb-3">
                                        <label htmlFor="formFileSm" className="form-label"></label>
                                        <input className="form-control form-control-sm" name="recipePicture" id="formFileSm" type="file" />
                                        <div className="update-recipe-btn">
                                            <button type="submit" className="update-info-recipe-button btn btn-primary">Update Information</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card-edit-recipe card">
                                <div className="card-body-edit-recipe card-body">
                                    <label htmlFor="exampleFormControlName" className="form-label"> Recommended Name </label>
                                    <input
                                        className="form-control mb-5"
                                        id="exampleFormControlDescription"
                                        name="recomendedname"
                                        rows="1"
                                        value={recomendedname || ""}
                                        onChange={(e) => setRecommendedName(e.target.value)}
                                    ></input>
                                    <label htmlFor="exampleFormControlDescription" className="form-label"> Description </label>
                                    <textarea className="form-control" id="exampleFormControlDescription" name="description" rows="4" 
                                        value={description || "Not Description"}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="ctn-details">
                                    <div className="ingredients-details">
                                        <button className="ingredient-detail-btn btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseIngredients" aria-expanded="false" aria-controls="collapseExample">
                                            <FontAwesomeIcon icon={faPepperHot} className="mx-2" /> Ingredients
                                        </button>
                                        <div className="collapse mb-3" id="collapseIngredients">
                                            <textarea className="form-control" id="exampleFormControlDescription" name="ingredients" rows="8" 
                                                value={ingredients || ""}
                                                onChange={(e) => setIngredients(e.target.value)}>
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="steps-details">
                                        <button className="step-detail-btn btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSteps" aria-expanded="false" aria-controls="collapseExample2">
                                            <FontAwesomeIcon icon={faBowlFood} className="mx-2" /> Steps
                                        </button>
                                        <div className="collapse mb-5" id="collapseSteps">
                                            <textarea className="form-control" id="exampleFormControlDescription" name="instructions" rows="8" 
                                                value={instructions || ""}
                                                onChange={(e) => setInstructions(e.target.value)}>
                                            </textarea>
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
