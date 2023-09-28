import { Federation } from "./FederationModel";
import { Stadium } from "./StadiumModel";

export interface Team {
  id: number;
  name: string;
  check: string;
  status: string;
  acronym: string;
  surname: string;
  createdAt: Date;
  updatedAt: Date;
  birth_date: Date;
  stadium: Stadium;
  federation: Federation[];
  picture_profile: string;
  registered_federation: number;
}
