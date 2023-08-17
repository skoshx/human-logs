'use client'

import { Subtitle } from './Subtitle'
import { Button } from './Button'
import { createHumanLogs } from 'human-logs'
import { toast } from 'sonner'

// Our log function
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

export function Demo() {
	return (
		<section className="space-y-4">
			<div className="space-y-1">
				<Subtitle>Logs</Subtitle>
				<p className="text-gray-500">
					Click on the below buttons to see for yourself amazing your logs will be when using{' '}
					<code className="text-gray-800 text-sm p-[2px] bg-gradient-to-b from-gray-50 to-gray-100 bg-gray-100 border-gray-200 border rounded-lg">
						human-logs
					</code>
				</p>
			</div>
			<div className="flex space-x-2">
				<Button
					type="error"
					onClick={() => {
						const apiLogError = apiLogs({
							event: 'project_create_failed',
							explanation: 'api_unreachable',
							solution: 'check_status_page'
						})

						toast.error(apiLogError.message, {
							action: {
								label: apiLogError.actions?.at(0)?.text ?? '',
								onClick() {
									open(apiLogError.actions?.at(0)?.href, '_blank')
								}
							}
						})
					}}
				>
					Creating project fails
				</Button>
				<Button
					type="success"
					onClick={() => {
						const apiLogSuccess = apiLogs({
							event: 'project_create_success',
							solution: 'project_view'
						})

						toast.success(apiLogSuccess.message, {
							action: {
								label: apiLogSuccess.actions?.at(0)?.text ?? '',
								onClick() {
									open(apiLogSuccess.actions?.at(0)?.href, '_blank')
								}
							}
						})
					}}
				>
					Creating project goes well
				</Button>
			</div>
		</section>
	)
}
