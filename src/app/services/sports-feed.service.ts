import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { IGameLog, GameLog, IGame, Game } from '../models/game-log.model';
import { AuthStateService } from './auth-state.service';

const BASE_URI = 'https://api.mysportsfeeds.com/v1.2/pull/nba';
const API_KEY = '997c43f3-b3f5-4918-9cfd-a77ca8';

@Injectable()
export class SportsFeedService {

  constructor(private authState: AuthStateService, private http: HttpClient) { }

  public getScheduleByDay(date = new Date()) {
    const httpHeaders = new HttpHeaders(this.getAuthHeader());

    const year = date.getFullYear();
    const month = ((date.getMonth() + 1).toString().length === 2) ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
    const day = (date.getDate().toString().length === 2) ? `${date.getDate()}` : `0${date.getDate()}`;
    const dateString = `${year}${month}${day}`; // YYYYMMDD

    const url = `${BASE_URI}/${this.getSeason()}/daily_game_schedule.json?fordate=${dateString}`;
    return this.http.get(url, { headers: httpHeaders }).pipe(
      map(scheduleResponse => {
        return (scheduleResponse['dailygameschedule']['gameentry'] as IGame[]).map(game => new Game(game));
      })
    );
  }

  public getGameLogs(teams: string[]) {
    const httpHeaders = new HttpHeaders(this.getAuthHeader());

    let url = `${BASE_URI}/${this.getSeason()}/team_gamelogs.json`;
    if (teams) {
      url += `?team=${teams.join(',')}`;
    }

    return this.http.get(url, { headers: httpHeaders }).pipe(
      map(logsResponse => {
        return (logsResponse['teamgamelogs']['gamelogs'] as IGameLog[]).map(gameLog => new GameLog(gameLog));
      })
    );
  }

  private getSeason() {
    const today = new Date();
    const startYear = (today.getMonth() > 8) ? today.getFullYear() : today.getFullYear() - 1;
    const endYear = startYear + 1;

    return `${startYear}-${endYear}-regular`;
  }

  private getAuthHeader() {
    const authToken = btoa(`${API_KEY}:${this.authState.password}`);
    return { Authorization: `Basic ${authToken}` };
  }
}
