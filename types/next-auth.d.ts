import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			is_admin: boolean;
			email: string;
			name: string;
		} & DefaultSession;
	}

	interface User extends DefaultUser {
		is_admin: boolean;
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		id: string;
		is_admin: boolean;
	}
}
