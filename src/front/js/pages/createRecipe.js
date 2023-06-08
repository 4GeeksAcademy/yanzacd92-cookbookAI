import React, { useContext , useEffect} from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeartRegular } from '@fortawesome/free-regular-svg-icons'
import cookbookAI from "./../../img/cookbookAI.jpg"
import { useParams } from "react-router-dom";

export const CreateRecipe = () => {
  
    const { store, actions } = useContext(Context);
    const recipeDetail = store.recipeDetail

    function createRecipe(name, description, prompt) {
        actions.userCreateRecipes(name, description, prompt)
    }

    return (
        <div>
        <Navbar />
        <div className="container mt-4 mb-4">
            <h1 className="text-center mt-4 re-title">Create your Recipe</h1>
            <div className="container mt-4 mb-4">
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <div className="mb-3">
                    <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
            </div>
        </div>
        </div>
    );
};
