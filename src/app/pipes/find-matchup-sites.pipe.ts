import { Pipe, PipeTransform } from '@angular/core';
import { MatchupLines } from '../models/matchup-lines.model';
import { Game } from '../models/game-log.model';

@Pipe({
  name: 'findMatchupSites'
})
export class FindMatchupSitesPipe implements PipeTransform {

  transform(matchupLines: MatchupLines[], game: Game): any {
    const awayKey = `${game.awayTeam.City} ${game.awayTeam.Name}`;
    const homeKey = `${game.homeTeam.City} ${game.homeTeam.Name}`;

    const line = matchupLines.find(
      m => m.awayTeam === awayKey && m.homeTeam === homeKey
    );

    return line ? line.sites : [];
  }

}
