import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryService } from 'app/services/category.service';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CreateCategory, CreateCategoryFail, CreateCategorySuccess, DeleteCategory, DeleteCategoryFail, DeleteCategorySuccess, Load, LoadFail, LoadSuccess, UpdateCategory, UpdateCategoryFail, UpdateCategorySuccess } from './category.actions';

@Injectable()
export class CategoryEffects {

    
      constructor(
        private actions$: Actions,
        private categoriesService: CategoryService
      ) {}

  loadCategories$ = createEffect(() => this.actions$.pipe(
    ofType(Load),
    mergeMap(() => this.categoriesService.getAll()
      .pipe(
        map(categories => (LoadSuccess({ categories }))),
        catchError((error) => of(LoadFail(error)))
      ))
    )
  )


  deleteCategory$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(DeleteCategory),
        map((action) => action.id),
        mergeMap(id => {
          console.log(id);
          
          return this.categoriesService.delete(id)
            .pipe(
              map(() => (DeleteCategorySuccess({id}))),
              catchError(err => of(DeleteCategoryFail(err)))
            );
        })        
        );
  });

  createCategory$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CreateCategory),
        map((action) => action.category),
        mergeMap(category => {
          console.log(category);
          
          return this.categoriesService.create(category)
            .pipe(
              map((addedCategory) => (CreateCategorySuccess({category: addedCategory}))),
              catchError(err => of(CreateCategoryFail(err)))
            );
        })        
        );
  });

  updateCategory$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(UpdateCategory),
        map((action) => action.category),
        mergeMap(category => {
          console.log(category);
          
          return this.categoriesService.update(category.id, category)
            .pipe(
              map(() => (UpdateCategorySuccess({category}))),
              catchError(err => of(UpdateCategoryFail(err)))
            );
        })        
        );
  });

}