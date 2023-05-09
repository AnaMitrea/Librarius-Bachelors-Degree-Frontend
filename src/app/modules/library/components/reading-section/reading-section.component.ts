import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
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

  animal!: string;
  name!: string;
  mouseUpListener;

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
  }

  @HostListener('window:popstate')
  onWindowPopState() {
    // alert("on back button");
    return false;
  }

  @HostListener('document:visibilitychange', ['$event'])
  onVisibilityChange(event: Event) {
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
          .subscribe((data: ApiResponseModel) => {
            this.content = data.result.content;
            this.timeTrackerService.startTimer(this.bookId);
          });
    });

    this.addBookmarkEventListeners();
  }

  addBookmarkEventListeners() {
    document.addEventListener('selectionchange', () => {
      const selection = window.getSelection()!.toString();
      if (selection && selection.trim().length > 0) {
        this.selectedText = selection;
        this.isTextSelected = true;
        document.addEventListener('mouseup', this.mouseUpListener);
      } else {
        this.isTextSelected = false;
      }
    });
  }

  insertButton() {
    const selection = window.getSelection()!;
    const range = selection.getRangeAt(0);
    const button = document.createElement('button');
    button.innerText = 'Click me';

    button.addEventListener('click', () => {
      console.log('Button clicked');
    });

    range.deleteContents();
    range.insertNode(button);
    selection.removeAllRanges();
  }

  openDialog(): void {
    document.removeEventListener('mouseup', this.mouseUpListener);

    const dialogRef = this.dialog.open(BookmarkDialogComponent, {
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
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
    document.removeEventListener('mouseup', this.mouseUpListener);
    this.destroy$.next();
    this.destroy$.complete();
    this.timeTrackerService.stopTimer();

    // TODO make call to save time spent on reading book
  }
}
