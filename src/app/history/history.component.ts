import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice } from 'app/common/Inovice';
import { InvoiceDetailsDialogComponent } from 'app/dialogs/invoice-details-dialog/invoice-details-dialog.component';
import { InvoiceService } from 'app/services/invoice.service';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, AfterViewInit {

    // configuring the mat table
    invoicesTableSource = new MatTableDataSource<Invoice>()
    columnsToDisplay = [ "id", "customerName", "category", "invoiceDate", "netAmount"]
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ViewChild(MatSort) sort: MatSort;

  constructor(
    private invoiceService: InvoiceService,
    private dialog: MatDialog
    ) { }
  
  ngOnInit(): void {

    this.invoiceService.getAll()
    .subscribe(data => {
      this.invoicesTableSource.data = data
    })
  }

  ngAfterViewInit() {
    this.invoicesTableSource.paginator = this.paginator
    this.invoicesTableSource.sort = this.sort
  }

  showDetails(invoice: Invoice) {
    console.log(invoice);
    this.dialog.open(InvoiceDetailsDialogComponent, { width: "800px", data: invoice})
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.invoicesTableSource.filter = filterValue.trim().toLowerCase();
  }

}
