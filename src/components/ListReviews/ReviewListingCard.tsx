import { HiArrowUp } from 'react-icons/hi';
import { singleReviewObj } from "../../App";


interface IProps {
    reviewData: singleReviewObj;
}
const ReviewListingCard: React.FC<IProps> = ({ reviewData }) => {
    const {
        title, owner, review_img_url, category, created_at, review_votes, review_body,
    } = reviewData;

    const formatCreatedAt = (serverResponseString: string): string => {
        const dateObj = new Date(Date.parse(serverResponseString));
        const timeDateStr = {
            year: dateObj.getFullYear(),
            month: dateObj.getMonth() + 1,
            day: dateObj.getDate(),
            hour: dateObj.getHours(),
            minute: dateObj.getMinutes(),
            second: dateObj.getSeconds()
        }
        return `${timeDateStr.day}/${timeDateStr.month}/${timeDateStr.year} ${timeDateStr.hour}:${timeDateStr.minute}:${timeDateStr.second}`
    }

    const formatReviewBody = (reviewBodyInput: string): string => {
        const splitReview = reviewBodyInput.split(" ");
        const first30Words = splitReview.slice(0, 30);
        return first30Words.join(" ");
    }

    

    return (
        <section className="review-listing-card">
            <div className="review-listing-card-title">{title}</div>
            <div className="review-listing-card-additional-info">
                <p className="review-listing-card-author">Author: {owner}</p>
                <p className="review-listing-card-category">Category: {category}</p>
                <p className="review-listing-card-createdat">Created at: {formatCreatedAt(created_at)}</p>
            </div>
            <div className="review-listing-card-upvotes"><p>
                Upvotes: {review_votes}</p>
                <div className="upvote-button-box">
                    <HiArrowUp />
                </div>
            </div>
            <img className="review-listing-card-image" src={review_img_url} alt="The game that was reviewed" />
            <div className="review-listing-card-content-preview">
                <p>{formatReviewBody(review_body)}...</p>
            </div>
        </section>


    )
}

export default ReviewListingCard;