import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  bookmarkName: string
}

@Component({
  selector: 'app-bookmark-dialog',
  templateUrl: './bookmark-dialog.component.html',
  styleUrls: ['./bookmark-dialog.component.scss']
})
export class BookmarkDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BookmarkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    // console.log(this.data.bookmarkName);
  }

  onInputClick(event: any): void {
    event.preventDefault();
  }
}
