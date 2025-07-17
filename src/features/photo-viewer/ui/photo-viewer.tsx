'use client'

import { Button, Modal, Skeleton } from '@/shared/components'
import { filenameFromUrl, useDownloadPhoto } from '@/shared/lib'
import { Download, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface IPhotoViewerProps {
	imageUrl: string
	onClose: () => void
}

export function PhotoViewer({ imageUrl, onClose }: IPhotoViewerProps) {
	const [isDownloading] = useState(false)
	const [imageLoading, setImageLoading] = useState(true)

	const download = useDownloadPhoto()

	const handleDownload = () => {
		download(imageUrl, filenameFromUrl(imageUrl))
	}

	return (
		<Modal onClose={onClose} title='Просмотр'>
			<div className='relative mb-4 flex h-[60vh] w-[80vw] items-center justify-center sm:h-[70vh] sm:w-[60vw]'>
				{imageLoading && (
					<Skeleton className='h-full w-[90%]' variant='pulse' />
				)}
				<Image
					src={imageUrl}
					alt='View photo'
					fill
					className='max-h-full max-w-full object-contain'
					priority
					onLoad={() => setImageLoading(false)}
					onError={() => setImageLoading(false)}
				/>
			</div>
			<div className='flex items-center justify-center'>
				<Button
					className='cursor-pointer focus-visible:ring-0'
					onClick={handleDownload}
					disabled={isDownloading}
				>
					{isDownloading ? (
						<Loader2 className='!h-4 !w-4 animate-spin' />
					) : (
						<>
							<span>Скачать</span>
							<Download className='ml-2' />
						</>
					)}
				</Button>
			</div>
		</Modal>
	)
}
