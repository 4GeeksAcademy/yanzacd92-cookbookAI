import React, { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCaretLeft, faChevronsLeft, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import "../../styles/home.css";
import swal from 'sweetalert';

export const ChangePassword = () => {
	const { store, actions } = useContext(Context);
	let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
	async function submitForm(e) {
		e.preventDefault()
		let data = new FormData(e.target)
		if(data.get("password") !== data.get("confirmpassword")) {
			swal("opps!", "Passwords do not match", "error");
			return
		}

		let tokenPassword = searchParams.get("token")
		let resp = await actions.changeRecoveryPassword(tokenPassword, data.get("password"))
		if(resp >= 400) {
			return
		}
        swal("Awesome!", "Password has changed", "success");
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
				<h1 className="signup-title">Change Password</h1>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">New password</label>
					<input type="password" className="form-control" name="password" id="exampleInputPassword1" />
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">Confirm password</label>
					<input type="password" className="form-control" name="confirmpassword" id="exampleInputPassword1" />
				</div>
                <div className="signup">
				    <button type="submit" className="signup-button btn btn-primary">Reset password</button>
                </div>
			</form>
		</div>
	);
};
