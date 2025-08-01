'use client'

import { Skeleton } from '@/shared/components'
import { cn } from '@/shared/lib'
import Image from 'next/image'
import { memo, useState } from 'react'

interface IPhotoCardProps {
	src: string
	alt: string
	onClick?: () => void
	className?: string
}

export function PhotoCardComponent({
	src,
	alt,
	onClick,
	className
}: IPhotoCardProps) {
	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)

	const handleClick = () => {
		if (onClick && !isLoading && !hasError) {
			onClick()
		}
	}

	if (hasError) {
		return (
			<div
				className={cn(
					'flex min-h-[200px] flex-col items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 p-4 text-sm text-gray-500 transition-colors duration-300',
					className
				)}
			>
				<div className='mb-2 text-2xl'>🐕</div>
				<p>Ошибка загрузки</p>
			</div>
		)
	}

	return (
		<div
			className='group relative cursor-pointer overflow-hidden rounded-lg'
			onClick={handleClick}
		>
			{isLoading && (
				<Skeleton
					className={cn('absolute inset-0 z-10', className)}
					variant='pulse'
				/>
			)}

			<div
				className={cn(
					'transition-all duration-500 ease-out',
					isLoading ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
				)}
			>
				<Image
					src={src}
					alt={alt}
					width={400}
					height={400}
					className={cn(
						'transition-all duration-300 group-hover:scale-110',
						className
					)}
					onLoad={() => setIsLoading(false)}
					onError={() => {
						setIsLoading(false)
						setHasError(true)
					}}
				/>
			</div>

			<div className='absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100'>
				<div className='rounded-full bg-black/50 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm'>
					Посмотреть
				</div>
			</div>
		</div>
	)
}

export const PhotoCard = memo(PhotoCardComponent)
