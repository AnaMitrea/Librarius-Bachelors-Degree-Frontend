import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookshelvesExploreComponent } from './bookshelves-explore.component';

describe('BookshelvesExploreComponent', () => {
  let component: BookshelvesExploreComponent;
  let fixture: ComponentFixture<BookshelvesExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookshelvesExploreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookshelvesExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
