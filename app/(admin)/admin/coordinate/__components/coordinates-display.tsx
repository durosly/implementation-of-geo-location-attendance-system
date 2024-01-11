"use client";

import { handleError } from "@/lib/handleError";
import { Cordinate } from "@/types/coordinate";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function CoordinateDisplay() {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["coordinate"],
		queryFn: async () => {
			const response = await axios(`/api/admin/coordinate`);
			return response.data;
		},
	});

	const ordinate = data?.data;

	return (
		<div className="card bg-base-200 mt-20">
			<div className="card-body">
				<ul className="list-inside">
					{isPending ? (
						Array(4)
							.fill(2)
							.map((item: number, i: number) => (
								<li
									key={i}
									className="h-7 skeleton"
								>
									&nbsp;
								</li>
							))
					) : isError ? (
						<li>{handleError(error)}</li>
					) : ordinate && ordinate.length > 0 ? (
						ordinate.map((item: Cordinate, i: number) => (
							<li
								className="list-item"
								key={`${JSON.stringify(item)}-${i}`}
							>
								{item.lat}, {item.log}
							</li>
						))
					) : (
						<li>No coordinates found</li>
					)}
				</ul>
			</div>
		</div>
	);
}

export default CoordinateDisplay;
