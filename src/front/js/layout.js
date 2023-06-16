import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Recommend } from "./pages/recommend";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Signup } from "./pages/signup";
import { MyRecipes } from "./pages/myRecipes";
import { AllRecipes } from "./pages/allRecipes";
import { RecipeDetail } from "./pages/recipeDetail";
import { CreateRecipe } from "./pages/createRecipe";
import { EditRecipe } from "./pages/editRecipe";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div className="layout-view">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Recommend />} path="/recommended" />
                        <Route element={<MyRecipes />} path="/myrecipes" />
                        <Route element={<AllRecipes />} path="/allrecipes" />
                        <Route element={<Signup />} path="/api/signup" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<RecipeDetail />} path="/recipeDetail/:recipeId" />
                        <Route element={<CreateRecipe />} path="/createRecipe" />
                        <Route element={<EditRecipe />} path="/editRecipe/:recipeId" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
