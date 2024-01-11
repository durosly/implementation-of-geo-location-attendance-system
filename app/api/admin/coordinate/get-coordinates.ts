import { handleError } from "@/lib/handleError";
import CoordinateModel from "@/models/coordinate";

async function getCoordinate() {
	try {
		const coordinate = await CoordinateModel.findOne({}).sort("-createdAt");

		if (!coordinate) {
			return Response.json(
				{ status: false, message: "No coordinates found" },
				{ status: 404 }
			);
		}

		return Response.json({
			status: true,
			message: "success",
			data: coordinate.points,
		});
	} catch (error) {
		const message = handleError(error);
		return Response.json({ status: false, message }, { status: 500 });
	}
}

export default getCoordinate;
