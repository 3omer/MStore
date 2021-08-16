import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.state";
import { CategoryState } from "./category.reducer";


export const selectCategoriesFeature = createFeatureSelector<AppState, CategoryState>("categories")

export const selectCategories = createSelector(selectCategoriesFeature, ((state: CategoryState ) => state.categories))

export const selectCategoryRequestStatus = createSelector(selectCategoriesFeature, ((state: CategoryState) => state.requestStatus))

export const selectDeleteCategoryRequestStatus = createSelector(selectCategoriesFeature, ((state: CategoryState) => state.deleteRequestStatus))