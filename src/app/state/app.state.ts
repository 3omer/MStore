import { CategoryState } from "./category.reducer";

export interface AppState {
    categories: CategoryState;
    products: any // TODO: strong-typing state
  }  