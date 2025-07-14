import { MainProvider } from '@/shared/providers'
import '@/shared/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({
	subsets: ['latin', 'cyrillic']
})

export const metadata: Metadata = {
	title: 'Pawllage',
	description:
		'Милый коллаж фотографий собак, обновляемый в реальном времени.'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru' suppressHydrationWarning>
			<body className={`${inter.className} antialiased`}>
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	)
}
