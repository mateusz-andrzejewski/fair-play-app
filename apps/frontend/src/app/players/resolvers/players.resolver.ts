import { inject } from '@angular/core';
import { PlayersListResponse } from '@fair-play-app/types';

import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { PlayersService } from '../services/players.service';

export const PlayersListResolver: ResolveFn<PlayersListResponse> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const playersService = inject(PlayersService);
  return playersService.getPlayers();
};
