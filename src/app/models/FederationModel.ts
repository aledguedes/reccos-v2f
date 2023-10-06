import { League } from "./LeagueModel";
import { User } from "./UserModel";

export interface Federation {
    id: number,
    name: string,
    surname: string;
    status: string;
    img_logo: string;
    owner: User;
    leagues: League[]
}
