import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesExploreContainerComponent } from './categories-explore-container.component';

describe('CategoriesExploreComponent', () => {
  let component: CategoriesExploreContainerComponent;
  let fixture: ComponentFixture<CategoriesExploreContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesExploreContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesExploreContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
