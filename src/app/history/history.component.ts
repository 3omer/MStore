import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Invoice } from 'app/common/Inovice';
import { InvoiceDetailsDialogComponent } from 'app/dialogs/invoice-details-dialog/invoice-details-dialog.component';
import { InvoiceService } from 'app/services/invoice.service';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(
    private invoiceService: InvoiceService,
    private dialog: MatDialog
    ) { }
  invoices: Invoice[]
  ngOnInit(): void {
    this.invoiceService.getAll()
    .subscribe(data => this.invoices = data)
  }

  showDetails(invoice: Invoice) {
    console.log(invoice);
    this.dialog.open(InvoiceDetailsDialogComponent, { width: "800px", data: invoice})
  }

}
