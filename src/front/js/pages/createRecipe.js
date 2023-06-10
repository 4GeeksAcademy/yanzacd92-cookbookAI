import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeartRegular } from "@fortawesome/free-regular-svg-icons";
import cookbookAI from "./../../img/cookbookAI.jpg";
import { useParams } from "react-router-dom";

export const CreateRecipe = () => {
  const { store, actions } = useContext(Context);
  const ingredientsRef = useRef(null);
  const descriptionRef = useRef(null);
  const [ingredient, setIngredient] = useState("");
  const [description, setDescription] = useState("");
  const recipeDetail = store.recipeDetail;

  async function createRecipe() {
    let recipeChatGPT = await actions.userCreateRecipes(
      "text name",
      description,
      ingredient
    );
    console.log("Call to Chat GPT successful!!  " + JSON.stringify(recipeChatGPT))
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-4 mb-4">
        <h1 className="text-center mt-4 re-title">Create your Recipe</h1>
        <div className="container mt-4 mb-4">
          <div className="mb-3">
            <label htmlFor="formGroupIngredients" className="form-label">
              Add ingredients you have available separated by commas
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupIngredients"
              name="ingredients"
              ref={ingredientsRef}
              value={ingredient}
              placeholder="Ingrediente 1, ingrediente 2, ..."
              onChange={(e) => setIngredient(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlDescription"
              className="form-label"
            >
              Description
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlDescription"
              name="description"
              rows="3"
              ref={descriptionRef}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Choose an image for your recipe (if you don't have one we can
              create it for you, so leave this field empty)
            </label>
            <input className="form-control" type="file" id="formFile" />
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => createRecipe()}
            >
              Generate recipe
            </button>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Quantities per ingredient
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Recipe preparation
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Save recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
