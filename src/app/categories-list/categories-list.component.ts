import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Category } from 'app/common/category';
import { CategoryFormDialog } from 'app/dialogs/category-form-dialog/category-form-dialog.component';
import { CategoryService } from 'app/services/category.service';
import { Load } from 'app/state/category.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  categories: Category[]
  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private store: Store
    ) { }

  ngOnInit(): void {
    // this.categoryService.getAll().subscribe(cats => {
    //   this.categories = cats
    // })
    this.store.dispatch(Load())

  }
  
  loadCategories(): void {
    this.categoryService.getAll().subscribe(cats => {
      this.categories = cats
    })
  }

  btnAdd() {
    console.log('categories btn add');
    // TODO: dialog should return the created category to push it in the list
    this.dialog.open(CategoryFormDialog, { width: '500px' })
    .afterClosed()
    .subscribe(()=> {
      this.loadCategories()
    })
    
  }
  
  btnEdit(id) {
    console.log('categories edit btn ', id);
    this.dialog.open(CategoryFormDialog, { 
      width: '500px', 
      data: this.categories.find((cat) => cat.id === id)
    })
    .afterClosed()
    .subscribe(()=> {
      this.loadCategories()
    })
  }

  btnDelete(id) {
    // TODO: use a confirm dialog
    console.log('categories delete btn ', id);
    this.categoryService.delete(id).subscribe(flag => {
      if(flag) { 
        this.toastr.success("Category has been deleted")
        this.categories = this.categories.filter(cat => cat.id != id)
      }
      else {
        this.toastr.error("Something went wrong")
      }
    })
    
  }
}
