import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryService } from 'app/services/category.service';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Load, LoadFail, LoadSuccess } from './category.actions';

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
}