export interface IPlayer {
  id: number;
  firstName: string;
  lastName: string;
  nickname?: string;
  skillRate: number;
  preferredPosition: PreferredPositionEnum;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum PreferredPositionEnum {
  GOALKEEPER = 'GOALKEEPER',
  DEFENDER = 'DEFENDER',
  MIDFIELDER = 'MIDFIELDER',
  FORWARD = 'FORWARD',
}
