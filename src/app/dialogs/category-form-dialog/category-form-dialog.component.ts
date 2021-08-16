import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Category } from 'app/common/category';
import { RequestStatus } from 'app/common/requestStatus';
import { CreateCategory, UpdateCategory } from 'app/state/category.actions';
import { selectCategoryRequestStatus } from 'app/state/category.selectors';
import { ToastrService } from 'ngx-toastr';
import { skip, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'category-form-dialog',
  templateUrl: './category-form-dialog.component.html',
  styleUrls: ['./category-form-dialog.component.css']
})
export class CategoryFormDialog implements OnInit, OnDestroy {
  // use to unsupscribe
  private componentActive = false

  // feedback
  feedbackMessage = ""
  // is the form dialog opened for editing or for creating new category
  editingMode = false
  private initialInputs: Category = {
    name: '',
    description: ''
  }
  // intialize form values
  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: Category,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<CategoryFormDialog>,
    private store: Store
  ) {
    this.componentActive = true
    // if user passed data open form for editing
    this.editingMode = this.dialogData?.id ? true : false

  }

  ngOnInit(): void {
    const { id, ...formInputs } = this.dialogData
    this.categoryForm.setValue(Object.assign(this.initialInputs, formInputs))

    this.store.select(selectCategoryRequestStatus)
    .pipe(skip(1), takeWhile(() => this.componentActive))
    .subscribe(status => {
      switch (status) {
        case RequestStatus.succeeded:
          console.log(`${ this.editingMode ? "update" : "create" } passed`);
          this.toastr.success(`Category ${ this.editingMode ? "updated" : "created" } successfully`)
          this.dialogRef.close()
          break;

        case RequestStatus.failed:
          console.log(`${ this.editingMode ? "update" : "create" } failed`);
          this.toastr.error("Something went wrong")
          break;

        default:
          console.log(`unknown request status while handling ${ this.editingMode ? 'update' : 'create'} operation. respoonse status is ${status}`);
          break;
      }
    }
    )

  }

  onSubmit() {
    console.log("NewCat onSubmit(): ", this.categoryForm.value);
    if (this.editingMode) {
      console.log('updating ...');
      const modCategory: Category = this.categoryForm.value
      modCategory.id = this.dialogData.id
      this.store.dispatch(UpdateCategory({ category: modCategory }))
    }
    else {
      console.log('createing ...');
      const newCategory = this.categoryForm.value as Category
      this.store.dispatch(CreateCategory({ category: newCategory }))

    }
  }


  ngOnDestroy() {
    this.componentActive = false
  }
}
