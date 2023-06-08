import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const RecoveryPassword = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-login text-center">
			<form className="login-form" onSubmit={submitForm}>
				<h1 className="login-title">Login</h1>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">Email</label>
					<input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" />
				</div>
				<div className="login">
					<button type="submit" className="login-button btn btn-primary">Recovery</button>
				</div>

			</form>
		</div>
	);
};
