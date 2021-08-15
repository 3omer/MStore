import { Category } from "app/common/category";
import { CategoryState } from "./category.reducer";

export interface AppState {
    categories: CategoryState;
  }  