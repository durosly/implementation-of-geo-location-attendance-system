import type { Cordinates } from "@/types/coordinate";
import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const coordinateSchema = new mongoose.Schema<Cordinates>(
	{
		points: [{ lat: Number, log: Number }],
	},
	{ timestamps: true }
);

coordinateSchema.plugin(paginate);

export type CordinatesDB = Cordinates & mongoose.Document<Cordinates>;

const CoordinateModel =
	mongoose.models.Coordinate ||
	mongoose.model("Coordinate", coordinateSchema);

export default CoordinateModel;
