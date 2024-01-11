import { Room } from "@/types/room";
import mongoose from "mongoose";
import HostelModel from "./coordinate";
import paginate from "mongoose-paginate-v2";

const roomSchema = new mongoose.Schema<Room>(
	{
		name: { type: String, index: true },
		status: { type: Boolean, default: true },
		noOfBed: Number,
		hostel: { type: String, ref: HostelModel },
	},
	{ timestamps: true }
);

roomSchema.plugin(paginate);

export type RoomDB = Room & mongoose.Document<Room>;

const RoomModel = mongoose.models.Room || mongoose.model("Room", roomSchema);

export default RoomModel;
