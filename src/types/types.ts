export interface User {
    username: string;
    name: string;
    avatar_url: string;
}

export interface FormatCategoriesRefObj {
    [backendName: string]: string
}

export interface SingleReviewObj {
    review_id: number;
    title: string;
    owner: string;
    category: string;
    review_body: string;
    designer: string;
    review_img_url: string;
    created_at: string;
    review_votes: number;
    comment_count: number;
}

export interface resCategory {
    slug: string;
    description: string;
}

export interface IFilterParams {
    category: string;
    sortBy: string;
    order: string;
}

export interface ReviewCommentObj {
    comment_id: number;
    author: string;
    comment_votes: number;
    body: string;
    review_id: number;
    created_at: string;
}