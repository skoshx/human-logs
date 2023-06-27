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

import { ActionType, HumanLogsObject, TemplatedMessage } from './types'

function replaceTemplateParams(input: TemplatedMessage): string {
	let result = input.template
	for (const key in input.params) {
		const value = input.params[key]
		const placeholder = `{${key}}`
		result = result.split(placeholder).join(value)
	}
	return result
}

function isTemplatedMessage(solution: any): solution is TemplatedMessage {
	if (solution.template) return true
	return false
}

export function createHumanLogs<HumanLogs extends HumanLogsObject>(options: HumanLogs) {
	return function ({
		event,
		explanation,
		solution
	}: {
		event?: keyof HumanLogs['events']
		explanation?: keyof HumanLogs['explanations']
		solution?: keyof HumanLogs['solutions']
	}) {
		let message = ''
		let action: ActionType[] | undefined
		// Event
		if (event && options.events[event as string]) {
			const eventTypeOrString = options.events[event as string]

			if (isTemplatedMessage(eventTypeOrString)) {
				message += replaceTemplateParams(eventTypeOrString)
			} else {
				message += eventTypeOrString
			}
		}
		// Explanation
		if (explanation && options.explanations[explanation as string]) {
			const eventTypeOrString = options.explanations[explanation as string]

			if (isTemplatedMessage(eventTypeOrString)) {
				message += ' ' + replaceTemplateParams(eventTypeOrString)
			} else {
				message += ' ' + eventTypeOrString
			}
		}
		// Solution
		if (solution && options.solutions[solution as string]) {
			const solutionType = options.solutions[solution as string]

			if (isTemplatedMessage(solutionType)) {
				message += ' ' + replaceTemplateParams(solutionType)
			} else {
				message += ' ' + solutionType.message
			}
			action = solutionType.action
		}

		return {
			message,
			action,
			toString() {
				return `${message}${action ? action.map((a) => ` ${a.text} (${a.href})`).join(' or') : ''}`
			}
		} as const
	}
}
