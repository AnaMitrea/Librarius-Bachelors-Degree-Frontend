import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-viewer',
  templateUrl: './book-viewer.component.html',
  styleUrls: ['./book-viewer.component.scss']
})
export class BookViewerComponent implements OnInit{
  public ratingValue = 4;
  public maxStars = 5;

  constructor() {
  }

  ngOnInit(): void {
  }

}
