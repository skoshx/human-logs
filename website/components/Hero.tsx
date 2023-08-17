'use client'

import Image from 'next/image'
import Link from 'next/link'
import { apiLogs } from './Demo'
import { toast } from 'sonner'

export function Hero() {
	function showHumanFriendlyLog() {
		const humanFriendlyLog = apiLogs({
			events: ['project_create_success'],
			solutions: ['project_view']
		})

		toast.success(humanFriendlyLog.message, {
			action: {
				label: humanFriendlyLog.actions?.at(0)?.text ?? '',
				onClick() {
					open(humanFriendlyLog.actions?.at(0)?.href, '_blank')
				}
			}
		})
	}

	return (
		<section className="space-y-6 py-36 flex flex-col items-center">
			<Image src="/human-logs-logo.svg" width={300} height={35} alt="human-logs logo" />
			<p className="text-lg max-w-lg mx-auto text-gray-600 text-center">
				A tiny log library that allows you to take events, explanations and solutions and connect them like lego-pieces to create user-friendly logs.
			</p>
			<div className="space-x-2 flex items-cente justify-center">
				<button className="h-11 text-xs font-semibold px-12 text-white rounded-xl bg-gradient-to-b from-gray-900 to-gray-800 cursor-pointer flex items-center justify-center" onClick={showHumanFriendlyLog}>
					Show human friendly log
				</button>
				<Link target={'_blank'} href="https://github.com/skoshx/human-errors">
					<button className="h-11 text-xs font-semibold px-6 text-gray-800 rounded-xl bg-gradient-to-b from-gray-100 to-gray-300 cursor-pointer flex items-center justify-center border border-gray-200">
						GitHub
					</button>
				</Link>
			</div>
		</section>
	)
}
