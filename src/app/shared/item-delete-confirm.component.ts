import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'item-delete-confirm',
  template: `
<h1 mat-dialog-title>Would you like to delete {{ entityName }}?</h1>
<p mat-dialog-content>The {{ entityName }} will be deleted permanently.</p>
<mat-dialog-actions fxLayout="row">
  <button mat-button color="warn" (click)="dialogRef.close(true)">Yes</button>
  <span fxFlex></span>
  <button mat-button mat-dialog-close>No</button>
</mat-dialog-actions>
`
})
export class ItemDeleteConfirmComponent {
  public entityName: string;

  constructor(public dialogRef: MatDialogRef<ItemDeleteConfirmComponent>){
    this.entityName = 'Entity';
  }
}
