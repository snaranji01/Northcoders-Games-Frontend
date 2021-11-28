import { useEffect, useState, Dispatch, SetStateAction } from "react";

import "./ReviewsList.css";

import { getReviews } from "../../api";

import { IFilterParams, SingleReviewObj } from "../../types/types";

import ReviewsListCard from "./ReviewsListCard/ReviewsListCard";
import SortFilterPanel from "./SortFilterPanel/SortFilterPanel";

interface IProps {
    allCategories: string[];
    filterParams: IFilterParams;
    setFilterParams: Dispatch<SetStateAction<IFilterParams>>;
}

const ReviewsList: React.FC<IProps> = ({ allCategories, filterParams, setFilterParams }) => {
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
    return (
        <div className="list-reviews-page-container">
            <SortFilterPanel filterParams={filterParams} setFilterParams={setFilterParams} allCategories={allCategories} />
            <div className="header-and-reviews">
                <h1 id="header">Northcoders Games</h1>
                <div id="list-reviews-container">
                    {
                        !isLoading ? (
                            <div id="list-review-cards-container">
                                {
                                    reviewListData.map(reviewData => {
                                        return <ReviewsListCard key={reviewData.review_id} reviewData={reviewData} />
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

export default ReviewsList;