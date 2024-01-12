"use client";
import { signOut } from "next-auth/react";

function LogoutBtn({
	className,
	children,
}: {
	className: string;
	children: React.ReactNode;
}) {
	return (
		<span
			onClick={() => signOut()}
			className={className}
		>
			{children}
		</span>
	);
}

export default LogoutBtn;
