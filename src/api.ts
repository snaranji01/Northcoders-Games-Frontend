import axios, { AxiosInstance } from 'axios';

const ncgamesAPI: AxiosInstance = axios.create({
    baseURL: "https://nc-games-backend-snaranji01.herokuapp.com/api"
});

export const getReviews = () => {
    return ncgamesAPI
        .get('/reviews')
        .then(response => {
            return response.data.reviews;
        })
}

export const getCategories = () => {
    return ncgamesAPI
        .get('/categories')
        .then(response => {
            return response.data.categories;
        })
}