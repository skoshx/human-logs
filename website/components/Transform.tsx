import { CodeBlock } from './CodeBlock'
import { Subtitle } from './Subtitle'

export function Transform() {
	return (
		<section className="space-y-4">
			<Subtitle>Transform</Subtitle>
			<p>Transform your human friendly error before returning.</p>
			<CodeBlock>
				{`import { createHumanError } from 'human-errors'

				// ...

				function App() {
					return (
						<div>
							<Toaster />
							<button onClick={() => toast('My first toast')}>
								Give me a toast
							</button>
						</div>
					)
				}`}
			</CodeBlock>
		</section>
	)
}
