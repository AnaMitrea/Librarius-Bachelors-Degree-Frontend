import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingOptionsTabComponent } from './reading-options-tab.component';

describe('ReadingOptionsTabComponent', () => {
  let component: ReadingOptionsTabComponent;
  let fixture: ComponentFixture<ReadingOptionsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingOptionsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingOptionsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
