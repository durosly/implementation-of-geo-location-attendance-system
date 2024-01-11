import { handleError } from "@/lib/handleError";
import CheckInModel from "@/models/checkin";
import CheckOutModel from "@/models/checkout";

async function getCheckStatus() {
	try {
		const today = new Date();
		const dateString = `${today.getFullYear()}-${(today.getMonth() + 1)
			.toString()
			.padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

		const startDate = new Date(`${dateString}T00:00:00Z`).toISOString();
		const endDate = new Date(`${dateString}T23:59:59Z`).toISOString();
		const query = { createdAt: { $gte: startDate, $lt: endDate } };

		// TODO: check if signed out today
		const signout = await CheckOutModel.findOne(query);

		if (signout) {
			return Response.json({
				status: false,
				message: "success",
				data: "signed-out",
			});
		}

		const signin = await CheckInModel.findOne(query);

		if (signin) {
			return Response.json({
				status: false,
				message: "success",
				data: "signed-in",
			});
		}

		// TODO: else check if signed in today

		return Response.json({
			status: false,
			message: "success",
			data: "new",
		});
	} catch (error) {
		const message = handleError(error);
		return Response.json({ status: false, message }, { status: 500 });
	}
}

export default getCheckStatus;
