import { Component, OnInit, Input } from '@angular/core';
import { Game, GameLog } from 'src/app/models/game-log.model';
import { GamblingSite } from 'src/app/models/matchup-lines.model';

@Component({
  selector: 'matchup-summary',
  templateUrl: './matchup-summary.component.html',
  styleUrls: ['./matchup-summary.component.scss']
})
export class MatchupSummaryComponent implements OnInit {
  @Input() game: Game;
  @Input() awayTeamLogs: GameLog[];
  @Input() homeTeamLogs: GameLog[];
  @Input() sportsBookLines: GamblingSite[];

  public projectedAwayScore: number;
  public projectedHomeScore: number;

  public projectedAwaySpread: number;
  public projectedHomeSpread: number;
  public projectedTotal: number;

  public ngOnInit() {
    this.calculateProjectedScore();

    this.projectedAwaySpread = this.projectedHomeScore - this.projectedAwayScore;
    this.projectedHomeSpread = this.projectedAwayScore - this.projectedHomeScore;
    this.projectedTotal = this.projectedAwayScore + this.projectedHomeScore;
  }

  private calculateProjectedScore() {
    const awayOffEff = this.getOffensiveEfficiency('away');
    const awayDefEff = this.getDefensiveEfficiency('away');

    const homeOffEff = this.getOffensiveEfficiency('home');
    const homeDefEff = this.getDefensiveEfficiency('home');

    this.projectedAwayScore = (awayOffEff + homeDefEff) / 2 - 3;
    this.projectedHomeScore = (homeOffEff + awayDefEff) / 2 + 3;
  }

  private getOffensiveEfficiency(team: 'home' | 'away') {
    const teamLogs = (team === 'home') ? this.homeTeamLogs : this.awayTeamLogs;
    return this.calculateEfficiency(teamLogs, 'offense');
  }

  private getDefensiveEfficiency(team: 'home' | 'away'): number {
    const teamLogs = (team === 'home') ? this.homeTeamLogs : this.awayTeamLogs;
    return this.calculateEfficiency(teamLogs, 'defense');
  }

  private calculateEfficiency(teamLogs: GameLog[], value: 'offense' | 'defense') {
    const stat = (value === 'offense') ? 'Pts' : 'PtsAgainst';

    const ptsList = teamLogs.map(log => log.stats[stat]['#text']);
    const ptsL10List = ptsList.slice(0, 10);
    const ptsL5List = ptsList.slice(0, 5);

    const ppg = ptsList.reduce((a, b) => a + b, 0) / ptsList.length;
    const ppgL10 = ptsL10List.reduce((a, b) => a + b, 0) / 10;
    const ppgL5 = ptsL5List.reduce((a, b) => a + b, 0) / 5;

    return (ppg + 4 * ppgL10 + 7 * ppgL5) / 12;
  }
}
