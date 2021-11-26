import axios, { AxiosInstance } from 'axios';
import { IFilterParams } from './types/types';


const ncgamesAPI: AxiosInstance = axios.create({
    baseURL: "https://nc-games-backend-snaranji01.herokuapp.com/api"
});

export const getReviews = (filterParams: IFilterParams) => {

    const params = {
        sort_by: filterParams.sortBy,
        order: filterParams.order,
        category: filterParams.category
    }

    return ncgamesAPI
        .get('/reviews', { params })
        .then(response => {
            return response.data.reviews;
        })
}

export const getReviewById = (review_id: string | undefined) => {
    return ncgamesAPI
        .get(`/reviews/${review_id}`)
        .then(response => response.data.review)
}

export const getReviewCommentsById = (review_id: string | undefined) => {
    return ncgamesAPI
        .get(`/reviews/${review_id}/comments`)
        .then(response => response.data.reviewComments)
}

export const postReviewComment = (review_id: string | undefined, username: string, body: string) => {
    const postBody = {username, body};
    return ncgamesAPI
        .post(`reviews/${review_id}/comments`, postBody)
        .then(response => response.data.newReviewComment)
}

export const getCategories = () => {
    return ncgamesAPI
        .get('/categories')
        .then(response => {
            return response.data.categories;
        })
}

export const getUsers = () => {
    return ncgamesAPI
        .get('/users')
        .then(response => {
            return response.data.users;
        })
}

export const getUserByUsername = (username: string) => {
    return ncgamesAPI
        .get(`/users/${username}`)
        .then(response => {
            return response.data.user;
        })
}