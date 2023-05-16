import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatRadioChange} from "@angular/material/radio";
import {BookService} from "@app-modules/library/services/book/book.service";
import {Subject, take, takeUntil} from "rxjs";
import {ReviewRequestModel, ReviewResponseModel} from "@app-shared/models/transfer/book-dto";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";

@Component({
  selector: 'app-reviews-section',
  templateUrl: './reviews-section.component.html',
  styleUrls: ['./reviews-section.component.scss']
})
export class ReviewsSectionComponent implements OnInit, OnDestroy {
  @Input() bookId!: string;

  private destroy$ = new Subject<void>();
  charactersLeft: number = 2000;
  isButtonDisabled: boolean = true;
  commentControl: FormControl = new FormControl('');

  reviews!: ReviewResponseModel[];

  orderByRecent = 'Most Recent';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.initSubscription();
  }

  initSubscription() {
    const body: ReviewRequestModel = {
      BookId: this.bookId,
      MaxResults: 30,
      SortBy: this.orderByRecent,
      StartIndex: 0
    }

    this.bookService.getBookReviews(body)
      .pipe(take(1))
      .subscribe((data: ApiResponseModel) => {
        this.reviews = data.result;
      });
  }

  onInputChange() {
    const inputLength = this.commentControl.value.length;
    this.isButtonDisabled = inputLength < 50;
    this.charactersLeft = 2000 - inputLength;
  }

  getFirstLetter(text: string): string {
    return text.substring(0, 1);
  }

  onReviewLikeClick(id: number) {
    // TODO POST reguest with reviewId and isLiked=true/false

    console.log(`liked review with id ${id}`);
  }

  submitComment() {
    // Implement your logic to submit the comment
  }

  radioChange(event: MatRadioChange) {
    const body: ReviewRequestModel = {
      BookId: this.bookId,
      MaxResults: 30,
      SortBy: event.value.replace(/\s/g, ""),
      StartIndex: 0
    }

    this.bookService.getBookReviews(body)
      .pipe(take(1))
      .subscribe((data: ApiResponseModel) => {
        this.reviews = data.result;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
