import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthorService} from "@app-modules/library/services/author/author.service";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit, OnDestroy{

  constructor(private authorService: AuthorService) {}

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

}
