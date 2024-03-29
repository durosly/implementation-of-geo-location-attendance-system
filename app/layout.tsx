import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import Script from "next/script";
import Head from "next/head";
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
// import "leaflet-defaulticon-compatibility";
import { Toaster } from "react-hot-toast";
import ClientWrapper from "./components/client-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				{/* <Head>
					<link
						rel="stylesheet"
						href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
						integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
						crossOrigin=""
					/>
				</Head> */}
				<ClientWrapper>{children}</ClientWrapper>
				<Toaster />
				{/* <Script
					src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
					integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
					crossOrigin=""
				/> */}
			</body>
		</html>
	);
}
