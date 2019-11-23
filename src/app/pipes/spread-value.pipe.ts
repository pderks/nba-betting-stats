import { Pipe, PipeTransform } from '@angular/core';
import { GamblingSite } from '../models/matchup-lines.model';

@Pipe({
  name: 'spreadValue'
})
export class SpreadValuePipe implements PipeTransform {

  transform(spread: number, projAwayScore: number, projHomeScore: number, team: 'away' | 'home') {
    const projSpread = (team === 'away') ? projHomeScore - projAwayScore : projAwayScore - projHomeScore;
    return (spread - projSpread) >= 4;
  }
}
