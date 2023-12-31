import { Player } from "./PlayerModel";
import { Team } from "./TeamModel";

export interface Contract {
  id: number;
  teams?: Team;
  players?: Player;
  status: string;
  dt_end: Date;
  dt_start: Date;
  createdAt: Date;
  updatedAt: Date;
}
