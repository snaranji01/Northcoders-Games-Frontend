import { Dispatch, SetStateAction, useContext } from "react";
import { Link } from "react-router-dom";
import { IFilterParams } from "../../App";
import { UserContext } from "../../contexts/User";
import './Navbar.css';


interface IProps {
    allCategories: string[];
    filterParams: IFilterParams;
    setFilterParams: Dispatch<SetStateAction<IFilterParams>>;
}

interface FormatCategoriesRefObj {
    [backendName: string]: string
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
            <Link className="navbar-item" to="/">Home</Link>
            <Link className="navbar-item" to="/reviews">Reviews</Link>
            <div className="navbar-item">
                <div className="dropdown">
                    <span>Categories</span>
                    <div className="dropdown-content">
                        {
                            allCategories.map(category => {
                                return <Link key={category} to={`/reviews?category=${category}`}>
                                <p
                                    className="navbar-link-categories"
                                    onClick={() => setFilterParams(filterParams => ({ ...filterParams, category }))}
                                >{formatCategoriesRefObj[category]}
                                </p>
                                </Link>
                            })
                        }
                    </div>
                </div>
            </div>
            <Link className="navbar-item" to="/users">Users</Link>
            <div id='current-user-icon'>
                <div>Username: {currentUser.username}</div>
                <img id="current-user-avatar" src={currentUser.avatar_url} alt="Current user's avatar" />
            </div>
        </nav>
    )
}

export default Navbar;