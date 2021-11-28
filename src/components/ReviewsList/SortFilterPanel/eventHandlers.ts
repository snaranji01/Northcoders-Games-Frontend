import { Dispatch, SetStateAction } from "react"
import { FilterParams } from "../../../types/types"


export const setCategoryParamHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>, filterParams : FilterParams, setFilterParams: Dispatch<SetStateAction<FilterParams>>) => {
    const chosenCategory = (e.target as HTMLButtonElement).value
    setFilterParams(filterParams => ({ ...filterParams, category: chosenCategory }))
}
export const setSortByParamHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>, filterParams : FilterParams, setFilterParams: Dispatch<SetStateAction<FilterParams>>) => {
    const chosenSortBy = (e.target as HTMLButtonElement).value
    setFilterParams(filterParams => ({ ...filterParams, sortBy: chosenSortBy }))
}
export const setOrderParamHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>, filterParams : FilterParams, setFilterParams: Dispatch<SetStateAction<FilterParams>>) => {
    const chosenOrder = (e.target as HTMLButtonElement).value
    setFilterParams(filterParams => ({ ...filterParams, order: chosenOrder }))
}

export const toggleSortFilterPanelHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, toggleSortFilterPanel: boolean, setToggleSortFilterPanel: Dispatch<SetStateAction<boolean>>) => {
    setToggleSortFilterPanel(toggleSortFilterPanel => !toggleSortFilterPanel);
    const currentText = (e.target as HTMLButtonElement).textContent;
    if (currentText === "Click to sort and filter") {
        (e.target as HTMLButtonElement).textContent = "Click to minimise"
    } else {
        (e.target as HTMLButtonElement).textContent = "Click to sort and filter"
    }
};