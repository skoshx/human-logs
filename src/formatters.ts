import { Formatter } from './types'

export const textFormatter: Formatter = (logParts) => {
	const events = logParts.filter(({ type }) => type === 'event')
	const explanations = logParts.filter(({ type }) => type === 'explanation')
	const solutions = logParts.filter(({ type }) => type === 'solution')

	const capitalize = (input: string) => `${input.charAt(0).toUpperCase()}${input.slice(1)}`

	const logMessageParts = [
		capitalize(events.map(({ message }) => message).join(' and ')),
		events.length > 0 && ' because ',
		explanations.map(({ message }) => message).join(' and '),
		explanations.length > 0 && '.',
		solutions.length > 0 && explanations.length > 0 && '\n',
		solutions.length > 0 && explanations.length > 0 && '\n',
		solutions.length > 0 && 'Possible solutions:\n',
		solutions.length > 0 &&
			solutions.map(({ message }, solutionIndex) => `${solutionIndex + 1}) ${message}`).join('\n')
	]
	return logMessageParts.filter(Boolean).join('')
}
