export interface IGameLog {
  game: IGame;
  team: ITeam;
  stats: IStatJson;
}

export class GameLog {
  game: Game;
  team: ITeam;
  stats: IStat;

  constructor(gameLog: IGameLog) {
    this.game = new Game(gameLog.game);
    this.team = gameLog.team;

    const convertedStats: IStat = { };
    const statKeys = Object.keys(gameLog.stats);
    statKeys.forEach(key => {
      convertedStats[key] = new StatData(gameLog.stats[key]);
    });

    this.stats = convertedStats;
  }
}

export interface IGame {
  id: string;
  date: string;
  time: string;
  awayTeam: ITeam;
  homeTeam: ITeam;
  location: string;
}

export class Game {
  id: string;
  dateTime: Date;
  awayTeam: ITeam;
  homeTeam: ITeam;
  location: string;

  constructor(game: IGame) {
    this.id = game.id;
    this.awayTeam = game.awayTeam;
    this.homeTeam = game.homeTeam;
    this.location = game.location;

    const dateInfo = game.date.split('-');
    const timeInfo = game.time.split(':');

    // TODO: Account for returned date being Eastern Time
    this.dateTime = new Date(
      +dateInfo[0],
      +dateInfo[1] - 1,
      +dateInfo[2],
      +timeInfo[0],
      +timeInfo[1].substr(0, 2)
    );
  }
}

export class ITeam {
  ID: string;
  City: string;
  Name: string;
  Abbreviation: string;
}

export interface IStatJson {
  [key: string]: IStatData;
}

export interface IStat {
  [key: string]: {
    '@category': string;
    '@abbreviation': string;
    '#text': number;
  };
}

export interface IStatData {
  '@category': string;
  '@abbreviation': string;
  '#text': string;
}

export class StatData {
  '@category': string;
  '@abbreviation': string;
  '#text': number;

  constructor(statData: IStatData) {
    this['@category'] = statData["@category"];
    this["@abbreviation"] = statData["@abbreviation"];
    this["#text"] = +statData["#text"];
  }
}
