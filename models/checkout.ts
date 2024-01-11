import { CheckOut } from "@/types/checkout";
import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import UserModel from "./user";

const checkOutSchema = new mongoose.Schema<CheckOut>(
	{
		user: { type: String, ref: UserModel },
	},
	{ timestamps: true }
);

checkOutSchema.plugin(paginate);

export type CheckOutDB = CheckOut & mongoose.Document<CheckOut>;

const CheckOutModel =
	mongoose.models.CheckOut || mongoose.model("CheckOut", checkOutSchema);

export default CheckOutModel;
