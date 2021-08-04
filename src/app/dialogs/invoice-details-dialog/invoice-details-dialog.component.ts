import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice } from 'app/common/Inovice';

@Component({
  selector: 'invoice-details-dialog',
  templateUrl: './invoice-details-dialog.component.html',
  styleUrls: ['./invoice-details-dialog.component.css']
})
export class InvoiceDetailsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: Invoice) { }

  ngOnInit(): void {
  }

}
