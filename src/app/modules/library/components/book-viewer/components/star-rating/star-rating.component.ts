import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BookDto} from "@app-shared/models/transfer/book-dto";

export interface DialogData {
  reviewContent: string;
  bookInformation: BookDto
}

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit{
  ratingValue = 4;
  maxStars = 5;

  constructor(
    public dialogRef: MatDialogRef<StarRatingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
