import { Player } from "./PlayerModel";
import { Team } from "./TeamModel";

export interface Contract {
  id: Number;
  team: Team;
  player: Player;
  status: String;
  createdAt: Date;
  updatedAt: Date;
}
