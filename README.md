<p align="center">
	<img src="https://github.com/skoshx/human-logs/raw/main/docs/human-logs-logo.jpg" />
</p>

# human-logs

[![npm version][npm-version-src]][npm-href]
[![npm downloads][npm-downloads-src]][npm-href]
[![Github Actions][github-actions-src]][github-actions-href]

> 🛠 A tiny log library that allows you to take events, explanations and solutions and connect them like lego-pieces to create user-friendly logs.

Good log messages increases customer satisfaction, as they work as sort of a guide, helping the user achieve what they wanted to achieve. Good logs minimize the amount of support calls, improve customer satisfaction and trust in your product, ultimately being a win-win for both the creators of software and the users.

Inspired by Vercel's [Error design framework](https://vercel.com/design/error#error-design-framework), human-logs allows you to take events, explanations and solutions, and connect them like lego-pieces, to create user-friendly logs in a versatile manner.

**Focus on understanding the errors.**

## Features

- Create consistent, human-friendly logs throughout your application or library
- Build versatile errors like lego-blocks

## 💻 Example Usage

```typescript
export const apiLogs = createHumanLogs({
	events: {
		project_create_failed: 'Cannot create your project'
	},
	explanations: {
		api_unreachable: 'because the API cannot be reached.'
	},
	solutions: {
		check_status_page: {
			template: 'You can check the status of our services on our status page.',
			params: {},
			action: [
				{
					text: 'Go to status page',
					href: 'https://status.foobar.inc'
				}
			]
		}
	}
})

// You can now use `apiLogs` to create user-friendly error logs, by connecting events, explanations and solutions like lego-blocks.
const log = apiLogs({
	event: ['project_create_failed'],
	explanation: ['api_unreachable'],
	solution: ['check_status_page']
})

console.log(log.message)
// => Cannot create your project because the API cannot be reached. You can check the status of our services on our status page.

console.log(log.action)
/* => [{
		text: 'Go to status page',
		href: 'https://status.foobar.inc'
	}]*/

console.log(log.toString())
// => Cannot create your project because the API cannot be reached. You can check the status of our services on our status page. Go to status page (https://status.foobar.inc)
```

## 💻 Development

- Clone this repository
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
- Install dependencies using `pnpm install`
- Run the tests using `pnpm dev`

## License

Made with ❤️ in Helsinki

Published under [MIT License](./LICENSE).

<!-- Links -->

[npm-href]: https://npmjs.com/package/human-logs
[github-actions-href]: https://github.com/skoshx/human-logs/actions/workflows/ci.yml

<!-- Badges -->

[npm-version-src]: https://badgen.net/npm/v/human-logs?color=black
[npm-downloads-src]: https://badgen.net/npm/dw/human-logs?color=black
[prettier-src]: https://badgen.net/badge/style/prettier/black?icon=github
[github-actions-src]: https://github.com/skoshx/human-logs/actions/workflows/ci.yml/badge.svg
