import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getReviewById } from "../api";
import { singleReviewObj } from "../App";

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
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        getReviewById(review_id)
            .then(response => {
                setSingleReviewData(response)
                setIsLoading(false);
                console.log('here')
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
            </div>
        ) : <p>Loading...</p>



    )
}

export default SingleReview;