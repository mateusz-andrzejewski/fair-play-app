export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  skillRate: number;
  prefferedPosition?: 'GOALKEEPER' | 'DEFENDER' | 'MIDFILDER' | 'FORWARD';
  isApproved: boolean;
  createdAt: string;
  udpatedAt: string;
}
