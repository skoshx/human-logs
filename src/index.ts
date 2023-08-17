/**
 * Good log messages increases customer satisfaction, as they work as sort of a guide, helping the user achieve what they wanted to achieve.
 * Good logs minimize the amount of support calls, improve customer satisfaction and trust in your product, ultimately being a win-win
 * for both the creators of software and the users.
 *
 * Inspired by Vercel's Error design framework (https://vercel.com/design/error#error-design-framework), human-logs allows you to
 * take events, explanations and solutions, and connect them like lego-pieces, to create user-friendly logs in a
 * versatile manner.
 *
 * Focus on understanding the errors.
 *
 */

import { ActionType, HumanLogsObject, SolutionType, TemplatedMessage } from './types'

function replaceTemplateParams(input: TemplatedMessage, params: HumanLogsObject['params']): string {
	let result = input.template
	for (const key in params) {
		const value = params[key] as string
		const placeholder = `{${key}}`
		result = result.split(placeholder).join(value)
	}
	return result
}

function isTemplatedMessage(
	solution: string | Record<string, unknown>
): solution is TemplatedMessage {
	if (typeof solution === 'string') return false
	if (solution.template) return true
	return false
}

function isSolutionType(solution: string | Record<string, unknown>): solution is SolutionType {
	if (typeof solution === 'string') return false
	if (solution.actions) return true
	return false
}

function getMessagePartsFor<HumanLogs extends HumanLogsObject>(
	what: keyof HumanLogsObject,
	options: HumanLogs,
	eventKey: string,
	params: HumanLogs['params']
) {
	const messageParts: string[] = []
	const eventTypeOrString = options[what]![eventKey] as
		| string
		| TemplatedMessage
		| SolutionType
		| undefined
	if (!eventTypeOrString) {
		return messageParts
	}

	if (isTemplatedMessage(eventTypeOrString)) {
		messageParts.push(replaceTemplateParams(eventTypeOrString, params))
	} else {
		messageParts.push(eventTypeOrString)
	}

	return messageParts
}

export function createHumanLogs<HumanLogs extends HumanLogsObject>(options: HumanLogs) {
	type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
		k: infer I
	) => void
		? I
		: never
	type Explanations = HumanLogs['explanations']
	type Events = HumanLogs['events']
	type Solutions = HumanLogs['solutions']
	type Params<K extends Array<keyof Explanations>> = UnionToIntersection<
		{
			[I in keyof K]: Explanations[K[I]] extends { params: infer P } ? P : never
		}[number]
	>
	type EventsParams<K extends Array<keyof Events>> = UnionToIntersection<
		{
			[I in keyof K]: Events[K[I]] extends { params: infer P } ? P : never
		}[number]
	>
	type SolutionParams<K extends Array<keyof Solutions>> = UnionToIntersection<
		{
			[I in keyof K]: Solutions[K[I]] extends { params: infer P } ? P : never
		}[number]
	>

	return function <
		Events extends keyof HumanLogs['events'],
		Explanations extends keyof HumanLogs['explanations'],
		Solutions extends keyof HumanLogs['solutions']
	>({
		events,
		explanations,
		solutions,
		params
	}: {
		events?: Events[]
		explanations?: Explanations[]
		solutions?: Solutions[]
		params?: Params<Explanations[]> & EventsParams<Events[]> & SolutionParams<Solutions[]>
	}) {
		const eventParts: string[] = []
		const explanationParts: string[] = []
		const solutionParts: string[] = []
		const actionParts: ActionType[] = []

		const addEventParts = (events: Events[]) => {
			events.forEach((event) => {
				eventParts.push(
					...getMessagePartsFor('events', options, event as string, params as HumanLogs['params'])
				)
			})
		}

		const addExplanationParts = (explanations: Explanations[]) => {
			explanations?.forEach((explanation) => {
				explanationParts.push(
					...getMessagePartsFor(
						'explanations',
						options,
						explanation as string,
						params as HumanLogs['params']
					)
				)
			})
		}

		const addSolutionParts = (solutions: Solutions[]) => {
			solutions?.forEach((solution) => {
				solutionParts.push(
					...getMessagePartsFor(
						'solutions',
						options,
						solution as string,
						params as HumanLogs['params']
					)
				)

				const solutionOrString = options.solutions[solution as string]
				if (!solutionOrString) {
					return
				}
				if (isSolutionType(solutionOrString) && solutionOrString.actions) {
					actionParts.push(...solutionOrString.actions)
				}
			})
		}

		// Events
		if (events) addEventParts(events)

		// Explanations
		if (explanations) addExplanationParts(explanations)

		// Solutions
		if (solutions) addSolutionParts(solutions)

		return {
			actions: actionParts,
			get message() {
				return [...eventParts, ...explanationParts, ...solutionParts].join(' ')
			},
			// Adds
			addEvents(events: Events[]) {
				addEventParts(events)
			},
			addExplanations(explanations: Explanations[]) {
				addExplanationParts(explanations)
			},
			addSolutions(solutions: Solutions[]) {
				addSolutionParts(solutions)
			},
			// Overrides
			overrideEvents(events: (keyof HumanLogs['events'])[]) {
				// Clear event parts
				eventParts.length = 0
				// @ts-ignore Add events
				addEventParts(events)
			},
			overrideExplanations(explanations: (keyof HumanLogs['explanations'])[]) {
				// Clear explanation parts
				explanationParts.length = 0
				// @ts-ignore Add explanations
				addExplanationParts(explanations)
			},
			overrideSolutions(solutions: (keyof HumanLogs['solutions'])[]) {
				// Clear solution parts
				solutionParts.length = 0
				// @ts-ignore Add explanations
				addSolutionParts(solutions)
			},
			toString() {
				return `${[...eventParts, ...explanationParts, ...solutionParts].join(' ')}${
					actionParts ? actionParts.map((a) => ` ${a.text} (${a.href})`).join(' or') : ''
				}`
			}
		} as const
	}
}
