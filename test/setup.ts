import { createHumanLogs } from '../src'

export const mockHumanLogs = createHumanLogs({
	events: {
		project_create_failed: 'Cannot create your project',
		team_create_failed: 'Creating your team failed'
	},
	explanations: {
		api_unreachable: 'because the API cannot be reached.',
		database_unreachable: 'because database API cannot be reached.',
		team_exists: {
			template: 'because a team with ID "{teamId}" already exists.',
			params: {
				teamId: ''
			}
		}
	},
	solutions: {
		try_again: 'Please try again.',
		contact_us: 'If the problem persists, contact us.',
		check_status_page: {
			params: {},
			template: 'You can check the status of our services on our status page.',
			actions: [
				{
					text: 'Go to status page',
					href: 'https://status.foobar.inc'
				}
			]
		}
	}
})
