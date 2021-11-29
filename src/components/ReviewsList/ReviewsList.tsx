import { useEffect, useState, Dispatch, SetStateAction } from "react";

import "./ReviewsList.css";

import { getReviews } from "../../api";

import { FilterParams, SingleReviewObj } from "../../types/types";

import ReviewsListCard from "./ReviewsListCard/ReviewsListCard";
import SortFilterPanel from "./SortFilterPanel/SortFilterPanel";
import { AxiosError } from "axios";
import ErrorPage from "../ErrorPage/ErrorPage";

interface IProps {
    allCategories: string[];
    filterParams: FilterParams;
    setFilterParams: Dispatch<SetStateAction<FilterParams>>;
}

const ReviewsList: React.FC<IProps> = ({ allCategories, filterParams, setFilterParams }) => {
    const [reviewListData, setReviewListData] = useState<SingleReviewObj[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<AxiosError | Error | null>(null);

    useEffect(() => {
        setIsLoading(true);
        getReviews(filterParams)
            .then(reviews => {
                setReviewListData(reviews);
                setIsLoading(false);
            })
            .catch(error => {
               setError(error);
            })
    }, [filterParams])

    
    if(error) return <ErrorPage error={error} />
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