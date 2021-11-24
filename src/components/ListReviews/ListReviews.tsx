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

    //fetch review list data based on if search parameters have been provided
    useEffect(() => {
        getReviews(filterParams)
            .then(reviews => setReviewListData(reviews))
            .catch(console.log)
    }, [filterParams])


    // sort-filter-panel
    // 1) category
    

    interface FormatCategoriesRefObj {
        [backendName: string]: string
    }

    const formatCategoriesRefObj: FormatCategoriesRefObj =  {
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

    return (
        <div className="list-reviews-page-container">
            <div className="sort-filter-panel">
                <form>
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
            </div>
            <div id="list-reviews-container">
                <h1 id="reviews-page-title">Reviews</h1>
                <div id="list-review-cards-container">
                    {
                        reviewListData.map(reviewData => {
                            return <ReviewListingCard key={reviewData.review_id} reviewData={reviewData} />
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default ListReviews;