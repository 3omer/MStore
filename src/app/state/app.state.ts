import { CategoryState } from "./category.reducer";
import { ProductState } from "./product.reducer";

export interface AppState {
    categories: CategoryState,
    products: ProductState
  }  