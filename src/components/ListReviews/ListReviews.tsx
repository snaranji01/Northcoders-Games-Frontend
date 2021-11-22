import { singleReviewObj } from "../../App";
import ReviewListingCard from "./ReviewListingCard";

interface IProps {
    reviewListData: singleReviewObj[]
}

const ListReviews: React.FC<IProps> = ({ reviewListData }) => {
    console.log(reviewListData);
    return (
        <div className="list-reviews-container">
            <h2>List Reviews</h2>
            {
                reviewListData.map(reviewData => {
                    return <ReviewListingCard key={reviewData.review_id} reviewData={reviewData} />
                })
            }
        </div>
    )
}

export default ListReviews;