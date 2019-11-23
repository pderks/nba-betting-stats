import { Pipe, PipeTransform } from '@angular/core';
import { GameLog } from '../models/game-log.model';

@Pipe({
  name: 'filterTeamLogs'
})
export class FilterTeamLogsPipe implements PipeTransform {

  public transform(logDictionary: { [team: string]: GameLog[] }, teamAbbreviation: string) {
    return logDictionary[teamAbbreviation];
  }
}
