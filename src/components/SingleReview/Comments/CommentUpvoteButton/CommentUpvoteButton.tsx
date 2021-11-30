
import { GoArrowUp } from "react-icons/go"
import { SingleCommentObj } from "../../../../types/types"

import './CommentUpvoteButton.css';

interface IProps {
    reviewComment: SingleCommentObj
}

const CommentUpvoteButton: React.FC<IProps> = ({reviewComment}) => {
    return (
        <div className="comment-upvotes-container">
            <p className="comment-upvotes">{reviewComment.comment_votes}</p>
            <GoArrowUp className="comment-upvotes"/>
        </div>
    )
}

export default CommentUpvoteButton;