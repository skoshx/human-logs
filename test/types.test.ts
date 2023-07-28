import { describe, expectTypeOf, it } from 'vitest'
import { mockHumanLogs } from './setup'

describe('Type tests', () => {
	it('input types', () => {
		expectTypeOf<Parameters<typeof mockHumanLogs>>([
			{
				events: ['project_create_failed'],
				explanations: ['api_unreachable'],
				solutions: ['check_status_page'],
				params: {}
			}
		])
	})

	it('events types', () => {
		// @ts-expect-error
		mockHumanLogs({ event: 'non_existent', explanation: 'api_unreachable' })
	})

	it('explanations types', () => {
		// @ts-expect-error
		mockHumanLogs({ event: 'project_create_failed', explanation: 'nonexistent' })
	})

	it('solution types', () => {
		mockHumanLogs({
			events: ['project_create_failed'],
			explanations: ['api_unreachable'],
			// @ts-expect-error
			solutions: ['nonexistent']
		})
	})
})

describe('Params type tests', () => {
	it('errors when not all needed params are included', () => {
		mockHumanLogs({
			events: ['team_create_failed'],
			explanations: ['team_exists'],
			// @ts-expect-error: params missing
			params: {}
		})
		mockHumanLogs({
			events: ['team_create_failed'],
			explanations: ['team_exists']
		})
		mockHumanLogs({
			events: ['team_create_failed'],
			explanations: ['team_exists'],
			params: {
				// @ts-expect-error: wrong params
				wrong: ''
			}
		})
		mockHumanLogs({
			events: ['team_create_failed'],
			explanations: ['team_exists'],
			// @ts-expect-error: params missing
			params: {}
		})
	})

	it('correct params', () => {
		mockHumanLogs({
			events: ['team_create_failed'],
			explanations: ['team_exists'],
			params: {
				teamId: ''
			}
		})

		mockHumanLogs({
			events: ['team_create_failed'],
			explanations: ['api_unreachable', 'team_exists'],
			params: {
				teamId: 'winning-team'
			}
		})
	})
})
