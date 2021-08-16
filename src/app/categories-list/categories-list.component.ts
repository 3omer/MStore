import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Category } from 'app/common/category';
import { RequestStatus } from 'app/common/requestStatus';
import { CategoryFormDialog } from 'app/dialogs/category-form-dialog/category-form-dialog.component';
import { DeleteCategory, Load } from 'app/state/category.actions';
import { selectCategories, selectDeleteCategoryRequestStatus } from 'app/state/category.selectors';
import { ToastrService } from 'ngx-toastr';
import { skip, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit, OnDestroy {

  categories: Category[]
  private componentActive: boolean = false;

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private store: Store
  ) {
    this.componentActive = true
  }

  ngOnInit(): void {
    this.store.dispatch(Load())
    // TODO: unsub
    this.store.select(selectCategories).subscribe(cats => this.categories = cats)
    
    this.store.select(selectDeleteCategoryRequestStatus)
      .pipe(takeWhile(() => this.componentActive), skip(1))
      .subscribe(status => {
        switch (status) {
          case RequestStatus.succeeded:
            this.toastr.success(`category deleted successfully`)
            break;

          case RequestStatus.failed:
            this.toastr.error("Something went wrong")
            break;

          default:
            console.log(`unknown request status while handling delete operation. respoonse status is ${status}`);
            break;
        }
      }
      )
  }

  loadCategories(): void {
    this.store.dispatch(Load())
  }

  btnAdd() {
    console.log('categories btn add');
    // TODO: dialog should return the created category to push it in the list
    this.dialog.open(CategoryFormDialog, { width: '500px' })
  }

  btnEdit(id) {
    console.log('categories edit btn ', id);
    this.dialog.open(CategoryFormDialog, {
      width: '500px',
      data: this.categories.find((cat) => cat.id === id)
    })
  }

  btnDelete(id) {
    // TODO: use a confirm dialog
    console.log('categories delete btn ', id);
    this.store.dispatch(DeleteCategory({ id }))
  }

  ngOnDestroy() {
    this.componentActive = false
  }
}
