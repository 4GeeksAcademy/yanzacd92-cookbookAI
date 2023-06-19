import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCaretLeft, faChevronsLeft, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
//import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'
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
		if(resp.code >= 400) {
			return
		} else {
			swal("Awesome!", "You have successfully registered. Now you must log in with your data", "success");
			navigate("/");
		}
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
				<div className="info mb-3">
					<label htmlFor="exampleInputFirstName" className="form-label">First name</label>
					<input type="text" className="form-control" name="first_name" id="exampleInputFirstName" />
				</div>
				<div className="info mb-3">
					<label htmlFor="exampleInputLastName" className="form-label">Last name</label>
					<input type="text" className="form-control" name="last_name" id="exampleInputLastName" />
				</div>
				<div className="info mb-3">
					<label htmlFor="exampleInputQuestion" className="form-label">Security question</label>
					<select className="form-select" aria-label="Default select example" name="security_question">
						<option disabled>Choose a question</option>
						<option value="What is your pet's name?">What is your pet's name?</option>
						<option value="In what city were you born?">In what city were you born?</option>
						<option value="In what city was your first job?">In what city was your first job?</option>
						<option value="What is your favorite sport?">What is your favorite sport?</option>
						<option value="How many pets do you have?">How many pets do you have?</option>
					</select>
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
