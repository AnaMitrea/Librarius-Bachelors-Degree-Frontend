import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BookDto} from "@app-shared/models/transfer/book-dto";

export interface DialogData {
  reviewContent: string;
  bookInformation: BookDto;
  overallRating: number;
}

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit{
  successfulSubmit = false;
  maxStars = 10;

  constructor(
    public dialogRef: MatDialogRef<StarRatingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  ngOnInit(): void {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSubmitClick(): void {
    this.dialogRef.close({...this.data});
  }
}
