import { createAction, props } from "@ngrx/store";

export const Load = createAction("[Categories] load categroies list")
export const LoadSuccess = createAction("[Categories] load categroies success", props<{ categories }>())
export const LoadFail = createAction("[Categories] load categories fail", props<{ error }>())

export const DeleteCategory = createAction("[Categories] delete category", props<{id: number}>())
export const DeleteCategorySuccess = createAction('[Categories] delete category success', props<{ id: number }>());
export const DeleteCategoryFail = createAction('[Categories] delete category faill', props<{ error }>());