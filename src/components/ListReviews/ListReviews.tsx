import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { IFilterParams, singleReviewObj } from "../../App";
import ReviewListingCard from "./ReviewListingCard";
import "./ListReviews.css";
import { getReviews } from "../../api";

interface IProps {
    allCategories: string[];
    filterParams: IFilterParams;
    setFilterParams: Dispatch<SetStateAction<IFilterParams>>;
}

const ListReviews: React.FC<IProps> = ({ allCategories, filterParams, setFilterParams }) => {
    // set review list data state
    const [reviewListData, setReviewListData] = useState<singleReviewObj[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    //fetch review list data based on if search parameters have been provided
    useEffect(() => {
        if (reviewListData.length === 0) {
            setFilterParams({
                category: '',
                sortBy: '',
                order: ''
            })
        }
        getReviews(filterParams)
            .then(reviews => {
                setReviewListData(reviews);
                setIsLoading(false);
            })
            .catch(console.log)
    }, [filterParams])


    // sort-filter-panel
    // 1) category


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

    const setCategoryParamHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const chosenCategory = (e.target as HTMLButtonElement).value
        setFilterParams(filterParams => ({ ...filterParams, category: chosenCategory }))
    }
    // 2) sort-by
    const allSortBy = [
        { backendName: "title", frontendName: "Title" },
        { backendName: "owner", frontendName: "Author" },
        { backendName: "category", frontendName: "Category" },
        { backendName: "created_at", frontendName: "Created at" },
        { backendName: "review_votes", frontendName: "Upvotes" },
    ]

    const setSortByParamHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const chosenSortBy = (e.target as HTMLButtonElement).value
        setFilterParams(filterParams => ({ ...filterParams, sortBy: chosenSortBy }))
    }
    // 3) order
    const allOrder = [
        { backendName: "asc", frontendName: "Ascending" },
        { backendName: "desc", frontendName: "Descending" }
    ];
    const setOrderParamHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const chosenOrder = (e.target as HTMLButtonElement).value
        setFilterParams(filterParams => ({ ...filterParams, order: chosenOrder }))
    }

    // toggle sort-filter-panel
    const [toggleSortFilterPanel, setToggleSortFilterPanel] = useState<boolean>(false);
    const ToggleSortFilterPanelHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setToggleSortFilterPanel(toggleSortFilterPanel => !toggleSortFilterPanel);
        const currentText = (e.target as HTMLButtonElement).textContent;
        if(currentText === "Click to sort and filter") {
            (e.target as HTMLButtonElement).textContent = "Click to minimise"
        } else {
            (e.target as HTMLButtonElement).textContent = "Click to sort and filter"
        }
        
    }


    return (
        !isLoading ? (
            <div className="list-reviews-page-container">
                <div className="sort-filter-panel">
                    <button onClick={ToggleSortFilterPanelHandler} className="toggleSortFilterPanel">
                        {'Click to sort and filter'}
                    </button>
                    {
                        toggleSortFilterPanel ? (
                            <form id="sort-filter-form">
                                <legend>Filter by category:</legend>
                                <fieldset>
                                    {
                                        allCategories.map(category => {
                                            return (
                                                <div key={`radio-${category}-option`} className="sorting-panel-category">
                                                    <label htmlFor="category-choose-radio">{formatCategoriesRefObj[category]}</label>
                                                    <input
                                                        type="radio"
                                                        id={`radio-${category}-option`} value={category}
                                                        name="choose-category-option"
                                                        onClick={setCategoryParamHandler}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </fieldset>
                                <legend>Sort by:</legend>
                                <fieldset>
                                    {
                                        allSortBy.map(sortby => {
                                            return (
                                                <div key={`radio-${sortby.backendName}-option`} className="sorting-panel-sortby">
                                                    <label htmlFor="sortby-choose-radio">{sortby.frontendName}</label>
                                                    <input
                                                        type="radio"
                                                        id={`radio-${sortby.backendName}-option`} value={sortby.backendName}
                                                        name="choose-sortby-option"
                                                        onClick={setSortByParamHandler}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </fieldset>
                                <legend>Order:</legend>
                                <fieldset>
                                    {
                                        allOrder.map(order => {
                                            return (
                                                <div key={`radio-${order.backendName}-option`} className="sorting-panel-order">
                                                    <label htmlFor="order-choose-radio">{order.frontendName}</label>
                                                    <input
                                                        type="radio"
                                                        id={`radio-${order}-option`} value={order.backendName}
                                                        name="choose-order-option"
                                                        onClick={setOrderParamHandler}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </fieldset>
                            </form>
                        ) : null
                    }
                </div>
                <div id="list-reviews-container">
                    <h1 id="header">Northcoders Games</h1>
                    <div id="list-review-cards-container">
                        {
                            reviewListData.map(reviewData => {
                                return <ReviewListingCard key={reviewData.review_id} reviewData={reviewData} />
                            })
                        }
                    </div>
                </div>
            </div>
        ) : <p id='loading-text'>Loading...</p>
    )
}

export default ListReviews;