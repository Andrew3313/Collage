'use client'

import { useRandomPhoto } from '@/entities/photo/hooks'
import { useNow } from '@/shared/lib/time'
import { useState, useEffect, useCallback } from 'react'

interface ICollageProps {
	isPaused: boolean
	maxPhotos?: number
	intervalMs?: number
}

export function usePhotoCollage({
	isPaused,
	maxPhotos = 10,
	intervalMs = 3000
}: ICollageProps) {
	const [images, setImages] = useState<string[]>([])
	const [lastUpdate, setLastUpdate] = useState<number | null>(null)

	const { randomPhoto, isLoadingRandomPhoto, errorRandomPhoto, refetch } =
		useRandomPhoto()

	const fetchNewPhoto = useCallback(() => {
		refetch()
		setLastUpdate(Date.now())
	}, [refetch])

	useEffect(() => {
		if (randomPhoto && !images.includes(randomPhoto.message)) {
			setImages(prev => {
				const updated = [randomPhoto.message, ...prev]
				return updated.slice(0, maxPhotos)
			})
		}
	}, [randomPhoto, maxPhotos, images])

	useNow(500, !isPaused, now => {
		if (!lastUpdate || now - lastUpdate >= intervalMs) {
			fetchNewPhoto()
		}
	})

	return {
		images,
		isLoading: isLoadingRandomPhoto && images.length === 0,
		error: errorRandomPhoto
	}
}
