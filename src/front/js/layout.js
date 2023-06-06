import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";
import { Detailscard } from "./component/detailscard";

//create your first component
export const detailscard = (props) => {
  const [state, setState] = setState({});
};

return (
  <div className="App">
    <BrowserRouter basename={basename}>
      <Detailscard />
    </BrowserRouter>
  </div>
);

export default injectContext(Layout);
