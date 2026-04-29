import { inject, Injectable } from '@angular/core';
import { PlayersApiService } from './players-api.service';
import { PlayerCreatePayload, PlayerEditPayload, PlayersListQuery } from '@fair-play-app/types';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  playersApiService = inject(PlayersApiService);

    readonly positionList = [
          {
      viewValue: 'Bramkarz',
      value: 'GOALKEEPER',
    },
    {
      viewValue: 'Obrońca',
      value: 'DEFENDER',
    },
        {
      viewValue: 'Pomocnik',
      value: 'MIDFIELDER',
    },
        {
      viewValue: 'Napastnik',
      value: 'FORWARD',
    },
  ];

  getPlayers(payload?: PlayersListQuery) {
    return this.playersApiService.getPlayers(payload);
  }

  createPlayer(payload: PlayerCreatePayload) {
    return this.playersApiService.createPlayer(payload);
  }

  editPlayer(id: number, payload: PlayerEditPayload) {
    return this.playersApiService.editPlayer(id, payload);
  }

  deletePlayer(id: number) {
    return this.playersApiService.deletePlayer(id);
  }
}
