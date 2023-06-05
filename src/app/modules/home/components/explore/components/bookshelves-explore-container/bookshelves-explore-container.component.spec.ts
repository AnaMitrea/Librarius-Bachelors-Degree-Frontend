import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookshelvesExploreContainerComponent } from './bookshelves-explore-container.component';

describe('BookshelvesExploreComponent', () => {
  let component: BookshelvesExploreContainerComponent;
  let fixture: ComponentFixture<BookshelvesExploreContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookshelvesExploreContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookshelvesExploreContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
