import { Dispatch, SetStateAction, useState } from "react";
import { FilterParams } from "../../../types/types";
import { setOrderParamHandler, setSortByParamHandler } from "./eventHandlers";
import './SortFilterPanel.css';

interface IProps {
    filterParams: FilterParams;
    setFilterParams: Dispatch<SetStateAction<FilterParams>>;
}

const SortFilterPanel: React.FC<IProps> = ({ filterParams, setFilterParams }) => {
    const allSortBy = [
        { backendName: "title", frontendName: "Title" },
        { backendName: "owner", frontendName: "Author" },
        { backendName: "created_at", frontendName: "Created at" },
        { backendName: "review_votes", frontendName: "Upvotes" },
        { backendName: "comment_count", frontendName: "Comment Count" }
    ]

    const allOrder = [
        { backendName: "asc", frontendName: "Ascending" },
        { backendName: "desc", frontendName: "Descending" }
    ];

    return (
        < div className="sort-filter-panel" >
            <form id="sort-filter-form">
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
        </div >
    )
}

export default SortFilterPanel