/**
 * @fileoverview TanStack Query provider for the application.
 *
 * Wraps the app with QueryClientProvider for data fetching and caching.
 *
 * @module components/QueryProvider
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

/**
 * QueryClient instance with default options.
 */
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Stale time: 1 minute
            staleTime: 1000 * 60,
            // Cache time: 5 minutes
            gcTime: 1000 * 60 * 5,
            // Retry failed requests twice
            retry: 2,
            // Refetch on window focus
            refetchOnWindowFocus: true,
        },
    },
});

interface QueryProviderProps {
    children: ReactNode;
}

/**
 * Query provider component.
 *
 * Wraps children with TanStack Query's QueryClientProvider.
 */
export function QueryProvider({ children }: QueryProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
