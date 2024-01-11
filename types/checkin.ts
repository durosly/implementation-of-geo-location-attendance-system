import { User } from "./user";

export type CheckIn = {
	_id?: string;
	user: string | User;
	createdAt: string;
	updatedAt: string;
};
