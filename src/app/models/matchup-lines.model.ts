import { BettingSiteSpread, BettingSiteMoneyline, BettingSiteOverUnder, Spread, Moneyline, OverUnder } from './game-lines.model';

export class MatchupLines {
  public awayTeam: string;
  public homeTeam: string;
  public sites: GamblingSite[];

  constructor(
    awayTeam: string,
    homeTeam: string,
    moneyLineSites: BettingSiteMoneyline[] = [],
    spreadSites: BettingSiteSpread[] = [],
    ouSites: BettingSiteOverUnder[] = []
  ) {
    this.awayTeam = awayTeam;
    this.homeTeam = homeTeam;
    this.sites = [];

    const mSites = moneyLineSites.map(s => s.siteName);
    const sSites = spreadSites.map(s => s.siteName);
    const tSites = ouSites.map(s => s.siteName);

    const uniqueSites = [...new Set([].concat(...[mSites, sSites, tSites]))];
    uniqueSites.forEach(site => {
      const ml = moneyLineSites.find(s => s.siteName === site);
      const spread = spreadSites.find(s => s.siteName === site);
      const ou = ouSites.find(s => s.siteName === site);

      this.sites.push(
        new GamblingSite(
          site,
          ml ? (ml as BettingSiteMoneyline).odds : null,
          spread ? (spread as BettingSiteSpread).odds : null,
          ou ? (ou as BettingSiteOverUnder).odds : null
        )
      );
    });
  }
}

export class GamblingSite {
  public siteName: string;
  public awayMoneyLine: number;
  public homeMoneyLine: number;
  public awaySpread: number;
  public homeSpread: number;
  public awayOdds: number;
  public homeOdds: number;
  public underTotal: number;
  public overTotal: number;
  public underOdds: number;
  public overOdds: number;

  constructor(
    name: string,
    moneyline: Moneyline,
    spread: Spread,
    overUnder: OverUnder
  ) {
    this.siteName = name;
    if (moneyline) {
      this.awayMoneyLine = moneyline.awayMoneyline;
      this.homeMoneyLine = moneyline.homeMoneyLine;
    }

    if (spread) {
      this.awaySpread = spread.awayPoints;
      this.homeSpread = spread.homePoints;
      this.awayOdds = spread.awayOdds;
      this.homeOdds = spread.homeOdds;
    }

    if (overUnder) {
      this.underTotal = overUnder.underPoints;
      this.overTotal = overUnder.overPoints;
      this.underOdds = overUnder.underOdds;
      this.overOdds = overUnder.overOdds;
    }
  }
}
