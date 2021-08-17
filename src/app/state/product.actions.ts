import { createAction, props } from "@ngrx/store";
import { Product } from "app/common/product";

export const Load = createAction("[Products] load products list")
export const LoadSuccess = createAction("[Products] load products success", props<{ products }>())
export const LoadFail = createAction("[Products] load products fail", props<{ error }>())

export const DeleteProduct = createAction("[Products] delete product", props<{id: number}>())
export const DeleteProductSuccess = createAction('[Products] delete product success', props<{ id: number }>());
export const DeleteProductFail = createAction('[Products] delete product faill', props<{ error }>());

export const CreateProduct = createAction("[Products] create product", props<{ product: Product }>())
export const CreateProductSuccess = createAction('[Products] create product success', props<{ product: Product }>());
export const CreateProductFail = createAction('[Products] create product faill', props<{ error }>());

export const UpdateProduct = createAction("[Products] update product", props<{ product: Product }>())
export const UpdateProductSuccess = createAction('[Products] update product success', props<{ product: Product }>());
export const UpdateProductFail = createAction('[Products] update product faill', props<{ error }>());