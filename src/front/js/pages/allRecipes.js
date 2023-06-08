import React, { useContext , useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/recommend.css";
import { Navbar } from "../component/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeartRegular } from '@fortawesome/free-regular-svg-icons'

export const AllRecipes = () => {
  useEffect( () => {
    actions.userAllRecipes()
  }, [])
  
  const { store, actions } = useContext(Context);
  const [hoveredImg, setHoveredImg] = useState(null);
  const allRecipes = store.allRecipes
  
  const handleMouseEnter = (index) => {
    setHoveredImg(index);
  };

  const handleMouseLeave = () => {
    setHoveredImg(null);
  };

  function checkFavorites(recipeId) {
    if(store.favorites.some(favorite => favorite.recipe_id == recipeId)) return faHeart
    return farHeartRegular
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-4 mb-4">
        <h1 className="text-center mt-4 re-title">All recipes</h1>
        <div className="container mt-4 mb-4">
          <div className="row">
            {allRecipes.map((recipe) => 
              <div className="col-md-4" key={recipe.id}>
                <div className="icon-favorite">
                  <button className="add-favorite-btn btn btn-primary" type="submit" onClick={() => actions.addOrRemoveFavorites(recipe.id)}><FontAwesomeIcon className="add-favorite" icon={checkFavorites(recipe.id)} /></button>
                </div>
                <Link to="/descripcion-imagen1">
                  <div
                    className={`img-wrapper ${hoveredImg === 0 ? "hovered" : ""}`}
                    onMouseEnter={() => handleMouseEnter(0)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="img-fluid rounded shadow zoom-image"
                    />
                    {hoveredImg === 0 && (
                      <div className="img-title">
                        {recipe.name} 
                      </div>
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
