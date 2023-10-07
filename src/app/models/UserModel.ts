export interface User {
    id?: number;
	name: string;
	surname: string;
	email: string;
	status: string;
	img_perfil: string;
	role: string;
	phone: string;
	federation: number;
	birth_date: Date;
	createdAt: Date;
	updatedAt: Date;
}