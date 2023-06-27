import type { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
	type: 'gradient' | 'solid' | 'error' | 'info' | 'success'
}

export function Button({ type, color, className, children, ...props }: ButtonProps) {
	function getBackgroundClassByType() {
		if (type === 'error') return 'bg-gradient-to-b bg-red-400 from-red-400 to-red-600'
		if (type === 'gradient') return 'bg-gradient-to-b from-gray-100 to-gray-300'
		if (type === 'info') return 'bg-gradient-to-b from-gray-100 to-gray-300'
		if (type === 'success') return 'bg-gradient-to-b from-green-400 to-teal-600'
		return 'bg-gradient-to-b from-gray-900 to-gray-800'
	}
	return (
		<button
			className={twMerge(
				'h-9 text-xs font-semibold px-9 text-white rounded-xl bg-gradient-to-b from-gray-900 to-gray-800 cursor-pointer flex items-center justify-center',
				getBackgroundClassByType()
			)}
			{...props}
		>
			{children}
		</button>
	)
}
