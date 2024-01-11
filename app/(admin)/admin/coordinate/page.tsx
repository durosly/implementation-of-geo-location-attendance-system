import React from "react";
import CoordinateForm from "./__components/coordinate-form";
import CoordinateDisplay from "./__components/coordinates-display";
// import MapDisplay from "./__components/map";

function AdminCoordinatePage() {
	return (
		<>
			<h1>Coordinates</h1>
			{/* <div className="h-[500px] relative">
				<MapDisplay />
			</div> */}

			<CoordinateForm />

			<CoordinateDisplay />
		</>
	);
}

export default AdminCoordinatePage;
