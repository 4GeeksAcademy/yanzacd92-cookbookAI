import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCaretLeft, faChevronsLeft, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import "../../styles/home.css";

export const RecoveryPassword = () => {
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
		console.log("Successful registration!!")
        alert("You have successfully registered. Now you must log in with your data")
        navigate("/");
	}

	return (
		<div className="container-signup text-center">
			<div className="cnt-return-login">
				<div className="return-login">
					<FontAwesomeIcon icon={faAngleLeft} className="icon-return-login" onClick={() => navigate("/")}/>
					<span className="tooltiptext">Back to Login</span>
				</div>
			</div>
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
                <div className="signup">
				    <button type="submit" className="signup-button btn btn-primary">Recovery</button>
                </div>
			</form>
		</div>
	);
};
