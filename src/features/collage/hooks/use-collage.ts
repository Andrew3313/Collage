'use client'

import { useRandomPhoto } from '@/entities/photo-card/hooks'
import { useState, useEffect, useCallback, useRef } from 'react'

interface ICollageProps {
	isPaused: boolean
	maxPhotos?: number
	intervalMs?: number
}

export function useCollage({
	isPaused,
	maxPhotos = 10,
	intervalMs = 3000
}: ICollageProps) {
	const [images, setImages] = useState<string[]>([])
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	const { randomPhoto, isLoadingRandomPhoto, errorRandomPhoto, refetch } =
		useRandomPhoto()

	const fetchNewPhoto = useCallback(() => {
		refetch()
	}, [refetch])

	useEffect(() => {
		if (randomPhoto && !images.includes(randomPhoto.message)) {
			setImages(prev => {
				const updated = [randomPhoto.message, ...prev]
				return updated.slice(0, maxPhotos)
			})
		}
	}, [randomPhoto, maxPhotos, images])

	useEffect(() => {
		if (isPaused) {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
				intervalRef.current = null
			}
			return
		}

		intervalRef.current = setInterval(() => {
			fetchNewPhoto()
		}, intervalMs)

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
				intervalRef.current = null
			}
		}
	}, [isPaused, intervalMs, fetchNewPhoto])

	return {
		images,
		isLoading: isLoadingRandomPhoto && images.length === 0,
		error: errorRandomPhoto
	}
}
