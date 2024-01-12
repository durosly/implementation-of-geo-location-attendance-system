import { handleError } from "@/lib/handleError";
import UserModel from "@/models/user";

async function getProfiles() {
	try {
		const profiles = await UserModel.find({ is_admin: false }).sort(
			"-createdAt"
		);

		if (!profiles) {
			return Response.json(
				{ status: false, message: "No profiles found" },
				{ status: 404 }
			);
		}

		return Response.json({
			status: true,
			message: "success",
			data: profiles,
		});
	} catch (error) {
		const message = handleError(error);
		return Response.json({ status: false, message }, { status: 500 });
	}
}

export default getProfiles;
