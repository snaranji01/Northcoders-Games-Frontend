import { Dispatch, SetStateAction } from "react"
import { IFilterParams } from "../../../types/types"


export const setCategoryParamHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>, filterParams : IFilterParams, setFilterParams: Dispatch<SetStateAction<IFilterParams>>) => {
    const chosenCategory = (e.target as HTMLButtonElement).value
    setFilterParams(filterParams => ({ ...filterParams, category: chosenCategory }))
}
export const setSortByParamHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>, filterParams : IFilterParams, setFilterParams: Dispatch<SetStateAction<IFilterParams>>) => {
    const chosenSortBy = (e.target as HTMLButtonElement).value
    setFilterParams(filterParams => ({ ...filterParams, sortBy: chosenSortBy }))
}
export const setOrderParamHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>, filterParams : IFilterParams, setFilterParams: Dispatch<SetStateAction<IFilterParams>>) => {
    const chosenOrder = (e.target as HTMLButtonElement).value
    setFilterParams(filterParams => ({ ...filterParams, order: chosenOrder }))
}