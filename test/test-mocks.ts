import { createHumanLogs, event, explanation, solution } from '../src'

export const mockErrors = createHumanLogs([
	event('fetch_posts_failed', 'fetching posts failed', {
		params: {}
	}),
	event('saving_cache_failed', 'saving content to cache failed', {
		params: {}
	}),
	event('fetching_page_contents_failed', 'fetching content for page with ID `{pageId}` failed', {
		params: { pageId: '' }
	}),
	explanation(
		'package_json_not_found',
		'a package.json file could not be found while traversing up the filetree'
	),
	explanation(
		'missing_params',
		'the {paramType} `{paramName}` is missing for post with ID `{postId}`, and no fallback was provided',
		{
			params: { paramType: '', paramName: '', postId: '' }
		}
	),
	explanation(
		'unsupported_blocktype',
		'unsupported block type `{blockType}` is included on this page',
		{
			params: { blockType: '' }
		}
	),
	solution(
		'provide_fallback',
		'add a fallback to your parameter definition like this: \n\nurl(`{paramName}`, { fallback: `https://useflytrap.com` })',
		{
			params: { paramName: '' }
		}
	),
	solution('check_statuspage', 'you can check the status of our services on our status page', {
		params: {},
		actions: [
			{
				text: 'Go to status page',
				href: 'https://status.foobar.inc'
			}
		]
	})
])
