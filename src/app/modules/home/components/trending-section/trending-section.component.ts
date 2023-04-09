import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { Book } from '../../models';
import { NOW, WEEK } from '@app-utils';
import { API_URL } from '../../../../core';
import { mapBookDtoToBook } from '../../services/transformers';

@Component({
  selector: 'app-trending-section',
  templateUrl: './trending-section.component.html',
  styleUrls: ['./trending-section.component.scss']
})
export class TrendingSectionComponent implements OnInit{
  private destroy$ = new Subject<void>();
  public trendingNowData!: Book[];
  public trendingWeekData!: Book[];

  constructor(private http: HttpClient) {
    this.trendingNowData = [];
    this.trendingWeekData = [];
  }

  ngOnInit(): void {
    this.fetchTrendingBooks(NOW)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.mapDataToCarousel(response.result);
    });

    this.fetchTrendingBooks(WEEK)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.mapDataToCarousel(response.result, true);
    });
  }

  initData() {
    this.trendingNowData = [
      {
        id: '1',
        position: 'assets/home/top/top-material-1.png',
        src:'https://media.bookster.ro/material/89eb469af3/f8a5e79c759142f8be1b9230f6a5cfb7_130x195.png',
        alt:'Book 1',
        title:'Book 1',
        author: 'Author'
      },
      {
        id: '2',
        position: 'assets/home/top/top-material-2.png',
        src:'https://media.bookster.ro/material/a961eab115/d3269d3297cf465da4a0c6cc01207bde_130x195.png',
        alt:'Book 2',
        title:'Book 2',
        author: 'Author'
      },
      {
        id: '3',
        position: 'assets/home/top/top-material-3.png',
        src:'https://media.bookster.ro/material/d627b3e382/4084d593b03d4f7ea7f34c1ae5cc3b7b_130x195.png',
        alt:'Book 3',
        title:'Book 3',
        author: 'Author'
      },
      {
        id: '4',
        position: 'assets/home/top/top-material-4.png',
        src:'https://media.bookster.ro/material/89eb469af3/ef9b27fe77fb4deaa5815c0dfea36ad7_130x195.png',
        alt:'Book 4',
        title:'Book 4',
        author: 'Author'
      },
      {
        id: '5',
        position: 'assets/home/top/top-material-5.png',
        src:'https://media.bookster.ro/material/4cc1bf4fb1/0bcca6c4c27c4427b0ed1e691ef49030_130x195.png',
        alt:'Book 5',
        title:'Book 5',
        author: 'Author'
      }
    ];

    this.trendingWeekData = [
      {
        id: '1',
        position: 'assets/home/top/top-material-1.png',
        src:'https://media.bookster.ro/material/89eb469af3/f8a5e79c759142f8be1b9230f6a5cfb7_130x195.png',
        alt:'Book 1',
        title:'Book 1',
        author: 'Author'
      },
      {
        id: '2',
        position: 'assets/home/top/top-material-2.png',
        src:'https://media.bookster.ro/material/a961eab115/d3269d3297cf465da4a0c6cc01207bde_130x195.png',
        alt:'Book 2',
        title:'Book 2',
        author: 'Author'
      },
      {
        id: '3',
        position: 'assets/home/top/top-material-3.png',
        src:'https://media.bookster.ro/material/d627b3e382/4084d593b03d4f7ea7f34c1ae5cc3b7b_130x195.png',
        alt:'Book 3',
        title:'Book 3',
        author: 'Author'
      },
      {
        id: '4',
        position: 'assets/home/top/top-material-4.png',
        src:'https://media.bookster.ro/material/89eb469af3/ef9b27fe77fb4deaa5815c0dfea36ad7_130x195.png',
        alt:'Book 4',
        title:'Book 4',
        author: 'Author'
      },
      {
        id: '5',
        position: 'assets/home/top/top-material-5.png',
        src:'https://media.bookster.ro/material/4cc1bf4fb1/0bcca6c4c27c4427b0ed1e691ef49030_130x195.png',
        alt:'Book 5',
        title:'Book 5',
        author: 'Author'
      },
      {
        id: '6',
        position: 'assets/home/top/top-material-6.png',
        src:'https://media.bookster.ro/material/4cc1bf4fb1/0bcca6c4c27c4427b0ed1e691ef49030_130x195.png',
        alt:'Book 6',
        title:'Book 6',
        author: 'Author'
      },
      {
        id: '7',
        position: 'assets/home/top/top-material-7.png',
        src:'https://media.bookster.ro/material/4cc1bf4fb1/0bcca6c4c27c4427b0ed1e691ef49030_130x195.png',
        alt:'Book 7',
        title:'Book 7',
        author: 'Author'
      },
      {
        id: '8',
        position: 'assets/home/top/top-material-8.png',
        src:'https://media.bookster.ro/material/4cc1bf4fb1/0bcca6c4c27c4427b0ed1e691ef49030_130x195.png',
        alt:'Book 8',
        title:'Book 8',
        author: 'Author'
      },
      {
        id: '9',
        position: 'assets/home/top/top-material-9.png',
        src:'https://media.bookster.ro/material/4cc1bf4fb1/0bcca6c4c27c4427b0ed1e691ef49030_130x195.png',
        alt:'Book 9',
        title:'Book 9',
        author: 'Author'
      },
      {
        id: '10',
        position: 'assets/home/top/top-material-10.png',
        src:'https://media.bookster.ro/material/4cc1bf4fb1/0bcca6c4c27c4427b0ed1e691ef49030_130x195.png',
        alt:'Book 10',
        title:'Book 10',
        author: 'Author'
      }
    ];
  }

  fetchTrendingBooks(duration: string) {
    return this.http.get(`${API_URL}api/library/book/trending?duration=${duration}`);
  }

  mapDataToCarousel(data: any, isWeeklyTrending = false) {
    const carouselData = data.map(mapBookDtoToBook);

    if (isWeeklyTrending) {
      this.trendingWeekData = carouselData;
    } else {
      this.trendingNowData = carouselData;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
