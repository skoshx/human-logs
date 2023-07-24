export type TemplatedMessage = {
	template: string
	params: Record<string, string>
}

export type EventType = TemplatedMessage

export type ActionType = {
	text: string
	href: string
}

export type SolutionType = TemplatedMessage & {
	action?: ActionType[]
}

export type HumanLogsObject = {
	events: Record<string, EventType | string>
	explanations: Record<string, EventType | string>
	solutions: Record<string, SolutionType | string>
}

export type HumanLogResponse = {
	message: string
	action?: ActionType[]
}
