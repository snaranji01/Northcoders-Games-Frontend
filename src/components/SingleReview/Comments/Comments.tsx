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
        { keyName: "created_at", displayName: "Created at" },
        { keyName: "author", displayName: "Author" },
        { keyName: "comment_votes", displayName: "Upvotes" },
    ];    
    const sortCommentsHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const sortBy: string = e.target.value;
        console.log(sortBy)

        setReviewComments(reviewComments => {
            const reviewCommentsCopy = [...reviewComments];
            const sortedComments = reviewCommentsCopy.sort((commentA, commentB) => {
                if (commentA[sortBy] < commentB[sortBy]) {
                    return 1
                } else if (commentA[sortBy] > commentB[sortBy]) return -1
                return 0
            })
            return sortedComments;
        })
    }
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
                                <select 
                                name="sort-comments-options" 
                                id="sort-comments-options"
                                onChange={sortCommentsHandler}
                                >
                                    {
                                        sortCommentOptions.map(sortCommentOption => {
                                            return <option
                                                key={sortCommentOption.keyName}
                                                value={sortCommentOption.keyName}
                                            >
                                                {sortCommentOption.displayName}
                                            </option>
                                        })
                                    }
                                </select>
                            </div>
                            {
                                reviewComments.map(reviewComment => {
                                    return (
                                        <div className="review-comment" key={reviewComment.comment_id}>
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