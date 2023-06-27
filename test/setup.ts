import { createHumanLogs } from '../src'

export const mockHumanLogs = createHumanLogs({
	events: {
		project_create_failed: 'Cannot create your project'
	},
	explanations: {
		api_unreachable: 'because the API cannot be reached.'
	},
	solutions: {
		check_status_page: {
			message: 'You can check the status of our services on our status page.',
			action: [
				{
					text: 'Go to status page',
					href: 'https://status.foobar.inc'
				}
			]
		}
	}
})
