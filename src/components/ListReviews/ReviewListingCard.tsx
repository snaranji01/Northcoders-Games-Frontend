import { singleReviewObj } from "../../App";

interface IProps {
    reviewData: singleReviewObj;
}
const ReviewListingCard: React.FC<IProps> = ({ reviewData }) => {
    const {
        title, owner, review_img_url, category, created_at, review_votes
    } = reviewData;
    return (
        <div className="review-listing-card">
            <h3>{title}</h3>
            <p>{owner}</p>
            <p>{category}</p>
            <p>{created_at}</p>
            <p>{review_votes}</p>
            <img src={review_img_url} alt="The game that was reviewed" />
        </div>

    )
}

export default ReviewListingCard;