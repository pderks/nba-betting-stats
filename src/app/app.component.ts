import { Component, OnInit } from '@angular/core';
import { SportsFeedService } from './services/sports-feed.service';
import { Game, GameLog } from './models/game-log.model';
import { switchMap, map } from 'rxjs/operators';
import { OddsApiService } from './services/odds-api.service';
import { GameLines, BettingSiteSpread, BettingSiteMoneyline, BettingSiteOverUnder } from './models/game-lines.model';
import { zip } from 'rxjs';
import { MatchupLines } from './models/matchup-lines.model';
import { AuthStateService } from './services/auth-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private dailyGameLogs: GameLog[];
  public dailyGames: Game[];
  public moneyLines: GameLines[];
  public spreadLines: GameLines[];
  public overUnderLines: GameLines[];

  public teamLogDictionary: { [team: string]: GameLog[] };
  public matchupLines: MatchupLines[];

  constructor(public authState: AuthStateService, private dataApi: SportsFeedService, private oddsApi: OddsApiService) {}

  ngOnInit() {}

  public getData() {
    const moneyLineObservable = this.oddsApi.getOdds('h2h').pipe(
      map(gameLines => this.moneyLines = gameLines)
    );
    const spreadsObservable = this.oddsApi.getOdds('spreads').pipe(
      map(gameLines => this.spreadLines = gameLines)
    );
    const totalsObservable = this.oddsApi.getOdds('totals').pipe(
      map(gameLines => this.overUnderLines = gameLines)
    );
    const scheduleObservable = this.dataApi.getScheduleByDay().pipe(
      map(schedule => this.dailyGames = schedule)
    );

    zip(moneyLineObservable, spreadsObservable, totalsObservable, scheduleObservable).pipe(
      switchMap(() => {
        const teamsPlaying = this.getTeamAbbreviationsFromGames(this.dailyGames);
        return this.dataApi.getGameLogs(teamsPlaying);
      })
    ).subscribe(gameLogs => {
      this.dailyGameLogs = gameLogs;
      this.populateTeamGameLogDictionary();
      this.populateGameLineModels();
    });
  }

  private getTeamAbbreviationsFromGames(games: Game[]) {
    const abbreviationList: string[] = [];

    games.forEach(game => {
      abbreviationList.push(game.awayTeam.Abbreviation);
      abbreviationList.push(game.homeTeam.Abbreviation);
    });

    return abbreviationList;
  }

  private getOrderedTeamGameLogs(teamAbbrv: string) {
    return this.dailyGameLogs
      .filter(log => log.team.Abbreviation === teamAbbrv)
      .sort((a, b) => {
        return (a > b) ? 1 : -1;
      });
  }

  private populateTeamGameLogDictionary() {
    this.teamLogDictionary = { };

    this.dailyGames.forEach(game => {
      const awayAbbrev = game.awayTeam.Abbreviation;
      const homeAbbrev = game.homeTeam.Abbreviation;

      this.teamLogDictionary[awayAbbrev] = this.getOrderedTeamGameLogs(awayAbbrev);
      this.teamLogDictionary[homeAbbrev] = this.getOrderedTeamGameLogs(homeAbbrev);
    });
  }

  private populateGameLineModels() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const todaysMoneylines = this.moneyLines.filter(ml => ml.dateTime < tomorrow);
    const todaysSpreads = this.spreadLines.filter(s => s.dateTime < tomorrow);
    const todaysTotals = this.overUnderLines.filter(ou => ou.dateTime < tomorrow);

    this.matchupLines = [];
    this.dailyGames.forEach(game => {
      const awayTeamKey = `${game.awayTeam.City} ${game.awayTeam.Name}`;
      const homeTeamKey = `${game.homeTeam.City} ${game.homeTeam.Name}`;

      const moneyline = todaysMoneylines.find(ml => ml.awayTeam === awayTeamKey && ml.homeTeam === homeTeamKey);
      const spread = todaysSpreads.find(s => s.awayTeam === awayTeamKey && s.homeTeam === homeTeamKey);
      const overUnder = todaysTotals.find(t => t.awayTeam === awayTeamKey && t.homeTeam === homeTeamKey);

      const matchupLine = new MatchupLines(
        awayTeamKey,
        homeTeamKey,
        moneyline ? (moneyline.sites as BettingSiteMoneyline[]) : null,
        spread ? (spread.sites as BettingSiteSpread[]) : null,
        overUnder ? (overUnder.sites as BettingSiteOverUnder[]) : null
      );

      this.matchupLines.push(matchupLine);
    });
  }
}
