import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsGlobalLeaderboardComponent } from './points-global-leaderboard.component';

describe('PointsGlobalLeaderboardComponent', () => {
  let component: PointsGlobalLeaderboardComponent;
  let fixture: ComponentFixture<PointsGlobalLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointsGlobalLeaderboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointsGlobalLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
