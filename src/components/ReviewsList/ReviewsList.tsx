import { useEffect, useState, Dispatch, SetStateAction } from "react";

import "./ReviewsList.css";

import { getReviews } from "../../api";

import { FilterParams, SingleReviewObj } from "../../types/types";

import ReviewsListCard from "./ReviewsListCard/ReviewsListCard";
import SortFilterPanel from "./SortFilterPanel/SortFilterPanel";
import { AxiosError } from "axios";
import ErrorPage from "../ErrorPage/ErrorPage";
import { useLocation } from "react-router-dom";
import { formatCategoryNames } from "../../utils/utils";

interface IProps {
    filterParams: FilterParams;
    setFilterParams: Dispatch<SetStateAction<FilterParams>>;
}

const ReviewsList: React.FC<IProps> = ({ filterParams, setFilterParams }) => {
    const [reviewListData, setReviewListData] = useState<SingleReviewObj[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<AxiosError | Error | null>(null);

    const categoryFilter = useLocation().search.split("=")[1];

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

    if (error) return <ErrorPage error={error} />
    return (
        <div className="list-reviews-page-container">
            <SortFilterPanel filterParams={filterParams} setFilterParams={setFilterParams} />
            <div className="header-and-reviews">
                <h1 id="header">Northcoders Games</h1>
                {
                    categoryFilter !== undefined ? (
                        <h2>Category: {formatCategoryNames(categoryFilter)}</h2>
                    ) : null
                }

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