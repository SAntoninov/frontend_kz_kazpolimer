import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface DialogData {
  animal: string;
  name1: string;
}

@Component({
  selector: 'app-application-areas-dialog',
  templateUrl: './application-areas-dialog.component.html',
  styleUrls: ['./application-areas-dialog.component.css']
})
export class ApplicationAreasDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ApplicationAreasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
