import { describe, expect, it } from 'vitest'
import { mockErrors } from './setup'

describe('formatters', () => {
	it('default formatter', () => {
		expect(
			mockErrors(['fetch_posts_failed', 'missing_params', 'provide_fallback'], {
				paramName: 'image',
				paramType: 'Image',
				postId: 'abcd-123'
			}).toString()
		).toBe(
			[
				'Fetching posts failed because the Image `image` is missing for post with ID `abcd-123`, and no fallback was provided.',
				'',
				'Possible solutions:',
				'1) add a fallback to your parameter definition like this: ',
				'',
				'url(`image`, { fallback: `https://useflytrap.com` })'
			].join('\n')
		)
	})
})

describe.skip('chaining', () => {
	const error = mockErrors(['fetch_posts_failed', 'missing_params', 'provide_fallback'], {
		paramName: 'image',
		paramType: 'Image',
		postId: 'abcd-123'
	})
})
