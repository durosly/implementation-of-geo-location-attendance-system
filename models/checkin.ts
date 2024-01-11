import { CheckIn } from "@/types/checkin";
import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import UserModel from "./user";

const checkInSchema = new mongoose.Schema<CheckIn>(
	{
		user: { type: String, ref: UserModel },
	},
	{ timestamps: true }
);

checkInSchema.plugin(paginate);

export type CheckInDB = CheckIn & mongoose.Document<CheckIn>;

const CheckInModel =
	mongoose.models.CheckIn || mongoose.model("CheckIn", checkInSchema);

export default CheckInModel;
