import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../api";
import './Navbar.css';


interface resCategory {
    slug: string;
    description: string;
}

const Navbar = () => {

    const [allCategories, setAllCategories] = useState<string[]>([])

    useEffect(() => {
        getCategories()
            .then(resCategories => {
                const categoriesArray = resCategories.map((category: resCategory): string => category.slug);
                setAllCategories(categoriesArray);
            })
    }, [])



    return (
        <nav id="navbar">
            <Link className="navbar-item" to="/">Home</Link>
            <Link className="navbar-item" to="/reviews">Reviews</Link>
            <div className="navbar-item">
                <Link to="/reviews">Categories</Link>
                <div className="dropdown-content">
                    {
                        allCategories.map(category => {
                            return  <Link key={category} className="navbar-link-categories" to={`/reviews/${category}`}>{category}</Link>
                        })
                    }
                    
                   
                </div>
            </div>
        </nav>
    )
}

export default Navbar;