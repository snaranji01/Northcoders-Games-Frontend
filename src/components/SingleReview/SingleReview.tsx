import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GoArrowUp } from 'react-icons/go';

import './SingleReview.css';

import { getReviewById } from "../../api";

import { SingleReviewObj } from "../../types/types";

import Comments from "./Comments/Comments";
import ErrorPage from "../ErrorPage/ErrorPage";

import { formatCreatedAt } from "../../utils/utils";
import { AxiosError } from "axios";

const SingleReview = () => {
    const { review_id: reviewIdReceived } = useParams();
    let review_id: string;
    if (reviewIdReceived === undefined) {
        // all reviews page
        review_id = '';
    } else {
        review_id = reviewIdReceived
    }

    const [singleReviewData, setSingleReviewData] = useState<SingleReviewObj | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<AxiosError | Error | null>(null);

    useEffect(() => {
        setIsLoading(true);
        getReviewById(review_id)
            .then(response => {
                setSingleReviewData(response)
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
            })
    }, [review_id])

    if (error) {
        return <ErrorPage error={error} />
    }
    return (
        !isLoading ? (
            (singleReviewData !== null) ? (
                <div className="single-review-page-container">
                    <div className="article-content">
                        <h1 className="single-review-title">{singleReviewData.title}</h1>
                        <div className="single-article-info-container">
                            <p className="single-article-info">Author: {singleReviewData.owner}</p>
                            <p className="single-article-info">Category: {singleReviewData.category}</p>
                            <p className="single-article-info">Designer: {singleReviewData.designer}</p>
                            <p className="single-article-info">Created at: {formatCreatedAt(singleReviewData.created_at)}</p>
                        </div>
                        <div className="upvotes-container">
                            <p className="review-upvotes">Review votes: {singleReviewData.review_votes}</p>
                            <p className="review-upvotes">< GoArrowUp /></p>
                        </div>
                        <div className="article-review-body-container">
                            <p className="review-body">{singleReviewData.review_body}</p>
                        </div>
                        <div className="single-review-image-container">
                            <img className="single-review-image" src={singleReviewData.review_img_url} alt="The game being reviewed" />
                        </div>
                    </div>
                    <div className="comments-section">
                        <Comments review_id={review_id} singleReviewData={singleReviewData} />
                    </div>
                </div>
            ) : null

        ) : <p>Loading...</p>
    )
}

export default SingleReview;