import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntireCategoryExploreComponent } from './entire-category-explore.component';

describe('EntireCategoryExploreComponent', () => {
  let component: EntireCategoryExploreComponent;
  let fixture: ComponentFixture<EntireCategoryExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntireCategoryExploreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntireCategoryExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
