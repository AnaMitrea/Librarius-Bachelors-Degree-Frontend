import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserAuthorsService} from "@app-modules/user/services/authors/user-authors.service";
import {take} from "rxjs";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {AuthorDto} from "@app-shared/models/transfer/book-dto";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit, OnDestroy{

  authors!: AuthorDto[];

  constructor(private userAuthorService: UserAuthorsService) {
  }

  ngOnInit(): void {
    this.initSubscription();
  }

  initSubscription() {
    this.userAuthorService.getUserAuthors()
      .pipe(take(1))
      .subscribe((data: ApiResponseModel<any>) => {
        if (data) {
          this.authors = data.result;
        }
      })
  }

  removeAuthorSubscription(id: number) {
    this.userAuthorService.removeAuthorSubscription(id)
      .pipe(take(1))
      .subscribe(() => {
        this.userAuthorService.getUserAuthors()
          .pipe(take(1))
          .subscribe((data: ApiResponseModel<any>) => {
            if (data) {
              this.authors = data.result;
            }
          })
      });
  }

  isEmpty() {
    return this.authors ? this.authors.length === 0 : true;
  }

  getAuthorsNumber() {
    return this.authors ? this.authors.length : 0;
  }


  ngOnDestroy(): void {
  }
}
