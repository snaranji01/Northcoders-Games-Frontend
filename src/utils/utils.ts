import { FormatCategoriesRefObj } from "../types/types";


export const formatCreatedAt = (serverResponseString: string): string => {
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

export const formatCategoryNames = (categoryKeyName: string) => {
    const formatCategoriesRefObj: FormatCategoriesRefObj = {
    "strategy": "Strategy",
    "hidden-roles": "Hidden Roles",
    "dexterity": "Dexterity",
    "push-your-luck": "Push Your Luck",
    "roll-and-write": "Roll And Write",
    "deck-building": "Deck Building",
    "engine-building": "Engine Building"
    }

    return formatCategoriesRefObj[categoryKeyName]
};

export const formatReviewBodyPreview = (reviewBodyInput: string): string => {
    const splitReview = reviewBodyInput.split(" ");
    const first30Words = splitReview.slice(0, 30);
    return first30Words.join(" ");
}


export const formatCreatedAtComment = (serverResponseString: string): string => {
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