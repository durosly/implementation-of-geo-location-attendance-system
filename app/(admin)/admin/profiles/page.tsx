import AddProfileForm from "./__components/add-profile-form";
import ProfilesList from "./__components/profiles-list";

function Profiles() {
	return (
		<>
			<h2>Profiles</h2>

			<AddProfileForm />

			<div className="card mt-10 bg-base-200">
				<div className="card-body">
					<h2 className="card-title">Profiles</h2>
					<ul className="space-y-2">
						<ProfilesList />
					</ul>
				</div>
			</div>
		</>
	);
}

export default Profiles;
