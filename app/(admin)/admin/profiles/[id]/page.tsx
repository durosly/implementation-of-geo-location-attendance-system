import connectMongo from "@/lib/connectDB";
import UserModel from "@/models/user";
import { notFound } from "next/navigation";
import React from "react";

async function UserProfile({ params: { id } }: { params: { id: string } }) {
	await connectMongo();

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

			<div className="mt-10">
				<div className="flex flex-wrap gap-2 mb-2">
					<input
						type="radio"
						name="cate"
						aria-label="Today"
						className="btn"
					/>
					<input
						type="radio"
						name="cate"
						aria-label="30 days"
						className="btn"
					/>
				</div>
				<div className="card bg-base-200">
					<div className="card-body">
						<h3 className="card-title">Activities</h3>
						<ul>
							<li className="flex justify-between gap-5">
								<span className="badge badge-success">
									Signin
								</span>
								<span>12/12/12</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}

export default UserProfile;
