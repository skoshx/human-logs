import { ReactNode } from 'react'

export type withChildren = { children?: ReactNode }

export function Subtitle({ children }: withChildren) {
	return <h2 className="font-medium text-neutral-900">{children}</h2>
}
