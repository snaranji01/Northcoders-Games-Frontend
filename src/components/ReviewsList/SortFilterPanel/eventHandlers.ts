import { Dispatch, SetStateAction } from "react"
import { FilterParams } from "../../../types/types"

export const setSortByParamHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>, filterParams : FilterParams, setFilterParams: Dispatch<SetStateAction<FilterParams>>) => {
    const chosenSortBy = (e.target as HTMLButtonElement).value
    setFilterParams(filterParams => ({ ...filterParams, sortBy: chosenSortBy }))
}
export const setOrderParamHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>, filterParams : FilterParams, setFilterParams: Dispatch<SetStateAction<FilterParams>>) => {
    const chosenOrder = (e.target as HTMLButtonElement).value
    setFilterParams(filterParams => ({ ...filterParams, order: chosenOrder }))
}