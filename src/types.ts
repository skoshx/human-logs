export type ActionType = {
	text: string
	href?: string
}

import type { UnionToIntersection } from 'type-fest'

// Utility type to broaden literal types to their primitive types
export type Broaden<T> = {
	[K in keyof T]: T[K] extends string
		? string
		: T[K] extends number
		? number
		: T[K] extends boolean
		? boolean
		: T[K] extends undefined
		? undefined
		: T[K] extends object
		? Broaden<T[K]>
		: T[K]
}

// Helper to extract params from a single solution and broaden the types
export type ExtractParams<T> = T extends { params: infer P } ? Broaden<P> : never

// Revised CombineParams type
export type CombineParams<
	T extends ReadonlyArray<{ name: string; params?: any }>,
	Names extends ReadonlyArray<T[number]['name']>
> = UnionToIntersection<
	{
		[K in Names[number]]: ExtractParams<Extract<T[number], { name: K }>>
	}[Names[number]]
>

export type LogObject = {
	type: 'event' | 'explanation' | 'solution'
	name: string
	message: string
	params?: Record<string, string | number | Date | boolean>
	actions?: ActionType[]
}

export type CreateHumanLogsOptions = {
	formatter?: Formatter
}

export type Formatter = <LogParts extends LogObject[]>(logParts: LogParts) => string
