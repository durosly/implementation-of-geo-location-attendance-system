import { handleError } from "@/lib/handleError";
import { strigifyObj } from "@/lib/utils";
import CheckInModel, { CheckInDB } from "@/models/checkin";
import CheckOutModel, { CheckOutDB } from "@/models/checkout";
import { CheckIn } from "@/types/checkin";
import { CheckOut } from "@/types/checkout";

async function getAllUsersActivity() {
	try {
		const today = new Date();
		const dateString = `${today.getFullYear()}-${(today.getMonth() + 1)
			.toString()
			.padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

		const startDate = new Date(`${dateString}T00:00:00Z`).toISOString();
		const endDate = new Date(`${dateString}T23:59:59Z`).toISOString();
		const query = { createdAt: { $gte: startDate, $lt: endDate } };

		const result = [];

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

export default getAllUsersActivity;
