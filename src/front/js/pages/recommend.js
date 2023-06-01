import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Recommend = () => {
  const { store, actions } = useContext(Context);

  const imageUrl =
    "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/VSJYXHBWHRGVVDXGZZZIFKRHSE.jpg";

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <div className="col-md-4">
          <img
            src={imageUrl}
            alt="Recomendación 1"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-4">
          <img
            src={imageUrl}
            alt="Recomendación 2"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-4">
          <img
            src={imageUrl}
            alt="Recomendación 3"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-4">
          <img
            src={imageUrl}
            alt="Recomendación 4"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-4">
          <img
            src={imageUrl}
            alt="Recomendación 5"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-4">
          <img
            src={imageUrl}
            alt="Recomendación 6"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-4">
          <img
            src={imageUrl}
            alt="Recomendación 7"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-4">
          <img
            src={imageUrl}
            alt="Recomendación 8"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-4">
          <img
            src={imageUrl}
            alt="Recomendación 9"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
    </div>
  );
};
