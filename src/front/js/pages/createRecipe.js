import React, { useContext, useRef, useState } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookieBite } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeartRegular } from '@fortawesome/free-regular-svg-icons'

export const CreateRecipe = () => {
  const { store, actions } = useContext(Context);
  const ingredientsRef = useRef(null);
  const [ingredient, setIngredient] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [instructions, setInstructions] = useState("");
  const [recomendedname, setRecommendedName] = useState("");
  const [imageRecipe, setImageRecipe] = useState("");

  async function createRecipe(name, description, ingredients, elaboration, imageRecipe) {
    await actions.userCreateRecipe(name, description, ingredients, elaboration, imageRecipe)
    console.log("RECIPE CREATED FROM REACT")
  }

  async function callChatGPT() {
    document.getElementById("spinner-create").style.display = "block"
    document.getElementById("generate-gpt").style.display = "none"
    if(imageRecipe == ""){
      let recipeImg = await actions.userCallChatGPTImage(ingredient)
      Object.keys(recipeImg).map((key) => {
        if(key == "data") {
          setImageRecipe(recipeImg[key]['url'])
        }
      })
    }
    let recipeChatGPT = await actions.userCallChatGPT(
      ingredient
    );
    document.getElementById("spinner-create").style.display = "none"
    Object.keys(recipeChatGPT).map((key) => {
      console.log("Call to Chat GPT successful!!  " + JSON.stringify(recipeChatGPT))
      if(key == "data") {
        let resp = recipeChatGPT[key]
        let recipe = (resp.recipe)? (resp.recipe) : resp
        Object.keys(recipe).map((key) => {
          console.log("KEY  -----> " + key.toUpperCase())
          switch(key.toLowerCase()) {
            case 'recipename':
            case 'recipe_name':
            case 'name':
              setRecommendedName(recipe[key])
              break;
            case 'description':
              setDescription(recipe[key])
              break;
            case 'ingredients':
              setQuantity(populateIngredients(recipe[key]))
              break;
            case 'steps':
              setInstructions(((recipe[key]).toString()).split(".").join(""))
              break;
            case 'image_url':
              break;
            default:
              break;
          }
        })
      }
    })
    showHideDiv("block", "none")
  }

  function showHideDiv(saveBtn, generateBtn){
    let divSaveContent = document.getElementById("save-gpt")
    let divGenerateContent = document.getElementById("generate-gpt")
    if (divSaveContent !== null) divSaveContent.style.display = saveBtn
    if (divGenerateContent !== null) divGenerateContent.style.display = generateBtn
  }

  function populateIngredients(ingredients) {
    let quantity = ""
    console.log(ingredients)
    Object.keys(ingredients).map((key) => {
      Object.keys(ingredients[key]).map((k) => {
        switch(k) {
          case 'ingredient':
          case 'item':
          case 'name':
            if(ingredients[key][k]) quantity += "ingredient " + ": "  + ingredients[key][k] + "\n"
            break;
          case 'quantity':
            if(ingredients[key][k]) quantity += k + ": "  + ingredients[key][k] + "\n"
            break;
          case 'unit':
            if(ingredients[key][k]) quantity += k + ": "  + ingredients[key][k] + "\n"
            break;
          case 'preparation':
            if(ingredients[key][k]) quantity += k + ": "  + ingredients[key][k] + "\n"
            break;
          case 'unit_of_measurement':
          case 'measurement':
            if(ingredients[key][k]) quantity += k + ": "  + ingredients[key][k] + "\n"
          case 'amount':
            if(ingredients[key][k]) quantity += k + ": "  + ingredients[key][k] + "\n"
          default:
            break;
        }
      })
      quantity += "\n"
    })

    return quantity
  }

  return (
    <div>
      <Navbar createRecipe={"active"}/>
      <div className="container mt-4 mb-4">
        <h1 className="text-center mt-4 re-title">CREATE YOUR RECIPE <FontAwesomeIcon icon={faCookieBite} className="mx-2" /></h1>
        <div className="container-fluid bg-3" id="spinner-create">
          <div className="ctn-snipper container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="loader">Loading...</div>
                    </div>
                </div>
                <h3 className="title-snipper h3 text-white">Creating recipe ...</h3>
            </div>
        </div>
        <div className="cnt-create-recipe container mt-4 mb-4">
          <div className="content-generate-gpt" id="generate-gpt">
          <h1 className="login-title">Your Ingredients</h1>
            <div className="mb-3">
              <label htmlFor="formGroupIngredients" className="label-add-recipe form-label">
                Add ingredients
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
            <div className="mb-3">
              <label htmlFor="formFile" className="label-add-recipe form-label">
                Image for recipe (<strong>optional</strong>)
              </label>
              <input className="form-control" type="file" id="formFile" onChange={(e) => setImageRecipe(e.target.value)}/>
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="generate-btn btn btn-primary"
                onClick={() => callChatGPT()}
              >
                Generate recipe
              </button>
            </div>
          </div>

          <div className="content-save-gpt" id="save-gpt">
            <div className="mb-3">
            <h1 className="login-title">Congratulations your new recipe</h1>
              <div className="label-add-recipe mb-3">
                <label
                  htmlFor="exampleFormControlName"
                  className="form-label"
                >
                  Recommended Name
                </label>
                <input
                  className="form-control"
                  id="exampleFormControlDescription"
                  name="recomendedname"
                  rows="1"
                  value={recomendedname || ""}
                  onChange={(e) => setRecommendedName(e.target.value)}
                ></input>
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
                  value={description || "Not Description"}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </div>
              <label htmlFor="exampleFormControlTextarea1" className="label-add-recipe form-label" >
                Quantities per ingredient
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="6"
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
                rows="4"
                onChange={e => setInstructions(e.target.value)}
                value={instructions || ""}
              ></textarea>
            </div>
            <div className="recipe-buttons">
              <div className="recipe-btn col-12">
                <button type="submit" className="save-btn btn btn-primary" onClick={
                  () => createRecipe(recomendedname, description, quantity, instructions, imageRecipe)}>
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
