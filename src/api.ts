import axios, { AxiosInstance } from 'axios';

const ncgamesAPI: AxiosInstance = axios.create({
    baseURL: "https://nc-games-backend-snaranji01.herokuapp.com/api"
});

export const getReviews = (category: string | undefined) => {
    // set query
    const query = category === undefined ? "/reviews"
        : `reviews?category=${category}`;
    return ncgamesAPI
        .get(query)
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