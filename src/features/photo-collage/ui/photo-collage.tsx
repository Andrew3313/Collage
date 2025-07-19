'use client'

import { PhotoCard } from '@/entities/photo/ui'
import { Skeleton } from '@/shared/components'
import { memo } from 'react'

interface IPhotoCollageProps {
	images: string[]
	isLoading: boolean
	onImageClick: (imageUrl: string) => void
}

function PhotoCollageComponent({
	images,
	isLoading,
	onImageClick
}: IPhotoCollageProps) {
	if (isLoading && images.length === 0) {
		return (
			<div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
				{Array.from({ length: 5 }).map((_, index) => (
					<Skeleton
						key={index}
						className='aspect-square rounded-lg'
						variant='pulse'
						style={{
							animationDelay: `${index * 0.1}s`
						}}
					/>
				))}
			</div>
		)
	}

	return (
		<div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
			{images.map((imageUrl, index) => (
				<div
					key={`${imageUrl}-${index}`}
					className='animate-fade-in-up opacity-0'
					style={{
						animationDelay: `${index * 0.05}s`,
						animationFillMode: 'forwards'
					}}
				>
					<PhotoCard
						src={imageUrl}
						alt={`Photo ${index + 1}`}
						onClick={() => onImageClick(imageUrl)}
						className='aspect-square cursor-pointer rounded-lg object-cover'
					/>
				</div>
			))}
		</div>
	)
}

export const PhotoCollage = memo(PhotoCollageComponent)
