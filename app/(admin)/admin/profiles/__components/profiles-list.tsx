"use client";
import { handleError } from "@/lib/handleError";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

function ProfilesList() {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const response = await axios(`/api/admin/profile`);
			return response.data;
		},
	});

	const profiles = data?.data;

	console.log(profiles);

	return (
		<>
			{isPending ? (
				Array(4)
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
				<li>{handleError(error)}</li>
			) : profiles && profiles.length > 0 ? (
				profiles.map((profile: User) => (
					<li
						key={profile._id}
						className="flex justify-between gap-5 flex-wrap"
					>
						<Link href={`/admin/profiles/${profile._id}`}>
							{profile.fullname}
						</Link>
						<span>
							{new Intl.DateTimeFormat("en-NG", {
								weekday: "long",
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "numeric",
								minute: "numeric",
								hour12: true,
							}).format(new Date(profile.createdAt))}
						</span>
					</li>
				))
			) : (
				<li>No profiles yet</li>
			)}
		</>
	);
}

export default ProfilesList;
