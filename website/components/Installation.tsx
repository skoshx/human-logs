import { CodeBlock } from './CodeBlock'
import { Subtitle } from './Subtitle'

export function Installation() {
	return (
		<section className="space-y-4">
			<Subtitle>Installation</Subtitle>
			<CodeBlock copyContent='npm install human-logs' copyFromAnywhere={true}>$ npm install human-logs</CodeBlock>
		</section>
	)
}
