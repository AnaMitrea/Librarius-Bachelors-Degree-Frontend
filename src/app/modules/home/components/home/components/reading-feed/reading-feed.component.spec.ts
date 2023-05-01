import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingFeedComponent } from './reading-feed.component';

describe('ReadingFeedComponent', () => {
  let component: ReadingFeedComponent;
  let fixture: ComponentFixture<ReadingFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
