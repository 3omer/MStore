import { createReducer, on } from "@ngrx/store";
import { RequestStatus } from "app/common/requestStatus";
import { Category } from "../common/category";
import { CreateCategory, CreateCategoryFail, CreateCategorySuccess, DeleteCategoryFail, DeleteCategorySuccess, Load, LoadFail, LoadSuccess, UpdateCategory, UpdateCategoryFail, UpdateCategorySuccess } from "./category.actions";

export interface CategoryState {
    categories: Category[],
    requestStatus: RequestStatus,
    updateRequestStatus: RequestStatus,
    error: string
}

const initialState: CategoryState = {
    categories: [],
    requestStatus: RequestStatus.idel,
    updateRequestStatus: RequestStatus.idel,
    error: ''
}

export const categoryReducer = createReducer(
    initialState,

    //#region handle load iperation
    on(LoadSuccess, (state, { categories }) => {
        return {
            ...state,
            categories: categories,
            error: ''
        }
    }),
    on(LoadFail, (state, { error }) => {
        return {
            ...state,
            error: error
        }
    }),
    //#endregion
    
    //#region handle delete operation
    on(DeleteCategorySuccess, (state, { id }) => {
        return {
            ...state,
            categories: state.categories.filter(cat => cat.id !== id),
            error: ''
        }
    }),
    on(DeleteCategoryFail, (state, { error }) => {
        return {
            ...state,
            error: error
        }
    }),
    //#endregion

    //#region handle create operation
    on(CreateCategory, (state, { category }) => {
        return {
            ...state,
            requestStatus: RequestStatus.pending
        }
    }),
    on(CreateCategorySuccess, (state, { category }) => {
        return {
            ...state,
            categories: state.categories.concat(category),
            requestStatus: RequestStatus.succeeded,
            error: ""
        }
    }),
    on(CreateCategoryFail, (state, { error }) => {
        return {
            ...state,
            requestStatus: RequestStatus.failed,
            error: error
        }
    }),
    //#endregion

    //#region handle update operation
    on(UpdateCategory, (state, { category }) => {
        return {
            ...state,
            requestStatus: RequestStatus.pending
        }
    }),
    on(UpdateCategorySuccess, (state, { category }) => {
        return {
            ...state,
            categories: state.categories.concat(category),
            requestStatus: RequestStatus.succeeded,
            error: ""
        }
    }),
    on(UpdateCategoryFail, (state, { error }) => {
        return {
            ...state,
            requestStatus: RequestStatus.failed,
            error: error
        }
    })
    //#endregion
)