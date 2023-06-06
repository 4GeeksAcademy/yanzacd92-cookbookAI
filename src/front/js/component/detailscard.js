import React, { useState, useEffect, Component } from "react";
import pizza from "../../img/pizza.jpg";

export const Detailscard = () => (
  <div className="body">
    <div className="container">
      <div className="row m-4 text-center">
        <h1 className="text-primary display 4 fw-normal">
          Descripcion Recetas
        </h1>
        <p className="fs-5 text-muted">
          Detalles de recetas para su preparacion.
        </p>
      </div>
    </div>

    <main>
      <div className="container">
        <form
          id="recipe-form"
          className="p-4 m-4 row shadow-sm rounded-3 border border-primary"
        >
          <div className="form-group col-md-6 my-2 p-3">
            <label htmlFor="name">{props.nombrereceta}</label>
            <input type="text" id="name" className="form-control" />
          </div>

          <div className="form-group col-md-6 my-2 p-3col-md-6 my-2 p-3">
            <label htmlFor="tiempo_coccion">{props.tiempococcion}</label>
            <div className="label descripcionreceta">
              {props.descripcionreceta}
            </div>
          </div>

          <div className="card col-md-6 my-2 p-3 ">
            <div className="card-header">Ingredientes y elaboracion</div>
            <ul className="list-group list-group-flush column-gap-5">
              <li className="list-group-item">
                <div className="label ingrediente1">{props.ingrediente1}</div>
              </li>
              <li className="list-group-item">
                <div className="label ingrediente2">{props.ingrediente2}</div>
              </li>
              <li className="list-group-item">
                <div className="label ingrediente3">{props.ingrediente3}</div>
              </li>
            </ul>
          </div>

          <div className="card col-md-6 my-2 p-3">
            <img src={props.img} alt="props.imgname" />
          </div>
        </form>
      </div>
    </main>
  </div>
);

detailsCard.propTypes = {
  nombrereceta: PropTypes.string,
  tiempococcion: PropTypes.string,
  ingrediente1: PropTypes.string,
  ingrediente2: PropTypes.string,
  ingrediente3: PropTypes.string,
  img: PropTypes.element,
};
