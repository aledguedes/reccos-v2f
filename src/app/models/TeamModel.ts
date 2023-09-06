import { Federation } from "./FederationModel";
import { Stadium } from "./StadiumModel";

export interface Team {
  id: Number;
  name: String;
  status: String;
  acronym: String;
  surname: String;
  createdAt: Date;
  updatedAt: Date;
  birth_date: Date;
  stadium: Stadium;
  federation: Federation[];
  picture_profile: String;
  registered_federation: Number;
}
