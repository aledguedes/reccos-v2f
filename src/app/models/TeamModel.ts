import { Federation } from "./FederationModel";

export interface Team {
  id?: Number;
  name?: String;
  status: String;
  acronym?: String;
  surname?: String;
  createdAt?: Date;
  updatedAt?: Date;
  birth_date?: Date;
  picture_profile?: String;
  federation: Federation[];
  registered_federation?: Number;
}
