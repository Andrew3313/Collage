import { cn } from '../lib'
import type React from 'react'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: 'default' | 'shimmer' | 'pulse'
}

export function Skeleton({
	className,
	variant = 'shimmer',
	...props
}: SkeletonProps) {
	return (
		<div
			className={cn(
				'bg-muted relative overflow-hidden rounded-md',
				{
					'animate-pulse': variant === 'pulse',
					'shimmer dark:shimmer-dark': variant === 'shimmer'
				},
				className
			)}
			{...props}
		>
			{variant === 'shimmer' && (
				<div className='absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/10' />
			)}
		</div>
	)
}
