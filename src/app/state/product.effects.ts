import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from 'app/services/product.service';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as ProductActions from "../state/product.actions";


@Injectable()
export class ProductEffects {

    
      constructor(
        private actions$: Actions,
        private productService: ProductService
      ) {}

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.Load),
    mergeMap(() => this.productService.getAll()
      .pipe(
        map(products => (ProductActions.LoadSuccess({ products }))),
        catchError((error) => of(ProductActions.LoadFail({error:error})))
      ))
    )
  )

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(ProductActions.DeleteProduct),
        map((action) => action.id),
        mergeMap(id => {
          console.log(id);
          
          return this.productService.delete(id)
            .pipe(
              map(() => (ProductActions.DeleteProductSuccess({id}))),
              catchError(err => of(ProductActions.DeleteProductFail(err)))
            );
        })        
        );
  });

  createProduct$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(ProductActions.CreateProduct),
        map((action) => action.product),
        mergeMap(product => {
          console.log(product);
          
          return this.productService.create(product)
            .pipe(
              map((addedProduct) => (ProductActions.CreateProductSuccess({product: addedProduct}))),
              catchError(err => of(ProductActions.CreateProductFail(err)))
            );
        })        
        );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(ProductActions.UpdateProduct),
        map((action) => action.product),
        mergeMap(product => {
          console.log(product);
          
          return this.productService.update(product.id, product)
            .pipe(
              map(() => (ProductActions.UpdateProductSuccess({product}))),
              catchError(err => of(ProductActions.UpdateProductFail(err)))
            );
        })        
        );
  });

}