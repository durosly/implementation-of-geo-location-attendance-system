"use client";
import { handleError } from "@/lib/handleError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SyntheticEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import { LuTrash } from "react-icons/lu";

function CoordinateForm() {
	const [cordinates, setCordinates] = useState([{ lat: "", log: "" }]);

	function updateLat(value: string, position: number) {
		const newCoords = [...cordinates];
		newCoords[position].lat = value;
		setCordinates(newCoords);
	}

	function updateLog(value: string, position: number) {
		const newCoords = [...cordinates];
		newCoords[position].log = value;
		setCordinates(newCoords);
	}

	function addNewField() {
		setCordinates([...cordinates, { lat: "", log: "" }]);
	}

	function removeField(i: number) {
		const fields = cordinates.slice();
		fields.splice(i, 1);
		setCordinates(fields);
	}

	const queryClient = useQueryClient();
	const toastId = useRef<string | undefined>();

	const { mutate, isPending } = useMutation({
		mutationFn: (data: { lat: string; log: string }[]) => {
			toastId.current = toast.loading("Setting coordinate...");
			return axios.post(`/api/admin/coordinate`, data);
		},
		onSuccess: () => {
			setCordinates([{ lat: "", log: "" }]);
			toast.success("Coordinates defined successful", {
				id: toastId.current,
			});

			queryClient.invalidateQueries({ queryKey: ["coordinate"] });
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
		e.preventDefault();

		mutate(cordinates);
	}

	return (
		<form
			action=""
			className="card bg-base-200 mt-10"
			onSubmit={handleSubmit}
		>
			<div className="card-body">
				<div>
					<p className="italic text-sm">
						Enter coordinates in clockwise or anticlockwise fashion.
						Atleast three coordinates are required
					</p>
				</div>

				{cordinates.map((c, i) => (
					<div
						key={i}
						className="form-control flex-row items-center flex-wrap gap-2"
					>
						<input
							type="number"
							className="input input-bordered"
							placeholder="Latitude"
							value={c.lat}
							onChange={(e) => updateLat(e.target.value, i)}
							required
							disabled={isPending}
						/>
						<input
							type="number"
							className="input input-bordered"
							placeholder="Longitude"
							value={c.log}
							onChange={(e) => updateLog(e.target.value, i)}
							required
							disabled={isPending}
						/>
						<button
							onClick={() => removeField(i)}
							type="button"
							className="btn btn-sm btn-error btn-square btn-outline"
							disabled={isPending}
						>
							<LuTrash />
						</button>
					</div>
				))}
				<div>
					<button
						onClick={addNewField}
						type="button"
						className="btn btn-square btn-sm btn-outline"
						disabled={isPending}
					>
						<IoMdAdd />
					</button>
				</div>
				<button
					disabled={isPending}
					className="btn btn-primary btn-block"
				>
					Set coordinates
				</button>
			</div>
		</form>
	);
}

export default CoordinateForm;
