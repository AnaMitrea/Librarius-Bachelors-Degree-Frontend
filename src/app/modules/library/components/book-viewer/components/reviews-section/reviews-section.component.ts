import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatRadioChange} from "@angular/material/radio";
import {BookService} from "@app-modules/library/services/book/book.service";
import {Subject, take} from "rxjs";
import {
  BookDto,
  LikeReviewRequestDto,
  ReviewRequestDto,
  ReviewResponseDto,
  SendReviewRequestDto
} from "@app-shared/models/transfer/book-dto";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {MatDialog} from "@angular/material/dialog";
import {Utils as U} from "@app-utils/lodash/utils";
import {
  StarRatingComponent
} from "@app-modules/library/components/book-viewer/components/star-rating/star-rating.component";
import {ToastrService} from "ngx-toastr";
import {POSITION_CLASS} from "@app-utils/constants";

@Component({
  selector: 'app-reviews-section',
  templateUrl: './reviews-section.component.html',
  styleUrls: ['./reviews-section.component.scss']
})
export class ReviewsSectionComponent implements OnInit, OnDestroy {
  @Input() bookInformation!: BookDto;
  @Output() ratingValueEvent = new EventEmitter<number>();

  private destroy$ = new Subject<void>();

  charactersLeft: number = 2000;
  isButtonDisabled: boolean = true;
  hasMyReview: boolean = false;
  commentControl: FormControl = new FormControl('');

  reviews: ReviewResponseDto[] = [];
  overallRating: number = 0;

  orderByRecent = 'Most Recent';

  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
    private toasterService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initAllReviewsSubscription();
  }

  initAllReviewsSubscription() {
    const body: ReviewRequestDto = {
      BookId: this.bookInformation.id,
      MaxResults: 30,
      SortBy: this.orderByRecent.replace(/\s/g, ""),
      StartIndex: 0
    }

    this.bookService.getBookReviews(body)
      .pipe(take(1))
      .subscribe((data: ApiResponseModel<any>) => {
        this.reviews = U.path(['reviews'], data.result);
        this.overallRating = U.path(['overallRating'], data.result);
        this.sendDataToParent(this.overallRating);

        this.hasMyReview = this.reviews.some(review => review.isMyReview);
        this.isButtonDisabled = this.hasMyReview;
      });
  }

  sendDataToParent(data: number) {
    this.ratingValueEvent.emit(data);
  }

  onInputChange() {
    if (this.hasMyReview) return;
    const inputLength = this.commentControl.value.length;

    this.isButtonDisabled = inputLength < 50;
    this.charactersLeft = 2000 - inputLength;
  }

  onReviewLikeClick(id: number) {
    const likedReviewIdx = this.reviews.findIndex(item => item.id === id);

    const body: LikeReviewRequestDto = {
      ReviewID: id,
      isLiked: !this.reviews[likedReviewIdx].liked
    };

    this.bookService.updateReviewLike(body)
      .pipe(take(1))
      .subscribe((data: ApiResponseModel<any>) => {
        if (data && likedReviewIdx !== -1) {
          this.reviews[likedReviewIdx].liked = !this.reviews[likedReviewIdx].liked;
        }
      });
  }

  getFirstLetter(text: string): string {
    return text.substring(0, 1);
  }

  submitComment() {
    const dialogRef = this.dialog.open(StarRatingComponent, {
      width: '50%',
      data: {
        reviewContent: this.commentControl.value,
        bookInformation: this.bookInformation,
        overallRating: 0
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.disableStatesAfterSubmit();

        const body: SendReviewRequestDto = {
          reviewContent: result.reviewContent,
          bookId: result.bookInformation.id,
          rating: result.overallRating
        };

        this.bookService.setReview(body)
          .pipe(take(1))
          .subscribe((data: ApiResponseModel<any>) => {
            this.initAllReviewsSubscription();
            if (data.result) {
              this.toasterService.success("Check your profile for won challenges!", "Congratulations", POSITION_CLASS);
            }
          });
      }
    });
  }

  disableStatesAfterSubmit() {
    this.isButtonDisabled = true;
    this.commentControl.reset();
    this.commentControl.disable();
  }

  radioChange(event: MatRadioChange) {
    const body: ReviewRequestDto = {
      BookId: this.bookInformation.id,
      MaxResults: 30,
      SortBy: event.value.replace(/\s/g, ""),
      StartIndex: 0
    }

    this.bookService.getBookReviews(body)
      .pipe(take(1))
      .subscribe((data: ApiResponseModel<any>) => {
        this.reviews = U.path(['reviews'], data.result);
        this.overallRating = U.path(['overallRating'], data.result);
      });
  }

  onReviewDelete(reviewId: number) {
    this.bookService.removeReview(reviewId)
      .pipe(take(1))
      .subscribe((data: ApiResponseModel<boolean>) => {
        this.initAllReviewsSubscription();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
