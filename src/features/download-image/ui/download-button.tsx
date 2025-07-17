'use client'

import { Button } from '@/shared/components'
import { Download, Loader2 } from 'lucide-react'

interface IDownloadButtonProps {
	handleDownload: () => void
	isDownloading: boolean
}

export function DownloadButton({
	handleDownload,
	isDownloading
}: IDownloadButtonProps) {
	return (
		<Button
			variant='ghost'
			size='icon'
			className='focus-visible:ring-0'
			onClick={handleDownload}
			disabled={isDownloading}
		>
			{isDownloading ? (
				<Loader2 className='!h-4 !w-4 animate-spin' />
			) : (
				<Download className='!h-4 !w-4' />
			)}
		</Button>
	)
}
