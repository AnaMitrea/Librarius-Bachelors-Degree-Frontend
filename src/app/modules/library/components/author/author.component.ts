import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthorService} from "@app-modules/library/services/author/author.service";
import {AuthorDto, Material} from "@app-shared/models/transfer/book-dto";
import {catchError, of, Subject, take, takeUntil} from "rxjs";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {ActivatedRoute, Router} from "@angular/router";
import {processAuthorName} from "@app-utils/data-transformers";
import {API_GUTENBERG_URL} from "@app-core/constants";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isUserSubscribed!: boolean;

  authorId!: number;
  authorData!: AuthorDto;
  materials!: Material[];
  categories!: string[];

  sortingOptions = 1;

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initSubscriptions();
  }

  initSubscriptions() {
    this.route.paramMap.subscribe(params => {
      this.authorId = Number(params.get('id'));

      this.authorService.getAuthorInformation(this.authorId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data : ApiResponseModel<AuthorDto>) => {
          this.authorData = data.result;
          this.authorData.name = processAuthorName(data.result.name);
        });

      this.authorService.getAuthorBooks(this.authorId, this.sortingOptions)
        .pipe(take(1))
        .subscribe((data : ApiResponseModel<Material[]>) => {
          this.materials = data.result;
          this.categories = data.result.map((item: Material) => item.title);
        });

      this.authorService.getUserSubscriptionStatus(this.authorId)
        .pipe(take(1))
        .subscribe((data : ApiResponseModel<boolean>) => {
          this.isUserSubscribed = data.result;
        });
    });
  }

  getCoverImageUrl(short_url: string) {
    return `${API_GUTENBERG_URL}${short_url}`;
  }

  redirectToBookUrl(id: string) {
    this.router.navigate(['/library/book', id]).then();
  }

  onClickOrderBy(option: number) {
    if (option === this.sortingOptions) return;

    this.sortingOptions = option;
    this.authorService.getAuthorBooks(this.authorId, this.sortingOptions)
      .pipe(take(1))
      .subscribe((data : ApiResponseModel<any>) => {
        this.materials = data.result;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPenGifSrc(materialIdx: number): string {
    switch ((materialIdx % 4)) {
      case 0:
        return 'assets/author/pink-background-pen.gif';
      case 1:
        return 'assets/author/yellow-background-pen.gif';
      case 2:
        return 'assets/author/green-background-pen.gif';
      default:
        return 'assets/author/orange-background-pen.gif';
    }
  }

  onClickSubscribe() {
    this.authorService.setUserSubscriptionToAuthor(this.authorId)
      .pipe(take(1))
      .subscribe((data : ApiResponseModel<any>) => {
        this.isUserSubscribed = data.result;
      });
  }
}
