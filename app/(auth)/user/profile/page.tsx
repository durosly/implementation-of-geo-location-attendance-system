import connectMongo from "@/lib/connectDB";
import UserModel from "@/models/user";
import { getServerSession } from "next-auth";
import { options } from "../../../api/auth/[...nextauth]/options";
import { notFound } from "next/navigation";
import UserActivities from "../../../(admin)/admin/profiles/[id]/__components/user-activities";

async function UserProfile() {
	await connectMongo();

	const session = await getServerSession(options);
	const id = session?.user.id;
	const user = await UserModel.findById(id);

	if (!user) {
		notFound();
	}

	return (
		<>
			<h2>{user.fullname} profile</h2>

			<div className="card mt-5 bg-base-200">
				<div className="card-body">
					<ul>
						<li>
							<span className="font-bold mr-1">College:</span>
							<span>{user.college}</span>
						</li>
						<li>
							<span className="font-bold mr-1">Department:</span>
							<span>{user.department}</span>
						</li>
						<li>
							<span className="font-bold mr-1">Email:</span>
							<span>{user.email}</span>
						</li>
						<li>
							<span className="font-bold mr-1">Created At:</span>
							<span>
								{new Intl.DateTimeFormat("en-NG", {
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
									hour: "numeric",
									minute: "numeric",
									hour12: true,
								}).format(new Date(user.createdAt))}
							</span>
						</li>
					</ul>
				</div>
			</div>

			<UserActivities id={user._id} />
		</>
	);
}

export default UserProfile;
