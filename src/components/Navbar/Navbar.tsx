import { Dispatch, SetStateAction, useEffect } from "react";
import { Link } from "react-router-dom";
import { IFilterParams } from "../../App";
import './Navbar.css';


interface IProps {
    allCategories: string[];
    filterParams: IFilterParams;
    setFilterParams: Dispatch<SetStateAction<IFilterParams>>;
}

const Navbar: React.FC<IProps> = ({ allCategories, filterParams, setFilterParams }) => {
    return (
        <nav id="navbar">
            <Link className="navbar-item" to="/">Home</Link>
            <Link className="navbar-item" to="/reviews">Reviews</Link>
            <div className="navbar-item">
                Categories
                <div className="dropdown-content">
                    {
                        allCategories.map(category => {
                            return <Link
                                key={category}
                                className="navbar-link-categories"
                                to={`/reviews?category=${category}`}
                                onClick={() => setFilterParams(filterParams => ({...filterParams, category}))}
                            >{category}
                            </Link>
                        })
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;