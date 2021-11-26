import { Dispatch, SetStateAction, useContext } from "react";
import { Link } from "react-router-dom";

import './Navbar.css';

import { FormatCategoriesRefObj, IFilterParams } from "../../types/types";

import { UserContext } from "../../contexts/User";

interface IProps {
    allCategories: string[];
    filterParams: IFilterParams;
    setFilterParams: Dispatch<SetStateAction<IFilterParams>>;
}

const formatCategoriesRefObj: FormatCategoriesRefObj = {
    "strategy": "Strategy",
    "hidden-roles": "Hidden Roles",
    "dexterity": "Dexterity",
    "push-your-luck": "Push Your Luck",
    "roll-and-write": "Roll And Write",
    "deck-building": "Deck Building",
    "engine-building": "Engine Building"
};

const Navbar: React.FC<IProps> = ({ allCategories, setFilterParams }) => {
    const { currentUser } = useContext(UserContext);
    return (
        <nav id="navbar">
            <Link className="navbar-item" to="/reviews">Home</Link>
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
                                        >{formatCategoriesRefObj[category]}
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