"use client";
import { handleError } from "@/lib/handleError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { PiSignOut } from "react-icons/pi";

function CheckOut() {
	const queryClient = useQueryClient();
	const toastId = useRef<string | undefined>();

	const { mutate, isPending } = useMutation({
		mutationFn: (data: { latitude: number; longitude: number }) => {
			toastId.current = toast.loading("Signing out attendance...");
			return axios.post(`/api/user/signout`, data);
		},
		onSuccess: () => {
			toast.success("Signup out successful", { id: toastId.current });

			queryClient.invalidateQueries({ queryKey: ["attendance-status"] });
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	function getLocation() {
		// Check if geolocation is available in the browser
		if ("geolocation" in navigator) {
			// Get the user's current location
			navigator.geolocation.getCurrentPosition(
				function (position) {
					// The user's latitude and longitude are in position.coords.latitude and position.coords.longitude
					const latitude = position.coords.latitude;
					const longitude = position.coords.longitude;

					mutate({ latitude, longitude });

					// console.log(
					// 	`Latitude: ${latitude}, Longitude: ${longitude}`

					// );
				},
				function (error) {
					// Handle errors, if any
					switch (error.code) {
						case error.PERMISSION_DENIED:
							toast.error(
								"User denied the request for geolocation.",
								{ id: toastId.current }
							);
							break;
						case error.POSITION_UNAVAILABLE:
							toast.error(
								"Location information is unavailable.",
								{ id: toastId.current }
							);
							break;
						case error.TIMEOUT:
							toast.error(
								"The request to get user location timed out.",
								{ id: toastId.current }
							);
							break;
						default:
							toast.error("An unknown error occurred.", {
								id: toastId.current,
							});
							break;
					}
				}
			);
		} else {
			toast.error("Geolocation is not available in this browser.", {
				id: toastId.current,
			});
		}
	}

	return (
		<div className="mt-5">
			<button
				onClick={getLocation}
				className="btn btn-secondary btn-lg btn-circle"
				disabled={isPending}
			>
				<PiSignOut />
			</button>
		</div>
	);
}

export default CheckOut;
