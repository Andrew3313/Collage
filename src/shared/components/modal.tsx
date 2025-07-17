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
				<div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
					<div
						ref={modalRef}
						className='max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl'
						role='dialog'
						aria-modal='true'
					>
						<div className='mb-4 flex items-center justify-between'>
							{title && (
								<h2 className='text-xl font-semibold'>
									{title}
								</h2>
							)}
							<Button onClick={onClose} aria-label='Close modal'>
								<X className='h-4 w-4' />
							</Button>
						</div>
						<div>{children}</div>
					</div>
				</div>,
				modalRoot
			)
		: null
}
