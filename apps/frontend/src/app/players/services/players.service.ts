import { inject, Injectable } from '@angular/core';
import { PlayersApiService } from './players-api.service';
import { PlayersListQuery } from '@fair-play-app/types';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  playersApiService = inject(PlayersApiService);

  getPlayers(payload?: PlayersListQuery) {
    return this.playersApiService.getPlayers(payload);
  }
}
