export interface League {
  id: number;
  dt_end: Date;
  name?: string;
  status: string;
  dt_start: Date;
  createdAt: Date;
  updatedAt: Date;
  img_logo: string;
  location: string;
  qt_group: number;
  qtd_teams: number;
  cod_status?: string;
  league_mode: string;
  league_system: string;
}
