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
  const [quantity, setQuantity] = useState("");
  const [instructions, setInstructions] = useState("");
  const recipeDetail = store.recipeDetail;

  async function createRecipe() {
    console.log("WAITING FOR THE RESPONSE CHATGPT")
    let recipeChatGPT = await actions.userCreateRecipes(
      "text name",
      description,
      ingredient
    );
    console.log("DATAAAAA")
    Object.keys(recipeChatGPT).map((key) => {
      if(key == "data") {
        let resp = recipeChatGPT[key]
        console.log(resp)
        setQuantity(resp.recipe)
        setInstructions(resp.recipe)
      }
    })
    showHideDiv("block", "none")
    console.log("Call to Chat GPT successful!!  " + JSON.stringify(recipeChatGPT))
  }

  function showHideDiv(saveBtn, generateBtn){
    let divSaveContent = document.getElementById("save-gpt")
    let divGenerateContent = document.getElementById("generate-gpt")
    if (divSaveContent !== null) divSaveContent.style.display = saveBtn
    if (divGenerateContent !== null) divGenerateContent.style.display = generateBtn
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-4 mb-4">
        <h1 className="text-center mt-4 re-title">Create your Recipe</h1>
        <div className="cnt-create-recipe container mt-4 mb-4">
          <div className="content-generate-gpt" id="generate-gpt">
          <h1 className="login-title">Your Ingredients</h1>
            <div className="mb-3">
              <label htmlFor="formGroupIngredients" className="label-add-recipe form-label">
                Add ingredients you have available separated by commas
              </label>
              <input
                type="text"
                className="form-control"
                id="formGroupIngredients"
                name="ingredients"
                ref={ingredientsRef}
                value={ingredient}
                placeholder="Ingredient 1, ingredient 2, ..."
                onChange={(e) => setIngredient(e.target.value)}
              />
            </div>
            <div className="label-add-recipe mb-3">
              <label
                htmlFor="exampleFormControlDescription"
                className="form-label"
              >
                Description
              </label>
              <input
                className="form-control"
                id="exampleFormControlDescription"
                name="description"
                rows="1"
                ref={descriptionRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="label-add-recipe form-label">
                Choose an image for your recipe (if you don't have one we can
                create it for you, so leave this field <strong>empty</strong>)
              </label>
              <input className="form-control" type="file" id="formFile" />
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="generate-btn btn btn-primary"
                onClick={() => createRecipe()}
              >
                Generate recipe
              </button>
            </div>
          </div>

          <div className="content-save-gpt" id="save-gpt">
            <div className="mb-3">
            <h1 className="login-title">Congratulations on your new recipe</h1>
              <label htmlFor="exampleFormControlTextarea1" className="label-add-recipe form-label" >
                Quantities per ingredient
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={e => setQuantity(e.target.value)}
                value={quantity || ""}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="label-add-recipe form-label">
                Recipe preparation
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={e => setInstructions(e.target.value)}
                value={instructions || ""}
              ></textarea>
            </div>
            <div className="recipe-buttons">
              <div className="recipe-btn col-12">
                <button type="submit" className="save-btn btn btn-primary">
                  Save recipe
                </button>
              </div>
              <div className="recipe-btn col-12">
                <button type="submit" className="generate-btn btn btn-primary" onClick={() => showHideDiv("none", "block")}>
                  Back to new recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
