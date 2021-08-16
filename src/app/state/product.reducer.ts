import { createReducer } from "@ngrx/store";
import { Product } from "app/common/product";

export interface ProductState {
    products: Product[],
    error: string
}

const initialState: ProductState = {
    products: [],
    error: ''
}

export const productReducer = createReducer(initialState)