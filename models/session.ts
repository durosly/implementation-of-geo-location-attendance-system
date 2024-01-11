import { Session } from "@/types/session";
import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const sessionSchema = new mongoose.Schema<Session>(
	{
		name: { type: String, index: true },
		status: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

sessionSchema.plugin(paginate);

export type SessionDB = Session & mongoose.Document<Session>;

const SessionModel =
	mongoose.models.Session || mongoose.model("Session", sessionSchema);

export default SessionModel;
