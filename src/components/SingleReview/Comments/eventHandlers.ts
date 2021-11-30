import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react"
import { postReviewComment } from "../../../api";
import { SingleCommentObj } from "../../../types/types";

export const onCommentInputTextChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    setCommentInputBoxValue: Dispatch<SetStateAction<string>>) => {
    setCommentInputBoxValue((e.target as HTMLInputElement).value)
}

export const postCommentHandler = (
    e: React.SyntheticEvent<HTMLFormElement>,
    setReviewComments: Dispatch<SetStateAction<SingleCommentObj[]>>,
    review_id: string,
    currentUser: any,
    commentInputBoxValue: string,
    error: AxiosError | Error | null,
    setError: Dispatch<SetStateAction<AxiosError | Error | null>>
) => {
    e.preventDefault();

    postReviewComment(review_id, currentUser.username, commentInputBoxValue)
        .then(() => {
            setReviewComments(reviewComments => {
                const reviewCommentsCopy: SingleCommentObj[] = JSON.parse(JSON.stringify(reviewComments));
                const latestCommentId = Math.max(...reviewCommentsCopy.map((reviewComment: SingleCommentObj) => reviewComment.comment_id))
                reviewCommentsCopy.push({
                    comment_id: latestCommentId,
                    author: currentUser.username,
                    comment_votes: 0,
                    body: "",
                    review_id: parseInt(review_id),
                    created_at: new Date().toString()
                })
                return reviewCommentsCopy
            })
        })
        .catch(error => {
            console.log(error)
            setError(error);
        })
}

export const sortCommentsHandler = (e: React.ChangeEvent<HTMLSelectElement>, setReviewComments: Dispatch<SetStateAction<SingleCommentObj[]>>) => {
    const sortBy: string = e.target.value;

    setReviewComments((reviewComments: SingleCommentObj[]) => {
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