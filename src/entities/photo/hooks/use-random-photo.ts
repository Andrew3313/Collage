import { photoService } from '../services'
import { useQuery } from '@tanstack/react-query'

export const useRandomPhoto = () => {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['get random photo'],
		queryFn: () => photoService.getRandomPhoto()
	})

	return {
		randomPhoto: data,
		isLoadingRandomPhoto: isLoading,
		errorRandomPhoto: error,
		refetch
	}
}
