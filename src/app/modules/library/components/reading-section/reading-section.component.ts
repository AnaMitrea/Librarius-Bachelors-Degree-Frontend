import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BookService} from "@app-modules/library/services/book/book.service";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {Subject, takeUntil} from "rxjs";
import {TimeTrackerService} from "@app-modules/library/services/time-tracker/time-tracker.service";
import {MatDialog} from "@angular/material/dialog";
import {
  BookmarkDialogComponent
} from "@app-modules/library/components/reading-section/components/bookmark-dialog/bookmark-dialog.component";
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
  fontSizeClass: string = 'font-size-medium';
  readerWidthClass: string = 'reader-width-large';

  selectedText: string = '';
  isTextSelected: boolean = false;
  selectedElement: HTMLElement | null = null;
  isElementSelected: boolean = false;

  isBookmarkPlaced = false;
  bookmarkName: string = '';
  mouseUpListener;
  selectionChangeListener;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private bookService: BookService,
    private timeTrackerService: TimeTrackerService
  ) {
    this.mouseUpListener = () => {
      const selection = window.getSelection();

      if (selection && selection.anchorNode === selection.focusNode) {
        console.log(selection);
        const node = selection.anchorNode;
        if (node && node.nodeType === Node.ELEMENT_NODE) {
          this.selectedElement = node as HTMLElement;
          this.isElementSelected = true;

          console.log(this.selectedElement);
        }

        this.openDialog();
      } else {
        this.isElementSelected = false;
      }
    };

    this.selectionChangeListener = () => {
      const selection = window.getSelection()!.toString();

      if (selection && selection.trim().length > 0) {
        this.selectedText = selection;
        this.isTextSelected = true;
        document.addEventListener('mouseup', this.mouseUpListener);
      } else {
        this.isTextSelected = false;
        document.removeEventListener('mouseup', this.mouseUpListener);
      }
    };
  }

  @HostListener('window:popstate')
  onWindowPopState() {
    this.removeAllEventListeners();
    // alert("on back button");

    // TODO send to backend timespent on reading book with id
    return false;
  }

  @HostListener('document:visibilitychange', ['$event'])
  onVisibilityChange(event: Event) {
    // TODO send to backend timespent on reading book with id

    if (document.hidden) {
      // alert("on tab change");
      return false;
    }
    return true;
  }

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.bookId = params.get('id') ?? '';

        this.bookService.getBookContent(this.bookId)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: ApiResponseModel<BookContentDto>) => {
            this.content = data.result.content;
            this.timeTrackerService.startTimer(this.bookId);
          });
    });

    this.addBookmarkEventListeners();
  }


  onFinishReadingBook() {

  }

  addBookmarkEventListeners() {
    document.addEventListener('selectionchange', this.selectionChangeListener);
  }

  removeAllEventListeners() {
    document.removeEventListener('selectionchange', this.selectionChangeListener);
    document.removeEventListener('mouseup', this.mouseUpListener);
  }

  openDialog(): void {
    this.removeAllEventListeners();

    const dialogRef = this.dialog.open(BookmarkDialogComponent, {
      data: {bookmarkName: this.bookmarkName},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.bookmarkName = result;
      this.addBookmarkEventListeners();
    });
  }

  insertButton() {
    if (this.isBookmarkPlaced) return;
    const selection = window.getSelection()!;
    const range = selection.getRangeAt(0);
    const button =  this.createBookmarkButton();

    const parent = range.commonAncestorContainer;
    const startNode = range.startContainer;
    const startOffset = range.startOffset;

    // create a new range that starts at the beginning of the parent node
    const newRange = document.createRange();
    newRange.setStart(parent, 0);

    // create a new range that ends at the start of the selection
    const beforeRange = document.createRange();
    beforeRange.setStart(startNode, startOffset);
    beforeRange.setEnd(startNode, startOffset);

    // insert the button before the selection
    newRange.setEnd(beforeRange.startContainer, beforeRange.startOffset);
    newRange.insertNode(button);

    // re-select the original selection
    selection.removeAllRanges();
    selection.addRange(range);
    // this.isBookmarkPlaced = true;
  }

  createBookmarkButton(): HTMLButtonElement {
    let button = document.createElement('button');
    button.innerText = 'Remove Bookmark';
    button.style.color = 'red';
    button.addEventListener('click', () => {
      console.log('Button clicked');
    });

    return button;
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.timeTrackerService.stopTimer();
    this.removeAllEventListeners();

    // TODO make call to save time spent on reading book
  }
}
