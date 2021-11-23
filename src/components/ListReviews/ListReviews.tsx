import { singleReviewObj } from "../../App";
import ReviewListingCard from "./ReviewListingCard";
import "./ListReviews.css";

interface IProps {
    reviewListData: singleReviewObj[]
}

const ListReviews: React.FC<IProps> = ({ reviewListData }) => {
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