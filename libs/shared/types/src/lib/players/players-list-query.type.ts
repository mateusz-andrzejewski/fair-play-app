import { PreferredPositionEnum } from './player-position.enum';

export interface PlayersListQuery {
  firstName?: string;
  lastName?: string;
  preferredPosition?: PreferredPositionEnum;
  isApproved?: boolean;
  page?: number;
  limit?: number;
  sortBy?: PlayerSortBy;
  sortOrder?: SortOrder;
}

export type SortOrder = 'asc' | 'desc';

export type PlayerSortBy =
  | 'firstName'
  | 'lastName'
  | 'nickname'
  | 'skillRate'
  | 'preferredPosition'
  | 'isApproved'
  | 'createdAt'
  | 'updatedAt';
