export interface User {
    id: Number;
    name?: string;
    surname?: string;
    email?: string;
    img_perfil?: string;
    status?: string;
    role?: string;
    birth_date?: Date;
    federation?: number;
    password?: string;
    password_confirmation?: string
}