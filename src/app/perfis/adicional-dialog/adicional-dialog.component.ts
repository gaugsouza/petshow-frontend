import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-adicional-dialog',
  templateUrl: './adicional-dialog.component.html',
  styleUrls: ['./adicional-dialog.component.scss']
})
export class AdicionalDialogComponent implements OnInit {
  nomeFormControl = new FormControl('', [
    Validators.required,
  ]);

  precoFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(public dialogRef: MatDialogRef<AdicionalDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  hasErrors() {
    return this.nomeFormControl.hasError('required') || this.precoFormControl.hasError('required');
  }  
}
