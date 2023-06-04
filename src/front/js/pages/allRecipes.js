import React, { useContext , useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/recommend.css";
import { Navbar } from "../component/navbar";

export const AllRecipes = () => {
  const { store, actions } = useContext(Context);
  const [hoveredImg, setHoveredImg] = useState(null);
  const allRecipes = store.allRecipes?.length > 0 ? store.allRecipes : []
  console.log("ALL RECIPES AFTER: ------------------------>  " + (allRecipes))
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
        <h1 className="text-center mt-4 re-title">All Recipes</h1>
        <div className="container mt-4 mb-4"></div>
        <div className="row">
          {allRecipes?.map(() => 
            <div>hola</div>
          )}         
        </div>
      </div>
    </div>
  );
};
