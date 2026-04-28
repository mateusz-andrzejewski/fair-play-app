import { PreferredPositionEnum } from './player-position.enum';

export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  nickname?: string;
  skillRate: number;
  preferredPosition: PreferredPositionEnum;
  createdAt: string;
  updatedAt: string;
}
