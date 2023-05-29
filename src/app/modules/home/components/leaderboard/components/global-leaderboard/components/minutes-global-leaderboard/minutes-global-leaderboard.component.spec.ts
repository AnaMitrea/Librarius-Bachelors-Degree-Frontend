import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutesGlobalLeaderboardComponent } from './minutes-global-leaderboard.component';

describe('MinutesGlobalLeaderboardComponent', () => {
  let component: MinutesGlobalLeaderboardComponent;
  let fixture: ComponentFixture<MinutesGlobalLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinutesGlobalLeaderboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinutesGlobalLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
