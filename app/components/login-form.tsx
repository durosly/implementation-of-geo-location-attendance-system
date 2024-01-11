"use client";
import { handleError } from "@/lib/handleError";
import { signIn } from "next-auth/react";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
	email: string;
	password: string;
};

function LoginForm() {
	const router = useRouter();
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { register, handleSubmit } = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		if (isLoading) return;
		setError("");
		setIsLoading(true);
		const toastId = toast.loading("Logging in...");
		try {
			const res = await signIn("credentials", {
				redirect: false,
				...data,
			});

			if (res && res.ok && !res.error) {
				toast.success("Login successful", { id: toastId });
				router.push("/user");
				router.refresh();
			} else {
				throw new Error(res?.error || "Something went wrong");
			}
		} catch (error) {
			const message = handleError(error);
			toast.error(message, { id: toastId });
			setIsLoading(false);
			setError(message);
		}
	};

	return (
		<form
			className="card-body"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="form-control">
				<label className="label">
					<span className="label-text">Email</span>
				</label>
				<input
					type="email"
					placeholder="email"
					className="input input-bordered"
					{...register("email", { required: true })}
				/>
			</div>
			<div className="form-control">
				<label className="label">
					<span className="label-text">Password</span>
				</label>
				<input
					type="password"
					placeholder="password"
					className="input input-bordered"
					{...register("password", { required: true })}
				/>
				{/* <label className="label">
					<a
						href="#"
						className="label-text-alt link link-hover"
					>
						Forgot password?
					</a>
				</label> */}
			</div>
			{error && <p className="text-error my-2 text-sm">{error}</p>}
			<div className="form-control mt-6">
				<button
					disabled={isLoading}
					className="btn btn-primary"
				>
					Login
				</button>
			</div>
		</form>
	);
}

export default LoginForm;
