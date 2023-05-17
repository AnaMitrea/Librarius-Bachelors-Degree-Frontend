import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatRadioChange} from "@angular/material/radio";
import {BookService} from "@app-modules/library/services/book/book.service";
import {Subject, take} from "rxjs";
import {
  BookDto,
  LikeReviewRequestModel,
  ReviewRequestModel,
  ReviewResponseModel
} from "@app-shared/models/transfer/book-dto";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {MatDialog} from "@angular/material/dialog";
import {Utils as U} from "@app-utils/lodash/utils";
import {
  StarRatingComponent
} from "@app-modules/library/components/book-viewer/components/star-rating/star-rating.component";

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
  commentControl: FormControl = new FormControl('');

  reviews: ReviewResponseModel[] = [];
  overallRating: number = 0;

  orderByRecent = 'Most Recent';

  constructor(
    private bookService: BookService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initSubscription();
  }

  initSubscription() {
    const body: ReviewRequestModel = {
      BookId: this.bookInformation.id,
      MaxResults: 30,
      SortBy: this.orderByRecent.replace(/\s/g, ""),
      StartIndex: 0
    }

    this.bookService.getBookReviews(body)
      .pipe(take(1))
      .subscribe((data: ApiResponseModel) => {
        this.reviews = U.path(['reviews'], data.result);
        this.overallRating = U.path(['overallRating'], data.result);
        this.sendDataToParent(this.overallRating);
      });
  }

  sendDataToParent(data: number) {
    this.ratingValueEvent.emit(data);
  }

  onInputChange() {
    const inputLength = this.commentControl.value.length;

    this.isButtonDisabled = inputLength < 50;
    this.charactersLeft = 2000 - inputLength;
  }

  onReviewLikeClick(id: number) {
    const likedReviewIdx = this.reviews.findIndex(item => item.id === id);

    const body: LikeReviewRequestModel = {
      ReviewID: id,
      isLiked: this.reviews[likedReviewIdx].liked
    };

    this.bookService.updateReviewLike(body)
      .pipe(take(1))
      .subscribe((data: ApiResponseModel) => {
        console.log(data);
        this.setLikedFlag(id, data.result);
      });
  }

  setLikedFlag(likedReviewIdx: number, result: boolean) {
    if (likedReviewIdx !== -1) {
      this.reviews[likedReviewIdx].liked = result;
    }
  }

  getFirstLetter(text: string): string {
    return text.substring(0, 1);
  }

  submitComment() {
    const dialogRef = this.dialog.open(StarRatingComponent, {
      data: {
        reviewContent: this.commentControl.value,
        bookInformation: this.bookInformation,
        overallRating: this.overallRating
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  radioChange(event: MatRadioChange) {
    const body: ReviewRequestModel = {
      BookId: this.bookInformation.id,
      MaxResults: 30,
      SortBy: event.value.replace(/\s/g, ""),
      StartIndex: 0
    }

    this.bookService.getBookReviews(body)
      .pipe(take(1))
      .subscribe((data: ApiResponseModel) => {
        this.reviews = U.path(['reviews'], data.result);
        this.overallRating = U.path(['overallRating'], data.result);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
