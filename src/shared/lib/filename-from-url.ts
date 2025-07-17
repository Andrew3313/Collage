export function filenameFromUrl(url: string): string {
	const lastSlashIndex = url.lastIndexOf('/')
	const filename = url.substring(lastSlashIndex + 1).trim()

	return filename ? filename : 'Photo'
}
