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

function replaceTemplateParams(input: TemplatedMessage): string {
	let result = input.template
	for (const key in input.params) {
		const value = input.params[key]
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
	if (solution.action) return true
	return false
}

type EventKey<
	HumanLogs extends HumanLogsObject,
	Key extends keyof HumanLogsObject
> = (keyof HumanLogs[Key])[]

function getMessagePartsFor<HumanLogs extends HumanLogsObject>(
	what: keyof HumanLogsObject,
	options: HumanLogs,
	eventKey: string
) {
	const messageParts: string[] = []
	const eventTypeOrString = options[what][eventKey] as
		| string
		| TemplatedMessage
		| SolutionType
		| undefined
	if (!eventTypeOrString) {
		return messageParts
	}

	if (isTemplatedMessage(eventTypeOrString)) {
		messageParts.push(replaceTemplateParams(eventTypeOrString))
	} else {
		messageParts.push(eventTypeOrString)
	}

	return messageParts
}

export function createHumanLogs<HumanLogs extends HumanLogsObject>(options: HumanLogs) {
	return function ({
		events,
		explanations,
		solutions
	}: {
		events?: EventKey<HumanLogs, 'events'>
		explanations?: EventKey<HumanLogs, 'explanations'>
		solutions?: EventKey<HumanLogs, 'solutions'>
	}) {
		const messageParts: string[] = []
		const actionParts: ActionType[] = []

		// Events
		events?.forEach((event) => {
			messageParts.push(...getMessagePartsFor('events', options, event as string))
		})

		// Explanations
		explanations?.forEach((explanation) => {
			messageParts.push(...getMessagePartsFor('explanations', options, explanation as string))
		})

		// Solutions
		solutions?.forEach((solution) => {
			messageParts.push(...getMessagePartsFor('solutions', options, solution as string))

			const solutionOrString = options.solutions[solution as string]
			if (!solutionOrString) {
				return
			}
			if (isSolutionType(solutionOrString) && solutionOrString.action) {
				actionParts.push(...solutionOrString.action)
			}
		})

		return {
			message: messageParts.join(' '),
			action: actionParts,
			toString() {
				return `${messageParts.join(' ')}${
					actionParts ? actionParts.map((a) => ` ${a.text} (${a.href})`).join(' or') : ''
				}`
			}
		} as const
	}
}
