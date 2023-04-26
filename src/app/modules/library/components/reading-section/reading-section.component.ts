import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BookService} from "@app-modules/library/services/book/book.service";

@Component({
  selector: 'app-reading-section',
  templateUrl: './reading-section.component.html',
  styleUrls: ['./reading-section.component.scss']
})
export class ReadingSectionComponent implements OnInit {
  content: string = '';

  colorModeClass: string = 'color-mode-white';
  fontFamilyClass: string = 'font-family-serif';
  fontSizeClass: string = 'font-size-medium';
  readerWidthClass: string = 'reader-width-large';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') ?? '';
      this.bookService.getBookContent(id).subscribe(data => {
        this.content = data.result.content;
      })
    })
  }

  changeColorMode(colorMode: string) {
    this.colorModeClass = colorMode;
  }

  changeFontFamily(fontFamily: string) {
    this.fontFamilyClass = fontFamily;
  }

  changeFontSize(fontSize: string) {
    this.fontSizeClass = fontSize;
  }

  changeReaderWidth(readerWidth: string) {
    this.readerWidthClass = readerWidth;
  }
}
