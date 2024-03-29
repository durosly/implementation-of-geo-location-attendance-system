import LoginForm from "./components/login-form";

export default function Home() {
	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content flex-col ">
				<div className="text-center lg:text-left">
					<h1 className="text-5xl font-bold">Login now!</h1>
					<p className="py-6">Login to signin or signout</p>
				</div>
				<div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<LoginForm />
				</div>
			</div>
		</div>
	);
}
