import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewBookshelfExploreComponent } from './preview-bookshelf-explore.component';

describe('PreviewBookshelfExploreComponent', () => {
  let component: PreviewBookshelfExploreComponent;
  let fixture: ComponentFixture<PreviewBookshelfExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewBookshelfExploreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewBookshelfExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
