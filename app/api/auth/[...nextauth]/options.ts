import connectMongo from "@/lib/connectDB";
import { strigifyObj } from "@/lib/utils";
import UserModel, { UserDB } from "@/models/user";
import type { User } from "@/types/user";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
	session: {
		maxAge: 4 * 60 * 60, // 4 hours

		updateAge: 1 * 60 * 60, // 1 hour
	},
	secret: process.env.NEXTAUTH_SECRET,

	providers: [
		CredentialsProvider({
			name: "Credentials",

			credentials: {
				email: {
					label: "E-mail",
					type: "text",
					placeholder: "jsmith@g.c",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, _) {
				await connectMongo();

				const user: UserDB | null = await UserModel.findOne({
					email: credentials?.email,
				});

				if (user) {
					const valid = bcrypt.compareSync(
						credentials?.password || "",
						user.password
					);

					if (!valid) {
						throw new Error("Invalid credentials");
					}
					const userObj = strigifyObj<UserDB, User>(user);
					return {
						id: userObj._id as string,
						email: userObj.email,
						is_admin: userObj.is_admin,
						name: userObj.is_admin ? "admin" : userObj.fullname,
					};
				} else {
					throw new Error("Invalid credentials");
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.is_admin = user.is_admin;
			}
			return token;
		},
		async session({ session, token }) {
			if (session?.user) {
				session.user.id = token.id;
				session.user.is_admin = token.is_admin;
			}
			return session;
		},
	},
	pages: {
		signIn: "/",
	},
};
