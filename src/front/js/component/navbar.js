import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
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
								<a className="nav-link active" aria-current="page" href="#">Recommended recipes</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">Create your recipe</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">My recipes</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#" tabIndex="-1" aria-disabled="true">All recipes by users</a>
							</li>
						</ul>
					</div>
				</div>
				<a className="navbar-brand" href="#">CookBookAI</a>
			</div>
		</nav>
	);
};
