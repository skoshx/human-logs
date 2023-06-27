import { CodeBlock } from './CodeBlock'
import { Subtitle } from './Subtitle'

export function Usage() {
	return (
		<section className="space-y-4">
			<div className="space-y-1">
				<Subtitle>Usage</Subtitle>
				<p className="text-gray-500">
					Create your log function once, and use everywhere. One place for all of your logs.
					TypeScript types inferred like magic.
				</p>
			</div>
			<CodeBlock>
				{`import { createHumanLogs } from 'human-logs'

export const apiLogs = createHumanLogs({
	events: {
		project_create_failed: 'Cannot create your project',
		project_create_success: 'Successfully created your project.'
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
					href: 'https://skosh.dev'
				}
			]
		},
		project_view: {
			message: '',
			action: [
				{
					text: 'View',
					href: 'https://skosh.dev'
				}
			]
		}
	}
})

// You can now use 'apiLogs' to create user-friendly error logs,
// by connecting events, explanations and solutions like lego-blocks.
const log = apiLogs({
	event: 'project_create_failed',
	explanation: 'api_unreachable',
	solution: 'check_status_page'
})

console.log(log.message)
// => Cannot create your project because the API cannot be reached.
// 		You can check the status of our services on our status page.

console.log(log.action)
/* => [{
		text: 'Go to status page',
		href: 'https://status.foobar.inc'
	}]
*/

console.log(log.toString())
// => Cannot create your project because the API cannot be reached.
//		You can check the status of our services on our status page.
// 		Go to status page (https://status.foobar.inc)`}
			</CodeBlock>
		</section>
	)
}
