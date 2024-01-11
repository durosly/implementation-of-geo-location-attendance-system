import { Hostel } from "./coordinate";

export type Room = {
	_id?: string;
	name: string;
	noOfBed: number;
	status: boolean;
	hostel: string | Hostel;
	createdAt: Date;
	updatedAt: Date;
};
