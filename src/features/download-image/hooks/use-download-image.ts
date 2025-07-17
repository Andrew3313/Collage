import { downloadImage } from '../services'
import { toast } from 'sonner'

export function useDownloadImage() {
	return async (url: string, filename: string) => {
		try {
			await downloadImage(url, filename)
			toast.success('Изображение успешно загружено 🐶')
		} catch {
			toast.error(
				'Не удалось загрузить изображение, попробуйте еще раз 🐩'
			)
		}
	}
}
