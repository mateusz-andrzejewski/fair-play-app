import { Route } from '@angular/router';
import { PlayersSearchComponent } from './players/components/players-search/players-search.component';
import { PlayersListResolver } from './players/resolvers/players.resolver';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'players',
    pathMatch: 'full',
  },
  {
    path: 'players',
    component: PlayersSearchComponent,
    resolve: { playersList: PlayersListResolver },
  },
];
