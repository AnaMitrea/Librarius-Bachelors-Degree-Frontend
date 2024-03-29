import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BookService} from "@app-modules/library/services/book/book.service";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {Subject, takeUntil} from "rxjs";
import {BookContentDto} from "@app-shared/models/transfer/book-dto";

@Component({
  selector: 'app-reading-section',
  templateUrl: './reading-section.component.html',
  styleUrls: ['./reading-section.component.scss']
})
export class ReadingSectionComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  content: string = '';
  bookId!: string;

  colorModeClass: string = 'color-mode-white';
  fontFamilyClass: string = 'font-family-serif';
  readerWidthClass: string = 'reader-width-large';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.initSubscription();
  }

  initSubscription() {
    this.route.paramMap.pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.bookId = params.get('id') ?? '';

        this.bookService.getBookContent(this.bookId)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: ApiResponseModel<BookContentDto>) => {
            this.content = data.result.content;
          });
      });
  }

  changeColorMode(colorMode: string) {
    this.colorModeClass = colorMode;
  }

  changeFontFamily(fontFamily: string) {
    this.fontFamilyClass = fontFamily;
  }

  changeReaderWidth(readerWidth: string) {
    this.readerWidthClass = readerWidth;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
