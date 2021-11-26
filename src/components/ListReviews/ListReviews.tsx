import { useEffect, useState, Dispatch, SetStateAction } from "react";

import "./ListReviews.css";

import ReviewListingCard from "./ReviewListingCard";

import { getReviews } from "../../api";

import { IFilterParams, SingleReviewObj } from "../../types/types";
import { formatCategoryNames } from "../../utils/utils";

interface IProps {
    allCategories: string[];
    filterParams: IFilterParams;
    setFilterParams: Dispatch<SetStateAction<IFilterParams>>;
}

const ListReviews: React.FC<IProps> = ({ allCategories, filterParams, setFilterParams }) => {
    const [reviewListData, setReviewListData] = useState<SingleReviewObj[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        getReviews(filterParams)
            .then(reviews => {
                setReviewListData(reviews);
                setIsLoading(false);
            })
            .catch(console.log)
    }, [filterParams])


// sort-filter-panel
    // 1) category
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
        if (currentText === "Click to sort and filter") {
            (e.target as HTMLButtonElement).textContent = "Click to minimise"
        } else {
            (e.target as HTMLButtonElement).textContent = "Click to sort and filter"
        }

    }
    return (
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
                                                <label htmlFor="category-choose-radio">{formatCategoryNames(category)}</label>
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
            <div className="header-and-reviews">
                <h1 id="header">Northcoders Games</h1>
                <div id="list-reviews-container">
                    {
                        !isLoading ? (
                            <div id="list-review-cards-container">
                                {
                                    reviewListData.map(reviewData => {
                                        return <ReviewListingCard key={reviewData.review_id} reviewData={reviewData} />
                                    })
                                }
                            </div>
                        ) : <p>Loading...</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default ListReviews;