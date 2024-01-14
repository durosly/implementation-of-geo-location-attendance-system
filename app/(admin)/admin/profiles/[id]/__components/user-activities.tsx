"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { handleError } from "@/lib/handleError";
import { CheckIn } from "@/types/checkin";

function UserActivities({ id }: { id: string }) {
	const maxDate = DateTime.now().toISODate();
	const [choice, setChoice] = useState("today");
	const [start_date, setStartDate] = useState("");
	const [end_date, setEndDate] = useState("");

	console.log(id);

	useEffect(() => {
		if (choice !== "interval") {
			setStartDate("");
			setEndDate("");
		}
	}, [choice]);

	function isEnabled() {
		if (choice !== "interval") return true;

		if (start_date && end_date) return true;

		return false;
	}

	const { isPending, isError, data, error } = useQuery({
		queryKey: ["analytics", id, choice, start_date, end_date],
		queryFn: async () => {
			const response = await axios(
				`/api/admin/analytics/account?user=${id}&start=${start_date}&end=${end_date}&choice=${choice}`
			);

			return response.data;
		},
		enabled: isEnabled(),
	});

	const result = data?.data;

	return (
		<div className="mt-10">
			<div className="flex flex-wrap gap-2 mb-2">
				<input
					type="radio"
					name="cate"
					aria-label="Today"
					className="btn"
					checked={choice === "today"}
					onChange={() => setChoice("today")}
				/>
				<input
					type="radio"
					name="cate"
					aria-label="30 days"
					className="btn"
					checked={choice === "30days"}
					onChange={() => setChoice("30days")}
				/>
				<input
					type="radio"
					name="cate"
					aria-label="Interval"
					className="btn"
					checked={choice === "interval"}
					onChange={() => setChoice("interval")}
				/>
			</div>

			{choice === "interval" && (
				<form
					action=""
					className="flex gap-5 flex-wrap my-5"
				>
					<div className="form-control">
						<input
							type="date"
							className="input input-bordered"
							max={maxDate}
							value={start_date}
							onChange={(e) => setStartDate(e.target.value)}
						/>
					</div>
					<div className="form-control">
						<input
							type="date"
							className="input input-bordered"
							max={maxDate}
							value={end_date}
							onChange={(e) => setEndDate(e.target.value)}
						/>
					</div>
				</form>
			)}

			<div className="card bg-base-200">
				<div className="card-body">
					<h3 className="card-title">Activities</h3>

					<ul className="space-y-2">
						{isPending ? (
							Array(5)
								.fill(3)
								.map((num: number, i: number) => (
									<li
										key={i}
										className="h-8 skeleton"
									>
										&nbsp;
									</li>
								))
						) : isError ? (
							<li className="text-error">{handleError(error)}</li>
						) : result && result.length > 0 ? (
							result.map((item: any) => (
								<li
									key={item._id}
									className="flex justify-between gap-5"
								>
									<span
										className={`badge ${
											item.type === "signin"
												? "badge-success"
												: "badge-warning"
										} `}
									>
										{item.type}
									</span>
									<span>
										{new Intl.DateTimeFormat("en-NG", {
											weekday: "long",
											year: "numeric",
											month: "long",
											day: "numeric",
											hour: "numeric",
											minute: "numeric",
											hour12: true,
										}).format(new Date(item.createdAt))}
									</span>
								</li>
							))
						) : (
							<li>No Activity from this user</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default UserActivities;
