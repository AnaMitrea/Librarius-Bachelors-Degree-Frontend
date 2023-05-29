import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksGlobalLeaderboardComponent } from './books-global-leaderboard.component';

describe('BooksGlobalLeaderboardComponent', () => {
  let component: BooksGlobalLeaderboardComponent;
  let fixture: ComponentFixture<BooksGlobalLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksGlobalLeaderboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksGlobalLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
