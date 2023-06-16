import React, { useContext , useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/recommend.css";
import { Navbar } from "../component/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeartRegular } from '@fortawesome/free-regular-svg-icons'

export const MyRecipes = () => {
  const navigate = useNavigate()
  const { store, actions } = useContext(Context);
  const [hoveredImg, setHoveredImg] = useState(null);
  const myRecipes = store.myRecipes

  useEffect( () => {
    if(!localStorage.getItem("accessToken")) navigate("/")
    actions.userMyRecipes()
  }, [localStorage.getItem("accessToken")])

  const handleMouseEnter = (index) => {
    setHoveredImg(index);
  };

  const handleMouseLeave = () => {
    setHoveredImg(null);
  };


  return (
    <div>
      <Navbar myrecipes={"active"}/>
      <div className="container mt-4 mb-4">
        <h1 className="text-center mt-4 re-title">MY RECIPES <FontAwesomeIcon icon={faUtensils} className="mx-2"/></h1>
        <div className="ctn-my-recipes container mt-4 mb-4">
          <div className="row">
            {myRecipes.map((recipe) => 
              <div className="col-md-4" key={recipe.id}>
                <Link to={`/recipeDetail/${recipe.id}`}>
                  <div
                    className={`img-wrapper ${hoveredImg === recipe.id ? "hovered" : ""}`}
                    onMouseEnter={() => handleMouseEnter(recipe.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="img-fluid rounded shadow zoom-image"
                    />
                    {hoveredImg === recipe.id && (
                      <div className="img-title">{recipe.name}</div>
                    )}
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
