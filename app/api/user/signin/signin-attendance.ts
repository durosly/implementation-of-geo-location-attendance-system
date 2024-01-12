import { handleError } from "@/lib/handleError";
import CheckInModel from "@/models/checkin";
import CoordinateModel from "@/models/coordinate";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import { Cordinate } from "@/types/coordinate";
import connectMongo from "@/lib/connectDB";
// @ts-expect-error
import * as turf from "@turf/turf";

// function isPointInPolygon(point: number[], polygon: number[][]) {
// 	const x = point[0];
// 	const y = point[1];
// 	let inside = false;

// 	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
// 		const xi = polygon[i][0];
// 		const yi = polygon[i][1];
// 		const xj = polygon[j][0];
// 		const yj = polygon[j][1];

// 		const intersect =
// 			yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

// 		if (intersect) inside = !inside;
// 	}

// 	return inside;
// }

async function signAttendance(request: NextRequest) {
	try {
		const { latitude, longitude } = await request.json();

		const point = [Number(latitude), Number(longitude)];

		await connectMongo();

		const coordinate = await CoordinateModel.findOne({}).sort("-createAt");

		if (!coordinate) {
			return Response.json(
				{ status: false, message: "Signin area has not been defined" },
				{ status: 403 }
			);
		}

		const polygon = coordinate.points.map((item: Cordinate) => [
			item.lat,
			item.log,
		]);

		// console.log(polygon);
		// console.log(point);

		const tPoint = turf.point(point);
		const tPolygon = turf.polygon([polygon]);

		// const isInside = isPointInPolygon(point, polygon);
		const isInside = turf.booleanPointInPolygon(tPoint, tPolygon);

		// console.log(JSON.stringify(point));
		// console.log(JSON.stringify(polygon));

		if (!isInside) {
			console.log("Point is not inside the polygon");
			return Response.json(
				{
					status: false,
					message: "You're not within the designated location",
				},
				{ status: 400 }
			);
		}

		const session = await getServerSession(options);

		await CheckInModel.create({ user: session?.user.id });

		return Response.json({ status: true, message: "Checked in" });
	} catch (error) {
		const message = handleError(error);
		return Response.json({ status: false, message }, { status: 500 });
	}
}

export default signAttendance;
