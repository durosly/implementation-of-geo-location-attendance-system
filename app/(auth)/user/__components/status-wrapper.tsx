"use client";

import { handleError } from "@/lib/handleError";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CheckIn from "./check-in";
import CheckOut from "./check-out";
import { GoThumbsup } from "react-icons/go";

function StatusWrapper() {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["attendance-status"],
		queryFn: async () => {
			const response = await axios(`/api/user/status`);
			return response.data;
		},
	});

	const status = data?.data;

	return (
		<div className="mt-10">
			{isPending ? (
				<div className="w-20 h-20 mx-auto rounded-full skeleton"></div>
			) : isError ? (
				<p>{handleError(error)}</p>
			) : status ? (
				status === "new" ? (
					<CheckIn />
				) : status === "signed-in" ? (
					<CheckOut />
				) : (
					<div className="">
						<div className="w-20 h-20 mx-auto rounded-full border text-success border-success flex justify-center items-center">
							<GoThumbsup className="w-10 h-10" />
						</div>
						<p>Attendance for today is complete</p>
					</div>
				)
			) : null}
		</div>
	);
}

export default StatusWrapper;
