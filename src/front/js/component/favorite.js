import React, {useContext} from "react";
import {Context} from '../store/appContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Favorite = () => {
    const {store, actions} = useContext(Context)
	const favorites = store.favorites

    return(
        <div className="ml-auto">
            <div className="btn-group">
                <button type="button" className="btn btn-primary dropdown-toggle d-flex" data-bs-toggle="dropdown" aria-expanded="false">
                    Favorites
                    <div className="counter"> {favorites.length}</div>
                </button>
                <ul className="dropdown-menu">
                    {favorites.map((favorite) =>
                        <div className="favorite-list d-flex" key={favorite.id}>
                            <li><a className="dropdown-item" href="#">{favorite.name}</a></li>
                            <button className="btn col-4 dropdown-item" type="button" onClick={() => actions.addToFavorites(favorite.id, favorite.name, favorite.element)}>
                                <FontAwesomeIcon className="remove-favorite" icon={faTrash} />
                            </button>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
};