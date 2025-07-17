'use client'

import { useCollage } from '@/features/collage/hooks'
import { PhotoCollage } from '@/features/collage/ui'
import { PhotoViewer } from '@/features/photo-viewer/ui'
import { useState, useCallback } from 'react'

export function Collage() {
	const [selectedImage, setSelectedImage] = useState<string | null>(null)
	const { images, isLoading, error } = useCollage({
		isPaused: !!selectedImage
	})

	const handleImageClick = useCallback((imageUrl: string) => {
		setSelectedImage(imageUrl)
	}, [])

	const handleCloseViewer = useCallback(() => {
		setSelectedImage(null)
	}, [])

	if (error) {
		return (
			<div className='py-12 text-center'>
				<div className='animate-fade-in-scale'>
					<div className='mb-4 text-6xl'>🐕‍🦺</div>
					<p className='mb-4 text-lg text-red-600 transition-colors duration-300 dark:text-red-400'>
						Ошибка загрузки фотографий
					</p>
					<p className='text-gray-600 transition-colors duration-300 dark:text-gray-300'>
						Попробуйте обновить страницу
					</p>
				</div>
			</div>
		)
	}

	return (
		<>
			<PhotoCollage
				images={images}
				isLoading={isLoading}
				onImageClick={handleImageClick}
			/>
			{selectedImage && (
				<PhotoViewer
					imageUrl={selectedImage}
					onClose={handleCloseViewer}
				/>
			)}
		</>
	)
}
