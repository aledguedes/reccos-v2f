import { Team } from "./TeamModel";

export interface Group {
    id: number;
    name: string;
    check: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    teams: Team[]
}