import { Dispatch, SetStateAction } from "react"
import { patchCommentVotes } from "../../../../api"

export const handleUpvote = (comment_id: number, setCommentUpvotes: Dispatch<SetStateAction<number>>, currentUser: any, votedUsers: string[], setVotedUsers: Dispatch<SetStateAction<string[]>>) => {
    if (!votedUsers.includes(currentUser.username)) {
        patchCommentVotes(1, comment_id)
            .then(() => {
                setCommentUpvotes(commentUpvotes => {
                    const newCommentUpvotes = commentUpvotes + 1
                    return newCommentUpvotes
                })
                setVotedUsers(votedUsers => {
                    const votedUsersCopy = [...votedUsers];
                    votedUsersCopy.push(currentUser.username)
                    return votedUsersCopy
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

}