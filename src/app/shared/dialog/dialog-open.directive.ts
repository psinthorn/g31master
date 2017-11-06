import {
  Directive, HostListener, EventEmitter,
  Input, Output,
} from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Directive({
  selector: '[csDialogOpen]',
})
export class DialogOpenDirective {
  @Input('csDialogOpen') private _template: any;
  @Input('config') private _config: any;

  @Output('dialogHandler') private dialogHandler: EventEmitter<MatDialogRef<any>>;

  constructor(private dialog: MatDialog) {
    this._template = null;
    this._config = null;
    this.dialogHandler = new EventEmitter<MatDialogRef<any>>();
  }

  get template() { return this._template; }
  get config() { return this._config; }

  @HostListener('click')
  onClick() {
    const config = Object.assign({
      panelClass: 'fixed-dialog-overlay',
      height: 'calc(100vh - 8px)',
      width: 'calc(100% - 8px)',
    }, this.config);
    this.dialogHandler.emit(this.dialog.open(this.template, config));
  }
}
