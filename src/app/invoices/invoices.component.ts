import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from 'app/common/category';
import { Invoice } from 'app/common/Inovice';
import { InvoiceEntry } from 'app/common/InvoiceEntry';
import { Product } from 'app/common/product';
import { InvoiceService } from 'app/services/invoice.service';
import { ProductService } from 'app/services/product.service';
import { selectCategories } from 'app/state/category.selectors';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  // save btn state
  isSaving = false

  // check is opened for editing 
  invoiceId: number

  inputCategoryId = new FormControl('')
  inputNotes = new FormControl('')
  inputCustomerName = new FormControl('')
  inputDate = new FormControl('')

  categories: Category[]

  _products: Product[] = []
  filteredProducts: Product[]

  invoiceItems: InvoiceEntry[] = []

  inputProduct = new FormControl('')
  inputQuantity = new FormControl(1)
  inputDiscount = new FormControl(0)

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService,
    private invoiceService: InvoiceService,
    private toasr: ToastrService,
    private store: Store
  ) { }

  ngOnInit(): void {
    const idStr = this.route.snapshot.paramMap.get('id')
    this.invoiceId = Number.parseInt(idStr)

    // TODO: unsub
    this.store.select(selectCategories).subscribe(cats => this.categories = cats)

    this.productService.getAll().subscribe(prods => {
      this._products = prods
      if (this.invoiceId) {
        // get invoice object
        this.invoiceService.get(this.invoiceId)
          .subscribe(res => {
            if (res) {
              this.parseInvoiceDetails(res)
              // triger on category selected to filter products
              this.onCategorySelected(res.categoryId)
            }
            else console.log('something went wrong');
          })
      }
    })

  }

  btnAdd() {
    console.log('btnAdd()');
    // TODO: validation
    const product = this.filteredProducts.find(p => p.id === this.inputProduct.value)
    if (!product) return

    const quantity = this.inputQuantity.value
    const discountPercentage = this.inputDiscount.value

    const cost = product.price * quantity
    const net = cost - ((discountPercentage / 100) * cost)

    const entry: InvoiceEntry = {
      productId: product.id,
      productName: product.name,
      price: product.price,
      qty: quantity,
      discount: discountPercentage,
      cost: cost,
      net: net
    }
    this.invoiceItems.push(entry)
  }

  btnRemove(entry: InvoiceEntry) {
    console.log('btnRemove() ', entry);
    this.invoiceItems = this.invoiceItems.filter(item => item.productId !== entry.productId)
  }

  onCategorySelected(categoryId: number) {
    console.log('onCategorySelected ', categoryId);
    this.filteredProducts = this._products.filter(product => product.categoryId === categoryId)
  }

  resetNewItemForm() {
    // TODO: use formGroup?
    this.inputProduct.reset()
    this.inputQuantity.reset()
    this.inputDiscount.reset()
    this.inputCustomerName.reset()
    this.inputNotes.reset()
    this.inputDate.reset()
  }

  // TODO: to much logic - could be contained in a class
  getItemPrice(itemId: number) {
    if (!itemId) return 0
    return this.filteredProducts.find(item => item.id == itemId)?.price ?? 0;
  }

  getTotalCost() {
    return this.invoiceItems.reduce((sum, item) => sum + (item.price * item.qty), 0)
  }

  getTotalDiscount() {
    return this.invoiceItems.reduce((sum, item) => sum + ((item.price * item.qty) * (item.discount / 100)), 0)
  }

  getTotalNet() {
    return this.getTotalCost() - this.getTotalDiscount()
  }

  btnClearAll() {
    this.invoiceItems = []
  }

  btnSave() {
    // TODO: validate
    this.isSaving = true
    const invoiceForm: Invoice = {
      notes: this.inputNotes.value,
      customerName: this.inputCustomerName.value,
      categoryId: this.inputCategoryId.value,
      invoiceDate: this.inputDate.value,
      invoiceDetails: this.invoiceItems
    }
    console.log("final invoice form ", invoiceForm);
    let res$: Observable<Invoice>

    //if editing mode / call update 
    if (this.invoiceId) res$ = this.invoiceService.update(this.invoiceId, invoiceForm)
    else res$ = this.invoiceService.create(invoiceForm)

    res$.subscribe(res => {
      this.isSaving = false
      if (res.id) {
        console.log("created invoice: ", res);
        this.toasr.success("New invoice has been created")
        this.invoiceItems = []
        this.resetNewItemForm()
        if (this.invoiceId) this.location.back()
      }
      else this.toasr.error("Something went wrong");
    })

  }

  // populate invoice table and form from existin invoice object
  parseInvoiceDetails(invoice: Invoice) {
    this.inputCustomerName.setValue(invoice.customerName)
    this.inputCategoryId.setValue(invoice.categoryId)
    this.inputDate.setValue(invoice.invoiceDate)
    this.inputNotes.setValue((invoice.notes))
    this.invoiceItems = invoice.invoiceDetails.map(item => {
      return { ...item, productName: item.product.name }
    })

  }
}
