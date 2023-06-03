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
		let resp = await actions.userSignup(
			data.get("email"), data.get("password"), 
			data.get("first_name"), data.get("last_name"),
			data.get("security_question"),data.get("security_answer"), false
		)
		if(resp >= 400) {
			return
		}
		console.log("Registro exitoso!!")
        alert("Te has registrado exitosamente. Ahora debes iniciar sesión con los datos registrados")
        navigate("/");
	}

	return (
		<div className="container-signup text-center">
			<form className="signup-form" onSubmit={submitForm}>
				<h1 className="signup-title">Signup</h1>
				<div className="info mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">Email</label>
					<input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" />
				</div>
				<div className="info mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
					<input type="password" className="form-control" name="password" id="exampleInputPassword1" />
				</div>
				<div className="info mb-3">
					<label htmlFor="exampleInputFirstName" className="form-label">First name</label>
					<input type="text" className="form-control" name="first_name" id="exampleInputFirstName" />
				</div>
				<div className="info mb-3">
					<label htmlFor="exampleInputLastName" className="form-label">Last name</label>
					<input type="text" className="form-control" name="last_name" id="exampleInputLastName" />
				</div>
				<div className="info mb-3">
					<label htmlFor="exampleInputQuestion" className="form-label">Security questions</label>
					<input type="button" className="form-control dropdown-toggle" name="security_question" id="exampleInputQuestion" data-bs-toggle="dropdown" aria-expanded="false" />
					<ul className="dropdown-menu sec-question-signup">
						<li><a className="dropdown-item sec-question-signup" href="#">What is your pet's name?</a></li>
						<li><a className="dropdown-item sec-question-signup" href="#">In what city were you born?</a></li>
						<li><a className="dropdown-item sec-question-signup" href="#">In what city was your first job?</a></li>
						<li><a className="dropdown-item sec-question-signup" href="#">What is your favorite sport?</a></li>
						<li><a className="dropdown-item sec-question-signup" href="#">How many pets do you have?</a></li>
					</ul>
				</div>
				<div className="info mb-3">
					<label htmlFor="exampleInputAnswer" className="form-label">Answer</label>
					<input type="text" className="form-control" name="security_answer" id="exampleInputAnswer" />
				</div>
                <div className="signup">
				    <button type="submit" className="signup-button btn btn-primary">Signup</button>
                </div>
			</form>
		</div>
	);
};
