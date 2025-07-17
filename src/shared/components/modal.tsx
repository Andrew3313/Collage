'use client'

import { Button } from './ui'
import { X } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface IModalProps {
	onClose: () => void
	children: React.ReactNode
	title?: string
}

export function Modal({ onClose, children, title }: IModalProps) {
	const modalRef = useRef<HTMLDivElement | null>(null)

	const handleOutsideClick = useCallback(
		(e: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(e.target as Node)
			) {
				onClose()
			}
		},
		[onClose]
	)

	const handleEscKey = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
			}
		},
		[onClose]
	)

	useEffect(() => {
		document.body.style.overflow = 'hidden'
		window.addEventListener('click', handleOutsideClick, true)
		window.addEventListener('keydown', handleEscKey)

		return () => {
			document.body.style.overflow = ''
			window.removeEventListener('click', handleOutsideClick, true)
			window.removeEventListener('keydown', handleEscKey)
		}
	}, [handleOutsideClick, handleEscKey])

	const modalRoot = document.getElementById('modal-root')

	return modalRoot
		? createPortal(
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
					<div
						ref={modalRef}
						className='bg-background scrollbar-hide max-h-[90vh] max-w-4xl scale-95 animate-[fadeIn_200ms_ease-out_forwards] overflow-y-auto rounded-lg border p-4 opacity-0 shadow-xl'
						role='dialog'
						aria-modal='true'
					>
						<div className='mb-4 flex items-center justify-between'>
							{title && (
								<h2 className='text-lg font-semibold uppercase'>
									{title}
								</h2>
							)}
							<Button
								variant='ghost'
								onClick={onClose}
								aria-label='Close modal'
								className='cursor-pointer focus-visible:ring-0'
							>
								<X className='!h-4 !w-4' />
							</Button>
						</div>
						{children}
					</div>
				</div>,
				modalRoot
			)
		: null
}
