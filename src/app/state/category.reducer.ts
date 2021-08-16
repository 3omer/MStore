import { createReducer, on } from "@ngrx/store";
import { Category } from "../common/category";
import { DeleteCategoryFail, DeleteCategorySuccess, Load, LoadFail, LoadSuccess } from "./category.actions";

export interface CategoryState {
    categories: Category[],
    error: string
}

const initialState : CategoryState = {
    categories: [],
    error: ''
}

export const categoryReducer = createReducer(
    initialState, 
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
    })

)