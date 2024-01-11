import { User } from "./user";

export type CheckOut = {
	_id?: string;
	user: string | User;
	createdAt: string;
	updatedAt: string;
};
