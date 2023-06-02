import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	async function submitForm(e) {
		e.preventDefault()
		let data = new FormData(e.target)
		let resp = await actions.userLogin(data.get("email"), data.get("password"))
		if(resp >= 400) {
			return
		}
		console.log("Login exitoso!!")
	}

	function signup() {
		navigate("/api/signup");
	}

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			<form className="login-form" onSubmit={submitForm}>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
					<input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" />
					<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
					<input type="password" className="form-control" name="password" id="exampleInputPassword1" />
				</div>
				<div className="login">
					<button type="submit" className="login-button btn btn-primary">Login</button>
				</div>
			</form>
			<div className="signup-login">
				<span className="mx-2">Not a member?</span>
            	<button onClick={signup} className="signup-btn btn" type="button">Signup</button>
        	</div>
		</div>
	);
};
