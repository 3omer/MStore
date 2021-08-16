import { createAction, props } from "@ngrx/store";
import { Category } from "app/common/category";

export const Load = createAction("[Categories] load categroies list")
export const LoadSuccess = createAction("[Categories] load categroies success", props<{ categories }>())
export const LoadFail = createAction("[Categories] load categories fail", props<{ error }>())

export const DeleteCategory = createAction("[Categories] delete category", props<{id: number}>())
export const DeleteCategorySuccess = createAction('[Categories] delete category success', props<{ id: number }>());
export const DeleteCategoryFail = createAction('[Categories] delete category faill', props<{ error }>());

export const CreateCategory = createAction("[Categories] create category", props<{ category: Category }>())
export const CreateCategorySuccess = createAction('[Categories] create category success', props<{ category: Category }>());
export const CreateCategoryFail = createAction('[Categories] create category faill', props<{ error }>());

export const UpdateCategory = createAction("[Categories] update category", props<{ category: Category }>())
export const UpdateCategorySuccess = createAction('[Categories] update category success', props<{ category: Category }>());
export const UpdateCategoryFail = createAction('[Categories] update category faill', props<{ error }>());