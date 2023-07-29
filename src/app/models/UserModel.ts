export interface User {
    id?: Number;
    name?: String;
    email?: String;
    img_perfil?: String;
    status?: Boolean;
    role?: String;
    birth_date?: Date;
    federation?: Number;
    password?: String;
    password_confirmation?: String
}