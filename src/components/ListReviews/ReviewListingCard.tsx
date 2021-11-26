import { Link } from 'react-router-dom';
import { FormatCategoriesRefObj, SingleReviewObj } from '../../types/types';


interface IProps {
    reviewData: SingleReviewObj;
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
            minute: dateObj.getMinutes()
        }
        return `${timeDateStr.day}/${timeDateStr.month}/${timeDateStr.year} ${timeDateStr.hour}:${timeDateStr.minute}`
    }

    const formatReviewBody = (reviewBodyInput: string): string => {
        const splitReview = reviewBodyInput.split(" ");
        const first30Words = splitReview.slice(0, 30);
        return first30Words.join(" ");
    }


    const formatCategoriesRefObj: FormatCategoriesRefObj = {
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
            <h2 className="card-title">{title}</h2>
            <div className="review-info1">
                <p className="inner-review-info">Author: {owner}</p>
                <p className="inner-review-info">Category: {formatCategoriesRefObj[category]}</p>
            </div>
            <div className="review-info2">
                <p className="inner-review-info">Created at: {formatCreatedAt(created_at)}</p>
                <p className="inner-review-info">Review upvotes: {review_votes}</p>
            </div>
            <div className="card-image-container">
                 <img className="card-image" src={review_img_url} alt="The game that was reviewed" />
            </div>
           
            <div className="card-content-preview">
                <p>{formatReviewBody(review_body)}... <Link to={`/reviews/${review_id}`}>Read more</Link> </p>
            </div>
        </div>


    )
}

export default ReviewListingCard;