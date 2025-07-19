import { IRandomImageResponse } from '../model'

class PhotoService {
	async getRandomPhoto(): Promise<IRandomImageResponse> {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/breeds/image/random`
			)

			if (!response.ok) {
				throw new Error(`Request failed with status ${response.status}`)
			}

			return await response.json()
		} catch (error) {
			console.error(error)
			throw error
		}
	}
}

export const photoService = new PhotoService()
