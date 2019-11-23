import { decimalToAmericanOdds } from '../utilities';

export interface IGameLines {
  teams: string[];
  commence_time: number;
  home_team: string;
  sites: IBettingSite[];
}

export class GameLines {
  public awayTeam: string;
  public homeTeam: string;
  public dateTime: Date;
  public sites: BettingSite[];
  public type: 'h2h' | 'spreads' | 'totals';

  constructor(gameLines: IGameLines, type: 'h2h' | 'spreads' | 'totals') {
    this.homeTeam = gameLines.home_team;
    const homeIndex = gameLines.teams.indexOf(this.homeTeam);
    const awayIndex = (homeIndex === 1) ? 0 : 1;

    this.awayTeam = gameLines.teams[awayIndex];
    this.dateTime = new Date(gameLines.commence_time * 1000);
    this.type = type;
    this.sites = gameLines.sites.map(site => {
      if (type === 'h2h') {
        return new BettingSiteMoneyline(site, homeIndex);
      } else if (type === 'spreads') {
        return new BettingSiteSpread(site, homeIndex);
      } else {
        return new BettingSiteOverUnder(site);
      }
    });
  }
}

export interface IBettingSite {
  site_key: string;
  site_nice: string;
  last_update: number;
  odds: ISpread | IOverUnder | IMoneyline;
}

export class BettingSite {
  public siteId: string;
  public siteName: string;
  public lastUpdated: Date;

  constructor(site: IBettingSite) {
    this.siteId = site.site_key;
    this.siteName = site.site_nice;
    this.lastUpdated = new Date(site.last_update * 1000);
  }
}

export class BettingSiteSpread extends BettingSite {
  public odds: Spread;

  constructor(site: IBettingSite, homeIndex: number) {
    super(site);
    this.odds = new Spread(site.odds as ISpread, homeIndex);
  }
}

export class BettingSiteOverUnder extends BettingSite {
  public odds: OverUnder;

  constructor(site: IBettingSite) {
    super(site);
    this.odds = new OverUnder(site.odds as IOverUnder);
  }
}

export class BettingSiteMoneyline extends BettingSite {
  public odds: Moneyline;

  constructor(site: IBettingSite, homeIndex: number) {
    super(site);
    this.odds = new Moneyline(site.odds as IMoneyline, homeIndex);
  }
}

export interface ISpread {
  spreads: {
    odds: number[];
    points: string[];
  };
}

export class Spread {
  public awayOdds: number;
  public homeOdds: number;
  public awayPoints: number;
  public homePoints: number;

  constructor(spread: ISpread, homeIndex: number) {
    const awayIndex = (homeIndex === 1) ? 0 : 1;
    this.awayOdds = decimalToAmericanOdds(spread.spreads.odds[awayIndex]);
    this.homeOdds = decimalToAmericanOdds(spread.spreads.odds[homeIndex]);
    this.awayPoints = +spread.spreads.points[awayIndex];
    this.homePoints = +spread.spreads.points[homeIndex];
  }
}

export interface IOverUnder {
  totals: {
    position: string[];
    odds: number[];
    points: number[];
  };
}

export class OverUnder {
  public overOdds: number;
  public underOdds: number;
  public overPoints: number;
  public underPoints: number;

  constructor(ou: IOverUnder) {
    const overIndex = ou.totals.position.indexOf('over');
    const underIndex = (overIndex === 1) ? 0 : 1;
    this.overOdds = decimalToAmericanOdds(ou.totals.odds[overIndex]);
    this.underOdds = decimalToAmericanOdds(ou.totals.odds[underIndex]);
    this.overPoints = ou.totals.points[overIndex];
    this.underPoints = ou.totals.points[underIndex];
  }
}

export interface IMoneyline {
  h2h: number[];
}

export class Moneyline {
  public awayMoneyline: number;
  public homeMoneyLine: number;

  constructor(ml: IMoneyline, homeIndex: number) {
    const awayIndex = (homeIndex === 1) ? 0 : 1;
    this.awayMoneyline = decimalToAmericanOdds(ml.h2h[awayIndex]);
    this.homeMoneyLine = decimalToAmericanOdds(ml.h2h[homeIndex]);
  }
}
