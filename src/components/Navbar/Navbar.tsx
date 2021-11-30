import { Dispatch, SetStateAction, useContext } from "react";
import { Link } from "react-router-dom";

import './Navbar.css';

import { formatCategoryNames } from "../../utils/utils";

import { FilterParams } from "../../types/types";

import { UserContext } from "../../contexts/User";

interface IProps {
    allCategories: string[];
    filterParams: FilterParams;
    setFilterParams: Dispatch<SetStateAction<FilterParams>>;
}

const Navbar: React.FC<IProps> = ({ allCategories, setFilterParams }) => {
    const { currentUser } = useContext(UserContext);
    return (
        <nav id="navbar">
            <Link
                className="navbar-item" to="/reviews"
                onClick={() => setFilterParams(filterParams => ({...filterParams, category:"", sortBy: "", order: ""}) )}
            >Home
            </Link>
            <div className="navbar-item" id="dropdown-container">
                <div className="dropdown">
                    <span>Categories</span>
                    <div className="dropdown-content">
                        {
                            allCategories.map(category => {
                                return (
                                    <Link
                                        key={category}
                                        to={`/reviews?category=${category}`}
                                        className="navbar-link-category"
                                        id={`${category}-category-text`}>
                                        <p
                                            className="navbar-link-category-text"
                                            onClick={() => setFilterParams(filterParams => ({ ...filterParams, category }))}
                                        >{formatCategoryNames(category)}
                                        </p>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <Link id="users-link" className="navbar-item" to="/users">Users</Link>
            <div id='current-user-icon'>
                <div>Username: {currentUser.username}</div>
                <img id="current-user-avatar" src={currentUser.avatar_url} alt="Current user's avatar" />
            </div>
        </nav>
    )
}

export default Navbar;