import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { MatButtonModule } from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from "@angular/material/menu";
import { MatDialogModule } from "@angular/material/dialog";
import { CategoryFormDialog } from './dialogs/category-form-dialog/category-form-dialog.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ProductFormDialogComponent } from './dialogs/product-form-dialog/product-form-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { HistoryComponent } from './history/history.component';
import { InvoiceDetailsDialogComponent } from './dialogs/invoice-details-dialog/invoice-details-dialog.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ToastrModule } from 'ngx-toastr';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'environments/environment';
import { categoryReducer } from './state/category.reducer';
import { CategoryEffects } from './state/category.effects';
import { productReducer } from './state/product.reducer';
import { ProductEffects } from './state/product.effects';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    // store
    StoreModule.forRoot([]),
    StoreModule.forFeature("categories", categoryReducer),
    StoreModule.forFeature("products", productReducer),
    // effects
    EffectsModule.forRoot([CategoryEffects, ProductEffects]),
    StoreDevtoolsModule.instrument( { name: 'MStore App DevTools', maxAge: 25, logOnly: environment.production})
  ],
  declarations: [
    AppComponent,
    CategoriesListComponent,
    ProductsListComponent,
    InvoicesComponent,
    CategoryFormDialog,
    ProductFormDialogComponent,
    HistoryComponent,
    InvoiceDetailsDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
