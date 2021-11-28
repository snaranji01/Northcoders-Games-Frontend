import { useContext, useEffect, useState } from "react"
import { GoArrowUp } from 'react-icons/go';

import './Comments.css';

import { getReviewCommentsById, postReviewComment } from "../../../api"

import { SingleCommentObj, SingleReviewObj } from "../../../types/types";

import { formatCreatedAtComment } from "../../../utils/utils";

import { UserContext } from "../../../contexts/User";

interface IProps {
    review_id: string | undefined;
    singleReviewData: SingleReviewObj;
}

const Comments: React.FC<IProps> = ({ review_id }) => {
    const { currentUser } = useContext(UserContext);

    const [reviewComments, setReviewComments] = useState<SingleCommentObj[]>([]);
    const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);
    useEffect(() => {
        setIsLoadingComments(true);
        getReviewCommentsById(review_id)
            .then(response => {
                setReviewComments(response);
                setIsLoadingComments(false);
            })
    }, [review_id]);

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

    const sortCommentOptions = [
        { keyName: "author", displayName: "Author" },
        { keyName: "comment_votes", displayName: "Upvotes" },
        { keyName: "created_at", displayName: "Created at" }
    ];
    /* const sortCommentsHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const sortBy: string = (e.target as HTMLButtonElement).value;
        setReviewComments(reviewComments => {
            const reviewCommentsCopy = [...reviewComments];
            const sortedComments = reviewCommentsCopy.sort((a,b) => a[sortBy]-b[sortBy]);
            return sortedComments;
        }
    } */
    return (
        <>
            <h2>Comments</h2>
            <div className="add-comment">
                <form onSubmit={postCommentHandler}>
                    <label htmlFor="add-comment-input">Post a comment as <span style={{ fontWeight: "bold" }}>{currentUser.username}</span>: </label>
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
                            <div className="sort-comments">
                                <form>
                                    {
                                        sortCommentOptions.map(sortCommentOption => {

                                            return (
                                                <div className="comment-sort-option">
                                                    <label htmlFor={`sort-by-${sortCommentOption.keyName}`}>{sortCommentOption.displayName}</label>
                                                    <input
                                                        type="radio"
                                                        name="sort-comments-option"
                                                        id={`sort-by-${sortCommentOption.keyName}`}
                                                        value={sortCommentOption.keyName}
                                                    // onClick={sortCommentsHandler}
                                                    />
                                                </div>
                                            )
                                        })
                                    }



                                </form>


                            </div>
                            {
                                reviewComments.map(reviewComment => {
                                    return (
                                        <div className="review-comment">
                                            <h3>{reviewComment.author}</h3>
                                            <p>Date Posted: {formatCreatedAtComment(reviewComment.created_at)}</p>
                                            <p>{reviewComment.body}</p>
                                            <div className="comment-upvotes-container">
                                                <p className="comment-upvotes">{reviewComment.comment_votes}</p>
                                                <p className="comment-upvotes"><GoArrowUp /></p>
                                            </div>

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