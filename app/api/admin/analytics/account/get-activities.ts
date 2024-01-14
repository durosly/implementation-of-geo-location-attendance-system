import connectMongo from "@/lib/connectDB";
import { handleError } from "@/lib/handleError";
import { strigifyObj } from "@/lib/utils";
import CheckInModel, { CheckInDB } from "@/models/checkin";
import CheckOutModel, { CheckOutDB } from "@/models/checkout";
import { CheckIn } from "@/types/checkin";
import { CheckOut } from "@/types/checkout";
import { NextRequest } from "next/server";

async function getAccountActivity(request: NextRequest) {
	try {
		// const today = new Date();
		// const dateString = `${today.getFullYear()}-${(today.getMonth() + 1)
		// 	.toString()
		// 	.padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

		// const startDate = new Date(`${dateString}T00:00:00Z`).toISOString();
		// const endDate = new Date(`${dateString}T23:59:59Z`).toISOString();
		// const query = { createdAt: { $gte: startDate, $lt: endDate } };

		const { searchParams } = new URL(request.url);
		const user = searchParams.get("user");
		const start = searchParams.get("start");
		const end = searchParams.get("end");
		const range = searchParams.get("choice");

		await connectMongo();

		if (!user) {
			return Response.json(
				{ status: false, message: "Invalid ID format" },
				{ status: 400 }
			);
		}

		const query: { user: string; createdAt?: {} } = { user };

		if (range === "interval") {
			const startDate = new Date(`${start}T00:00:00Z`).toISOString();
			const endDate = new Date(`${end}T23:59:59Z`).toISOString();

			query.createdAt = { $gte: startDate, $lt: endDate };
		} else if (range === "today") {
			const today = new Date();
			const dateString = `${today.getFullYear()}-${(today.getMonth() + 1)
				.toString()
				.padStart(2, "0")}-${today
				.getDate()
				.toString()
				.padStart(2, "0")}`;

			const startDate = new Date(`${dateString}T00:00:00Z`).toISOString();
			const endDate = new Date(`${dateString}T23:59:59Z`).toISOString();
			query.createdAt = { $gte: startDate, $lt: endDate };
		} else if (range === "30days") {
			const endDate = new Date(); // End date is today
			const startDate = new Date();
			startDate.setDate(startDate.getDate() - 30); // Start date is 30 days ago

			const startDateString = `${startDate.getFullYear()}-${(
				startDate.getMonth() + 1
			)
				.toString()
				.padStart(2, "0")}-${startDate
				.getDate()
				.toString()
				.padStart(2, "0")}`;

			const endDateString = `${endDate.getFullYear()}-${(
				endDate.getMonth() + 1
			)
				.toString()
				.padStart(2, "0")}-${endDate
				.getDate()
				.toString()
				.padStart(2, "0")}`;

			const start = new Date(
				`${startDateString}T00:00:00Z`
			).toISOString();
			const end = new Date(`${endDateString}T23:59:59Z`).toISOString();

			query.createdAt = { $gte: start, $lt: end };
		}

		const result = [];

		console.log(query);

		// TODO: check if signed out today
		const signout: CheckOutDB[] = await CheckOutModel.find(query).populate(
			"user"
		);

		const signoutData = strigifyObj<CheckOutDB[], CheckOut[]>(signout);

		for (const item of signoutData) {
			result.push({
				type: "signout",
				_id: item._id,
				createdAt: item.createdAt,
				user: item.user,
			});
		}

		const signin: CheckInDB[] = await CheckInModel.find(query).populate(
			"user"
		);

		const signinData = strigifyObj<CheckInDB[], CheckIn[]>(signin);

		for (const item of signinData) {
			result.push({
				type: "signin",
				_id: item._id,
				createdAt: item.createdAt,
				user: item.user,
			});
		}

		const sortByCreatedAt = (
			a: CheckIn | CheckOut,
			b: CheckIn | CheckOut
		) => {
			const timestampA = new Date(a.createdAt).getTime();
			const timestampB = new Date(b.createdAt).getTime();

			return timestampA - timestampB;
		};

		// @ts-expect-error
		const sortedResult = result.sort(sortByCreatedAt);

		return Response.json({ status: true, data: sortedResult });
	} catch (error) {
		const message = handleError(error);
		return Response.json({ status: false, message }, { status: 500 });
	}
}

export default getAccountActivity;
