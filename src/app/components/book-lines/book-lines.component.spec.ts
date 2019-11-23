import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLinesComponent } from './book-lines.component';

describe('BookLinesComponent', () => {
  let component: BookLinesComponent;
  let fixture: ComponentFixture<BookLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookLinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
