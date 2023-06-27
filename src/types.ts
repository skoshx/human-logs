export type TemplatedMessage = {
	template: string
	params: Record<string, string>
}

export type EventType = TemplatedMessage | string

export type ActionType = {
	text: string
	href: string
}

export type SolutionType =
	| (TemplatedMessage & {
			action?: ActionType[]
	  })
	| {
			message: string
			action?: ActionType[]
	  }

export type HumanLogsObject = {
	events: Record<string, EventType>
	explanations: Record<string, EventType>
	solutions: Record<string, SolutionType>
}

export type HumanLogResponse = {
	message: string
	action?: ActionType[]
}
