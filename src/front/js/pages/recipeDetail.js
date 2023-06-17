import React, { useContext , useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlFood, faPepperHot } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { useNavigate, useParams } from "react-router-dom";

export const RecipeDetail = () => {
    const {recipeId} = useParams()
    const navigate = useNavigate()
    const { store, actions } = useContext(Context);
    const recipeDetail = store.recipeDetail
    
    useEffect( () => {
        if(!localStorage.getItem("accessToken")) navigate("/")
        actions.getDetailRecipe(recipeId)
    }, [localStorage.getItem("accessToken")])

    function checkFavorites(recipeId) {
        if(store.favorites.some(favorite => favorite.recipe_id == recipeId) && 
        store.favorites.some(favorite => favorite.user_id == localStorage.getItem("id"))) return faHeart
        return farHeartRegular
    }

    return (
        <div>
        <Navbar />
        <div className="container mt-4 mb-4">
            <h1 className="text-center mt-4 re-title">{recipeDetail.name}</h1>
            <div className="container mt-4 mb-4">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <img src={recipeDetail.image} className="card-img-top" />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{recipeDetail.name}</h5>
                                <p className="card-text">{recipeDetail.description}</p>
                            </div>
                            <div className="ctn-details">
                                <div className="ingredients-details">
                                    <button class="ingredient-detail-btn btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseIngredients" aria-expanded="false" aria-controls="collapseExample">
                                        <FontAwesomeIcon icon={faPepperHot} className="mx-2" /> Ingredients
                                    </button>
                                    <div className="collapse mb-3" id="collapseIngredients">
                                        <p className="card-text">{recipeDetail.ingredients}</p>
                                    </div>
                                </div>
                                <div className="steps-details">
                                    <button class="step-detail-btn btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSteps" aria-expanded="false" aria-controls="collapseExample">
                                        <FontAwesomeIcon icon={faBowlFood} className="mx-2" /> Steps
                                    </button>
                                    <div className="collapse mb-3" id="collapseSteps">
                                        <p className="card-text">{recipeDetail.elaboration}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="icon-favorite card-body">
                                <button className="add-favorite-detail-btn btn btn-primary" type="submit" onClick={() => actions.addOrRemoveFavorites(recipeId)}><FontAwesomeIcon className="add-favorite-detail" icon={checkFavorites(recipeDetail.id)} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};
