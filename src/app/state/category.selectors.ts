import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.state";
import { CategoryState } from "./category.reducer";


export const selectCategoriesFeature = createFeatureSelector<CategoryState>("categories")

export const selectCategories = createSelector(selectCategoriesFeature, (state => state.categories))