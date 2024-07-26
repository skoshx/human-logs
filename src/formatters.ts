import { Formatter } from './types'

export const textFormatter: Formatter = (logParts) => {
	const events = logParts.filter(({ type }) => type === 'event')
	const explanations = logParts.filter(({ type }) => type === 'explanation')
	const solutions = logParts.filter(({ type }) => type === 'solution')

	const capitalize = (input: string) => `${input.charAt(0).toUpperCase()}${input.slice(1)}`

	const logMessageParts = [
		capitalize(events.map(({ message }) => message).join(' and ')),
		' because ',
		explanations.map(({ message }) => message).join(' and '),
		'.',
		'\n',
		'\n',
		'Possible solutions:\n',
		solutions.map(({ message }, solutionIndex) => `${solutionIndex + 1}) ${message}`)
	]
	return logMessageParts.join('')
}
