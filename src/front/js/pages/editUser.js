import React, { useContext , useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { useNavigate, useParams } from "react-router-dom";

export const EditUser = () => {
    //const {userId} = useParams()
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    useEffect( () => {
        if(!localStorage.getItem("accessToken")) navigate("/")
        actions.userShowById()
    }, [localStorage.getItem("accessToken")])

    async function submitForm(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        let resp = await actions.uploadProfilePic(formData)
        console.log("CODE RESPONSE UPLOAD:  " + resp.code)
    }

    return (
        <div>
            <Navbar />
            <div className="container mt-4 mb-4">
                <h1 className="text-center mt-4 re-title">Logged User</h1>
                <div className="container mt-4 mb-4">
                    <img src={store.pictureUrl}/>
                    <form onSubmit={submitForm}>
                        <div className="mb-3">
                            <label htmlFor="formFileSm" className="form-label">Small file input example</label>
                            <input className="form-control form-control-sm" name="profilePic" id="formFileSm" type="file" />
                        </div>
                        <button className="btn btn-primary" type="submit">Update picture</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
