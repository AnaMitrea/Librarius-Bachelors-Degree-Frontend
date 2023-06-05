import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCategoryExploreComponent } from './preview-category-explore.component';

describe('PreviewCategoryExploreComponent', () => {
  let component: PreviewCategoryExploreComponent;
  let fixture: ComponentFixture<PreviewCategoryExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewCategoryExploreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewCategoryExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
