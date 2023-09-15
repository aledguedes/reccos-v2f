export interface League {
  id: Number;
  name?: string;
  status: string;
  img_logo: string;
  location: string;
  league_mode: string;
  league_system: string;
  qt_group: number;
  dt_start: Date;
  dt_end: Date;
  createdAt: Date;
  updatedAt: Date;
  cod_status?: string;
}
