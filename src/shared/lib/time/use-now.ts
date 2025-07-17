'use client'

import { useEffect, useRef, useState } from 'react'

export function useNow(
	updateInterval: number,
	enabled: boolean,
	cb: (now: number) => void
) {
	const cbRef = useRef(cb)
	cbRef.current = cb

	const [now, setNow] = useState(Date.now())

	useEffect(() => {
		if (!enabled) return

		let timeoutId: ReturnType<typeof setTimeout>
		let last = Date.now()

		const tick = () => {
			const current = Date.now()
			const drift = current - last - updateInterval
			last = current

			setNow(current)
			cbRef.current?.(current)

			timeoutId = setTimeout(tick, Math.max(0, updateInterval - drift))
		}

		timeoutId = setTimeout(tick, updateInterval)

		return () => clearTimeout(timeoutId)
	}, [updateInterval, enabled])

	return now
}
