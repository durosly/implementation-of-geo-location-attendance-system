"use client";

import { handleError } from "@/lib/handleError";
import { CheckIn } from "@/types/checkin";
import { CheckOut } from "@/types/checkout";
import { Cordinate } from "@/types/coordinate";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

function ActivitiesListDisplay() {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["activities"],
		queryFn: async () => {
			const response = await axios(`/api/admin/activities`);
			return response.data;
		},
	});

	const activities = data?.data;

	console.log(activities);

	return (
		<>
			{isPending ? (
				Array(5)
					.fill(2)
					.map((item: number, i: number) => (
						<li
							key={i}
							className="h-8 skeleton"
						>
							&nbsp;
						</li>
					))
			) : isError ? (
				<li>{handleError(error)}</li>
			) : activities && activities.length > 0 ? (
				activities.map((act: any) => (
					<li
						key={act._id}
						className="flex items-center flex-wrap justify-between"
					>
						<div className="flex gap-2 items-center">
							<Link
								href={`/admin/profile/${act.user._id}`}
								className="link link-hover"
							>
								{act.user.fullname}
							</Link>
							<span
								className={`badge badge-sm ${
									act.type === "signin"
										? "badge-success"
										: "badge-warning"
								}`}
							>
								{act.type}
							</span>
						</div>
						<span>
							{new Intl.DateTimeFormat("en-NG", {
								weekday: "long",
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "numeric",
								minute: "numeric",
								hour12: true,
							}).format(new Date(act.createdAt))}
						</span>
					</li>
				))
			) : (
				<li>No activities today</li>
			)}
		</>
	);
}

export default ActivitiesListDisplay;
