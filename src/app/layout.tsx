import { Container } from '@/shared/components'
import { MainProvider } from '@/shared/providers'
import '@/shared/styles/globals.css'
import { FooterWidget } from '@/widgets/footer'
import { HeaderWidget } from '@/widgets/header'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({
	subsets: ['latin', 'cyrillic']
})

export const metadata: Metadata = {
	title: 'Pawllage',
	description:
		'Коллаж милых фотографий животных, обновляемый в реальном времени.'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru' suppressHydrationWarning>
			<body
				className={`${inter.className} flex min-h-screen flex-col antialiased`}
			>
				<MainProvider>
					<HeaderWidget />
					<main className='relative mb-4 flex-grow px-2'>
						<Container>{children}</Container>
					</main>
					<FooterWidget />

					<div id='modal-root' />
				</MainProvider>
			</body>
		</html>
	)
}
