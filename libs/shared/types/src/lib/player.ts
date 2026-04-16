export interface IPlayer {
  id: number;
  firstName: string;
  lastName: string;
  nickname?: string;
  skillRate: number;
  preferredPosition?: PreferredPostionEnum;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum PreferredPostionEnum {
  GOALKEEPER = 'GOALKEEPER',
  DEFENDER = 'DEFENDER',
  MIDFIELDER = 'MIDFIELDER',
  FORWARD = 'FORWARD',
}
