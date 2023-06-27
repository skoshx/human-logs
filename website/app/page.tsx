'use client'

import { Demo } from '@/components/Demo'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Installation } from '@/components/Installation'
import { Usage } from '@/components/Usage'
import { Toaster } from 'sonner'

export default function Home() {
	return (
		<>
			<main className="w-[90%] max-w-2xl mx-auto">
				<Hero />
				<div className="space-y-16">
					<Installation />
          <Demo />
					<Usage />
				</div>
			</main>
			<Footer />
      <Toaster />
		</>
	)
}

