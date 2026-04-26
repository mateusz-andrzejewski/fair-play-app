import { Route } from '@angular/router';
import { PlayerComponent } from './players/components/players.component';
import { PlayersListResolver } from './players/resolvers/players.resolver';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'players',
    pathMatch: 'full',
  },
  {
    path: 'players',
    component: PlayerComponent,
    resolve: { playersList: PlayersListResolver },
  },
];
