
import { useContext, useState } from "react";
import { GoArrowUp } from "react-icons/go"
import { UserContext } from "../../../../contexts/User";
import { SingleCommentObj } from "../../../../types/types"

import './CommentUpvoteButton.css';
import { handleUpvote } from "./eventHandlers";

interface IProps {
    reviewComment: SingleCommentObj
}

const CommentUpvoteButton: React.FC<IProps> = ({ reviewComment }) => {
    const { currentUser } = useContext(UserContext);

    let commentUpvotesNumber;
    if (typeof reviewComment.comment_votes === "number") {
        commentUpvotesNumber = reviewComment.comment_votes
    } else if (typeof reviewComment.comment_votes === "string") {
        throw new Error("reviewComment.comment_votes passed in was a string")
    } else {
        throw new Error("reviewComment type error")
    }

    const [commentUpvotes, setCommentUpvotes] = useState<number>(commentUpvotesNumber);
    const [votedUsers, setVotedUsers] = useState<string[]>([]);
    return (
        <div className="comment-upvotes-container">
            <p className="comment-upvotes">{commentUpvotes}</p>
            <p className="comment-upvotes">
                <GoArrowUp style={{borderStyle: "solid", backgroundColor: "grey"}}
                onClick={() => handleUpvote(reviewComment.comment_id, setCommentUpvotes, currentUser, votedUsers, setVotedUsers)}
                />
            </p>

        </div>
    )
}

export default CommentUpvoteButton;