import { PlayerCreatePayload } from "./player-create.payload";

export type PlayerEditPayload = Partial<PlayerCreatePayload> & {id: number};