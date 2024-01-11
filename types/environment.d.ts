export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXTAUTH_SECRET: string;
			NEXTAUTH_URL: string;
			ENV: "test" | "dev" | "prod";
			MONGODB_URL: string;
		}
	}
}
