"use client";

import { handleError } from "@/lib/handleError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
	fullname: string;
	department: string;
	email: string;
	password: string;
	college: string;
};

function AddProfileForm() {
	const { register, reset, handleSubmit } = useForm<Inputs>();

	const queryClient = useQueryClient();
	const toastId = useRef<string | undefined>();

	const { mutate, isPending } = useMutation({
		mutationFn: (data: Inputs) => {
			toastId.current = toast.loading("Adding new profile...");
			return axios.post(`/api/admin/profile`, data);
		},
		onSuccess: () => {
			toast.success("Profile added successful", {
				id: toastId.current,
			});

			queryClient.invalidateQueries({ queryKey: ["profile"] });

			reset();
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	return (
		<form
			action=""
			className="card bg-base-200 mt-10"
			onSubmit={handleSubmit((data) => mutate(data))}
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
						{...register("fullname", { required: true })}
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
						{...register("email", { required: true })}
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
						{...register("college", { required: true })}
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
						{...register("department", { required: true })}
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
						{...register("password", { required: true })}
					/>
				</div>
				<button
					disabled={isPending}
					className="btn btn-primary"
				>
					Add profile
				</button>
			</div>
		</form>
	);
}

export default AddProfileForm;
