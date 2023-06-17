import React, { useContext , useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { useNavigate, useParams } from "react-router-dom";
import noPhoto from "./../../img/not-picture.png"

export const EditUser = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const profilePhoto = store.pictureUrl? store.pictureUrl : noPhoto
    const user_info = store.userInfo
    useEffect( () => {
        if(!localStorage.getItem("accessToken")) navigate("/")
        //actions.userShowById()
        setEmail(user_info.email)
        setFirstName(user_info.first_name)
        setLastName(user_info.last_name)
    }, [user_info, localStorage.getItem("accessToken")])

    async function submitForm(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        let resp = await actions.uploadProfilePic(formData)
        console.log("CODE RESPONSE UPLOAD:  " + resp.code)
        actions.userShowById()
    }

    async function submitFormInformation(e) {
        e.preventDefault()
        /*const formData = new FormData(e.target)
        let resp = await actions.uploadProfilePic(formData)
        console.log("CODE RESPONSE UPLOAD:  " + resp.code)*/
        //await actions.userCreateRecipe(name, description, ingredients, elaboration, imageRecipe)
    }

    return (
        <div>
            <Navbar />
            <div className="edit-user-info">
                <div className="ctn-edit-user-photo container mt-4 mb-4">
                    <h1 className="title-profile text-center mt-4 re-title">PROFILE</h1>
                    <div className="edit-user container mt-4 mb-4">
                        <form onSubmit={submitForm}>
                            <img className="profile-picture" src={profilePhoto}/>
                            <div className="mb-3">
                                <label htmlFor="formFileSm" className="form-label"></label>
                                <input className="form-control form-control-sm" name="profilePic" id="formFileSm" type="file" />
                            </div>
                            <button className="update-picture btn btn-primary" type="submit">Update</button>
                        </form>
                    </div>
                </div>
                <form className="ctn-edit-user mt-4 mb-4" onSubmit={submitFormInformation}>
                    <h1 className="title-profile-information">INFORMATION</h1>
                    <div className="info mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" disabled className="form-control" value={email || ""} onChange={(e) => setEmail(e.target.value)} name="email" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>  
                    <div className="info mb-3">
                        <label htmlFor="exampleInputFirstName" className="form-label">First name</label>
                        <input type="text" className="form-control" value={firstName || ""} onChange={(e) => setFirstName(e.target.value)} name="first_name" id="exampleInputFirstName" />
                    </div>
                    <div className="info mb-3">
                        <label htmlFor="exampleInputLastName" className="form-label">Last name</label>
                        <input type="text" className="form-control" value={lastName || ""} onChange={(e) => setLastName(e.target.value)} name="last_name" id="exampleInputLastName" />
                    </div>
                    <div className="signup">
                        <button type="submit" className="update-info-button btn btn-primary">Update Information</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
