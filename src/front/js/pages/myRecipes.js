import React, { useContext , useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/recommend.css";
import { Navbar } from "../component/navbar";

export const MyRecipes = () => {
  useEffect( () => {
    actions.userMyRecipes()
  }, [])

  const { store, actions } = useContext(Context);
  const [hoveredImg, setHoveredImg] = useState(null);
  const myRecipes = store.myRecipes

  const handleMouseEnter = (index) => {
    setHoveredImg(index);
  };

  const handleMouseLeave = () => {
    setHoveredImg(null);
  };


  return (
    <div>
      <Navbar />
      <div className="container mt-4 mb-4">
        <h1 className="text-center mt-4 re-title">All recipes</h1>
        <div className="container mt-4 mb-4">
          <div className="row">
            {myRecipes.map((recipe) => 
              <div className="col-md-4" key={recipe.id}>
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
