import { HiArrowUp } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { singleReviewObj } from "../../App";


interface IProps {
    reviewData: singleReviewObj;
}
const ReviewListingCard: React.FC<IProps> = ({ reviewData }) => {
    const {
        review_id, title, owner, review_img_url, category, created_at, review_votes, review_body,
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

    interface FormatCategoriesRefObj {
        [backendName: string]: string
    }

    const formatCategoriesRefObj: FormatCategoriesRefObj =  {
        "strategy": "Strategy",
        "hidden-roles": "Hidden Roles",
        "dexterity": "Dexterity",
        "push-your-luck": "Push Your Luck",
        "roll-and-write": "Roll And Write",
        "deck-building": "Deck Building",
        "engine-building": "Engine Building"
    };

    return (
        <div className="review-listing-card">
            <div className="review-listing-card-title">{title}</div>
            <div className="review-listing-card-additional-info">
                <p className="review-listing-card-author">Author: {owner}</p>
                <p className="review-listing-card-category">Category: {formatCategoriesRefObj[category]}</p>
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
                <p>{formatReviewBody(review_body)}... <Link to={`/reviews/${review_id}`}>Read more</Link> </p>
            </div>
        </div>


    )
}

export default ReviewListingCard;