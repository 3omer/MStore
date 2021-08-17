import { createReducer, on } from "@ngrx/store";
import { Product } from "app/common/product";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import * as ProductActions from "./product.actions";
import { RequestStatus } from "app/common/requestStatus";

export interface ProductState extends EntityState<Product> {
    createRequestStatus: RequestStatus,
    updateRequestStatus: RequestStatus,
    deleteRequestStatus: RequestStatus,
    error: string
}

const initialState: ProductState = {
    ids: [],
    entities: {},
    createRequestStatus: RequestStatus.idel,
    updateRequestStatus: RequestStatus.idel,
    deleteRequestStatus: RequestStatus.idel,
    error: ''
}
 
export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const productReducer = createReducer(initialState,
    //#region handle load operation
    on(ProductActions.LoadSuccess, (state, { products }) => {
        return adapter.addMany(products, { ...state, error: '' });
    }),
    on(ProductActions.LoadFail, (state, { error }) => {
        return { ...state, error: error }
    }),
    //#endregion
    
    //#region handle create operation
    on(ProductActions.CreateProduct, (state, { product }) => {
        return { ...state, createRequestStatus: RequestStatus.pending }
    }),
    on(ProductActions.CreateProductSuccess, (state, { product }) => {
        return adapter.addOne(product, { ...state, error: "", createRequestStatus: RequestStatus.succeeded })
    }),
    on(ProductActions.CreateProductFail, (state, { error }) => {
        return { ...state, createRequestStatus: RequestStatus.failed, error: error }
    }),
    //#endregion

    //#region handle update operation
    on(ProductActions.UpdateProduct, (state, { product }) => {
        return { ...state, updateRequestStatus: RequestStatus.pending }
    }),
    on(ProductActions.UpdateProductSuccess, (state, { product }) => {
        return adapter.upsertOne(product, { ...state,updateRequestStatus: RequestStatus.succeeded, error: ""})
    }),
    on(ProductActions.UpdateProductFail, (state, { error }) => {
        return { ...state, updateRequestStatus: RequestStatus.failed, error: error }
    }),
    //#endregion
    
    //#region handle delete operation
    on(ProductActions.DeleteProduct, (state) => {
        return { ...state, deleteRequestStatus: RequestStatus.pending }
    }),
    on(ProductActions.DeleteProductSuccess, (state, { id }) => {
        return adapter.removeOne(id,{ ...state, deleteRequestStatus: RequestStatus.succeeded, error: '' })
    }),
    on(ProductActions.DeleteProductFail, (state, { error }) => {
        return { ...state, deleteRequestStatus: RequestStatus.failed, error: error }
    }),
    //#endregion

    
    )