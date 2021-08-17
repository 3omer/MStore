import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.state";
import { adapter, ProductState } from "./product.reducer";

// get the selectors
const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();

// select products feature
export const selectProductsFeature = createFeatureSelector<AppState, ProductState>("products");

// select the array of product ids
export const selectProductIds = selectIds;

// select the dictionary of product entities
export const selectProductEntities = selectEntities;

// select the total product count
export const selectProductTotal = selectTotal;

export const selectAllProducts = createSelector(
    selectProductsFeature,
    selectAll
);

// request call status state
export const selectDeleteProductRequestStatus = createSelector(selectProductsFeature, ((state: ProductState) => state.deleteRequestStatus))

export const selectCreateProductRequestStatus = createSelector(selectProductsFeature, ((state: ProductState) => state.createRequestStatus))
