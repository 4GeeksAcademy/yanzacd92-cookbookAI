import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookieBite } from '@fortawesome/free-solid-svg-icons'
import cookbookAI from "./../../img/cookbookAI.jpg"
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

export const CreateRecipe = () => {
  const { store, actions } = useContext(Context);
  const ingredientsRef = useRef(null);
  const [ingredient, setIngredient] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [instructions, setInstructions] = useState("");
  const [recommendedname, setRecommendedName] = useState("");
  const [recipePicture, setRecipePicture] = useState("");
  const navigate = useNavigate()

  useEffect( () => {
    if(!localStorage.getItem("accessToken")) navigate("/")
  }, [localStorage.getItem("accessToken")])

  async function createRecipe(e) {
    e.preventDefault()
    //const formData = new FormData(e.target)
    //const formFields = document.getElementById('form-create-recipe-id').elements;
    let resp_imagen = ""

    let new_recipe = await actions.userCreateRecipe(recommendedname, description, ingredient, instructions, resp_imagen)
    if(new_recipe.code >= 400) {
      swal("Opps!", "Recipe was not created", "error");
      navigate("/createRecipe")
    } else{
      swal("Amazing!", "Recipe has been created", "success");
      navigate("/recipeDetail/" + new_recipe.data.id)
    }
    /*let recipeId = 0
    Object.keys(new_recipe).map((key) => {
      if(key == "data")
        Object.keys(new_recipe[key]).map((k) => {
        if(k == "id") recipeId = new_recipe[key][k]
      })
    })*/
    // validate if user uploaded an image
    /*if (formFields['recipePicture'].files.length > 0) {
      resp_firebase = await actions.uploadRecipePicture(formData, recipeId)
      if(resp_firebase.code >= 400) {
        swal("Opps!", "Recipe was not created", "error");
        //navigate("/createRecipe")
      } else {
      Object.keys(resp_firebase).map((key) => {
          if(key == "data") resp_imagen = (resp_firebase[key].filename)
      }) }
    }*/

    // create image from URL
    /*let formD = createImageFromUrl(recipePicture)
    console.log("FORMDATA  " + formD)
    console.log("URL IMAGE  " + recipePicture)
    let resp_firebase = await actions.uploadRecipePicture(formD, recipeId)
    Object.keys(resp_firebase).map((key) => {
      if(key == "data") resp_imagen = (resp_firebase[key].filename)
  })*/
    //console.log("FIRABASE IMAGE  " + resp_imagen)
    //let resp_edit_recipe = await actions.userEditRecipe(recipeId, recommendedname, description, ingredient, instructions, resp_imagen)
    /*setRecipePicture(resp_imagen)
    if(resp_edit_recipe.code >= 400) {
      swal("Opps!", "Recipe was not created", "error");
    } else {
      swal("Amazing!", "Recipe has been created", "success");
      navigate("/recipeDetail/" + recipeId)
    }
    swal("Amazing!", "Recipe has been created", "success");*/
  }

  async function callChatGPT() {
    document.getElementById("spinner-create").style.display = "block"
    document.getElementById("generate-gpt").style.display = "none"
    let recipeImg = await actions.userCallChatGPTImage(ingredient)
    Object.keys(recipeImg).map((key) => {
      if(key == "data") {
        setRecipePicture(recipeImg[key]['url'])
      }
    })
    let recipeChatGPT = await actions.userCallChatGPT(
      ingredient
    );
    document.getElementById("spinner-create").style.display = "none"
    Object.keys(recipeChatGPT).map((key) => {
      if(key == "code"){
        console.log("code  " + key)
        if(recipeChatGPT[key] == 500) navigate("/createRecipe")
      }
      console.log("Call to Chat GPT successful!!  " + JSON.stringify(recipeChatGPT))
      if(key == "data") {
        let resp = recipeChatGPT[key]
        let recipe = (resp.recipe)? (resp.recipe) : resp
        Object.keys(recipe).map((key) => {
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
              setQuantity(populateInformation(recipe[key], "Ingredient"))
              break;
            case 'steps':
              setInstructions(populateInformation(recipe[key], "Step"))
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

  function populateInformation(info, attribute) {
    if (!Array.isArray(info)) return (info.toString()).split(".").join("")
    let text = ""
    let count = 0
    Object.keys(info).map((key) => {
      count ++
      text += attribute + " " + count + ": "  + info[key] + "\n"
      text += "\n"
    })

    return text
  }

  function createImageFromUrl(imageUrl) {
    //const imageUrl = 'https://example.com/image.jpg'; // Replace with your image URL
    // Create a new FormData object
    const formData = new FormData();
    // Fetch the image file
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Append the image file to the FormData object
        formData.append('image', blob, 'imagetest.jpg');
      })
      .catch((error) => {
        // Handle any errors
      });

      return formData;
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
                <h3 className="title-snipper h3 text-white">Generating recipe ...</h3>
            </div>
        </div>
        <div className="cnt-create-recipe container mt-4 mb-4" id="form-create-recipe-id">
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

          <form className="content-save-gpt" onSubmit={createRecipe} id="save-gpt">
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
                  name="recommendedname"
                  rows="1"
                  value={recommendedname || ""}
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
          </form>
        </div>
      </div>
    </div>
  );
};
