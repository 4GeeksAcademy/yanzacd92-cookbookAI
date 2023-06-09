import React, { useContext , useEffect} from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeartRegular } from '@fortawesome/free-regular-svg-icons'
import cookbookAI from "./../../img/cookbookAI.jpg"
import { useParams } from "react-router-dom";

export const EditRecipe = () => {
    const {recipeId} = useParams()
    const { store, actions } = useContext(Context);
    const recipeDetail = store.recipeDetail

    function editRecipe(name, description, prompt) {
        actions.userCreateRecipes(name, description, prompt)
    }

    return (
        <div>
        <Navbar />
        <div className="container mt-4 mb-4">
            <h1 className="text-center mt-4 re-title">Edit Recipe</h1>
            <div className="container mt-4 mb-4">
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">Choose an image for your recipe (if you don't have one we can create it for you, so leave this field empty)</label>
                    <input className="form-control" type="file" id="formFile" />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Quantities per ingredient</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Recipe preparation</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Save recipe</button>
                </div>
            </div>
        </div>
        </div>
    );
};
