import React, { useContext , useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeartRegular } from '@fortawesome/free-regular-svg-icons'
import cookbookAI from "./../../img/cookbookAI.jpg"
import { useParams } from "react-router-dom";

export const RecipeDetail = () => {
    const {recipeId} = useParams()
    useEffect( () => {
        actions.getDetailRecipe(recipeId)
    }, [])
  
    const { store, actions } = useContext(Context);
    const recipeDetail = store.recipeDetail

    function checkFavorites(recipeId) {
        if(store.favorites.some(favorite => favorite.recipe_id == recipeId)) return faHeart
        return farHeartRegular
    }

    return (
        <div>
        <Navbar />
        <div className="container mt-4 mb-4">
            <h1 className="text-center mt-4 re-title">Recipe Details</h1>
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
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">An item</li>
                            </ul>
                            <div className="icon-favorite card-body">
                                <button className="add-favorite-btn btn btn-primary" type="submit" onClick={() => actions.addOrRemoveFavorites(recipeDetail.id)}><FontAwesomeIcon className="add-favorite" icon={checkFavorites(recipeDetail.id)} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};
