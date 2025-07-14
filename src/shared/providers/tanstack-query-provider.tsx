'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type PropsWithChildren, useState } from 'react'

export function TanstackQueryProvider({
	children
}: PropsWithChildren<unknown>) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					staleTime: 0,
					refetchOnWindowFocus: false,
					retry: 3,
					retryDelay: attemptIndex =>
						Math.min(1000 * 2 ** attemptIndex, 30000)
				}
			}
		})
	)

	return (
		<QueryClientProvider client={client}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
