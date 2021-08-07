import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'app/common/category';
import { CategoryService } from 'app/services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'category-form-dialog',
  templateUrl: './category-form-dialog.component.html',
  styleUrls: ['./category-form-dialog.component.css']
})
export class CategoryFormDialog implements OnInit {
  
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
    private categoryService: CategoryService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<CategoryFormDialog>
    ) {
    // if user passed data open form for editing
      this.editingMode = this.dialogData?.id ? true: false

   }

  ngOnInit(): void {
      const { id, ...formInputs } = this.dialogData
      this.categoryForm.setValue(Object.assign(this.initialInputs, formInputs))
  }

  onSubmit() {
    console.log("NewCat onSubmit(): ",  this.categoryForm.value);
    if(this.editingMode) {
      console.log('updating ...');
      const modCategory: Category = this.categoryForm.value
      modCategory.id = this.dialogData.id
      this.categoryService.update(this.dialogData.id, modCategory)
      .subscribe(res => {
        if (res) { 
          this.feedbackMessage = "Category updated"
          this.toastr.success("Category updated") 
          this.dialogRef.close()
        }
        else {
          this.feedbackMessage = "Something went wrong"
          this.toastr.error("Something went wrong")
        }
      })
    }
    else {
      console.log('createing ...');
      this.categoryService.create(this.categoryForm.value as Category)
      .subscribe(newCategory => {
        if (newCategory) {
          this.feedbackMessage = "Category added successfully"
          this.toastr.success("Category added successfully")
          this.dialogRef.close()
        }
        else {
          this.feedbackMessage = "Something went wrong"
          this.toastr.error("Something went wrong")
        }
      })
    }
  }

}
