import { League } from "./LeagueModel";
import { User } from "./UserModel";

export interface Federation {
    id?: number,
    name?: String,
    surname?: String;
    status?: String;
    img_logo?: String;
    owner: User;
    leagues: League[]
}
