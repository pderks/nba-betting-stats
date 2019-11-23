import { Component, OnInit, Input } from '@angular/core';
import { GamblingSite } from 'src/app/models/matchup-lines.model';

@Component({
  selector: 'book-lines',
  templateUrl: './book-lines.component.html',
  styleUrls: ['./book-lines.component.scss']
})
export class BookLinesComponent implements OnInit {
  @Input() sportsBook: GamblingSite;
  @Input() projectedHomeScore: number;
  @Input() projectedAwayScore: number;

  constructor() { }

  ngOnInit() {
  }
}
