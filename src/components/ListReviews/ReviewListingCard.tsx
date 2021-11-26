import { Link } from 'react-router-dom';

import { SingleReviewObj } from '../../types/types';

import { formatCategoryNames, formatCreatedAt, formatReviewBodyPreview } from '../../utils/utils';


interface IProps {
    reviewData: SingleReviewObj;
}
const ReviewListingCard: React.FC<IProps> = ({ reviewData }) => {
    const {
        review_id, title, owner, review_img_url, category, created_at, review_votes, review_body,
    } = reviewData;

    return (
        <div className="review-listing-card">
            <h2 className="card-title">{title}</h2>
            <div className="review-info1">
                <p className="inner-review-info">Author: {owner}</p>
                <p className="inner-review-info">Category: {formatCategoryNames(category)}</p>
            </div>
            <div className="review-info2">
                <p className="inner-review-info">Created at: {formatCreatedAt(created_at)}</p>
                <p className="inner-review-info">Review upvotes: {review_votes}</p>
            </div>
            <div className="card-image-container">
                 <img className="card-image" src={review_img_url} alt="The game that was reviewed" />
            </div>
           
            <div className="card-content-preview">
                <p>{formatReviewBodyPreview(review_body)}... <Link to={`/reviews/${review_id}`}>Read more</Link> </p>
            </div>
        </div>


    )
}

export default ReviewListingCard;