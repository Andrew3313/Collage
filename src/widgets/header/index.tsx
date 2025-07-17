import { ToggleTheme } from '@/shared/components'

export function HeaderWidget() {
	return (
		<header className='mb-8 flex flex-col gap-4 px-4 pt-4'>
			<div className='flex flex-wrap items-center justify-center gap-4'>
				<h1 className='text-4xl font-bold text-gray-800 transition-colors duration-300 dark:text-gray-100'>
					🐕 Pawllage
				</h1>

				<ToggleTheme />
			</div>
			<h2 className='text-center text-gray-600 transition-colors duration-300 dark:text-gray-300'>
				Фотографии обновляются каждые 3 секунды
			</h2>
		</header>
	)
}
