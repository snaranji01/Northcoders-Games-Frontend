import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { IFilterParams, singleReviewObj } from "../../App";
import ReviewListingCard from "./ReviewListingCard";
import "./ListReviews.css";
import { getReviews } from "../../api";
import { useLocation } from "react-router-dom";

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
    const setCategoryParamHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const chosenCategory = (e.target as HTMLButtonElement).value
        setFilterParams(filterParams => ({ ...filterParams, category: chosenCategory }))
    }
    // 2) sort-by
    const allSortBy = ["title", "designer", "owner", "category", "created_at", "review_votes"];
    const setSortByParamHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const chosenSortBy = (e.target as HTMLButtonElement).value
        setFilterParams(filterParams => ({ ...filterParams, sortBy: chosenSortBy }))
    }
    // 3) order
    const allOrder = ["asc", "desc"];
    const setOrderParamHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const chosenOrder = (e.target as HTMLButtonElement).value
        setFilterParams(filterParams => ({ ...filterParams, order: chosenOrder }))
    }

    return (
        <div className="reviews-page-container">
            <div className="page-title">
                <h1 id="reviews-page-title">Reviews</h1>
            </div>

            <div className="sort-filter-panel">
                <form>
                    <legend>Choose a Category to filter by:</legend>
                    <fieldset>
                        {
                            allCategories.map(category => {
                                return (
                                    <div key={`radio-${category}-option`} className="sorting-panel-category">
                                        <label htmlFor="category-choose-radio">{category}</label>
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
                    <legend>Choose a column to sort by:</legend>
                    <fieldset>
                        {
                            allSortBy.map(sortby => {
                                return (
                                    <div key={`radio-${sortby}-option`} className="sorting-panel-sortby">
                                        <label htmlFor="sortby-choose-radio">{sortby}</label>
                                        <input
                                            type="radio"
                                            id={`radio-${sortby}-option`} value={sortby}
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
                                    <div key={`radio-${order}-option`} className="sorting-panel-order">
                                        <label htmlFor="order-choose-radio">{order}</label>
                                        <input
                                            type="radio"
                                            id={`radio-${order}-option`} value={order}
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
                {
                    reviewListData.map(reviewData => {
                        return <ReviewListingCard key={reviewData.review_id} reviewData={reviewData} />
                    })
                }
            </div>
        </div>
    )
}

export default ListReviews;