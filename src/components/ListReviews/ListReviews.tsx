import { useEffect, useState } from "react";
import { singleReviewObj } from "../../App";
import ReviewListingCard from "./ReviewListingCard";
import "./ListReviews.css";
import { getReviews } from "../../api";

const ListReviews = () => {
    const [reviewListData, setReviewListData] = useState<singleReviewObj[]>([]);

    useEffect(() => {
        getReviews().then(response => setReviewListData(response))
    }, [])
    return (
        <div className="reviews-page-container">
            <h1 id="reviews-page-title">Reviews</h1>
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