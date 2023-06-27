import { describe, expectTypeOf, it } from 'vitest'
import { mockHumanLogs } from './setup'

describe('Type tests', () => {
	it('input types', () => {
		expectTypeOf<Parameters<typeof mockHumanLogs>>([
			{
				event: 'project_create_failed',
				explanation: 'api_unreachable',
				solution: 'check_status_page'
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
			event: 'project_create_failed',
			explanation: 'api_unreachable',
			// @ts-expect-error
			solution: 'nonexistent'
		})
	})
})
