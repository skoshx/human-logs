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

- Create consistent, helpful logs that help users fix the problem themselves
- Build versatile errors by connecting events, explanations and solutions
- Support for parameters: template variables into the log messages
- Only 193 lines of code

## 💻 Example Usage

We start by defining our `events`, `explanations`, and `solutions`. These will later be used in logs to create user-friendly errors, guiding the users to the right solution.

```typescript
import { createHumanLogs, event, explanation, solution, createTextFormatter } from "human-logs"

export const notionError = createHumanLogs(
  [
    event("fetching_posts_failed", "fetching posts failed", {
      params: {},
    }),
    explanation(
      "missing_params",
      "the {paramType} `{paramName}` is missing for post with ID `{postId}`, and no fallback was provided",
      {
        params: {
          paramType: "",
          paramName: "",
          postId: "",
        },
      }
    ),
    solution(
      "add_missing_param",
      "add the missing {paramType} on your Notion page",
      {
        params: {},
      }
    ),
    solution(
      "provide_fallback",
      "add a fallback to your parameter definition like this:\n\nurl(`{paramName}`, { fallback: `https://useflytrap.com` })",
      {
        params: {
          paramName: "",
        },
      }
    ),
		solution(
      "add_skip_missing_fields",
      "if you want to skip posts that have missing fields, add `skipMissingFields`: true to your `fetchPosts` call like this: `notionSource.fetchPosts({ skipMissingFields: true })`",
      {
        params: {},
      }
    ),
    solution("open_issue", "open an issue for this on GitHub", {
      params: {},
      actions: [
        {
          text: "Open an issue",
          href: "https://github.com/useflytrap/notion-contentlayer/issues/new",
        },
      ],
    }),
  ],
  {
    formatter: createTextFormatter({
      eventsPrefix: "🚧 ",
      solutionsPrefix: "🛠️ ",
    }),
  }
)

// You can now use `notionError` to create user-friendly error logs, by connecting events, explanations and solutions like lego-blocks.
const errorLog = notionError([
  "fetching_posts_failed",
  "missing_params",
  "add_missing_param",
	"provide_fallback",
  "add_skip_missing_fields",
], {
  // 👇 these are inferred like magic!
  paramName: 'image',
  paramType: 'Image',
  postId: 'abcd-123',
});

console.log(errorLog.toString())
/* => "🚧 Fetching posts failed because the Image `image` is missing for post with ID `abcd-123`, and no fallback was provided.

🛠️ Solutions:
1) add the missing Image on your Notion page
2) add a fallback to your parameter definition like this: url(`image`, { fallback: `https://useflytrap.com` })
3) if you want to skip posts that have missing fields, add `skipMissingFields`: true to your `fetchPosts` call like this: `notionSource.fetchPosts({ skipMissingFields: true })`"
*/
```

Wow! Look at how helpful those errors are. These are errors developers, product end-users and everyone in between could only DREAM OF.

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
