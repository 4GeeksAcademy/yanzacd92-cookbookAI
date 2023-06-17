import React, { useContext, useEffect, useState } from "react";
import profileLogo from './../../img/profile-logo.png'
import { Favorite } from "./favorite";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeartRegular } from '@fortawesome/free-regular-svg-icons'
import cookbookAI from "./../../img/cookBookAILogo.png"
import noPhoto from "./../../img/not-picture.png"
import propTypes from "prop-types";


export const Navbar = (props) => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	const [myrecipes, setMyRecipes] = useState("");
	const profilePhoto = store.pictureUrl? store.pictureUrl : noPhoto

	useEffect( () => {
		actions.userShowById()
	  }, [])
	const logout = () => {
		actions.userLogout()
		navigate('/', { replace: true })
	}
	function checkActive(pathname) {
		setMyRecipes("active")
		navigate(pathname, { replace: true })
	}

	function getProfile() {
		actions.userShowById()
		navigate("/editUser")
	}

	return (
		<nav className="navbar navbar-dark bg-primary">
			<div className="container-fluid">
				<div className="favorites-navbar">
					<div>
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarNav">
							<ul className="navbar-nav">
								<li className="nav-item">
									<a className={`nav-link ${props.recommend}`} aria-current="page" href="/recommended">Recommended recipes</a>
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
							</ul>
						</div>
					</div>
				</div>
				<img className="logo-navbar" onClick={() => navigate("/recommended")} src={cookbookAI} width="30" />
				<div className="content-navbar">
					<Favorite />
					<img className="profile-img" onClick={() => getProfile()} src={profilePhoto} width="30" />
					<a className="logout-btn-navbar" onClick={logout} tabIndex="-1" aria-disabled="true"><FontAwesomeIcon className="logout-icon" icon={faArrowRightFromBracket}></FontAwesomeIcon></a>
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
