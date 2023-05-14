import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-reading-feed',
  templateUrl: './reading-feed.component.html',
  styleUrls: ['./reading-feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadingFeedComponent implements OnInit{
  users = [
    {
      username: 'Ana',
      book: {
        title: 'Book',
        url: ''
      }
    },
    {
      username: 'Maria',
      book: {
        title: 'Book',
        url: ''
      }
    },
    {
      username: 'Andrei',
      book: {
        title: 'Book',
        url: ''
      }
    },
    {
      username: 'Mihnea',
      book: {
        title: 'Book',
        url: ''
      }
    },
    {
      username: 'Ana',
      book: {
        title: 'Book',
        url: ''
      }
    },
    {
      username: 'Maria',
      book: {
        title: 'Book',
        url: ''
      }
    },
    {
      username: 'Andrei',
      book: {
        title: 'Book',
        url: ''
      }
    },
    {
      username: 'Mihnea',
      book: {
        title: 'Book',
        url: ''
      }
    },
    {
      username: 'Ana',
      book: {
        title: 'Book',
        url: ''
      }
    },
    {
      username: 'Maria',
      book: {
        title: 'Book',
        url: ''
      }
    },
    {
      username: 'Andrei',
      book: {
        title: 'Book',
        url: ''
      }
    },
    {
      username: 'Mihnea',
      book: {
        title: 'Book',
        url: ''
      }
    }
  ]

  constructor(private router: Router) {}

  ngOnInit(): void {

  }

  getBackgroundColor(): string {
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    return `bg_color_${randomNumber}`;
  }

  getFirstLetter(text: string): string {
    return text.substring(0, 1);
  }

  onBookTitleClick(url: string) {
    this.router.navigateByUrl(url);
  }
}
