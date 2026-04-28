import { PreferredPositionEnum } from "./player-position.enum";

export interface PlayerCreatePayload {
    firstName: string;
    lastName: string;
    preferredPosition: PreferredPositionEnum;
    skillRate: number;
    nickname?: string;
}