import React, {useContext, useEffect} from "react";
import {Context} from '../store/appContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeartRegular } from '@fortawesome/free-regular-svg-icons'

export const Favorite = () => {
    const {store, actions} = useContext(Context)
    useEffect(() => {
        actions.showRecipesInFavoritesByUser()
    }, [])
	const favorites = store.favorites

    return(
        <div className="favorite-content">
            <div className="btn-group">
                <button type="button" className="favorite-btn btn btn-primary dropdown-toggle d-flex" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="counter"> <FontAwesomeIcon className="add-favorite-navbar" icon={faHeart}>{favorites.length}</FontAwesomeIcon></div>
                </button>
                <ul className="dropdown-menu">
                    {favorites.map((favorite) =>
                        <div className="favorite-list d-flex" key={favorite.id}>
                            <li><a className="dropdown-item" href="#">{favorite.recipe_name}</a></li>
                            <button className="btn col-4 dropdown-item" type="button" onClick={() => actions.removeRecipeFromFavorites(favorite.id)}>
                                <FontAwesomeIcon className="remove-favorite" icon={faTrash} />
                            </button>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
};