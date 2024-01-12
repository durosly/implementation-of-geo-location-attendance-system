import Link from "next/link";

function Profiles() {
	return (
		<>
			<h2>Profiles</h2>

			<form
				action=""
				className="card bg-base-200 mt-10"
			>
				<div className="card-body">
					<h3 className="card-title">Add new profile</h3>
					<div className="form-control">
						<label
							htmlFor="fullname"
							className="label"
						>
							Fullname
						</label>
						<input
							id="fullname"
							type="text"
							className="input input-bordered"
						/>
					</div>
					<div className="form-control">
						<label
							htmlFor="email"
							className="label"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							className="input input-bordered"
						/>
					</div>
					<div className="form-control">
						<label
							htmlFor="college"
							className="label"
						>
							College
						</label>
						<input
							id="college"
							type="text"
							className="input input-bordered"
						/>
					</div>
					<div className="form-control">
						<label
							htmlFor="department"
							className="label"
						>
							Department
						</label>
						<input
							id="department"
							type="text"
							className="input input-bordered"
						/>
					</div>
					<div className="form-control">
						<label
							htmlFor="password"
							className="label"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							className="input input-bordered"
						/>
					</div>
					<button className="btn btn-primary">Add profile</button>
				</div>
			</form>

			<div className="card mt-10 bg-base-200">
				<div className="card-body">
					<h2 className="card-title">Profiles</h2>
					<ul className="space-y-2">
						<li className="flex justify-between gap-5 flex-wrap">
							<Link href={`/admin/profiles/${"user-id"}`}>
								John Doe
							</Link>
							<span>12/12/12</span>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}

export default Profiles;
