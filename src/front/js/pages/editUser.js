import React, { useContext , useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { useNavigate, useParams } from "react-router-dom";

export const EditUser = () => {
    const {recipeId} = useParams()
    src/front/js/pages/recipeDetail.js
    const navigate = useNavigate()
    useEffect( () => {
        if(!store.accessToken) navigate("/")
    }, [])

    function submitForm(e) {
        e.preventDefault()
        const formData = new formData(e.target)
        
    }

    return (
        <div>
            <Navbar />
            <div className="container mt-4 mb-4">
                <h1 className="text-center mt-4 re-title">Logged User</h1>
                <div className="container mt-4 mb-4">
                    <form>
                        <div class="mb-3">
                            <label for="formFileSm" class="form-label">Small file input example</label>
                            <input class="form-control form-control-sm" onSubmit={submitForm} name="profilePic" id="formFileSm" type="file" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
