import { expect, it } from 'vitest'
import { mockHumanLogs } from './setup'

it('can combine events, explanations and solutions', () => {
	const humanLog = mockHumanLogs({
		events: ['project_create_failed'],
		explanations: ['api_unreachable'],
		solutions: ['try_again', 'contact_us'],
		params: {}
	})

	expect(humanLog.toString()).toEqual(
		'Cannot create your project because the API cannot be reached. Please try again. If the problem persists, contact us.'
	)
})

it('supports parameters', () => {
	const humanLog = mockHumanLogs({
		events: ['team_create_failed'],
		explanations: ['team_exists'],
		params: {
			teamId: 'some-team'
		}
	})

	expect(humanLog.toString()).toEqual(
		'Creating your team failed because a team with ID "some-team" already exists.'
	)
})

it('can add events, explanations & solutions', () => {
	const humanLog = mockHumanLogs({
		explanations: ['team_exists'],
		params: {
			teamId: 'some-team'
		}
	})

	expect(humanLog.toString()).toEqual('because a team with ID "some-team" already exists.')
	humanLog.addEvents(['team_create_failed'])
	expect(humanLog.toString()).toEqual(
		'Creating your team failed because a team with ID "some-team" already exists.'
	)

	// Add solution
	humanLog.addSolutions(['contact_us'])
	expect(humanLog.toString()).toEqual(
		'Creating your team failed because a team with ID "some-team" already exists. If the problem persists, contact us.'
	)
})

it('can override events, explanations & solutions', () => {
	const humanLog = mockHumanLogs({
		events: ['team_create_failed'],
		explanations: ['team_exists'],
		params: {
			teamId: 'some-team'
		}
	})
	expect(humanLog.toString()).toEqual(
		'Creating your team failed because a team with ID "some-team" already exists.'
	)
	humanLog.overrideEvents(['project_create_failed'])
	expect(humanLog.toString()).toEqual(
		'Cannot create your project because a team with ID "some-team" already exists.'
	)

	humanLog.overrideExplanations(['api_unreachable'])
	expect(humanLog.toString()).toEqual(
		'Cannot create your project because the API cannot be reached.'
	)

	humanLog.overrideSolutions(['check_status_page'])
	expect(humanLog.toString()).toEqual(
		'Cannot create your project because the API cannot be reached. You can check the status of our services on our status page. Go to status page (https://status.foobar.inc)'
	)
})

it('smoke test', () => {
	const humanLog = mockHumanLogs({
		events: ['project_create_failed'],
		explanations: ['api_unreachable'],
		solutions: ['check_status_page'],
		params: {}
	})

	expect(humanLog.toString()).toEqual(
		`Cannot create your project because the API cannot be reached. You can check the status of our services on our status page. Go to status page (https://status.foobar.inc)`
	)
	expect(humanLog.message).toEqual(
		'Cannot create your project because the API cannot be reached. You can check the status of our services on our status page.'
	)
	expect(humanLog.actions).toEqual([
		{
			text: 'Go to status page',
			href: 'https://status.foobar.inc'
		}
	])
})
