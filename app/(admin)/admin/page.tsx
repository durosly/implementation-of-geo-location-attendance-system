import ActivitiesListDisplay from "./__components/activities-list-display";

function AdminDashboard() {
	return (
		<>
			<h2>Admin Dashboard</h2>

			<div className="card bg-base-200 mt-10">
				<div className="card-body">
					<h3 className="card-title">Activities</h3>

					<ul className="space-y-2 mt-5">
						<ActivitiesListDisplay />
					</ul>
				</div>
			</div>
		</>
	);
}

export default AdminDashboard;
