import { Dispatch, SetStateAction, useState } from "react";
import { IFilterParams } from "../../../types/types";
import { formatCategoryNames } from "../../../utils/utils";
import { setCategoryParamHandler, setOrderParamHandler, setSortByParamHandler } from "./eventHandlers";
import './SortFilterPanel.css';

interface IProps {
    filterParams: IFilterParams;
    setFilterParams: Dispatch<SetStateAction<IFilterParams>>;
    allCategories: string[];
}

const SortFilterPanel: React.FC<IProps> = ({ filterParams, setFilterParams, allCategories }) => {
    const allSortBy = [
        { backendName: "title", frontendName: "Title" },
        { backendName: "owner", frontendName: "Author" },
        { backendName: "category", frontendName: "Category" },
        { backendName: "created_at", frontendName: "Created at" },
        { backendName: "review_votes", frontendName: "Upvotes" },
    ]

    const allOrder = [
        { backendName: "asc", frontendName: "Ascending" },
        { backendName: "desc", frontendName: "Descending" }
    ];

    // toggle sort-filter-panel
    const [toggleSortFilterPanel, setToggleSortFilterPanel] = useState<boolean>(false);
    const ToggleSortFilterPanelHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setToggleSortFilterPanel(toggleSortFilterPanel => !toggleSortFilterPanel);
        const currentText = (e.target as HTMLButtonElement).textContent;
        if (currentText === "Click to sort and filter") {
            (e.target as HTMLButtonElement).textContent = "Click to minimise"
        } else {
            (e.target as HTMLButtonElement).textContent = "Click to sort and filter"
        }
    }

    return (
        < div className="sort-filter-panel" >
            <button onClick={ToggleSortFilterPanelHandler} className="toggleSortFilterPanel">
                {'Click to sort and filter'}
            </button>
            {
                toggleSortFilterPanel ? (
                    <form id="sort-filter-form">
                        <legend>Filter by category:</legend>
                        <fieldset>
                            {
                                allCategories.map(category => {
                                    return (
                                        <div key={`radio-${category}-option`} className="sorting-panel-category">
                                            <label htmlFor="category-choose-radio">{formatCategoryNames(category)}</label>
                                            <input
                                                type="radio"
                                                id={`radio-${category}-option`} value={category}
                                                name="choose-category-option"
                                                onClick={e => setCategoryParamHandler(e, filterParams, setFilterParams)}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </fieldset>
                        <legend>Sort by:</legend>
                        <fieldset>
                            {
                                allSortBy.map(sortby => {
                                    return (
                                        <div key={`radio-${sortby.backendName}-option`} className="sorting-panel-sortby">
                                            <label htmlFor="sortby-choose-radio">{sortby.frontendName}</label>
                                            <input
                                                type="radio"
                                                id={`radio-${sortby.backendName}-option`} value={sortby.backendName}
                                                name="choose-sortby-option"
                                                onClick={e => setSortByParamHandler(e, filterParams, setFilterParams)}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </fieldset>
                        <legend>Order:</legend>
                        <fieldset>
                            {
                                allOrder.map(order => {
                                    return (
                                        <div key={`radio-${order.backendName}-option`} className="sorting-panel-order">
                                            <label htmlFor="order-choose-radio">{order.frontendName}</label>
                                            <input
                                                type="radio"
                                                id={`radio-${order}-option`} value={order.backendName}
                                                name="choose-order-option"
                                                onClick={e => setOrderParamHandler(e, filterParams, setFilterParams)}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </fieldset>
                    </form>
                ) : null
            }
        </div >
    )
}

export default SortFilterPanel