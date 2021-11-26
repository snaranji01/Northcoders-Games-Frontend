import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GoArrowUp } from 'react-icons/go';

import { getReviewById } from "../../api";
import { singleReviewObj } from "../../App";
import Comments from "./Comments/Comments";

import './SingleReview.css';


const SingleReview = () => {
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
        setIsLoading(true);
        getReviewById(review_id)
            .then(response => {
                setSingleReviewData(response)
                setIsLoading(false);
            })
    }, [review_id])

    return (
        !isLoading ? (
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
        ) : <p>Loading...</p>
    )
}

export default SingleReview;