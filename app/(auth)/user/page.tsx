import { getServerSession } from "next-auth";
import StatusWrapper from "./__components/status-wrapper";
import { options } from "../../api/auth/[...nextauth]/options";

async function UserDashboard() {
	const session = await getServerSession(options);

	return (
		<div className="text-center mt-10">
			<div className=" mb-20">
				<h2>Welcome, {session?.user.name || "nil"}</h2>
				<StatusWrapper />
			</div>

			<div
				role="alert"
				className="alert "
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					className="stroke-info shrink-0 w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					></path>
				</svg>
				<div>
					<h3 className="font-bold">Note!</h3>
					<div className="text-xs text-justify">
						If you are within designated area and stil get a
						designation error, your mobile location is not precise
						and requires re-calibration. Visit google maps to help
						you re-calibrate.
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserDashboard;
