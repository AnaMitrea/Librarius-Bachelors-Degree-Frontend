import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsLeaderboardComponent } from './friends-leaderboard.component';

describe('FriendsLeaderboardComponent', () => {
  let component: FriendsLeaderboardComponent;
  let fixture: ComponentFixture<FriendsLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsLeaderboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
