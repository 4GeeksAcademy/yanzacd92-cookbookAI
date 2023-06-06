import React, { useContext , useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/addrecipe.css";
import { Navbar } from "../component/navbar";
export const Addrecipe = () => {
  const { store, actions } = useContext(Context);
  const [hoveredImg, setHoveredImg] = useState(null);
  const [recipe,setRecipe] = useState("");

  useEffect(()=> {
        fetch("/create-recipe-chatGPT")
        .then((response) => response.json())
        .then((data)=> {
            setRecipe(data);
        })
        .catch((error)=>{
            console.error(error);
        });
    }, []);
  return (
    <div>
        <Navbar />
        <div className="container text-center mt-4">
            <h1 className="text-center mt-4 re-title">Agregar Receta</h1>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <input className="form-control mb-3" type="text" placeholder="Nombre de la receta" aria-label="namereceta" />
                    <input className="form-control mb-3" type="text" placeholder="Descripción" aria-label="Description" />
                    <label for="exampleFormControlTextarea1" className="form-label">Ingrese los ingredientes que posea</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                    <button type="button" className="btn btn-success mt-3">Generar</button>
                </div>
                <div className="row mt-4">
                    <textarea className="form-control" id="exampleFormControlTextarea2" rows="5"  value={recipe} readOnly></textarea>
                    <button type="button" className="btn btn-success mt-3">Guardar</button>
                </div>
            </div>
        </div>
    </div>
  );
};