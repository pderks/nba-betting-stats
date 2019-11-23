import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGameLines, GameLines } from '../models/game-lines.model';
import { map } from 'rxjs/operators';
import { AuthStateService } from './auth-state.service';

const BASE_URI = 'https://api.the-odds-api.com/v3';

@Injectable()
export class OddsApiService {
  constructor(private authState: AuthStateService, private http: HttpClient) { }

  public getOdds(type: 'h2h' | 'spreads' | 'totals') {
    const url = `${BASE_URI}/odds/?apiKey=${this.authState.apiKey}&sport=basketball_nba&region=us&mkt=${type}`;
    // const url = `assets/nba_${type}.json`;
    return this.http.get(url).pipe(
      map(oddsResponse => {
          return (oddsResponse['data'] as IGameLines[]).map(gameLines => new GameLines(gameLines, type));
      })
    );
  }
}
