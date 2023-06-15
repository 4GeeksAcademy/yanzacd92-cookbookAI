import React, { useContext, useEffect, useState } from "react";
import profileLogo from './../../img/profile-logo.png'
import { Favorite } from "./favorite";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";


export const Navbar = (props) => {
	const navigate = useNavigate();
	const [myrecipes, setMyRecipes] = useState("");
	const logout = () => {
		actions.userLogout()
		navigate('/', { replace: true })
	}
	const { store, actions } = useContext(Context);
	function checkActive(pathname) {
		setMyRecipes("active")
		navigate(pathname, { replace: true })
	}

	return (
		<nav className="navbar navbar-dark bg-primary">
			<div className="container-fluid">
				<div>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item">
								<a className={`nav-link ${props.recommend}`} aria-current="page" href="/recommend">Recommended recipes</a>
							</li>
							<li className="nav-item">
								<a className={`nav-link ${props.createRecipe}`} href="/createRecipe">Create your recipe</a>
							</li>
							<li className="nav-item">
								<a className={`nav-link ${props.myrecipes}`} href="/myrecipes" onClick={() => checkActive("/myrecipes")}>My recipes</a>
							</li>
							<li className="nav-item">
								<a className={`nav-link ${props.allrecipes}`} href="/allrecipes" tabIndex="-1" aria-disabled="true">All recipes by users</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" onClick={logout} tabIndex="-1" aria-disabled="true">Logout</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="content-navbar">
					<img className="profile-img" src={profileLogo} width="30" />
					<Favorite />
					<a className="navbar-brand" href="/">CookBook AI</a>
				</div>
			</div>
		</nav>
	);
};

Navbar.propTypes = {
	recommend: propTypes.string,
	createRecipe: propTypes.string,
	myrecipes: propTypes.string,
	allrecipes: propTypes.string
}
