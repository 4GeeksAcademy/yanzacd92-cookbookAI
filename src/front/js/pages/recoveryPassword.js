import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCaretLeft, faChevronsLeft, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import "../../styles/home.css";
import swal from 'sweetalert';

export const RecoveryPassword = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
	async function submitForm(e) {
		e.preventDefault()
		let data = new FormData(e.target)
		let resp = await actions.recoveryPassword(data.get("email"))
		if(resp.code >= 400) {
			swal("opps!", "Email is incorrect", "error");
			return
		} else {
			swal("Great!", "Email has been sent", "success");
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
				<h1 className="signup-title">Password Recovery</h1>
				<div className="info mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">Email</label>
					<input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" />
				</div>
                <div className="signup">
				    <button type="submit" className="signup-button btn btn-primary">Send</button>
                </div>
			</form>
		</div>
	);
};
