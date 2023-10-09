import { Group } from "./GroupTeam";

export interface League {
  id: number;
  dt_end: Date;
  name: string;
  slug: string;
  turn: boolean;
  status: string;
  dt_start: Date;
  createdAt: Date;
  updatedAt: Date;
  img_logo: string;
  location: string;
  qt_group: number;
  num_teams: number;
  qtd_teams: number;
  cod_status?: string;
  league_mode: string;
  league_system: string;
  enrollment_end: Date;
  enrollment_start: Date;
  groups: Group[];
}
