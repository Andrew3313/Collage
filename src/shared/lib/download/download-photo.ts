export async function downloadPhoto(
	url: string,
	filename: string
): Promise<void> {
	const response = await fetch(url)

	if (!response.ok) {
		throw new Error(
			`Failed to fetch image: ${response.status} ${response.statusText}`
		)
	}

	const blob = await response.blob()
	const downloadUrl = URL.createObjectURL(blob)

	const link = document.createElement('a')
	link.href = downloadUrl
	link.download = filename
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)

	URL.revokeObjectURL(downloadUrl)
}
