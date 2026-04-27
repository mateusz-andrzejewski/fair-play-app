import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PlayersListQuery, PlayersListResponse } from '@fair-play-app/types';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000/api';
const GET_PLAYERS_URL = `${BASE_URL}/players`;

@Injectable({
  providedIn: 'root',
})
export class PlayersApiService {
  private _httpClient = inject(HttpClient);

  getPlayers(payload?: PlayersListQuery): Observable<PlayersListResponse> {
    let params = new HttpParams();
    if (payload) {
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined) {
          params = params.set(key, String(value));
        }
      });
    }
    return this._httpClient.get<PlayersListResponse>(GET_PLAYERS_URL, {
      params,
    });
  }
}
