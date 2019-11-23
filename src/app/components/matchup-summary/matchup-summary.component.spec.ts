import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchupSummaryComponent } from './matchup-summary.component';

describe('MatchupSummaryComponent', () => {
  let component: MatchupSummaryComponent;
  let fixture: ComponentFixture<MatchupSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchupSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchupSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
