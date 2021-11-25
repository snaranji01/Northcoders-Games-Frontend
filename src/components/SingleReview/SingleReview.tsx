import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getReviewById, getReviewCommentsById } from "../../api";
import { singleReviewObj } from "../../App";

interface ReviewCommentObj {
    comment_id: number;
    author: string;
    comment_votes: 0;
    body: string;
    review_id: number;
    created_at: string;
}

const SingleReview = () => {
    const { review_id } = useParams();

    const [singleReviewData, setSingleReviewData] = useState<singleReviewObj>({
        review_id: 0,
        title: "",
        owner: "",
        category: "",
        designer: "",
        review_img_url: "",
        review_body: "",
        created_at: "",
        review_votes: 0,
        comment_count: 0,
    });

    const [reviewComments, setReviewComments] = useState<ReviewCommentObj[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getReviewById(review_id)
            .then(response => {
                setSingleReviewData(response)
            })
            .then(() => {
                return getReviewCommentsById(review_id)
            })
            .then(response => {
                setReviewComments(response)
                setIsLoading(false)
            })

    }, [])

    return (
        !isLoading ? (
            <div className="singleReviewPageContainer">
                <div className="article-content">
                    <h2>{singleReviewData.title}</h2>
                    <p>Author: {singleReviewData.owner}</p>
                    <p>Categories: {singleReviewData.category}</p>
                    <p>Designer: {singleReviewData.designer}</p>
                    <p>Review Body: {singleReviewData.review_body}</p>
                    <p>Created at: {singleReviewData.created_at}</p>
                    <p>Review votes: {singleReviewData.review_votes}</p>
                    <p>Comment count: {singleReviewData.comment_count}</p>
                    <img src={singleReviewData.review_img_url} alt="The game being reviewed" />
                </div>
                <div className="comment-section">
                    <h2>Comments</h2>
                    <div className="add-comment">
                        <form>
                            <label htmlFor="add-comment-input">Add a comment: </label>
                            <input type="text" name="add-comment-input" id="add-comment-input" />
                            <button>Post comment</button>
                        </form>

                    </div>
                    <div className="comments-list">
                        {
                            reviewComments.map(reviewComment => {
                                return (
                                    <div className="review-comment">
                                        <p>{reviewComment.author}</p>
                                        <p>{reviewComment.created_at}</p>
                                        <p>{reviewComment.body}</p>
                                        <p>{reviewComment.comment_votes}</p>
                                    </div>
                                )
                            })
                        }
                    </div>


                </div>
            </div>
        ) : <p>Loading...</p>
    )
}

export default SingleReview;