import connectMongo from "@/lib/connectDB";
import { handleError } from "@/lib/handleError";
import CoordinateModel from "@/models/coordinate";
import { NextRequest } from "next/server";

async function setCoordinate(request: NextRequest) {
	try {
		const body = await request.json();

		if (body.length < 3) {
			return Response.json(
				{
					status: false,
					message: "Atleast 3 coordinates are required",
				},
				{ status: 400 }
			);
		}

		await connectMongo();

		await CoordinateModel.deleteMany({});

		await CoordinateModel.create({ points: body });

		return Response.json({ status: true });
	} catch (error) {
		const message = handleError(error);
		return Response.json({ status: false, message }, { status: 500 });
	}
}

export default setCoordinate;
