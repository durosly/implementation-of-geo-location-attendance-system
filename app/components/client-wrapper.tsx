"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
export const queryClient = new QueryClient();
function ClientWrapper({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</div>
	);
}

export default ClientWrapper;
