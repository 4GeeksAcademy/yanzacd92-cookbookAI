import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Signup = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
	async function submitForm(e) {
		e.preventDefault()
		let data = new FormData(e.target)
		let resp = await actions.userSignup(data.get("email"), data.get("password"))
		if(resp >= 400) {
			return
		}
		console.log("Registro exitoso!!")
        alert("Te has registrado exitosamente. Ahora debes iniciar sesión con los datos registrados")
        navigate("/");
	}

	return (
		<div className="text-center mt-5">
			<h1 className="signup-title">Signup Form</h1>
			<form className="signup-form" onSubmit={submitForm}>
				<div className="info mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
					<input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" />
					<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
				</div>
				<div className="info mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
					<input type="password" className="form-control" name="password" id="exampleInputPassword1" />
				</div>
                <div className="signup">
				    <button type="submit" className="signup-button btn btn-primary">Signup</button>
                </div>
			</form>
		</div>
	);
};
