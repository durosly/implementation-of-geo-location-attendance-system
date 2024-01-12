import connectMongo from "@/lib/connectDB";
import { handleError } from "@/lib/handleError";
import UserModel from "@/models/user";
import { NextRequest } from "next/server";

async function addNewUser(request: NextRequest) {
	try {
		const body = await request.json();

		await connectMongo();

		await UserModel.create(body);

		return Response.json({ status: true, message: "success" });
	} catch (error) {
		const message = handleError(error);

		return Response.json({ status: false, message }, { status: 500 });
	}
}

export default addNewUser;
