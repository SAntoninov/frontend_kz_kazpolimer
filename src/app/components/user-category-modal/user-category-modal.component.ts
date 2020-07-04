import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


export interface DialogData {
  shortName: string;
  fullName: string;
}

@Component({
  selector: 'app-user-category-modal',
  templateUrl: './user-category-modal.component.html',
  styleUrls: ['./user-category-modal.component.css']
})
export class UserCategoryModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserCategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
