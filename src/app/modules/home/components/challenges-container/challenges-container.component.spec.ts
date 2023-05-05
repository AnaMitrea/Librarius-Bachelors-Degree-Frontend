import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesContainerComponent } from './challenges-container.component';

describe('ChallengesContainerComponent', () => {
  let component: ChallengesContainerComponent;
  let fixture: ComponentFixture<ChallengesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengesContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
