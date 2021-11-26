import { useContext, useEffect, useState } from "react"
import { getReviewCommentsById, postReviewComment } from "../../api"
import { singleReviewObj } from "../../App";
import { UserContext } from "../../contexts/User";

interface IProps {
    review_id: string | undefined;
    singleReviewData: singleReviewObj;
}

interface ReviewCommentObj {
    comment_id: number;
    author: string;
    comment_votes: 0;
    body: string;
    review_id: number;
    created_at: string;
}

const Comments: React.FC<IProps> = ({ review_id }) => {
    const { currentUser } = useContext(UserContext);

    //util
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

    const [reviewComments, setReviewComments] = useState<ReviewCommentObj[]>([]);
    const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);
    useEffect(() => {
        setIsLoadingComments(true);
        getReviewCommentsById(review_id)
            .then(response => {
                setReviewComments(response);
                setIsLoadingComments(false);
            })
    }, [review_id]);

    //set comment input text box value
    const [commentInputBoxValue, setCommentInputBoxValue] = useState<string>('');
    const onCommentInputTextChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommentInputBoxValue((e.target as HTMLInputElement).value)
    }

    const postCommentHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        postReviewComment(review_id, currentUser.username, commentInputBoxValue)
            .then((response) => {
                setReviewComments(reviewComments => {
                    const reviewCommentsCopy = JSON.parse(JSON.stringify(reviewComments));
                    reviewCommentsCopy.push(response);
                    return reviewCommentsCopy
                })
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <>
            <h2>Comments</h2>
            <div className="add-comment">
                <form onSubmit={postCommentHandler}>
                    <label htmlFor="add-comment-input">Add a comment: </label>
                    <input
                        type="text"
                        name="add-comment-input"
                        id="add-comment-input"
                        value={commentInputBoxValue}
                        onChange={onCommentInputTextChangeHandler}
                    />
                    <button type="submit">Post comment</button>
                </form>
            </div>
            {
                reviewComments.length !== 0 ? (
                    !isLoadingComments ? (
                        <div className="comments-list">
                            {
                                reviewComments.map(reviewComment => {
                                    return (
                                        <div className="review-comment">
                                            <p>{reviewComment.author}</p>
                                            <p>{formatCreatedAt(reviewComment.created_at)}</p>
                                            <p>{reviewComment.body}</p>
                                            <p>{reviewComment.comment_votes}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : <p>Loading...</p>
                ) : <p>No existing comments</p>

            }
        </>
    )
}

export default Comments;