import { expect, it } from 'vitest'
import { mockHumanLogs } from './setup'

it.todo('support for injecting params')

it('smoke test', () => {
	const humanLog = mockHumanLogs({
		event: 'project_create_failed',
		explanation: 'api_unreachable',
		solution: 'check_status_page'
	})

	expect(humanLog.toString()).toEqual(
		`Cannot create your project because the API cannot be reached. You can check the status of our services on our status page. Go to status page (https://status.foobar.inc)`
	)
	expect(humanLog.message).toEqual(
		'Cannot create your project because the API cannot be reached. You can check the status of our services on our status page.'
	)
	expect(humanLog.action).toEqual([
		{
			text: 'Go to status page',
			href: 'https://status.foobar.inc'
		}
	])
})
