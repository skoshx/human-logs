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

import { textFormatter } from './formatters'
import { ActionType, CombineParams, CreateHumanLogsOptions, LogObject } from './types'

function log<Name, Message, Params>(
	name: Name & {},
	message: Message & {},
	options: {
		params: Params
		type: LogObject['type']
		actions?: ActionType[]
	} = {
		params: {} as Params,
		type: 'event'
	}
) {
	return {
		name: name,
		message,
		type: options.type,
		params: options.params
	} as const
}

export function event<Name, Message, Params>(
	name: Name & {},
	message: Message & {},
	options: {
		params: Params
		actions?: ActionType[]
	} = {
		params: {} as Params
	}
) {
	return log(name, message, { ...options, type: 'event' })
}

export function explanation<Name, Message, Params>(
	name: Name & {},
	message: Message & {},
	options: {
		params: Params
		actions?: ActionType[]
	} = {
		params: {} as Params
	}
) {
	return log(name, message, { ...options, type: 'explanation' })
}

export function solution<Name, Message, Params>(
	name: Name & {},
	message: Message & {},
	options: {
		params: Params
		actions?: ActionType[]
	} = {
		params: {} as Params
	}
) {
	return log(name, message, { ...options, type: 'solution' })
}

function replaceTemplateParams<Params extends LogObject['params']>(
	input: string,
	params: Params
): string {
	let result = String(input)
	for (const key in params) {
		const value = params[key] as string
		const placeholder = `{${key}}`
		result = result.split(placeholder).join(value)
	}
	return result
}

export function createHumanLogs<LogParts extends LogObject[]>(
	logs: LogParts,
	options: CreateHumanLogsOptions = {}
) {
	return function <LogNames extends Array<LogParts[number]['name']>>(
		logParts: LogNames,
		// ...[params]: CombineParams<LogParts, LogNames> extends never ? [] : [CombineParams<LogParts, LogNames>]
		params: CombineParams<LogParts, LogNames>
	) {
		let localLogParts = [...logParts]
		let localParams: CombineParams<LogParts, LogNames> = {
			...params
		}

		const getTemplatedParts = () =>
			logs
				.filter(({ name }) => localLogParts.includes(name))
				.map((part) => ({
					...part,
					// params: params as LogObject['params'],
					params: localParams,
					message: replaceTemplateParams(part.message, localParams)
				}))

		return {
			get parts() {
				return getTemplatedParts()
			},
			add<AddLogNames extends Array<LogParts[number]['name']>>(
				logParts: AddLogNames,
				params: CombineParams<LogParts, AddLogNames>
			) {
				localLogParts.push(...logParts)
				localParams = { ...localParams, ...params }
				return this
			},
			override<AddLogNames extends Array<LogParts[number]['name']>>(
				logParts: AddLogNames,
				params: CombineParams<LogParts, AddLogNames>
			) {
				localLogParts = logParts
				localParams = { ...localParams, ...params }
				return this
			},
			toString() {
				const formatter = options.formatter ?? textFormatter
				return formatter(getTemplatedParts())
			}
		}
	}
}
