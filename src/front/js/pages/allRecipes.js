import React, { useContext , useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/recommend.css";
import { Navbar } from "../component/navbar";

export const AllRecipes = () => {
  const { store, actions } = useContext(Context);
  const [hoveredImg, setHoveredImg] = useState(null);
 /*  useEffect(() => {
    actions.userAllRecipes()
  }, []) */
  const allRecipes = store.allRecipes
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
          {allRecipes?.map(recipe => 
            <div className="col-md-4">
              <Link to='/${recipe}'>
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
          <div className="col-md-4">
            <Link to="/descripcion-imagen1">
              <div
                className={`img-wrapper ${hoveredImg === 1 ? "hovered" : ""}`}
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src="https://www.thespruceeats.com/thmb/sUSIS7lVuErRIJHonesrPRjhXQQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/pasta-carbonara-recipe-5210168-hero-01-80090e56abc04ca19d88ebf7fad1d157.jpg"
                  alt="Pasta-carbona"
                  className="img-fluid rounded shadow zoom-image"
                />
                {hoveredImg === 1 && (
                  <div className="img-title">Pasta<br />
                  <span className="roll-text">Carbonara</span></div>
                )}
              </div>
            </Link>
          </div>
        
          <div className="col-md-4">
            <Link to="/descripcion-imagen1">
              <div
                className={`img-wrapper ${hoveredImg === 2 ? "hovered" : ""}`}
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src="https://www.simplyrecipes.com/thmb/1V_2pEa8vcV3bLHtlJO0dFHnPAs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-California-Roll-LEAD-05-3c3a2fb4a9034e5c8cb34d6a24d9731e.jpg"
                  alt="Sushi(california roll)"
                  className="img-fluid rounded shadow zoom-image"
                />
                {hoveredImg === 2 && (
                  <div className="img-title">California<br />
                  <span className="roll-text">Roll</span></div>
                )}
              </div>
            </Link>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-4">
            <Link to="/descripcion-imagen1">
              <div
                className={`img-wrapper ${hoveredImg === 3 ? "hovered" : ""}`}
                onMouseEnter={() => handleMouseEnter(3)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src="https://media-cdn.tripadvisor.com/media/photo-s/1c/d4/5e/ab/chicken-shawarma-amigo.jpg"
                  alt="Shawarma"
                  className="img-fluid rounded shadow zoom-image"
                />
                {hoveredImg === 3 && (
                  <div className="img-title">Shawarma</div>
                )}
              </div>
            </Link>
          </div>
          
          <div className="col-md-4">
            <Link to="/descripcion-imagen1">
              <div
                className={`img-wrapper ${hoveredImg === 4 ? "hovered" : ""}`}
                onMouseEnter={() => handleMouseEnter(4)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src="https://www.thespruceeats.com/thmb/Ds854G9voHTrC0KtTYC0svlCEJo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/hot-chicken-wings-3053250-hero-01-348a7fea11b54bbebd8ce19c9100880a.jpg"
                  alt="spicy-wings"
                  className="img-fluid rounded shadow zoom-image"
                />
                {hoveredImg === 4 && (
                  <div className="img-title">Spicy Wings</div>
                )}
              </div>
            </Link>
          </div>
          
          <div className="col-md-4">
            <Link to="/descripcion-imagen1">
              <div
                className={`img-wrapper ${hoveredImg === 5 ? "hovered" : ""}`}
                onMouseEnter={() => handleMouseEnter(5)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src="https://t1.uc.ltmcdn.com/es/posts/2/1/5/como_hacer_un_risotto_facil_37512_orig.jpg"
                  alt="Rissoto"
                  className="img-fluid rounded shadow zoom-image"
                />
                {hoveredImg === 5 && (
                  <div className="img-title">Risotto</div>
                )}
              </div>
            </Link>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-4">
            <Link to="/descripcion-imagen1">
              <div
                className={`img-wrapper ${hoveredImg === 6 ? "hovered" : ""}`}
                onMouseEnter={() => handleMouseEnter(6)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src="https://www.licious.in/blog/wp-content/uploads/2022/12/Shutterstock_1590703711-750x500.jpg"
                  alt="Mongolian-chicken"
                  className="img-fluid rounded shadow zoom-image"
                />
                {hoveredImg === 6 && (
                  <div className="img-title">Mongolian Chicken</div>
                )}
              </div>
            </Link>
          </div>
          
          <div className="col-md-4">
            <Link to="/descripcion-imagen1">
              <div
                className={`img-wrapper ${hoveredImg === 7 ? "hovered" : ""}`}
                onMouseEnter={() => handleMouseEnter(7)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src="https://cocina-casera.com/wp-content/uploads/2018/04/Pasticho-o-lasa%C3%B1a-al-estilo-venezolano.jpg"
                  alt="lasagna"
                  className="img-fluid rounded shadow zoom-image"
                />
                {hoveredImg === 7 && (
                  <div className="img-title">Lasagna</div>
                )}
              </div>
            </Link>
          </div>
        
          <div className="col-md-4">
            <Link to="/descripcion-imagen1">
              <div
                className={`img-wrapper ${hoveredImg === 8 ? "hovered" : ""}`}
                onMouseEnter={() => handleMouseEnter(8)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src="https://hot-thai-kitchen.com/wp-content/uploads/2021/12/noodle-meatball-blog.jpg"
                  alt="Meat-balls"
                  className="img-fluid rounded shadow zoom-image"
                />
                {hoveredImg === 8 && (
                  <div className="img-title">Meatballs</div>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
