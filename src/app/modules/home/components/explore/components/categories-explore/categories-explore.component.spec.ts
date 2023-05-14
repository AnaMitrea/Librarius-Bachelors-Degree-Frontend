import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesExploreComponent } from './categories-explore.component';

describe('CategoriesExploreComponent', () => {
  let component: CategoriesExploreComponent;
  let fixture: ComponentFixture<CategoriesExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesExploreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
