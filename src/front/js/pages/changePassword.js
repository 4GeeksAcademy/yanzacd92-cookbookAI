import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCaretLeft, faChevronsLeft, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import "../../styles/home.css";
import swal from 'sweetalert';

export const ChangePassword = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
	async function submitForm(e) {
		e.preventDefault()
		let data = new FormData(e.target)
		let resp = await actions.recoveryPassword(data.get("email"))
		if(resp >= 400) {
			return
		}
        swal("Great!", "Recovery token has been sent", "success");
        //navigate("/");
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
				<h1 className="signup-title">Change Paasword</h1>
				src/front/js/pages/recoveryPassword.js
                <div className="signup">
				    <button type="submit" className="signup-button btn btn-primary">Send</button>
                </div>
			</form>
		</div>
	);
};
