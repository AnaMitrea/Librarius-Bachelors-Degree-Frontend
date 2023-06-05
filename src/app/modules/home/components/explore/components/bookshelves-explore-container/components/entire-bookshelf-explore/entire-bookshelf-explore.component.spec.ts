import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntireBookshelfExploreComponent } from './entire-bookshelf-explore.component';

describe('EntireBookshelfExploreComponent', () => {
  let component: EntireBookshelfExploreComponent;
  let fixture: ComponentFixture<EntireBookshelfExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntireBookshelfExploreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntireBookshelfExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
