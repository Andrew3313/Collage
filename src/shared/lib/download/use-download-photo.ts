import { downloadPhoto } from './download-photo'
import { toast } from 'sonner'

export function useDownloadPhoto() {
	return async (url: string, filename: string) => {
		try {
			await downloadPhoto(url, filename)
			toast.success('Изображение успешно загружено 🐶')
		} catch {
			toast.error(
				'Не удалось загрузить изображение, попробуйте еще раз 🐩'
			)
		}
	}
}
