import { createAction, props } from "@ngrx/store";

export const Load = createAction("[Categories] load categroies list")
export const LoadSuccess = createAction("[Categories] load categroies success", props<{ categories }>())
export const LoadFail = createAction("[Categories] load categories fail", props<{ error }>())